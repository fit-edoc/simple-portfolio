"use client";

import React, { useEffect, useRef } from "react";

export const Footer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const fc = canvasRef.current;
    if (!fc) return;

    const rawG = fc.getContext("2d");
    if (!rawG) return;
    const g = rawG;

    const FPL = ["#0a6cff", "#5aa2ff", "#97c1ff", "#f5f5f3"];
    let w = 0;
    let h = 0;
    let dp = 1;
    let mx = -999;
    let my = -999;
    let vis = true;
    let isMounted = true;
    let animId: number | null = null;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function fb() {
      if (!fc) return;
      const isMobile = window.innerWidth < 768;
      dp = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      w = fc.clientWidth;
      h = fc.clientHeight;
      if (w <= 0 || h <= 0) return;
      fc.width = Math.ceil(w * dp);
      fc.height = Math.ceil(h * dp);
    }

    function loop(now: number) {
      if (!isMounted) return;
      animId = requestAnimationFrame(loop);
      if (!vis) return;

      const t = rm ? 0 : now / 1000;
      g.setTransform(dp, 0, 0, dp, 0, 0);
      g.clearRect(0, 0, w, h);

      const colW = 5;
      const segH = 12;
      const cols = Math.ceil(w / colW);
      const rowsN = Math.ceil(h / segH);

      for (let i = 0; i < cols; i++) {
        const x = i * colW;
        const bx = Math.floor(x / 24) * 24;
        const crest =
          0.26 +
          0.14 * Math.sin(bx * 0.007 + t * 0.5) +
          0.09 * Math.sin(bx * 0.019 - t * 0.75) +
          0.05 * Math.cos(x * 0.04 + t * 1.1);

        for (let j = 0; j < rowsN; j++) {
          const y = j * segH;
          let v = (y / h - crest) / (1 - crest);
          if (v <= 0) continue;
          if (v > 1) v = 1;

          const d = Math.hypot(x - mx, y - my);
          const boost = d < 130 ? (1 - d / 130) * 0.45 : 0;
          const val = Math.min(1, v + boost);
          const idx = Math.min(FPL.length - 1, Math.floor(val * FPL.length));
          const barW = Math.max(1, (colW - 1) * (0.15 + val * 0.85));

          g.fillStyle = FPL[idx];
          g.fillRect(x + (colW - barW) * 0.5, y, barW, segH - 0.5);
        }
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!fc) return;
      const r = fc.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    };

    const onPointerLeave = () => {
      mx = my = -999;
    };

    fc.addEventListener("pointermove", onPointerMove);
    fc.addEventListener("pointerleave", onPointerLeave);

    const observer = new IntersectionObserver(([entry]) => {
      vis = entry.isIntersecting;
    });
    observer.observe(fc);

    const onResize = () => {
      fb();
    };
    window.addEventListener("resize", onResize);

    fb();
    animId = requestAnimationFrame(loop);

    return () => {
      isMounted = false;
      if (animId !== null) cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      fc.removeEventListener("pointermove", onPointerMove);
      fc.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="w-full pt-[clamp(64px,8vw,120px)] border-t border-[var(--cell)]/40">
      <footer className="px-[8%] pb-[clamp(32px,5vw,64px)] flex justify-between items-end gap-[30px] flex-wrap">
        <div>
          <p className="m-0 mb-1.5 text-lg" style={{ color: "var(--mut)" }}>
            Himanshu Verma
          </p>
        
          <a
            href="mailto:himanshuverma2660@gmail.com"
            className="transition-opacity text-lg hover:opacity-80"
            style={{ color: "var(--link)" }}
          >
            himanshuverma2660@gmail.com
          </a>
        </div>

        <div className="fr flex flex-col items-start min-[701px]:items-end gap-2 text-lg">
          <nav className="flex flex-col items-end gap-4">
            <a
              href="https://github.com/fit-edoc"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: "var(--link)" }}
            >
              GitHub
            </a>
            <a
              href="https://x.com/fitedocc"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: "var(--link)" }}
            >
              X
            </a>
          </nav>
       
        </div>
      </footer>

      {/* Matching Sky-Blue Moving Halftone Wave Canvas in Footer */}
      <canvas
        id="fd"
        ref={canvasRef}
        className="block w-full h-[clamp(170px,19vw,260px)] mb-[-env(safe-area-inset-bottom,0px)]"
      />
    </div>
  );
};

export default Footer;
