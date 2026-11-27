"use client";

import React, { useEffect, useRef } from "react";

export const BannerCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ban = containerRef.current;
    const cv = canvasRef.current;
    if (!ban || !cv) return;

    const rawCtx = cv.getContext("2d");
    if (!rawCtx) return;
    const cx = rawCtx;

    const S = 6;
    const PAL = ["#0a6cff", "#5aa2ff", "#97c1ff", "#f5f5f3"];
    let pmx = 0;
    let pmy = 0;
    let sp = 0;

    function nz(x: number, y: number, t: number, s: number) {
      const a =
        Math.sin(x * 0.011 + t * 0.5 + s * 1.7) +
        Math.sin(y * 0.016 - t * 0.35 + s * 2.3 + Math.sin(x * 0.007 + t * 0.2) * 2) +
        Math.sin((x + y) * 0.007 + t * 0.3 - s) +
        Math.sin(x * 0.021 - y * 0.013 + t * 0.45 + s * 0.9) * 0.6;
      let v = (0.5 + a * 0.14 - 0.25) / 0.5;
      v = v < 0 ? 0 : v > 1 ? 1 : v;
      return v * v * (3 - 2 * v);
    }

    const BY = [
      [0, 8, 2, 10],
      [12, 4, 14, 6],
      [3, 11, 1, 9],
      [15, 7, 13, 5],
    ].map((r) => r.map((v) => (v + 0.5) / 16));

    interface Cell {
      i: number;
      j: number;
      x: number;
      y: number;
      ox: number;
      oy: number;
      r: number;
      s: number;
      seed: number;
      ns: number;
      t: number;
    }

    interface Shot {
      x: number;
      y: number;
      t: number;
    }

    let W = 0;
    let H = 0;
    let cols = 0;
    let rows = 0;
    let dpr = 1;
    let cells: Cell[] = [];
    let mode: "magnet" | "twist" | "web" | "wipe" = "magnet";
    let mx = -999;
    let my = -999;
    let sx = -999;
    let sy = -999;
    let inside = false;
    let wa = 0;
    let shots: Shot[] = [];
    let busy = 0;
    let dirI = 0;
    let animId: number | null = null;
    let isVisible = true;
    let isMounted = true;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const DIRS = [
      [0, 1],
      [-1, 0],
      [0, -1],
      [1, 0],
      [1, 1],
      [-1, 1],
      [-1, -1],
      [1, -1],
    ];

    function build() {
      if (!ban || !cv) return;
      const isMobile = window.innerWidth < 768;
      dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      W = ban.clientWidth;
      H = ban.clientHeight;
      if (W <= 0 || H <= 0) return;

      cv.width = Math.ceil(W * dpr);
      cv.height = Math.ceil(H * dpr);
      cols = Math.ceil(W / S);
      rows = Math.ceil(H / S);
      cells = [];
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          cells.push({
            i,
            j,
            x: i * S + S / 2,
            y: j * S + S / 2,
            ox: 0,
            oy: 0,
            r: 0,
            s: 1,
            seed: 0,
            ns: 0,
            t: 0,
          });
        }
      }
    }

    function wipe(d: number[]) {
      const now = performance.now();
      if (now < busy) return;
      busy = now + 1000;
      const ns = Math.random() * 20;
      const dx = d[0];
      const dy = d[1];
      const mn = Math.min(0, dx) + Math.min(0, dy);
      const mxv = Math.max(0, dx) + Math.max(0, dy);
      for (let n = 0; n < cells.length; n++) {
        const c = cells[n];
        c.ns = ns;
        c.t = now + (((dx * c.i) / cols + (dy * c.j) / rows - mn) / (mxv - mn)) * 500;
      }
    }

    function entryDir(): number[] {
      const nx = mx / W;
      const ny = my / H;
      const dx = nx < 0.2 ? 1 : nx > 0.8 ? -1 : 0;
      const dy = ny < 0.25 ? 1 : ny > 0.75 ? -1 : 0;
      if (!dx && !dy) {
        const a = [nx, 1 - nx, ny, 1 - ny];
        const m = a.indexOf(Math.min(...a));
        return [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ][m];
      }
      return [dx, dy];
    }

    function web(x: number, y: number, sc: number, al: number) {
      if (al < 0.02) return;
      cx.save();
      cx.globalAlpha = al;
      cx.strokeStyle = "#97c1ff";
      cx.lineWidth = 1.3;
      cx.lineCap = "round";
      const N = 12;
      const R = 140 * sc;
      const P: [number, number, number][] = [];
      for (let k = 0; k < N; k++) {
        const a = (k / N) * Math.PI * 2 + 0.2;
        const L = R * (0.88 + 0.24 * Math.abs(Math.sin(k * 7.3)));
        P.push([Math.cos(a), Math.sin(a), L]);
      }
      cx.beginPath();
      for (let k = 0; k < N; k++) {
        cx.moveTo(x, y);
        cx.lineTo(x + P[k][0] * P[k][2], y + P[k][1] * P[k][2]);
      }
      [0.3, 0.55, 0.8].forEach((f) => {
        for (let k = 0; k < N; k++) {
          const p = P[k];
          const q = P[(k + 1) % N];
          const ax = x + p[0] * p[2] * f;
          const ay = y + p[1] * p[2] * f;
          const bx = x + q[0] * q[2] * f;
          const by = y + q[1] * q[2] * f;
          cx.moveTo(ax, ay);
          cx.quadraticCurveTo(
            ((ax + bx) / 2) * 0.82 + x * 0.18,
            ((ay + by) / 2) * 0.82 + y * 0.18,
            bx,
            by
          );
        }
      });
      cx.stroke();
      cx.restore();
    }

    function frame(now: number) {
      if (!isMounted) return;
      if (!isVisible) {
        animId = requestAnimationFrame(frame);
        return;
      }

      const tt = now / 1000;
      sp += (Math.hypot(mx - pmx, my - pmy) * (inside ? 1 : 0) - sp) * 0.2;
      pmx = mx;
      pmy = my;

      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx.fillStyle = `rgba(10,108,255,${0.42 - Math.min(0.26, sp * 0.012)})`;
      cx.fillRect(0, 0, W, H);

      sx += (mx - sx) * 0.3;
      sy += (my - sy) * 0.3;
      const act = inside && mode !== "wipe";
      const R = mode === "twist" ? 190 : 150;

      for (let n = 0; n < cells.length; n++) {
        const c = cells[n];
        let tx = 0;
        let ty = 0;
        let tr = 0;
        let ts = 1;

        if (act) {
          const dx = mx - c.x;
          const dy = my - c.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < R) {
            const f = 1 - d/R;
            if (mode === "magnet") {
              tx = dx * 0.6 * f;
              ty = dy * 0.6 * f;
              ts = 1 + f * 0.7;
            } else if (mode === "twist") {
              const a = 2.6 * f * f;
              const co = Math.cos(a);
              const si = Math.sin(a);
              tx = mx + (-dx * co + dy * si) - c.x;
              ty = my + (-dx * si - dy * co) - c.y;
              tr = a;
              ts = 1 + f * 0.4;
            } else {
              tx = dx * 0.15 * f;
              ty = dy * 0.15 * f;
            }
          }
        }

        c.ox += (tx - c.ox) * 0.27;
        c.oy += (ty - c.oy) * 0.27;
        c.r += (tr - c.r) * 0.27;
        c.s += (ts - c.s) * 0.27;

        let sc = 1;
        let rot = c.r;
        if (c.t && now > c.t) {
          const p = (now - c.t) / 320;
          if (p >= 0.5) c.seed = c.ns;
          if (p >= 1) {
            c.t = 0;
            c.seed = c.ns;
          } else {
            sc = Math.abs(1 - 2 * p);
            rot += p * Math.PI;
          }
        }

        const nv = nz(c.x, c.y, tt, c.seed);
        /* Moving vertical halftone wave modulating pixel dot scale */
        const ht = 0.55 + 0.45 * Math.sin(c.i * 0.35 - tt * 2.6 + Math.sin(c.j * 0.18 + tt) * 0.9);
        const pp = nv * 3;
        const b = pp >= 3 ? 2 : pp | 0;
        const col = pp - b > BY[c.j & 3][c.i & 3] ? PAL[b + 1] : PAL[b];
        const sz = S * (0.38 + 0.58 * ht * (0.4 + 0.6 * nv)) * c.s * sc;
        if (sz < 0.4) continue;

        cx.fillStyle = col;
        if (rot > 0.03 || rot < -0.03) {
          const k = Math.cos(rot) * dpr;
          const m = Math.sin(rot) * dpr;
          cx.setTransform(k, m, -m, k, (c.x + c.ox) * dpr, (c.y + c.oy) * dpr);
          cx.fillRect(-sz / 2, -sz / 2, sz, sz);
          cx.setTransform(dpr, 0, 0, dpr, 0, 0);
        } else {
          cx.fillRect(c.x + c.ox - sz / 2, c.y + c.oy - sz / 2, sz, sz);
        }
      }

      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (mode === "web") {
        wa += ((inside ? 1 : 0) - wa) * 0.15;
        if (wa > 0.02) {
          cx.save();
          cx.globalAlpha = wa;
          cx.strokeStyle = "#97c1ff";
          cx.lineWidth = 1.3;
          cx.beginPath();
          cx.moveTo(sx, 0);
          cx.lineTo(sx, sy);
          cx.stroke();
          cx.restore();
          web(sx, sy, 1, wa * 0.9);
        }
      }

      shots = shots.filter((s) => now - s.t < 1800);
      shots.forEach((s) => {
        const p = Math.min(1, (now - s.t) / 220);
        const al = Math.max(0, 1 - (now - s.t - 220) / 1580);
        cx.save();
        cx.strokeStyle = "#eaf4ff";
        cx.lineWidth = 1.6;
        cx.beginPath();
        cx.moveTo(0, H);
        cx.lineTo(s.x * p, H + (s.y - H) * p);
        cx.stroke();
        cx.restore();
        if (p >= 1) web(s.x, s.y, 0.8, al);
      });

      animId = requestAnimationFrame(frame);
    }

    function pos(e: PointerEvent) {
      const r = cv!.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    }

    const onPointerEnter = (e: PointerEvent) => {
      pos(e);
      if (sx < -900) {
        sx = mx;
        sy = my;
      }
      inside = true;
      if (mode === "wipe") wipe(entryDir());
    };

    const onPointerMove = (e: PointerEvent) => {
      pos(e);
      inside = true;
    };

    const onPointerLeave = () => {
      inside = false;
      mx = my = -999;
    };

    const onPointerDown = (e: PointerEvent) => {
      pos(e);
      const M: ("magnet" | "twist" | "web" | "wipe")[] = ["magnet", "twist", "web", "wipe"];
      mode = M[(M.indexOf(mode) + 1) % 4];
      if (mode === "web") {
        shots.push({ x: mx, y: my, t: performance.now() });
      } else if (mode === "wipe") {
        busy = 0;
        wipe(DIRS[dirI++ % 8]);
      } else {
        cells.forEach((c) => {
          const d = Math.hypot(c.x - mx, c.y - my);
          if (d < 260) {
            const f = 1 - d / 260;
            c.s = 1 + f * 1.6;
            c.r = (Math.random() - 0.5) * 5 * f;
            c.ox = (c.x - mx) * 0.5 * f;
            c.oy = (c.y - my) * 0.5 * f;
          }
        });
      }
    };

    ban.addEventListener("pointerenter", onPointerEnter);
    ban.addEventListener("pointermove", onPointerMove);
    ban.addEventListener("pointerleave", onPointerLeave);
    ban.addEventListener("pointerdown", onPointerDown);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion) {
      intervalId = setInterval(() => {
        wipe(DIRS[dirI++ % 8]);
      }, 3200);
    }

    const onResize = () => {
      build();
    };
    window.addEventListener("resize", onResize);

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(ban);

    build();
    animId = requestAnimationFrame(frame);

    return () => {
      isMounted = false;
      if (animId !== null) cancelAnimationFrame(animId);
      if (intervalId) clearInterval(intervalId);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      ban.removeEventListener("pointerenter", onPointerEnter);
      ban.removeEventListener("pointermove", onPointerMove);
      ban.removeEventListener("pointerleave", onPointerLeave);
      ban.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[clamp(220px,30vw,360px)] bg-[#0a6cff] overflow-hidden cursor-crosshair touch-pan-y"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default BannerCanvas;
