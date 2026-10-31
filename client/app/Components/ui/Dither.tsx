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

// Spark particle interface for gun hits & explosions
interface PixelParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

// Gun projectile bullet interface
interface PixelBullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

// Expanding shockwave ripple
interface ShockwaveRing {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
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

  // Raw & smoothed mouse coordinates for micro-jitter-free interpolation
  const mouseStateRef = useRef({
    rawX: 0,
    rawY: 0,
    smoothX: 0,
    smoothY: 0,
    active: false,
    initialized: false,
    clicked: false,
  });

  // Spring physics tracking
  const springRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
  });

  // Dynamic colors reference for instant prop updates without tearing down the canvas
  const colorsRef = useRef({
    front: parseColorToUint32(colorFront),
    back: parseColorToUint32(colorBack),
  });

  useEffect(() => {
    colorsRef.current.front = parseColorToUint32(colorFront);
    colorsRef.current.back = parseColorToUint32(colorBack);
  }, [colorFront, colorBack]);

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

    // Canvas & Offscreen dimensions
    let containerWidth = 0;
    let containerHeight = 0;
    let offscreenW = 0;
    let offscreenH = 0;

    // =========================================================================
    // 1. RETRO PIXEL SNAKE STATE
    // =========================================================================
    const snake = {
      segments: [] as Array<{ x: number; y: number }>,
      length: 16,
      dirX: 1,
      dirY: 0,
      headX: 40,
      headY: 30,
      foodX: 80,
      foodY: 60,
      foodBlink: 0,
      speed: 48, // cells per second
      accumDist: 0,
    };

    const initSnake = (w: number, h: number) => {
      snake.headX = Math.floor(w * 0.3);
      snake.headY = Math.floor(h * 0.5);
      snake.segments = [];
      for (let i = 0; i < snake.length; i++) {
        snake.segments.push({
          x: snake.headX - i * 1.5,
          y: snake.headY,
        });
      }
      snake.foodX = Math.floor(Math.random() * (w - 20) + 10);
      snake.foodY = Math.floor(Math.random() * (h - 20) + 10);
    };

    // =========================================================================
    // 2. PIXEL GUN & SHOOTING TURRET STATE
    // =========================================================================
    const gun = {
      x: 32, // turret x (cells)
      y: 32, // turret y (cells)
      barrelLength: 9,
      angle: 0,
      targetAngle: 0,
      recoil: 0,
      fireTimer: 0,
      fireInterval: 1.6, // auto-fires every 1.6s
      muzzleFlash: 0,
    };

    let bullets: PixelBullet[] = [];
    let particles: PixelParticle[] = [];
    let shockwaves: ShockwaveRing[] = [];

    const fireBullet = (targetCellX: number, targetCellY: number) => {
      const dx = targetCellX - gun.x;
      const dy = targetCellY - gun.y;
      const dist = Math.max(1, Math.hypot(dx, dy));
      const nx = dx / dist;
      const ny = dy / dist;

      gun.targetAngle = Math.atan2(ny, nx);
      gun.angle = gun.targetAngle;
      gun.recoil = 3.5;
      gun.muzzleFlash = 0.15; // flash duration in seconds

      const startX = gun.x + nx * gun.barrelLength;
      const startY = gun.y + ny * gun.barrelLength;

      const bulletSpeed = 240; // cells per sec
      bullets.push({
        x: startX,
        y: startY,
        vx: nx * bulletSpeed,
        vy: ny * bulletSpeed,
        life: 0,
        maxLife: 2.2,
      });
    };

    // Spawn explosion sparks
    const createExplosion = (cellX: number, cellY: number, count = 12) => {
      for (let i = 0; i < count; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = Math.random() * 65 + 25;
        particles.push({
          x: cellX,
          y: cellY,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          life: 0,
          maxLife: Math.random() * 0.45 + 0.35,
        });
      }

      shockwaves.push({
        x: cellX,
        y: cellY,
        radius: 2,
        maxRadius: 28,
        strength: 0.6,
      });
    };

    // =========================================================================
    // 3. HOVER TRANSITIONS (4 Distinct Cycling Modes)
    // Mode 0: Ripple Shockwave Rings
    // Mode 1: Cyber Swirl Vortex
    // Mode 2: Digital Matrix Scanline Glitch
    // Mode 3: Supernova Lens & Bloom
    // =========================================================================
    let currentMode = 0;
    let nextMode = 1;
    let modeTransitionProgress = 1; // 1 means currentMode is fully active
    let modeTimer = 0;
    const MODE_SWITCH_INTERVAL = 6.0; // switch transition mode every 6s

    const advanceHoverMode = () => {
      currentMode = nextMode;
      nextMode = (nextMode + 1) % 4;
      modeTransitionProgress = 0;
    };

    // Dimension resize handler
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
        mouseStateRef.current.rawX = containerWidth * 0.5;
        mouseStateRef.current.rawY = containerHeight * 0.5;
        mouseStateRef.current.smoothX = containerWidth * 0.5;
        mouseStateRef.current.smoothY = containerHeight * 0.5;
      }

      // Position gun turret near bottom-left corner
      gun.x = 24;
      gun.y = offscreenH - 18;

      if (snake.segments.length === 0) {
        initSnake(offscreenW, offscreenH);
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(container);

    // Mouse pointer events with smooth interpolation
    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseStateRef.current.rawX = e.clientX - rect.left;
      mouseStateRef.current.rawY = e.clientY - rect.top;
      mouseStateRef.current.active = true;

      if (!mouseStateRef.current.initialized) {
        springRef.current.x = mouseStateRef.current.rawX;
        springRef.current.y = mouseStateRef.current.rawY;
        mouseStateRef.current.smoothX = mouseStateRef.current.rawX;
        mouseStateRef.current.smoothY = mouseStateRef.current.rawY;
        mouseStateRef.current.initialized = true;
      }
    };

    const handlePointerEnter = () => {
      mouseStateRef.current.active = true;
    };

    const handlePointerLeave = () => {
      mouseStateRef.current.active = false;
    };

    // User click: advance hover transition mode and shoot toward cursor!
    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const pxSize = Math.max(1, Math.round(pixelSize));
      const targetCellX = clickX / pxSize;
      const targetCellY = clickY / pxSize;

      // Shoot pixel projectile toward click
      fireBullet(targetCellX, targetCellY);

      // Advance hover transition style
      advanceHoverMode();
    };

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("mouseenter", handlePointerEnter);
    container.addEventListener("mouseleave", handlePointerLeave);
    container.addEventListener("click", handleClick);

    // Fast helper to write clamped pixel to buffer
    const setPixel = (
      buf: Uint32Array,
      w: number,
      h: number,
      x: number,
      y: number,
      color: number
    ) => {
      const ix = Math.floor(x);
      const iy = Math.floor(y);
      if (ix >= 0 && ix < w && iy >= 0 && iy < h) {
        buf[iy * w + ix] = color;
      }
    };

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

      const pxSize = Math.max(1, Math.round(pixelSize));
      const frontUint32 = colorsRef.current.front;
      const backUint32 = colorsRef.current.back;

      // -----------------------------------------------------------------------
      // A. ULTRA-SMOOTH HOVER SPRING PHYSICS
      // -----------------------------------------------------------------------
      const targetRawX = mouseStateRef.current.active
        ? mouseStateRef.current.rawX
        : containerWidth * 0.5;
      const targetRawY = mouseStateRef.current.active
        ? mouseStateRef.current.rawY
        : containerHeight * 0.5;

      // Smoothing step eliminates jitter from uneven mouse polling
      mouseStateRef.current.smoothX +=
        (targetRawX - mouseStateRef.current.smoothX) * (1 - Math.exp(-22 * dt));
      mouseStateRef.current.smoothY +=
        (targetRawY - mouseStateRef.current.smoothY) * (1 - Math.exp(-22 * dt));

      const ax = (mouseStateRef.current.smoothX - springRef.current.x) * stiffness * 60;
      const ay = (mouseStateRef.current.smoothY - springRef.current.y) * stiffness * 60;

      springRef.current.vx = (springRef.current.vx + ax * dt) * Math.pow(damping, dt * 60);
      springRef.current.vy = (springRef.current.vy + ay * dt) * Math.pow(damping, dt * 60);

      springRef.current.x += springRef.current.vx * dt * 60;
      springRef.current.y += springRef.current.vy * dt * 60;

      const cursorX = springRef.current.x;
      const cursorY = springRef.current.y;
      const repelRad = Math.max(1, repelRadius);
      const repelRadSq = repelRad * repelRad;

      // Hover Mode Cross-Fade Transition
      modeTimer += dt;
      if (modeTimer >= MODE_SWITCH_INTERVAL) {
        modeTimer = 0;
        advanceHoverMode();
      }
      if (modeTransitionProgress < 1) {
        modeTransitionProgress = Math.min(1, modeTransitionProgress + dt * 1.5);
      }

      // -----------------------------------------------------------------------
      // B. SNAKE ANIMATION UPDATE (Autonomous Retro Snake)
      // -----------------------------------------------------------------------
      snake.foodBlink = (snake.foodBlink + dt * 5) % 1;

      // Snake steers towards food pellet or playful cursor interaction
      const targetSnakeX = snake.foodX;
      const targetSnakeY = snake.foodY;
      const sDx = targetSnakeX - snake.headX;
      const sDy = targetSnakeY - snake.headY;
      const sDist = Math.hypot(sDx, sDy);

      if (sDist < 3) {
        // Ate food! Spawn explosion sparks and randomize new food
        createExplosion(snake.foodX, snake.foodY, 8);
        snake.foodX = Math.floor(Math.random() * (offscreenW - 24) + 12);
        snake.foodY = Math.floor(Math.random() * (offscreenH - 24) + 12);
      } else {
        const steerSpeed = 4.2;
        const desiredAng = Math.atan2(sDy, sDx);
        const currentAng = Math.atan2(snake.dirY, snake.dirX);
        let diff = desiredAng - currentAng;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        const newAng = currentAng + diff * Math.min(1, steerSpeed * dt);

        snake.dirX = Math.cos(newAng);
        snake.dirY = Math.sin(newAng);

        const step = snake.speed * dt;
        snake.headX += snake.dirX * step;
        snake.headY += snake.dirY * step;

        // Keep head inside bounds with soft bounce
        if (snake.headX < 4) { snake.headX = 4; snake.dirX = Math.abs(snake.dirX); }
        if (snake.headX > offscreenW - 5) { snake.headX = offscreenW - 5; snake.dirX = -Math.abs(snake.dirX); }
        if (snake.headY < 4) { snake.headY = 4; snake.dirY = Math.abs(snake.dirY); }
        if (snake.headY > offscreenH - 5) { snake.headY = offscreenH - 5; snake.dirY = -Math.abs(snake.dirY); }

        snake.accumDist += step;
        if (snake.accumDist >= 2.0) {
          snake.accumDist = 0;
          snake.segments.unshift({ x: snake.headX, y: snake.headY });
          if (snake.segments.length > snake.length) {
            snake.segments.pop();
          }
        }
      }

      // -----------------------------------------------------------------------
      // C. GUN & PROJECTILES UPDATE
      // -----------------------------------------------------------------------
      gun.fireTimer += dt;
      if (gun.recoil > 0) {
        gun.recoil = Math.max(0, gun.recoil - dt * 14);
      }
      if (gun.muzzleFlash > 0) {
        gun.muzzleFlash = Math.max(0, gun.muzzleFlash - dt);
      }

      // Gun aims at cursor when active, else tracks snake
      const aimTargetCellX = mouseStateRef.current.active
        ? cursorX / pxSize
        : snake.headX;
      const aimTargetCellY = mouseStateRef.current.active
        ? cursorY / pxSize
        : snake.headY;

      const gDx = aimTargetCellX - gun.x;
      const gDy = aimTargetCellY - gun.y;
      gun.targetAngle = Math.atan2(gDy, gDx);

      // Smooth turret rotation
      let angDiff = gun.targetAngle - gun.angle;
      while (angDiff < -Math.PI) angDiff += Math.PI * 2;
      while (angDiff > Math.PI) angDiff -= Math.PI * 2;
      gun.angle += angDiff * Math.min(1, dt * 6.5);

      // Periodic auto shooting
      if (gun.fireTimer >= gun.fireInterval) {
        gun.fireTimer = 0;
        fireBullet(aimTargetCellX, aimTargetCellY);
      }

      // Update bullets
      for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.life += dt;

        // Check bounds or collision with snake food/cursor
        const hitEdge =
          b.x <= 2 || b.x >= offscreenW - 2 || b.y <= 2 || b.y >= offscreenH - 2;
        const hitSnakeFood = Math.hypot(b.x - snake.foodX, b.y - snake.foodY) < 4;

        if (hitEdge || hitSnakeFood || b.life >= b.maxLife) {
          createExplosion(b.x, b.y, 10);
          if (hitSnakeFood) {
            snake.foodX = Math.floor(Math.random() * (offscreenW - 24) + 12);
            snake.foodY = Math.floor(Math.random() * (offscreenH - 24) + 12);
          }
          bullets.splice(i, 1);
        }
      }

      // Update explosion particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= Math.pow(0.85, dt * 60);
        p.vy *= Math.pow(0.85, dt * 60);
        p.vy += 22 * dt; // gravity
        p.life += dt;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }

      // Update shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += dt * 42;
        sw.strength *= Math.pow(0.78, dt * 60);
        if (sw.radius >= sw.maxRadius || sw.strength <= 0.02) {
          shockwaves.splice(i, 1);
        }
      }

      // -----------------------------------------------------------------------
      // D. CORE PROCEDURAL HARMONIC DITHERING FIELD
      // -----------------------------------------------------------------------
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

        const waveY1 = Math.cos(ny * 0.7 - t * 0.85);

        for (let x = 0; x < offscreenW; x++) {
          const nx = x * 0.035;
          const bayerX = x & 3;
          let threshold = BAYER_4X4[bayerRowOffset + bayerX];

          // 1. Interactive Hover Transitions
          const screenX = (x + 0.5) * pxSize;
          const dx = screenX - cursorX;
          const distSq = dx * dx + dySq;

          if (distSq < repelRadSq) {
            const dist = Math.sqrt(distSq);
            const norm = 1 - dist / repelRad;
            const falloff = norm * norm * (3 - 2 * norm);

            // Compute bias for mode A and mode B
            const computeModeBias = (mode: number): number => {
              switch (mode) {
                case 0: {
                  // Mode 0: Concentric Ripple Shockwaves
                  const ripple = Math.sin(dist * 0.14 - t * 7.5);
                  return ripple * falloff * repelStrength;
                }
                case 1: {
                  // Mode 1: Cyber Swirl Vortex
                  const angle = Math.atan2(dy, dx) + norm * 3.8;
                  const swirl = Math.sin(angle * 3.5 + t * 5.5);
                  return swirl * falloff * repelStrength;
                }
                case 2: {
                  // Mode 2: Digital Matrix Scanline Glitch
                  const scanline = (y & 1) === 0 ? 0.38 : -0.25;
                  const glitchNoise = Math.sin(x * 0.28 + t * 12) > 0.4 ? 0.25 : -0.15;
                  return (scanline + glitchNoise) * falloff * repelStrength;
                }
                case 3:
                default: {
                  // Mode 3: Supernova Lens Bloom
                  const lensDist = norm;
                  const bloom = lensDist > 0.65 ? 0.5 : -0.35;
                  return bloom * falloff * repelStrength;
                }
              }
            };

            const biasA = computeModeBias(currentMode);
            const biasB = computeModeBias(nextMode);
            const blendedBias = biasA * (1 - modeTransitionProgress) + biasB * modeTransitionProgress;

            threshold -= blendedBias;
          }

          // 2. Shockwave perturbations from bullet impacts
          for (let s = 0; s < shockwaves.length; s++) {
            const sw = shockwaves[s];
            const swDx = x - sw.x;
            const swDy = y - sw.y;
            const swDist = Math.hypot(swDx, swDy);
            const diff = Math.abs(swDist - sw.radius);
            if (diff < 2.5) {
              const ringFactor = (1 - diff / 2.5) * sw.strength;
              threshold -= ringFactor * 0.5;
            }
          }

          // 3. Procedural harmonic wave generator
          const wave1 = Math.sin(nx * 0.85 + t);
          const wave2 = waveY1;
          const wave3 = Math.sin((nx + ny) * 0.55 + t * 1.15);
          const wave4 = Math.sin(Math.hypot(nx - centerNx, ny - centerNy) * 1.15 - t * 1.45);

          const raw = (wave1 + wave2 + wave3 + wave4 + 4) * 0.125;
          const brightness = Math.min(1, Math.max(0, 0.5 + (raw - 0.5) * intensity));

          // 4. Bayer Ordered Dither Test
          offscreenBuf32[idx++] = brightness > threshold ? frontUint32 : backUint32;
        }
      }

      // -----------------------------------------------------------------------
      // E. RENDER PIXEL SNAKE SPRITES INTO BUFFER
      // -----------------------------------------------------------------------
      // 1. Food pellet: 3x3 blinking pixel gem
      if (snake.foodBlink > 0.25) {
        for (let fx = -1; fx <= 1; fx++) {
          for (let fy = -1; fy <= 1; fy++) {
            if (Math.abs(fx) + Math.abs(fy) <= 1) {
              setPixel(
                offscreenBuf32,
                offscreenW,
                offscreenH,
                snake.foodX + fx,
                snake.foodY + fy,
                frontUint32
              );
            }
          }
        }
      }

      // 2. Snake Body segments
      for (let s = 0; s < snake.segments.length; s++) {
        const seg = snake.segments[s];
        const segSize = s === 0 ? 1 : 0; // head is larger
        for (let sx = -segSize; sx <= segSize; sx++) {
          for (let sy = -segSize; sy <= segSize; sy++) {
            setPixel(
              offscreenBuf32,
              offscreenW,
              offscreenH,
              seg.x + sx,
              seg.y + sy,
              frontUint32
            );
          }
        }
      }

      // 3. Snake Eyes (two contrasting pixels on head)
      const eyeOffsetPerpX = -snake.dirY;
      const eyeOffsetPerpY = snake.dirX;
      setPixel(
        offscreenBuf32,
        offscreenW,
        offscreenH,
        snake.headX + eyeOffsetPerpX * 1.2,
        snake.headY + eyeOffsetPerpY * 1.2,
        backUint32
      );
      setPixel(
        offscreenBuf32,
        offscreenW,
        offscreenH,
        snake.headX - eyeOffsetPerpX * 1.2,
        snake.headY - eyeOffsetPerpY * 1.2,
        backUint32
      );

      // -----------------------------------------------------------------------
      // F. RENDER PIXEL GUN TURRET & BULLETS INTO BUFFER
      // -----------------------------------------------------------------------
      // 1. Turret Base (10x4 mechanical pedestal)
      for (let bx = -5; bx <= 5; bx++) {
        for (let by = -1; by <= 2; by++) {
          setPixel(
            offscreenBuf32,
            offscreenW,
            offscreenH,
            gun.x + bx,
            gun.y + by,
            frontUint32
          );
        }
      }
      // Turret Dome
      for (let bx = -3; bx <= 3; bx++) {
        for (let by = -3; by <= -2; by++) {
          setPixel(
            offscreenBuf32,
            offscreenW,
            offscreenH,
            gun.x + bx,
            gun.y + by,
            frontUint32
          );
        }
      }

      // 2. Turret Rotating Barrel with Recoil
      const effectiveBarrel = Math.max(3, gun.barrelLength - gun.recoil);
      const cosA = Math.cos(gun.angle);
      const sinA = Math.sin(gun.angle);

      for (let r = 1; r <= effectiveBarrel; r++) {
        setPixel(
          offscreenBuf32,
          offscreenW,
          offscreenH,
          gun.x + cosA * r,
          gun.y + sinA * r,
          frontUint32
        );
        // Barrel width (double line)
        setPixel(
          offscreenBuf32,
          offscreenW,
          offscreenH,
          gun.x + cosA * r - sinA * 0.8,
          gun.y + sinA * r + cosA * 0.8,
          frontUint32
        );
      }

      // 3. Muzzle Flash Starburst
      if (gun.muzzleFlash > 0) {
        const tipX = gun.x + cosA * (effectiveBarrel + 1.5);
        const tipY = gun.y + sinA * (effectiveBarrel + 1.5);
        for (let m = -2; m <= 2; m++) {
          setPixel(offscreenBuf32, offscreenW, offscreenH, tipX + m, tipY, frontUint32);
          setPixel(offscreenBuf32, offscreenW, offscreenH, tipX, tipY + m, frontUint32);
        }
      }

      // 4. Pixel Bullets (2x2 head + 3-pixel laser tracer tail)
      for (let b = 0; b < bullets.length; b++) {
        const bullet = bullets[b];
        const bNx = bullet.vx / 240;
        const bNy = bullet.vy / 240;

        // Head (2x2)
        setPixel(offscreenBuf32, offscreenW, offscreenH, bullet.x, bullet.y, frontUint32);
        setPixel(offscreenBuf32, offscreenW, offscreenH, bullet.x + 1, bullet.y, frontUint32);
        setPixel(offscreenBuf32, offscreenW, offscreenH, bullet.x, bullet.y + 1, frontUint32);
        setPixel(offscreenBuf32, offscreenW, offscreenH, bullet.x + 1, bullet.y + 1, frontUint32);

        // Tracer trail
        for (let t = 1; t <= 3; t++) {
          setPixel(
            offscreenBuf32,
            offscreenW,
            offscreenH,
            bullet.x - bNx * t * 1.5,
            bullet.y - bNy * t * 1.5,
            frontUint32
          );
        }
      }

      // 5. Explosion Sparks
      for (let p = 0; p < particles.length; p++) {
        const part = particles[p];
        setPixel(offscreenBuf32, offscreenW, offscreenH, part.x, part.y, frontUint32);
      }

      // -----------------------------------------------------------------------
      // G. BLIT CRISP BUFFER TO SCREEN
      // -----------------------------------------------------------------------
      offscreenCtx.putImageData(offscreenImgData, 0, 0);
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
      container.removeEventListener("click", handleClick);

      offscreenCanvas = null;
      offscreenCtx = null;
      offscreenImgData = null;
      offscreenBuf32 = null;
    };
  }, [
    pixelSize,
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
          cursor: "crosshair",
        }}
      />
    </div>
  );
}
