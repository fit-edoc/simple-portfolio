"use client";

import React, { useEffect, useRef, type JSX } from "react";

export type DitherProps = {
  /** Size of each dither cell in CSS px. Default: 3 */
  pixelSize?: number;
  /** Color drawn where brightness > Bayer threshold (legacy / override). */
  colorFront?: string;
  /** Color drawn where brightness <= Bayer threshold (legacy / override). */
  colorBack?: string;
  /** Animation speed multiplier for the procedural heat field. Default: 1 */
  speed?: number;
  /** Contrast/intensity multiplier for the vignette / rim heat (0..2). Default: 1 */
  intensity?: number;
  /** Film grain noise intensity (0..0.1). Default: 0.03 */
  grain?: number;
  /** Spring stiffness for hover follow. Default: 0.08 */
  stiffness?: number;
  /** Spring damping. Default: 0.85 */
  damping?: number;
  /** Radius in px around cursor where threshold is biased. Default: 120 */
  repelRadius?: number;
  /** Strength of the local threshold bias. Default: 0.35 */
  repelStrength?: number;
  /** Called once canvas is ready (optional). */
  onReady?: () => void;
  /** Extra className applied to the wrapping div. */
  className?: string;
};

// ---------------------------------------------------------------------------
// GLSL ES 3.00 (WebGL2) Shaders
// ---------------------------------------------------------------------------

const VS_SOURCE = `#version 300 es
in vec2 aPosition;
void main() {
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const FS_SOURCE = `#version 300 es
precision highp float;

out vec4 fragColor;

uniform vec2  uRes;
uniform float uTime;
uniform float uPx;     // Cell size (pixelSize * dpr)
uniform float uVig;    // Vignette intensity
uniform float uSpeed;  // Animation speed multiplier
uniform float uGrain;  // 3% film grain

// 8x8 Bayer Dithering Matrix [0..63] normalized to [0..1)
const float bayer8[64] = float[64](
     0.0/64.0, 32.0/64.0,  8.0/64.0, 40.0/64.0,  2.0/64.0, 34.0/64.0, 10.0/64.0, 42.0/64.0,
    48.0/64.0, 16.0/64.0, 56.0/64.0, 24.0/64.0, 50.0/64.0, 18.0/64.0, 58.0/64.0, 26.0/64.0,
    12.0/64.0, 44.0/64.0,  4.0/64.0, 36.0/64.0, 14.0/64.0, 46.0/64.0,  6.0/64.0, 38.0/64.0,
    60.0/64.0, 28.0/64.0, 52.0/64.0, 20.0/64.0, 62.0/64.0, 30.0/64.0, 54.0/64.0, 22.0/64.0,
     3.0/64.0, 35.0/64.0, 11.0/64.0, 43.0/64.0,  1.0/64.0, 33.0/64.0,  9.0/64.0, 41.0/64.0,
    51.0/64.0, 19.0/64.0, 59.0/64.0, 27.0/64.0, 49.0/64.0, 17.0/64.0, 57.0/64.0, 25.0/64.0,
    15.0/64.0, 47.0/64.0,  7.0/64.0, 39.0/64.0, 13.0/64.0, 45.0/64.0,  5.0/64.0, 37.0/64.0,
    63.0/64.0, 31.0/64.0, 55.0/64.0, 23.0/64.0, 61.0/64.0, 29.0/64.0, 53.0/64.0, 21.0/64.0
);

// 9-Stop Cinematic Thermal Heat Ramp (cold to hot)
const vec3 palette[9] = vec3[9](
    vec3(0.0196, 0.0235, 0.0588), // 0: #05060F
    vec3(0.0784, 0.0863, 0.2275), // 1: #14163A
    vec3(0.1647, 0.1451, 0.3216), // 2: #2A2552
    vec3(0.2902, 0.2275, 0.3882), // 3: #4A3A63
    vec3(0.4784, 0.2902, 0.1804), // 4: #7A4A2E
    vec3(0.7843, 0.3922, 0.1176), // 5: #C8641E
    vec3(1.0000, 0.5412, 0.1216), // 6: #FF8A1F
    vec3(1.0000, 0.6902, 0.1804), // 7: #FFB02E
    vec3(1.0000, 0.9137, 0.6588)  // 8: #FFE9A8
);

// Cold-zone fleck accent color: #5B8CFF
const vec3 cAccent = vec3(0.3569, 0.5490, 1.0000);

float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));

    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.80, -0.60, 0.60, 0.80);
    for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p = rot * p * 2.02;
        a *= 0.5;
    }
    return v;
}

void main() {
    // 1. Dither cell quantization in screen space
    vec2 cellCoord = floor(gl_FragCoord.xy / uPx);
    vec2 screenPos = (cellCoord + 0.5) * uPx;
    vec2 uv = screenPos / uRes;

    // Centered aspect-corrected coordinates for radial vignette
    vec2 cUv = (screenPos - 0.5 * uRes) / min(uRes.x, uRes.y);
    float dist = length(cUv);

    // 2. Convection Noise with Domain Warping (upward drift)
    float t = uTime * 0.12 * uSpeed;
    vec2 st = uv * vec2(2.4, 1.8);
    vec2 drift = vec2(0.0, -t);

    vec2 q = vec2(
        fbm(st + drift),
        fbm(st + drift + vec2(5.2, 1.3))
    );

    float n = fbm(st + 1.25 * q + drift);

    // 3. Heat Field Formulation
    // Vignette: dark center mass, hot radiating edges
    float vig = smoothstep(0.25, 1.45, dist) * uVig;

    // Vertical thermal gradient: hotter at bottom, colder toward indigo top
    float vertBias = smoothstep(1.0, 0.0, uv.y) * 0.38;

    float h = vig * (0.65 + 0.55 * n) + vertBias * vig;

    // Rare pale yellow hot spikes along the rim crests
    float hotPeak = pow(max(n - 0.62, 0.0) / 0.38, 2.0) * 0.55;
    h += hotPeak * smoothstep(0.45, 1.2, dist);

    // 4. Subtle Film Grain (3% noise, re-seeded at 24 fps)
    float grainFrame = floor(uTime * 24.0);
    float grain = (hash21(cellCoord + grainFrame * 71.17) - 0.5) * uGrain;
    h = clamp(h + grain, 0.0, 1.0);

    // 5. Rare Accent Flecks in Cold Zones (< 0.3)
    float fleckSeed = hash21(cellCoord + grainFrame * 17.31);
    if (h < 0.30 && fleckSeed > 0.9975) {
        fragColor = vec4(cAccent, 1.0);
        return;
    }

    // 6. 8x8 Ordered Bayer Dithering over the 9-Color Ramp
    ivec2 bPos = ivec2(mod(cellCoord, 8.0));
    float bThreshold = bayer8[bPos.y * 8 + bPos.x];

    float rampPos = h * 8.0;
    int idx = int(floor(rampPos));
    float fracPart = fract(rampPos);

    vec3 finalColor;
    if (idx >= 8) {
        finalColor = palette[8];
    } else {
        finalColor = (fracPart > bThreshold) ? palette[idx + 1] : palette[idx];
    }

    fragColor = vec4(finalColor, 1.0);
}
`;

function createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGL2RenderingContext, vs: string, fs: string): WebGLProgram | null {
  const vShader = createShader(gl, gl.VERTEX_SHADER, vs);
  const fShader = createShader(gl, gl.FRAGMENT_SHADER, fs);
  if (!vShader || !fShader) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vShader);
  gl.attachShader(program, fShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export default function Dither({
  pixelSize = 3,
  speed = 1.0,
  intensity = 1.0,
  grain = 0.03,
  onReady,
  className,
}: DitherProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  const propsRef = useRef({ pixelSize, speed, intensity, grain });
  propsRef.current = { pixelSize, speed, intensity, grain };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Request WebGL2 Context
    let gl: WebGL2RenderingContext | null = null;
    try {
      gl = canvas.getContext("webgl2", {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "high-performance",
      });
    } catch {
      gl = null;
    }

    if (!gl) {
      console.warn("WebGL2 not available for thermal dither.");
      return;
    }

    const program = createProgram(gl, VS_SOURCE, FS_SOURCE);
    if (!program) return;

    // Cache Uniform Locations
    const locPos   = gl.getAttribLocation(program, "aPosition");
    const locRes   = gl.getUniformLocation(program, "uRes");
    const locTime  = gl.getUniformLocation(program, "uTime");
    const locPx    = gl.getUniformLocation(program, "uPx");
    const locVig   = gl.getUniformLocation(program, "uVig");
    const locSpeed = gl.getUniformLocation(program, "uSpeed");
    const locGrain = gl.getUniformLocation(program, "uGrain");

    // Full-screen Quad Buffer
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    // Setup Attribute
    gl.enableVertexAttribArray(locPos);
    gl.vertexAttribPointer(locPos, 2, gl.FLOAT, false, 0, 0);

    let isVisible = true;
    let isTabVisible = !document.hidden;
    let animId = 0;
    let isReadyFired = false;

    // Reduced motion preference
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isReducedMotion = motionQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion = e.matches;
      if (!isReducedMotion) render(performance.now());
    };
    motionQuery.addEventListener("change", handleMotionChange);

    // Visibility Listener for tab switching
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && isVisible && !isReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Resize handler
    const updateDimensions = () => {
      if (!container || !canvas || !gl) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
      if (isReducedMotion) render(0);
    });
    resizeObserver.observe(container);

    // Viewport IntersectionObserver
    const viewportObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && isTabVisible && !isReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    });
    viewportObserver.observe(container);

    // Render loop
    const render = (timeMs: number) => {
      if (!gl || !canvas) return;

      const timeSec = isReducedMotion ? 0.0 : timeMs * 0.001;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      gl.useProgram(program);
      gl.uniform2f(locRes, canvas.width, canvas.height);
      gl.uniform1f(locTime, timeSec);
      gl.uniform1f(locPx, Math.max(1, propsRef.current.pixelSize * dpr));
      gl.uniform1f(locVig, propsRef.current.intensity);
      gl.uniform1f(locSpeed, propsRef.current.speed);
      gl.uniform1f(locGrain, propsRef.current.grain);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!isReadyFired) {
        isReadyFired = true;
        onReadyRef.current?.();
      }

      if (!isReducedMotion && isVisible && isTabVisible) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      viewportObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionQuery.removeEventListener("change", handleMotionChange);

      if (gl) {
        gl.deleteBuffer(quadBuffer);
        gl.deleteProgram(program);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className || "relative w-full h-full overflow-hidden"}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}
