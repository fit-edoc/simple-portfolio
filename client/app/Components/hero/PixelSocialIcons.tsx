"use client";

import React, { useEffect, useRef } from "react";

interface SocialItem {
  name: string;
  d: string;
  href: string;
}

const ITEMS: SocialItem[] = [
  {
    name: "x",
    d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    href: "https://x.com/fitedocc",
  },
  {
    name: "Github",
    d: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
    href: "https://github.com/fit-edoc",
  },
  {
    name: "LinkedIn",
    d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    href: "https://linkedin.com/in/himanshu-verma-docs",
  },
  {
    name: "Gmail",
    d: "M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z",
    href: "mailto:himanshuverma2660@gmail.com",
  },
];

const PixelIconItem: React.FC<{ item: SocialItem }> = ({ item }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const g = cv.getContext("2d");
    if (!g) return;

    const im = new Image();
    im.onload = () => {
      g.imageSmoothingEnabled = false;
      g.clearRect(0, 0, 20, 20);
      g.drawImage(im, 0, 0, 20, 20);
      try {
        const id = g.getImageData(0, 0, 20, 20);
        const p = id.data;
        for (let i = 3; i < p.length; i += 4) {
          p[i] = p[i] > 110 ? 255 : 0;
        }
        g.putImageData(id, 0, 0);
      } catch {
        // Fallback if cross-origin or security restriction
      }
    };
    im.src =
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#fff" d="${item.d}"/></svg>`
      );
  }, [item.d]);

  return (
    <a
      href={item.href}
      target={item.href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="group flex flex-col items-center gap-1.5 text-[11px] no-underline transition-colors"
      style={{ color: "var(--fg)" }}
    >
      <span className="opacity-90">{item.name}</span>
      <canvas
        ref={canvasRef}
        width={20}
        height={20}
        className="w-[34px] h-[34px] [image-rendering:pixelated] rounded-full p-[7px] transition-all duration-150 group-hover:-translate-y-[3px]"
        style={{
          backgroundColor: "var(--link, #97c1ff)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--sky, #97c1ff)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "var(--link, #97c1ff)";
        }}
      />
    </a>
  );
};

export const PixelSocialIcons: React.FC = () => {
  return (
    <div className="flex gap-3.5 items-end">
      {ITEMS.map((item) => (
        <PixelIconItem key={item.name} item={item} />
      ))}
    </div>
  );
};

export default PixelSocialIcons;
