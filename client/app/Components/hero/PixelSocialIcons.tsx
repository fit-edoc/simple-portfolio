"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// Pixel Art GitHub SVG (Branded #181717 tile with crisp WHITE pixel Octocat)
export const PixelatedGithub = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 20 20"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    style={{ imageRendering: "pixelated" }}
  >
    {/* Dark rounded square tile */}
    <rect x="1" y="1" width="18" height="18" rx="4" fill="#181717" />
    {/* Crisp WHITE Pixel Octocat */}
    <rect x="5" y="4" width="2" height="2" fill="#ffffff" />
    <rect x="13" y="4" width="2" height="2" fill="#ffffff" />
    <rect x="7" y="5" width="6" height="2" fill="#ffffff" />
    <rect x="4" y="6" width="12" height="6" fill="#ffffff" />
    <rect x="5" y="12" width="10" height="2" fill="#ffffff" />
    <rect x="6" y="14" width="3" height="2" fill="#ffffff" />
    <rect x="11" y="14" width="3" height="2" fill="#ffffff" />
    {/* Eyes & Mouth cutout */}
    <rect x="6" y="8" width="2" height="2" fill="#181717" />
    <rect x="12" y="8" width="2" height="2" fill="#181717" />
    <rect x="8" y="10" width="4" height="1.5" fill="#181717" />
  </svg>
);

// Pixel Art X Logo (Branded #000000 tile with crisp WHITE pixel cross)
export const PixelatedX = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 20 20"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    style={{ imageRendering: "pixelated" }}
  >
    {/* Black rounded square tile */}
    <rect x="1" y="1" width="18" height="18" rx="4" fill="#000000" />
    {/* Thick diagonal: top-left to bottom-right */}
    <rect x="5" y="5" width="3" height="2" fill="#ffffff" />
    <rect x="6" y="7" width="3" height="2" fill="#ffffff" />
    <rect x="8" y="9" width="4" height="2" fill="#ffffff" />
    <rect x="11" y="11" width="3" height="2" fill="#ffffff" />
    <rect x="12" y="13" width="3" height="2" fill="#ffffff" />
    {/* Thin diagonal: top-right to bottom-left */}
    <rect x="13" y="5" width="2" height="2" fill="#ffffff" />
    <rect x="11" y="7" width="2" height="2" fill="#ffffff" />
    <rect x="7" y="11" width="2" height="2" fill="#ffffff" />
    <rect x="5" y="13" width="2" height="2" fill="#ffffff" />
  </svg>
);

// Pixel Art LinkedIn Logo (Branded #0A66C2 tile with crisp WHITE pixel 'in')
export const PixelatedLinkedin = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    viewBox="0 0 20 20"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    style={{ imageRendering: "pixelated" }}
  >
    {/* LinkedIn Signature Blue tile */}
    <rect x="1" y="1" width="18" height="18" rx="4" fill="#0A66C2" />
    {/* Letter 'i' */}
    <rect x="5" y="5" width="2.5" height="2.5" fill="#ffffff" />
    <rect x="5" y="9" width="2.5" height="6" fill="#ffffff" />
    {/* Letter 'n' */}
    <rect x="9" y="9" width="2.5" height="6" fill="#ffffff" />
    <rect x="11.5" y="9" width="3" height="2.5" fill="#ffffff" />
    <rect x="13" y="10.5" width="2" height="4.5" fill="#ffffff" />
  </svg>
);

interface SocialItem {
  id: string;
  name: string;
  href: string;
  icon: React.ReactNode;
}

const socialLinks: SocialItem[] = [
  {
    id: "github",
    name: "GitHub",
    href: "https://github.com/fit-edoc",
    icon: <PixelatedGithub className="w-5 h-5 sm:w-6 sm:h-6" />,
  },
  {
    id: "x",
    name: "X / Twitter",
    href: "https://x.com/fitedocc",
    icon: <PixelatedX className="w-5 h-5 sm:w-6 sm:h-6" />,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: <PixelatedLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />,
  },
];

export const PixelSocialIcons: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className={`flex items-center gap-3 sm:gap-4 ${className}`}>
      {socialLinks.map((item) => (
        <div key={item.id} className="relative flex items-center justify-center">
          <AnimatePresence>
            {hoveredId === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.9 }}
                animate={{ opacity: 1, y: -6, scale: 1 }}
                exit={{ opacity: 0, y: 4, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full mb-2 px-2.5 py-1 bg-neutral-900 text-white text-[11px] font-mono tracking-wider whitespace-nowrap shadow-xl rounded-md pointer-events-none z-30"
              >
                {item.name}
              </motion.div>
            )}
          </AnimatePresence>

          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            aria-label={item.name}
            className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-neutral-200/90 shadow-sm hover:shadow-md hover:border-neutral-300 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            {item.icon}
          </a>
        </div>
      ))}
    </div>
  );
};
