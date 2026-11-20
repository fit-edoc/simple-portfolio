"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";

// Thermal heat ramp (9 stops from cold to hot)
export const HEAT_COLORS = [
  "#05060F", // --heat-0 (background cold)
  "#14163A", // --heat-1 (deep indigo / faint grid dots)
  "#2A2552", // --heat-2 (cool border)
  "#4A3A63", // --heat-3 (subtle muted)
  "#7A4A2E", // --heat-4 (warm amber outline)
  "#C8641E", // --heat-5 (orange edge)
  "#FF8A1F", // --heat-6 (hot rim / accent)
  "#FFB02E", // --heat-7 (bright heat core)
  "#FFE9A8", // --heat-8 (burning yellow peak)
] as const;

// Module-level cache so pixel data is only generated once per (icon + gridSize)
const DOT_CACHE = new Map<string, number[][]>();

export interface PixelIconProps {
  icon: string;
  name: string;
  gridSize?: number;      // Grid resolution (default: 20 -> 20x20)
  radiusRatio?: number;   // Dot radius as fraction of cell size (default: 0.40 -> ~40%)
  gapRatio?: number;      // Spacing gap fraction
  isHovered?: boolean;
  mousePos?: { x: number; y: number } | null; // Normalized [0, 1] cursor coordinates
  className?: string;
}

/**
 * Generate a procedural fallback matrix in case image decode fails or during SSR.
 */
function getProceduralMatrix(name: string, size: number): number[][] {
  const matrix: number[][] = [];
  const center = (size - 1) / 2;
  const radius = size * 0.38;

  // Use a pseudo-hash of name for slight geometric variation if needed
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash << 5) - hash + name.charCodeAt(i);

  for (let y = 0; y < size; y++) {
    const row: number[] = [];
    for (let x = 0; x < size; x++) {
      const dist = Math.hypot(x - center, y - center);
      if (dist < radius * 0.45) {
        row.push(8);
      } else if (dist < radius * 0.75) {
        row.push(6);
      } else if (dist < radius) {
        row.push(4);
      } else {
        row.push(1); // Faint background dot
      }
    }
    matrix.push(row);
  }
  return matrix;
}

/**
 * Loads an icon SVG, draws it to an offscreen canvas at gridSize x gridSize,
 * downsamples it, calculates intensity from alpha x luminance, and maps to heat levels 0-8.
 */
function sampleIconToHeatMatrix(
  iconUrl: string,
  name: string,
  gridSize: number,
  onComplete: (matrix: number[][]) => void
) {
  const cacheKey = `${iconUrl}_${gridSize}`;
  if (DOT_CACHE.has(cacheKey)) {
    onComplete(DOT_CACHE.get(cacheKey)!);
    return;
  }

  // Check if running on browser
  if (typeof window === "undefined") {
    onComplete(getProceduralMatrix(name, gridSize));
    return;
  }

  const img = new Image();
  img.crossOrigin = "anonymous";

  img.onload = () => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = gridSize;
      canvas.height = gridSize;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });

      if (!ctx) {
        const fallback = getProceduralMatrix(name, gridSize);
        DOT_CACHE.set(cacheKey, fallback);
        onComplete(fallback);
        return;
      }

      ctx.clearRect(0, 0, gridSize, gridSize);
      
      // Draw centered with slight 1px padding for crisp edge sampling
      const pad = 1;
      ctx.drawImage(img, pad, pad, gridSize - pad * 2, gridSize - pad * 2);

      const { data } = ctx.getImageData(0, 0, gridSize, gridSize);
      const rawIntensities: number[][] = [];

      for (let y = 0; y < gridSize; y++) {
        const row: number[] = [];
        for (let x = 0; x < gridSize; x++) {
          const idx = (y * gridSize + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3] / 255;

          // Standard perceptual luminance: 0.299*R + 0.587*G + 0.114*B
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          // If icon is transparent PNG/SVG, alpha represents shape occupancy
          // If shape is dark/black on transparent (like Github/Next.js/Vercel), alpha carries the shape
          const intensity = a > 0.08 ? Math.max(a * luminance, a * 0.72) : 0;
          row.push(intensity);
        }
        rawIntensities.push(row);
      }

      // Second pass: Map intensity and core-vs-edge depth to heat levels 0-8
      const heatMatrix: number[][] = [];

      for (let y = 0; y < gridSize; y++) {
        const row: number[] = [];
        for (let x = 0; x < gridSize; x++) {
          const val = rawIntensities[y][x];

          if (val < 0.18) {
            // Empty cells show a faint heat-1 dot so the grid is visible
            row.push(1);
          } else {
            // Count surrounding active neighbors (8-neighborhood)
            let activeNeighbors = 0;
            for (let dy = -1; dy <= 1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) continue;
                const ny = y + dy;
                const nx = x + dx;
                if (ny >= 0 && ny < gridSize && nx >= 0 && nx < gridSize) {
                  if (rawIntensities[ny][nx] >= 0.18) {
                    activeNeighbors++;
                  }
                }
              }
            }

            // Core/center of shape trends toward heat-7/8, edges toward heat-4/5
            let heat = 4;
            if (activeNeighbors >= 7 && val > 0.45) {
              heat = 8; // Burning yellow core
            } else if (activeNeighbors >= 5 && val > 0.35) {
              heat = 7; // Bright amber core
            } else if (activeNeighbors >= 4) {
              heat = 6; // Mid body hot orange
            } else if (activeNeighbors >= 2) {
              heat = 5; // Warm perimeter
            } else {
              heat = 4; // Outer perimeter edge
            }
            row.push(heat);
          }
        }
        heatMatrix.push(row);
      }

      DOT_CACHE.set(cacheKey, heatMatrix);
      onComplete(heatMatrix);
    } catch {
      const fallback = getProceduralMatrix(name, gridSize);
      DOT_CACHE.set(cacheKey, fallback);
      onComplete(fallback);
    }
  };

  img.onerror = () => {
    const fallback = getProceduralMatrix(name, gridSize);
    DOT_CACHE.set(cacheKey, fallback);
    onComplete(fallback);
  };

  img.src = iconUrl;
}

export const PixelIcon: React.FC<PixelIconProps> = ({
  icon,
  name,
  gridSize = 20,
  radiusRatio = 0.40,
  isHovered = false,
  mousePos = null,
  className = "",
}) => {
  const cacheKey = `${icon}_${gridSize}`;

  // Initial state uses cached data if available, or procedural fallback
  const [baseMatrix, setBaseMatrix] = useState<number[][]>(() => {
    if (DOT_CACHE.has(cacheKey)) {
      return DOT_CACHE.get(cacheKey)!;
    }
    return getProceduralMatrix(name, gridSize);
  });

  // Track prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, []);

  // Sample icon when icon or gridSize changes
  useEffect(() => {
    sampleIconToHeatMatrix(icon, name, gridSize, (data) => {
      setBaseMatrix(data);
    });
  }, [icon, name, gridSize]);

  // Subtle idle twinkle effect: random dots shift +/- 1 heat level
  const [twinkleDeltas, setTwinkleDeltas] = useState<Record<string, number>>({});

  useEffect(() => {
    if (reducedMotion || isHovered) {
      setTwinkleDeltas({});
      return;
    }

    const interval = setInterval(() => {
      const deltas: Record<string, number> = {};
      const numTwinkles = 2 + Math.floor(Math.random() * 3); // 2 to 4 dots
      for (let i = 0; i < numTwinkles; i++) {
        const ry = Math.floor(Math.random() * gridSize);
        const rx = Math.floor(Math.random() * gridSize);
        // Only twinkle dots that are part of the shape (heat >= 4)
        if (baseMatrix[ry] && baseMatrix[ry][rx] >= 4) {
          const shift = Math.random() > 0.5 ? 1 : -1;
          deltas[`${rx},${ry}`] = shift;
        }
      }
      setTwinkleDeltas(deltas);
    }, 1200);

    return () => clearInterval(interval);
  }, [reducedMotion, isHovered, gridSize, baseMatrix]);

  // Radial wave animation on hover
  const [waveRadius, setWaveRadius] = useState<number>(-1);
  const waveAnimRef = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    if (isHovered && mousePos) {
      // Start radial wave expanding outwards
      let currentR = 0;
      const maxR = gridSize * 1.5;

      const animateWave = () => {
        currentR += 0.9;
        setWaveRadius(currentR);
        if (currentR <= maxR) {
          waveAnimRef.current = requestAnimationFrame(animateWave);
        }
      };

      if (waveAnimRef.current) cancelAnimationFrame(waveAnimRef.current);
      waveAnimRef.current = requestAnimationFrame(animateWave);
    } else {
      if (waveAnimRef.current) cancelAnimationFrame(waveAnimRef.current);
      setWaveRadius(-1);
    }

    return () => {
      if (waveAnimRef.current) cancelAnimationFrame(waveAnimRef.current);
    };
  }, [isHovered, mousePos, gridSize, reducedMotion]);

  // ViewBox dimensions: 200x200
  const vbSize = 200;
  const cellSize = vbSize / gridSize;
  const baseDotRadius = cellSize * radiusRatio;

  // Compute final heat levels for all cells
  const cursorCell = useMemo(() => {
    if (!mousePos) return null;
    return {
      x: mousePos.x * gridSize,
      y: mousePos.y * gridSize,
    };
  }, [mousePos, gridSize]);

  return (
    <svg
      viewBox={`0 0 ${vbSize} ${vbSize}`}
      className={`w-full h-full block select-none overflow-visible ${className}`}
      aria-hidden="true"
    >
      {baseMatrix.map((row, y) =>
        row.map((baseHeat, x) => {
          let heat = baseHeat;

          // Apply idle twinkle if active
          const twinkleKey = `${x},${y}`;
          if (twinkleDeltas[twinkleKey] !== undefined) {
            heat = Math.min(8, Math.max(1, heat + twinkleDeltas[twinkleKey]));
          }

          // Apply hover radial wave & proximity heating
          if (isHovered && cursorCell) {
            const dist = Math.hypot(x - cursorCell.x, y - cursorCell.y);

            if (!reducedMotion && waveRadius >= 0) {
              // Wave crest: dots near the wave front get +2 boost
              const diff = Math.abs(dist - waveRadius);
              if (diff < 2.0) {
                if (heat >= 4) {
                  heat = Math.min(8, heat + 2);
                } else if (heat === 1) {
                  heat = 2; // faint glow on empty cells near wave front
                }
              }
            }

            // Cursor proximity: dots close to cursor stay warm (+1 level)
            if (dist < 4.5 && heat >= 4) {
              heat = Math.min(8, heat + 1);
            }
          }

          const cx = x * cellSize + cellSize / 2;
          const cy = y * cellSize + cellSize / 2;
          
          // Subtle dot size modulation based on heat level (core dots are slightly bolder)
          const radiusScale = heat >= 7 ? 1.05 : heat >= 4 ? 1.0 : 0.85;
          const currentRadius = baseDotRadius * radiusScale;
          const fill = HEAT_COLORS[heat] || HEAT_COLORS[1];

          return (
            <circle
              key={`${x}-${y}`}
              cx={cx}
              cy={cy}
              r={currentRadius}
              fill={fill}
              className="transition-colors duration-150 ease-out"
            />
          );
        })
      )}
    </svg>
  );
};

export default PixelIcon;
