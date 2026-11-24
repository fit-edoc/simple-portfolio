"use client";

import React, { useEffect, useState, useRef } from "react";

interface AnalogClockProps {
  size?: number;
  className?: string;
}

export const AnalogClock: React.FC<AnalogClockProps> = ({
  size = 22,
  className = "",
}) => {
  const [mounted, setMounted] = useState(false);
  const [angles, setAngles] = useState({ hour: 0, minute: 0, second: 0 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isReduced = mediaQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReduced = e.matches;
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    });

    const updateClock = () => {
      const now = new Date();
      const parts = formatter.formatToParts(now);

      let h = 0;
      let m = 0;
      let s = 0;

      for (const p of parts) {
        if (p.type === "hour") h = parseInt(p.value, 10) % 24;
        if (p.type === "minute") m = parseInt(p.value, 10);
        if (p.type === "second") s = parseInt(p.value, 10);
      }

      if (isReduced) {
        setAngles({
          hour: ((h % 12) + m / 60) * 30,
          minute: m * 6,
          second: s * 6,
        });
      } else {
        const ms = now.getMilliseconds();
        const secExact = s + ms / 1000;
        const minExact = m + secExact / 60;
        const hourExact = (h % 12) + minExact / 60;

        setAngles({
          hour: hourExact * 30,
          minute: minExact * 6,
          second: secExact * 6,
        });
      }

      animFrameRef.current = requestAnimationFrame(updateClock);
    };

    animFrameRef.current = requestAnimationFrame(updateClock);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  const radius = 10;
  const center = 12;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`shrink-0 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Dial outline & background */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="#fcfcfc"
        stroke="#71717a"
        strokeWidth="1.25"
      />

      {/* 4 subtle cardinal ticks (12, 3, 6, 9) */}
      <line x1="12" y1="3.2" x2="12" y2="4.4" stroke="#a1a1aa" strokeWidth="1" strokeLinecap="round" />
      <line x1="20.8" y1="12" x2="19.6" y2="12" stroke="#a1a1aa" strokeWidth="1" strokeLinecap="round" />
      <line x1="12" y1="20.8" x2="12" y2="19.6" stroke="#a1a1aa" strokeWidth="1" strokeLinecap="round" />
      <line x1="3.2" y1="12" x2="4.4" y2="12" stroke="#a1a1aa" strokeWidth="1" strokeLinecap="round" />

      {/* Hands rendered on client after mount */}
      {mounted && (
        <g>
          {/* Hour hand */}
          <line
            x1={center}
            y1={center}
            x2={center}
            y2={center - 4.8}
            stroke="#18181b"
            strokeWidth="1.6"
            strokeLinecap="round"
            transform={`rotate(${angles.hour} ${center} ${center})`}
          />

          {/* Minute hand */}
          <line
            x1={center}
            y1={center}
            x2={center}
            y2={center - 7}
            stroke="#3f3f46"
            strokeWidth="1.2"
            strokeLinecap="round"
            transform={`rotate(${angles.minute} ${center} ${center})`}
          />

          {/* Second hand */}
          <line
            x1={center}
            y1={center + 1.8}
            x2={center}
            y2={center - 8}
            stroke="#ef4444"
            strokeWidth="0.75"
            strokeLinecap="round"
            transform={`rotate(${angles.second} ${center} ${center})`}
          />

          {/* Center cap */}
          <circle cx={center} cy={center} r="1.1" fill="#18181b" />
          <circle cx={center} cy={center} r="0.45" fill="#ef4444" />
        </g>
      )}
    </svg>
  );
};

export default AnalogClock;
