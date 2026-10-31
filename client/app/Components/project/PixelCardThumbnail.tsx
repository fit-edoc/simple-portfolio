"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface PixelCardThumbnailProps {
  src: string;
  alt: string;
  isHovered: boolean;
}

export const PixelCardThumbnail: React.FC<PixelCardThumbnailProps> = ({
  src,
  alt,
  isHovered,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const animRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0.5,
    y: 0.5,
    active: false,
  });

  // Track pixelation progress (1 = sharp, 20 = very pixelated)
  const pixelationRef = useRef<number>(1);
  const targetPixelationRef = useRef<number>(1);

  // Load Image for Canvas Processing
  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      imgRef.current = img;
      setImgLoaded(true);
    };
  }, [src]);

  // Decode Animation on Mount (Entrance effect: 20px blocks -> 1px sharp)
  useEffect(() => {
    if (!imgLoaded) return;

    pixelationRef.current = 18;
    targetPixelationRef.current = 1;

    let startTime = performance.now();
    const duration = 600; // ms

    const decode = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      pixelationRef.current = Math.max(1, 18 * (1 - ease));

      if (progress < 1) {
        requestAnimationFrame(decode);
      } else {
        pixelationRef.current = 1;
      }
    };

    requestAnimationFrame(decode);
  }, [imgLoaded]);

  // Trigger Pixelation Ripple on Hover
  useEffect(() => {
    if (!imgLoaded) return;

    let startTime = performance.now();
    const duration = 750; // ms

    if (isHovered) {
      // Animate pixelation up to 14, then back down to 1
      const animateHover = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);

        if (progress < 0.5) {
          // Ramp up pixelation: 1 -> 14
          const p = progress / 0.5;
          pixelationRef.current = 1 + 13 * Math.sin(p * Math.PI * 0.5);
        } else {
          // Settle down to sharp: 14 -> 1
          const p = (progress - 0.5) / 0.5;
          pixelationRef.current = 14 - 13 * Math.sin(p * Math.PI * 0.5);
        }

        if (progress < 1) {
          animRef.current = requestAnimationFrame(animateHover);
        } else {
          pixelationRef.current = 1;
        }
      };

      animRef.current = requestAnimationFrame(animateHover);
    } else {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      pixelationRef.current = 1;
    }

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isHovered, imgLoaded]);

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const offscreen = document.createElement("canvas");
    const offCtx = offscreen.getContext("2d");

    let loopId: number;

    const render = () => {
      const img = imgRef.current;
      const rect = container.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);

      if (width === 0 || height === 0) {
        loopId = requestAnimationFrame(render);
        return;
      }

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      if (!img || !imgLoaded || !offCtx) {
        loopId = requestAnimationFrame(render);
        return;
      }

      const p = Math.max(1, Math.round(pixelationRef.current));

      if (p <= 1) {
        ctx.imageSmoothingEnabled = true;
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
      } else {
        const smallW = Math.max(1, Math.floor(width / p));
        const smallH = Math.max(1, Math.floor(height / p));

        offscreen.width = smallW;
        offscreen.height = smallH;
        offCtx.imageSmoothingEnabled = false;
        offCtx.drawImage(img, 0, 0, smallW, smallH);

        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(offscreen, 0, 0, smallW, smallH, 0, 0, width, height);

        // Subtle pixel grid overlay when heavily pixelated
        if (p >= 4) {
          ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          for (let x = 0; x < width; x += p) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
          }
          for (let y = 0; y < height; y += p) {
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
          }
          ctx.stroke();
        }
      }

      loopId = requestAnimationFrame(render);
    };

    loopId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(loopId);
    };
  }, [imgLoaded]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-xl bg-neutral-200 dark:bg-zinc-800"
    >
      {/* Standard Fallback Image for Instant First Render & SEO */}
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${
          imgLoaded ? "opacity-0" : "opacity-100"
        }`}
        priority={false}
      />

      {/* Dynamic Pixelate Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ imageRendering: "pixelated" }}
      />

      {/* Subtle Pixel Art Corner Accents on Hover */}
      <div
        className={`absolute top-2.5 right-2.5 pointer-events-none transition-opacity duration-300 flex items-center gap-1 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex gap-0.5">
          <span className="w-1.5 h-1.5 bg-white shadow-sm" />
          <span className="w-1.5 h-1.5 bg-white/70 shadow-sm" />
          <span className="w-1.5 h-1.5 bg-white/40 shadow-sm" />
        </div>
      </div>
    </div>
  );
};

