"use client";

import React, { useEffect, useRef } from "react";

export const OilScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;

    const rawCtx = cv.getContext("2d");
    if (!rawCtx) return;
    const ctx: CanvasRenderingContext2D = rawCtx;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduce = mediaQuery.matches;

    const CYC = 8;
    const TOPS = [0.6, 0.69, 0.78, 0.88];
    const M = 24;
    const CMD = 'git commit -m "chilling"';

    let W = 0;
    let H = 0;
    let dpr = 1;
    let u = 1;
    let bg: HTMLCanvasElement | null = null;
    let bands: HTMLCanvasElement[] = [];
    let ov: HTMLCanvasElement[] = [];
    let boil = 0;
    let last = 0;
    let animId: number | null = null;
    let isVisible = true;
    let isMounted = true;
    let rz: ReturnType<typeof setTimeout> | undefined;

    const mk = (w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] => {
      const c = document.createElement("canvas");
      c.width = Math.ceil(w * dpr);
      c.height = Math.ceil(h * dpr);
      const x = c.getContext("2d")!;
      x.scale(dpr, dpr);
      return [c, x];
    };

    const rng = (s: number) => () => (s = (s * 16807) % 2147483647) / 2147483647;
    const lerp = (a: number, b: number, v: number) => a + (b - a) * v;
    const ease = (v: number) => v * v * (3 - 2 * v);
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

    const topY = (k: number, x: number) =>
      TOPS[k] * H -
      (10 + 6 * k) * u * (0.5 + 0.5 * Math.sin(x * 0.012 * (1 + k * 0.3) + k * 2)) +
      Math.sin(x * 0.031 + k) * 4 * u;

    const ridge = (seed: number, base: number, amp: number, n: number): [number, number][] => {
      const r = rng(seed);
      const p: [number, number][] = [];
      for (let i = 0; i <= n; i++) {
        p.push([
          -0.05 * W + (W * 1.1 * i) / n,
          H * (base - r() * amp * (i % 2 ? 0.35 : 1)),
        ]);
      }
      return p;
    };

    const drawRoundRect = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      r: number
    ) => {
      if (typeof (c as unknown as { roundRect?: Function }).roundRect === "function") {
        (c as unknown as { roundRect: Function }).roundRect(x, y, w, h, r);
      } else {
        c.moveTo(x + r, y);
        c.arcTo(x + w, y, x + w, y + h, r);
        c.arcTo(x + w, y + h, x, y + h, r);
        c.arcTo(x, y + h, x, y, r);
        c.arcTo(x, y, x + w, y, r);
      }
    };

    function daub(
      c: CanvasRenderingContext2D,
      r: () => number,
      n: number,
      y0: number,
      y1: number,
      pal: string[],
      lw: number,
      len: number,
      al: number
    ) {
      c.lineCap = "round";
      for (let i = 0; i < n; i++) {
        const x = r() * W;
        const y = y0 + r() * (y1 - y0);
        const L = len * (0.6 + r());
        const k = Math.floor(clamp((y - y0) / (y1 - y0) + (r() - 0.5) * 0.5, 0, 0.999) * pal.length);
        c.strokeStyle = pal[k];
        c.globalAlpha = al * (0.6 + r() * 0.4);
        c.lineWidth = lw * (0.6 + r() * 0.8);
        c.beginPath();
        c.moveTo(x, y);
        c.quadraticCurveTo(x + L * 0.5, y + (r() - 0.5) * 4 * u, x + L, y + (r() - 0.5) * 6 * u);
        c.stroke();
      }
      c.globalAlpha = 1;
    }

    function paint(
      c: CanvasRenderingContext2D,
      poly: [number, number][],
      stops: string[],
      hatch: string[],
      seed: number,
      den: number
    ) {
      const yMin = Math.min(...poly.map((p) => p[1]));
      const g = c.createLinearGradient(0, yMin, 0, H);
      stops.forEach((s, i) => g.addColorStop(i / (stops.length - 1), s));
      c.beginPath();
      poly.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])));
      c.lineTo(W + 30, H + 5);
      c.lineTo(-30, H + 5);
      c.closePath();
      c.fillStyle = g;
      c.fill();
      c.save();
      c.clip();
      c.lineCap = "round";
      const r = rng(seed);
      const n = Math.min(7000, Math.floor((W * (H - yMin) * den) / (u * u)));
      for (let i = 0; i < n; i++) {
        const x = r() * W;
        const y = yMin + r() * (H - yMin);
        const dx = (10 + r() * 16) * u;
        c.strokeStyle = hatch[(r() * hatch.length) | 0];
        c.globalAlpha = 0.3 + r() * 0.35;
        c.lineWidth = (2 + r() * 2.5) * u;
        c.beginPath();
        c.moveTo(x, y);
        c.quadraticCurveTo(x + dx * 0.5, y - r() * 4 * u, x + dx, y - (r() * 7 - 2) * u);
        c.stroke();
      }
      c.restore();
    }

    function build() {
      if (!cv) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = cv.clientWidth || cv.parentElement?.clientWidth || window.innerWidth;
      H = cv.clientHeight || cv.parentElement?.clientHeight || 450;
      if (W <= 0 || H <= 0) return;

      cv.width = W * dpr;
      cv.height = H * dpr;
      u = Math.min(H / 380, W / 620);

      let c: CanvasRenderingContext2D;
      [bg, c] = mk(W, H);
      const r = rng(4);

      let g = c.createLinearGradient(0, 0, 0, H * 0.62);
      g.addColorStop(0, "#cfe0f5");
      g.addColorStop(0.55, "#ffe3c2");
      g.addColorStop(1, "#ffc79b");
      c.fillStyle = g;
      c.fillRect(0, 0, W, H);

      daub(
        c,
        r,
        Math.min(5000, Math.floor((W * H * 0.0045) / (u * u))),
        0,
        H * 0.62,
        ["#cfe0f5", "#e3dff2", "#ffe9c9", "#ffd7a8", "#ffc79b"],
        9 * u,
        30 * u,
        0.55
      );

      const radG = c.createRadialGradient(W * 0.8, H * 0.22, 0, W * 0.8, H * 0.22, H * 0.6);
      radG.addColorStop(0, "rgba(255,250,215,.95)");
      radG.addColorStop(1, "rgba(255,240,200,0)");
      c.fillStyle = radG;
      c.fillRect(0, 0, W, H);

      c.fillStyle = "#fff7d0";
      c.beginPath();
      c.arc(W * 0.8, H * 0.22, 22 * u, 0, 7);
      c.fill();

      const far = ridge(3, 0.55, 0.42, 7);
      paint(
        c,
        far,
        ["#d3c8f1", "#a99ad3", "#8f86c6"],
        ["#ffffff", "#7f72b8", "#d9ccf4", "#b7a5e0"],
        11,
        0.006
      );

      const rs = rng(31);
      c.lineCap = "round";
      far.forEach((p, i) => {
        if (i % 2) return;
        for (let j = 0; j < 55; j++) {
          const dy = rs() * 26 * u;
          const dx = (rs() - 0.5) * dy * 1.4;
          c.strokeStyle = ["#fff", "#f4eeff", "#e6defa"][j % 3];
          c.globalAlpha = 0.85;
          c.lineWidth = 3 * u;
          c.beginPath();
          c.moveTo(p[0] + dx, p[1] + dy);
          c.lineTo(p[0] + dx + 6 * u, p[1] + dy - 1.5 * u);
          c.stroke();
        }
        c.globalAlpha = 1;
      });

      paint(
        c,
        ridge(8, 0.6, 0.2, 9),
        ["#8fb6d8", "#6a9ccb", "#5b8fbf"],
        ["#dff3ff", "#4f7fb3", "#9cc6e6", "#6aa9c8"],
        12,
        0.006
      );

      paint(
        c,
        ridge(12, 0.64, 0.07, 11),
        ["#cfd85a", "#9fc255", "#7fb056"],
        ["#fff3a0", "#6aa04c", "#d9e58a", "#4f9a55"],
        13,
        0.006
      );

      const pals = [
        ["#f2e06a", "#d9d055", "#b9c85a", "#f7ee9a", "#9fbf56"],
        ["#e8cf55", "#bcc450", "#8fb84f", "#f2e07a", "#d9a94a"],
        ["#c4c050", "#8fb04c", "#6aa04c", "#e0c24a", "#4f9a55"],
        ["#7fb04e", "#4f9a55", "#3a8a5a", "#a6c44f", "#2f7a55"],
      ];
      const bases = ["#c8cf58", "#a4bb50", "#6fa24c", "#46905a"];
      const flow = ["#ff7aa8", "#ffffff", "#ffb347", "#9b8cff"];

      bands = TOPS.map((_, k) => {
        const [b, x] = mk(W + 2 * M, H);
        const rr = rng(100 + k);
        const vis = ((TOPS[k + 1] || 1) - TOPS[k]) * H + 26 * u;
        x.fillStyle = bases[k];
        x.beginPath();
        x.moveTo(0, H);
        for (let px = -M; px <= W + M; px += 6) {
          x.lineTo(px + M, topY(k, px) + 4 * u);
        }
        x.lineTo(W + 2 * M, H);
        x.closePath();
        x.fill();

        const n = Math.min(11000, Math.floor(((W + 2 * M) * vis * 2.4) / (58 * u * u)));
        const st: [number, number, number, number, number][] = [];
        for (let i = 0; i < n; i++) {
          const px = -M + rr() * (W + 2 * M);
          const t = topY(k, px);
          st.push([px, t + rr() * vis, rr(), rr(), t]);
        }
        st.sort((a, b) => a[1] - b[1]);
        x.lineCap = "round";

        st.forEach(([px, by, a, b2, t]) => {
          const L = (12 + a * 20) * u;
          let ty = by - L;
          if (ty < t - 3 * u) ty = t - b2 * 3 * u;
          const lean = L * 0.35 + (b2 - 0.5) * 7 * u;
          const pal = pals[k];
          x.lineWidth = (2 + a * 2.2) * u;
          x.strokeStyle =
            b2 > 0.94 && by - t > 6 * u ? flow[(a * 4) | 0] : pal[(b2 * pal.length * 0.999) | 0];
          if (b2 > 0.94 && by - t > 6 * u) {
            x.lineWidth = 2.6 * u;
            x.beginPath();
            x.moveTo(px + M, by - 4 * u);
            x.lineTo(px + M + 1.5 * u, by - 5 * u);
            x.stroke();
            return;
          }
          x.beginPath();
          x.moveTo(px + M, by);
          x.quadraticCurveTo(px + M + lean * 0.2, by - L * 0.6, px + M + lean, ty);
          x.stroke();
        });
        return b;
      });

      // Brush-texture overlays; cycling them gives the hand-painted "boil"
      ov = [0, 1, 2].map((i) => {
        const [o, x] = mk(W, H);
        const q = rng(500 + i);
        x.lineCap = "round";
        for (let n = Math.min(5000, Math.floor((W * H) / (140 * u * u))); n--; ) {
          const px = q() * W;
          const py = q() * H;
          const L = (8 + q() * 16) * u;
          x.strokeStyle =
            q() < 0.5
              ? `rgba(255,248,225,${0.05 + q() * 0.1})`
              : `rgba(60,40,70,${0.04 + q() * 0.07})`;
          x.lineWidth = (2 + q() * 4) * u;
          x.beginPath();
          x.moveTo(px, py);
          x.quadraticCurveTo(
            px + L * 0.5,
            py + (q() - 0.5) * 6 * u,
            px + L,
            py + (q() - 0.5) * 8 * u
          );
          x.stroke();
        }
        return o;
      });
    }

    const lim = (a: number, b: number, c2: number, d: number, w: number, col: string) => {
      ctx.strokeStyle = col;
      ctx.lineWidth = w;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(a, b);
      ctx.lineTo(c2, d);
      ctx.stroke();
    };

    const circ = (x: number, y: number, r: number, f: string) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 7);
      ctx.fillStyle = f;
      ctx.fill();
    };

    const rr_ = (x: number, y: number, w: number, h: number, r: number, f: string) => {
      ctx.fillStyle = f;
      ctx.beginPath();
      drawRoundRect(ctx, x, y, w, h, r);
      ctx.fill();
    };

    function dab(
      pathFn: () => void,
      bb: [number, number, number, number],
      base: string,
      tones: string[],
      n: number,
      seed: number
    ) {
      ctx.beginPath();
      pathFn();
      ctx.fillStyle = base;
      ctx.fill();
      ctx.save();
      ctx.clip();
      const r = rng(seed + boil * 7);
      ctx.lineCap = "round";
      for (let i = 0; i < n; i++) {
        const x = bb[0] + r() * bb[2];
        const y = bb[1] + r() * bb[3];
        ctx.strokeStyle = tones[(r() * tones.length) | 0];
        ctx.globalAlpha = 0.5 + r() * 0.4;
        ctx.lineWidth = 1.4 + r() * 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 2 + r() * 5, y + (r() - 0.5) * 3);
        ctx.stroke();
      }
      ctx.restore();
    }

    const SW = "#e8683c";
    const SK = "#f2c29b";
    const DOG = "#15151d";

    function man(a: number): [number, number] {
      lim(-2.5, -24, -5, -2, 5.6, "#2b3a67");
      lim(2.5, -24, 5, -2, 5.6, "#2b3a67");
      ctx.fillStyle = "#f4efe8";
      ctx.beginPath();
      ctx.ellipse(-5.5, -1.5, 4.6, 2.4, 0, 0, 7);
      ctx.ellipse(6.5, -1.5, 4.6, 2.4, 0, 0, 7);
      ctx.fill();
      lim(-3, -39, -6, -27, 5, SW);
      circ(-6.5, -25.5, 2.5, SK);

      dab(
        () => drawRoundRect(ctx, -8, -43, 16, 22, 6),
        [-8, -43, 16, 22],
        SW,
        ["#ff8f5c", "#c84f2c", "#f59a6a"],
        26,
        1
      );
      dab(() => ctx.arc(1, -52, 7.6, 0, 7), [-7, -60, 16, 16], SK, ["#ffd9b8", "#e0a77e"], 10, 2);
      dab(
        () => ctx.arc(1, -52.6, 8, Math.PI, 2 * Math.PI),
        [-7, -61, 16, 8],
        "#2b1f1a",
        ["#4a362c", "#1a1210"],
        10,
        3
      );
      circ(4.6, -52, 1, "#222");
      circ(5.8, -49.5, 1.3, "#ffa8a0");
      lim(3.6, -48.4, 6, -48.6, 0.9, "#a04a3a");
      const hx = 3 + 21 * Math.sin(a);
      const hy = -40 + 21 * Math.cos(a);
      lim(3, -40, hx, hy, 5, SW);
      circ(hx, hy, 2.7, SK);
      return [hx, hy];
    }

    function dog(gait: number, run: boolean, tail: number, tongue: boolean) {
      const leg = (x: number, ph: number) => {
        const a = run ? Math.sin(gait + ph) * 0.9 : 0;
        lim(x, -13, x + Math.sin(a) * 11, -13 + Math.cos(a) * 13, 3.7, DOG);
      };
      leg(-10, Math.PI);
      leg(-6, Math.PI + 0.6);
      ctx.strokeStyle = DOG;
      ctx.lineWidth = 3.4;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-14, -21);
      ctx.quadraticCurveTo(-23, -22, -24, -31 + Math.sin(tail) * 4);
      ctx.stroke();

      const T = ["#3a3a56", "#262638", "#505078"];
      dab(() => ctx.ellipse(0, -18, 16, 8.5, 0, 0, 7), [-16, -27, 32, 18], DOG, T, 18, 5);
      leg(9, 0);
      leg(13, 0.6);
      lim(13, -24, 17, -20, 2.8, "#ff4d6d");
      dab(() => ctx.arc(19, -26, 7.4, 0, 7), [12, -34, 15, 15], DOG, T, 10, 6);
      dab(() => ctx.ellipse(25.5, -24, 5.6, 3.6, 0, 0, 7), [20, -28, 12, 8], DOG, T, 5, 7);
      circ(30, -25, 1.7, "#05050a");
      dab(() => ctx.ellipse(15, -27, 3, 6.2, 0.5, 0, 7), [11, -34, 8, 13], "#0e0e14", T, 5, 8);
      circ(21.4, -28, 1.3, "#fff");
      circ(21.7, -28, 0.6, "#000");
      if (tongue) {
        ctx.fillStyle = "#ff7a98";
        ctx.beginPath();
        ctx.ellipse(27, -20, 1.8, 3, 0.2, 0, 7);
        ctx.fill();
      }
    }

    function laptop(t: number) {
      ctx.fillStyle = "#2fb5a8";
      ctx.beginPath();
      ctx.ellipse(0, -1, 32, 5.5, 0, 0, 7);
      ctx.fill();
      ctx.strokeStyle = "#8fe3d8";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.ellipse(0, -1, 26, 3.6, 0, 0, 7);
      ctx.stroke();
      ctx.globalAlpha = 0.25 + 0.1 * Math.sin(t * 2);
      circ(0, -17, 26, "#bfe9ff");
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#cfd4dc";
      ctx.beginPath();
      ctx.moveTo(-16, -8);
      ctx.lineTo(16, -8);
      ctx.lineTo(19, -4.5);
      ctx.lineTo(-19, -4.5);
      ctx.closePath();
      ctx.fill();
      rr_(-14, -27, 28, 19, 2.5, "#2a2f3a");
      rr_(-12.5, -25.5, 25, 16, 1.5, "#cdeeff");
      [
        ["#ff7aa8", -10, 6],
        ["#6a5cff", -10 + 2, 9],
        ["#2fb5a8", -6, 11],
        ["#ffb347", -8, 7],
      ].forEach((l) =>
        rr_(
          (l[1] as number) - 0.5,
          -23.5 + (l as [string, number, number])[2] * 0 + (l[1] === -10 ? 0 : 3.4),
          l[2] as number,
          1.6,
          0.8,
          l[0] as string
        )
      );
      rr_(20, -9, 6.5, 8, 2, "#ffd23f");
      lim(26.5, -7.5, 29, -6, 1.2, "#ffd23f");
      for (let i = 0; i < 2; i++) {
        const f = (t * 0.6 + i / 2) % 1;
        ctx.globalAlpha = 1 - f;
        lim(
          23 + Math.sin(f * 7 + i) * 1.4,
          -11 - f * 9,
          23 + Math.sin(f * 7 + i) * 1.4,
          -13 - f * 9,
          1,
          "#fff"
        );
      }
      ctx.globalAlpha = 1;
    }

    function bubble(t: number, lx: number, ly: number, ls: number) {
      const T = t % 9;
      const ob = (x: number) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
      };
      const sc = T < 0.35 ? ob(T / 0.35) : T < 6.8 ? 1 : T < 7.2 ? 1 - ease((T - 6.8) / 0.4) : 0;
      if (sc <= 0.01) return;

      const fs = Math.max(11, 12 * u);
      const n = clamp(Math.floor((T - 0.9) * 14), 0, CMD.length);
      ctx.save();
      ctx.font = `500 ${fs}px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace`;
      const bw = ctx.measureText("$ " + CMD).width + fs * 2.4;
      const bh = fs * 4.7;
      const cx = clamp(lx, bw / 2 + 8, W - bw / 2 - 8);
      const ox = cx - lx;

      ctx.translate(lx, ly - 27 * ls - 10 * u);
      ctx.scale(sc, sc);
      ctx.shadowColor = "rgba(40,30,70,.4)";
      ctx.shadowBlur = 16;
      ctx.shadowOffsetY = 6;
      ctx.fillStyle = "#1d2133";
      ctx.beginPath();
      drawRoundRect(ctx, ox - bw / 2, -bh - fs * 0.9, bw, bh, fs * 0.9);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-fs * 0.6, -fs * 0.95);
      ctx.lineTo(fs * 0.6, -fs * 0.95);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();
      ctx.shadowColor = "transparent";

      const x0 = ox - bw / 2;
      const y0 = -bh - fs * 0.9;
      ["#ff5f57", "#febc2e", "#28c840"].forEach((c2, i) =>
        circ(x0 + fs * 1.2 + i * fs * 0.85, y0 + fs * 0.95, fs * 0.27, c2)
      );

      ctx.textBaseline = "alphabetic";
      let x = x0 + fs * 1.2;
      let y = y0 + fs * 2.9;
      ctx.fillStyle = "#7ee787";
      ctx.fillText("$ ", x, y);
      x += ctx.measureText("$ ").width;

      const s1 = CMD.slice(0, Math.min(n, 14));
      const s2 = CMD.slice(14, n);
      ctx.fillStyle = "#e6edf7";
      ctx.fillText(s1, x, y);
      x += ctx.measureText(s1).width;

      ctx.fillStyle = "#ffd479";
      ctx.fillText(s2, x, y);
      x += ctx.measureText(s2).width;

      if (n < CMD.length || Math.floor(T * 2) % 2) {
        rr_(x + 1, y - fs * 0.85, fs * 0.55, fs, 1, "#e6edf7");
      }
      if (T > 3.2) {
        ctx.fillStyle = "#7ee787";
        ctx.fillText("✓ ", x0 + fs * 1.2, y + fs * 1.35);
        ctx.fillStyle = "#8f9bb3";
        ctx.fillText("[main 4f2a9c1] chilling", x0 + fs * 1.2 + ctx.measureText("✓ ").width, y + fs * 1.35);
      }
      ctx.restore();
    }

    function fetchScene(
      t: number,
      q: number,
      mx: number,
      Y0: number,
      ms: number,
      ds: number
    ) {
      let a: number;
      if (q < 0.12) a = lerp(-2.4, 2.2, ease(q / 0.12));
      else if (q < 0.2) a = lerp(2.2, 0.6, (q - 0.12) / 0.08);
      else if (q < 0.76) a = 0.6;
      else if (q < 0.82) a = lerp(0.6, 0.15, (q - 0.76) / 0.06);
      else if (q < 0.9) a = lerp(0.15, 0.6, (q - 0.82) / 0.08);
      else a = lerp(0.6, -2.4, (q - 0.9) / 0.1);

      ctx.save();
      ctx.translate(mx, Y0);
      ctx.scale(ms, ms);
      const hd = man(a);
      ctx.restore();

      const hw: [number, number] = [mx + hd[0] * ms, Y0 + hd[1] * ms];
      const xt = mx + Math.min(250 * u, W * 0.22) + 10 * u;
      const xh = mx + 38 * u;
      const drop = xh - 16 * u;
      let dx = xh;
      let dir = 1;
      let run = false;
      let hop = 0;
      let tongue = false;

      if (q < 0.14) {
      } else if (q < 0.34) {
        dx = lerp(xh, xt, ease((q - 0.14) / 0.2));
        run = true;
        tongue = true;
      } else if (q < 0.38) {
        dx = xt;
      } else if (q < 0.62) {
        dx = lerp(xt, xh, ease((q - 0.38) / 0.24));
        dir = -1;
        run = true;
        tongue = true;
      } else if (q < 0.82) {
        dir = -1;
        hop = Math.abs(Math.sin(t * 8)) * 7 * u;
        tongue = true;
      } else {
        dir = q > 0.9 ? 1 : -1;
      }

      const dy = Y0 + 3 * u - hop;
      ctx.save();
      ctx.translate(dx, dy);
      ctx.scale(dir * ds, ds);
      dog(t * 14, run, t * (run ? 16 : 9), tongue);
      ctx.restore();

      const mouthP: [number, number] = [dx + dir * 31 * ds, dy - 22 * ds];
      const sx = mx + 20 * ms;
      const sy = Y0 - 52 * ms;
      const gy = Y0 - 1 * u;
      let b: [number, number];

      if (q < 0.12) b = hw;
      else if (q < 0.3) {
        const s = (q - 0.12) / 0.18;
        b = [lerp(sx, xt, s), lerp(sy, gy, s) - 60 * u * Math.sin(Math.PI * s)];
      } else if (q < 0.38) b = [xt, gy];
      else if (q < 0.62) b = mouthP;
      else if (q < 0.66) {
        const s = ease((q - 0.62) / 0.04);
        b = [lerp(mouthP[0], drop, s), lerp(mouthP[1], gy, s)];
      } else if (q < 0.82) b = [drop, gy];
      else if (q < 0.9) {
        const s = ease((q - 0.82) / 0.08);
        b = [lerp(drop, hw[0], s), lerp(gy, hw[1], s)];
      } else b = hw;

      circ(b[0], b[1], 3.6 * u, "#ff4d6d");
      circ(b[0] - 1.1 * u, b[1] - 1.2 * u, 1.1 * u, "#ffd1dc");
    }

    function frame(t: number) {
      if (!bg || ov.length === 0 || bands.length === 0) return;
      boil = Math.floor(t * 5) % 3;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(bg, 0, 0, W, H);

      // Painted clouds + birds
      ctx.lineCap = "round";
      for (let i = 0; i < 3; i++) {
        const cx = ((t * 6 + i * W * 0.42) % (W * 1.3)) - W * 0.15;
        const cy = H * (0.07 + 0.07 * i);
        const q = rng(900 + i);
        for (let j = 0; j < 30; j++) {
          const dx = (q() - 0.5) * 90 * u;
          const dy = (q() - 0.5) * 20 * u - Math.abs(dx) * 0.12;
          ctx.strokeStyle = j % 3 ? "#fffaf0" : "#ffe9d2";
          ctx.globalAlpha = 0.6;
          ctx.lineWidth = (5 + q() * 5) * u;
          ctx.beginPath();
          ctx.moveTo(cx + dx, cy + dy);
          ctx.lineTo(cx + dx + 14 * u, cy + dy + (q() - 0.5) * 3 * u);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      ctx.strokeStyle = "#6a4f7a";
      ctx.lineWidth = 1.4 * u;
      for (let i = 0; i < 3; i++) {
        const x = ((t * 14 + i * 260) % (W + 80)) - 40;
        const y = H * (0.2 + 0.05 * i) + Math.sin(t * 1.5 + i) * 3;
        const f = Math.sin(t * 8 + i * 2) * 3 * u;
        ctx.beginPath();
        ctx.moveTo(x - 6 * u, y - f);
        ctx.quadraticCurveTo(x - 2 * u, y - 2 * u, x, y);
        ctx.quadraticCurveTo(x + 2 * u, y - 2 * u, x + 6 * u, y - f);
        ctx.stroke();
      }

      const lx = W * 0.15;
      const ls = 2 * u;
      const ly = topY(2, lx) + 4 * u;
      const q = (t % CYC) / CYC;
      const mx = W * 0.58;
      const Y0 = TOPS[3] * H - 14 * u;
      const ms = 1.55 * u;
      const ds = 1.5 * u;

      bands.forEach((b, k) => {
        const y0 = Math.max(0, Math.floor(TOPS[k] * H - 30 * u));
        for (let y = y0; y < H; y += 4) {
          const h = Math.min(4, H - y);
          const sx = Math.sin(t * 1.3 + y * 0.045 + k) * (1.2 + k * 0.5) * u;
          ctx.drawImage(b, 0, y * dpr, b.width, h * dpr, -M + sx, y, W + 2 * M, h);
        }
        if (k === 1) {
          ctx.save();
          ctx.translate(lx, ly);
          ctx.scale(ls, ls);
          laptop(t);
          ctx.restore();
        }
        if (k === 2) fetchScene(t, q, mx, Y0, ms, ds);
      });

      bubble(t, lx, ly, ls);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (ov[boil]) {
        ctx.drawImage(ov[boil], 0, 0, W, H);
      }
    }

    function loop(ms: number) {
      if (!isMounted) return;
      if (isVisible && !reduce) {
        if (ms - last > 33) {
          last = ms;
          frame(ms / 1000);
        }
      }
      animId = requestAnimationFrame(loop);
    }

    function start() {
      build();
      frame(reduce ? 2.6 : 1);
    }

    start();

    const handleResize = () => {
      clearTimeout(rz);
      rz = setTimeout(start, 150);
    };
    window.addEventListener("resize", handleResize);

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(cv);

    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    if (!reduce) {
      animId = requestAnimationFrame(loop);
    }

    return () => {
      isMounted = false;
      if (animId !== null) cancelAnimationFrame(animId);
      clearTimeout(rz);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      id="art"
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block"
      role="img"
      aria-label="A man playing fetch with his black dog in a mountain field while a laptop on a blanket shows git commit -m chilling"
    />
  );
};

export default OilScene;
