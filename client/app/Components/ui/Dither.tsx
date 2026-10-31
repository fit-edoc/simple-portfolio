"use client";

import React, { useEffect, useRef, type JSX } from "react";

export type DitherProps = {
  /** Size of each dither cell in CSS px. Default: 3 */
  pixelSize?: number;
  /** Color drawn where brightness > Bayer threshold. Default: '#00b3ff' */
  colorFront?: string;
  /** Color drawn where brightness <= Bayer threshold. Default: '#0a0a0a' */
  colorBack?: string;
  /** Animation speed multiplier for the procedural source field. Default: 1 */
  speed?: number;
  /** Contrast/intensity of the source field (0..2). Default: 1 */
  intensity?: number;
  /** Spring stiffness for hover follow (0..1). Default: 0.08 */
  stiffness?: number;
  /** Spring damping (0..1). Default: 0.85 */
  damping?: number;
  /** Radius in px around cursor where threshold is biased. Default: 120 */
  repelRadius?: number;
  /** Strength of the local threshold bias (0..1). Default: 0.35 */
  repelStrength?: number;
  /** Called once canvas is ready (optional). */
  onReady?: () => void;
  /** Extra className applied to the wrapping div. */
  className?: string;
};

// 4x4 Bayer Dithering Matrix normalized to [0, 1)
const BAYER_4X4 = new Float32Array([
  0 / 16,  8 / 16,  2 / 16, 10 / 16,
 12 / 16,  4 / 16, 14 / 16,  6 / 16,
  3 / 16, 11 / 16,  1 / 16,  9 / 16,
 15 / 16,  7 / 16, 13 / 16,  5 / 16,
]);

// Determine CPU endianness once at module load
const isLittleEndian: boolean = (() => {
  if (typeof window === "undefined") return true;
  const buf = new ArrayBuffer(4);
  const u8 = new Uint8Array(buf);
  const u32 = new Uint32Array(buf);
  u8[0] = 0x11;
  u8[1] = 0x22;
  u8[2] = 0x33;
  u8[3] = 0x44;
  return u32[0] === 0x44332211;
})();

/**
 * Parses CSS hex or rgb/rgba color string into a 32-bit integer formatted for ImageData.data Uint32Array.
 */
function parseColorToUint32(colorStr: string): number {
  let r = 0;
  let g = 0;
  let b = 0;
  let a = 255;

  const str = colorStr.trim().toLowerCase();

  if (str.startsWith("#")) {
    const hex = str.slice(1);
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 4) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
      a = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    } else if (hex.length === 8) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
      a = parseInt(hex.slice(6, 8), 16);
    }
  } else if (str.startsWith("rgb")) {
    const matches = str.match(/[\d.]+/g);
    if (matches) {
      r = Math.min(255, Math.max(0, parseInt(matches[0], 10) || 0));
      g = Math.min(255, Math.max(0, parseInt(matches[1], 10) || 0));
      b = Math.min(255, Math.max(0, parseInt(matches[2], 10) || 0));
      if (matches[3] !== undefined) {
        a = Math.min(255, Math.max(0, Math.round(parseFloat(matches[3]) * 255)));
      }
    }
  }

  if (isLittleEndian) {
    return (((a << 24) | (b << 16) | (g << 8) | r) >>> 0);
  } else {
    return (((r << 24) | (g << 16) | (b << 8) | a) >>> 0);
  }
}

export default function Dither({
  pixelSize = 3,
  colorFront = "#00b3ff",
  colorBack = "#0a0a0a",
  speed = 1,
  intensity = 1,
  stiffness = 0.08,
  damping = 0.85,
  repelRadius = 120,
  repelStrength = 0.35,
  onReady,
  className,
}: DitherProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  // Spring physics & hover tracking refs
  const mouseStateRef = useRef({
    x: 0,
    y: 0,
    active: false,
    initialized: false,
  });

  const springRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let offscreenCanvas: HTMLCanvasElement | null = document.createElement("canvas");
    let offscreenCtx: CanvasRenderingContext2D | null = offscreenCanvas.getContext("2d", {
      willReadFrequently: true,
    });
    let offscreenImgData: ImageData | null = null;
    let offscreenBuf32: Uint32Array | null = null;

    let animId = 0;
    let isReadyFired = false;
    let lastTime = performance.now();

    // Parse color values to 32-bit packed integers
    let frontUint32 = parseColorToUint32(colorFront);
    let backUint32 = parseColorToUint32(colorBack);

    // Track active dimensions
    let containerWidth = 0;
    let containerHeight = 0;
    let offscreenW = 0;
    let offscreenH = 0;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));

      if (w === containerWidth && h === containerHeight) return;

      containerWidth = w;
      containerHeight = h;

      canvas.width = containerWidth;
      canvas.height = containerHeight;

      const pxSize = Math.max(1, Math.round(pixelSize));
      offscreenW = Math.max(1, Math.ceil(containerWidth / pxSize));
      offscreenH = Math.max(1, Math.ceil(containerHeight / pxSize));

      if (offscreenCanvas && offscreenCtx) {
        offscreenCanvas.width = offscreenW;
        offscreenCanvas.height = offscreenH;
        offscreenImgData = offscreenCtx.createImageData(offscreenW, offscreenH);
        offscreenBuf32 = new Uint32Array(offscreenImgData.data.buffer);
      }

      if (!mouseStateRef.current.initialized) {
        springRef.current.x = containerWidth * 0.5;
        springRef.current.y = containerHeight * 0.5;
        mouseStateRef.current.x = containerWidth * 0.5;
        mouseStateRef.current.y = containerHeight * 0.5;
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(container);

    // Mouse pointer events
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseStateRef.current.x = e.clientX - rect.left;
      mouseStateRef.current.y = e.clientY - rect.top;
      mouseStateRef.current.active = true;

      if (!mouseStateRef.current.initialized) {
        springRef.current.x = mouseStateRef.current.x;
        springRef.current.y = mouseStateRef.current.y;
        mouseStateRef.current.initialized = true;
      }
    };

    const handlePointerEnter = () => {
      mouseStateRef.current.active = true;
    };

    const handlePointerLeave = () => {
      mouseStateRef.current.active = false;
    };

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("mouseenter", handlePointerEnter);
    container.addEventListener("mouseleave", handlePointerLeave);

    // Main animation & dither computation loop
    const render = (timeNow: number) => {
      animId = requestAnimationFrame(render);

      if (
        containerWidth <= 0 ||
        containerHeight <= 0 ||
        !offscreenCanvas ||
        !offscreenCtx ||
        !offscreenImgData ||
        !offscreenBuf32
      ) {
        return;
      }

      const dt = Math.min((timeNow - lastTime) / 1000, 0.05);
      lastTime = timeNow;

      // Update spring hover physics
      const targetX = mouseStateRef.current.active
        ? mouseStateRef.current.x
        : containerWidth * 0.5;
      const targetY = mouseStateRef.current.active
        ? mouseStateRef.current.y
        : containerHeight * 0.5;

      const ax = (targetX - springRef.current.x) * stiffness * 60;
      const ay = (targetY - springRef.current.y) * stiffness * 60;

      springRef.current.vx = (springRef.current.vx + ax * dt) * Math.pow(damping, dt * 60);
      springRef.current.vy = (springRef.current.vy + ay * dt) * Math.pow(damping, dt * 60);

      springRef.current.x += springRef.current.vx * dt * 60;
      springRef.current.y += springRef.current.vy * dt * 60;

      const cursorX = springRef.current.x;
      const cursorY = springRef.current.y;
      const repelRad = Math.max(1, repelRadius);
      const repelRadSq = repelRad * repelRad;

      const pxSize = Math.max(1, Math.round(pixelSize));
      const t = timeNow * 0.001 * speed;
      const centerNx = offscreenW * 0.5 * 0.035;
      const centerNy = offscreenH * 0.5 * 0.035;

      let idx = 0;

      for (let y = 0; y < offscreenH; y++) {
        const ny = y * 0.035;
        const bayerY = y & 3;
        const bayerRowOffset = bayerY * 4;
        const screenY = (y + 0.5) * pxSize;
        const dy = screenY - cursorY;
        const dySq = dy * dy;

        // Precompute y-wave components
        const waveY1 = Math.cos(ny * 0.7 - t * 0.85);

        for (let x = 0; x < offscreenW; x++) {
          const nx = x * 0.035;
          const bayerX = x & 3;
          let threshold = BAYER_4X4[bayerRowOffset + bayerX];

          // Local spring-physics mouse hover bias
          const screenX = (x + 0.5) * pxSize;
          const dx = screenX - cursorX;
          const distSq = dx * dx + dySq;

          if (distSq < repelRadSq) {
            const dist = Math.sqrt(distSq);
            const norm = 1 - dist / repelRad;
            // Smooth hermite cubic falloff
            const smoothFactor = norm * norm * (3 - 2 * norm);
            threshold -= smoothFactor * repelStrength;
          }

          // Procedural harmonic waves (layered organic flow)
          const wave1 = Math.sin(nx * 0.85 + t);
          const wave2 = waveY1;
          const wave3 = Math.sin((nx + ny) * 0.55 + t * 1.15);
          const wave4 = Math.sin(Math.hypot(nx - centerNx, ny - centerNy) * 1.15 - t * 1.45);

          // Combined field normalized to [0, 1]
          const raw = (wave1 + wave2 + wave3 + wave4 + 4) * 0.125;
          const brightness = Math.min(1, Math.max(0, 0.5 + (raw - 0.5) * intensity));

          // Ordered Bayer Dither test
          offscreenBuf32[idx++] = brightness > threshold ? frontUint32 : backUint32;
        }
      }

      // Commit to offscreen canvas
      offscreenCtx.putImageData(offscreenImgData, 0, 0);

      // Blit crisp scaled pixels to visible canvas
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(offscreenCanvas, 0, 0, containerWidth, containerHeight);

      if (!isReadyFired) {
        isReadyFired = true;
        onReadyRef.current?.();
      }
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("mouseenter", handlePointerEnter);
      container.removeEventListener("mouseleave", handlePointerLeave);

      offscreenCanvas = null;
      offscreenCtx = null;
      offscreenImgData = null;
      offscreenBuf32 = null;
    };
  }, [
    pixelSize,
    colorFront,
    colorBack,
    speed,
    intensity,
    stiffness,
    damping,
    repelRadius,
    repelStrength,
  ]);

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
