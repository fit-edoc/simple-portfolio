"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import Dither from "../ui/Dither";
import { PixelSocialIcons } from "./PixelSocialIcons";

// Curated high-aesthetic retro & cyber palette for dynamic Bayer dithering
const DITHER_PALETTE = [
  "#00ff66", // Cyber Phosphor Green
  "#00b3ff", // Electric Cyan
  "#ff007f", // Hot Neon Magenta
  "#ff9500", // Retro Amber
  "#a855f7", // Electric Purple
  "#00f0ff", // Neon Aquamarine
  "#ff2e93", // Vibrant Hot Pink
  "#10b981", // Emerald
  "#eab308", // Vivid Gold
  "#06b6d4", // Bright Teal
];

const Hero = () => {
  const [time, setTime] = useState<string>("");
  const [ditherColor, setDitherColor] = useState<string>(DITHER_PALETTE[0]);

  // Pick a distinct color on mount/render and cycle through the palette
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * DITHER_PALETTE.length);
    setDitherColor(DITHER_PALETTE[randomIndex]);

    let currentIndex = randomIndex;
    const colorInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % DITHER_PALETTE.length;
      setDitherColor(DITHER_PALETTE[currentIndex]);
    }, 5000);

    return () => clearInterval(colorInterval);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full h-screen min-h-[640px] relative overflow-hidden bg-white text-black font-geist flex flex-col justify-end select-none">
      {/* 4x4 Bayer Ordered Dithering Hero Top with Spring-Physics Hover */}
      <div className="absolute top-0 left-0 w-full h-[52vh] sm:h-[56vh] max-h-[500px] overflow-hidden select-none z-10 pointer-events-auto">
        <Dither
          pixelSize={3}
          colorFront={ditherColor}
          colorBack="#0a0a0a"
          speed={1}
          intensity={1}
          stiffness={0.08}
          damping={0.85}
          repelRadius={120}
          repelStrength={0.35}
          className="w-full h-full"
        />
        {/* Subtle gradient blend to hero background */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-white  backdrop-blur-3xl to-transparent pointer-events-none" />
      </div>

      {/* Main Layout Container - All Text & Controls Anchored in the Bottom */}
      <div className="max-w-6xl mx-auto px-6 border-x-[0.5px] border-black/10 w-full relative z-20 flex flex-col justify-end pb-8 sm:pb-12 pointer-events-none">
        
        {/* Bottom Content Row: Left-Aligned Text + Bottom-Right Social Icons */}
        <div className="w-full flex flex-col md:flex-row md:items-end md:justify-between gap-6 pointer-events-auto">
          
          {/* Left: Hello + Name + Bio */}
          <div className="flex flex-col items-start text-left max-w-xl lg:max-w-2xl lg:mt-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-start text-left w-full"
            >
              {/* Hello */}
              <span className="text-lg sm:text-xl md:text-2xl font-medium text-neutral-700 tracking-tight block mb-1 text-left drop-shadow-[0_1px_6px_rgba(255,255,255,1)]">
                Hello,
              </span>

              {/* Capitalized Name in Geist Font - Tight Leading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.035em] text-neutral-950 leading-[0.95] text-left drop-shadow-[0_2px_10px_rgba(255,255,255,1)]">
                I Am{" "}
                <span className="font-normal text-black">
                  Himanshu Verma
                </span>
              </h1>
            </motion.div>

            {/* About Me Bio */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 sm:mt-4 md:mt-6 text-left w-full"
            >
              <p className="text-xs sm:text-sm md:text-xl font-normal text-neutral-800 leading-snug text-left tracking-normal max-w-xl drop-shadow-[0_1px_6px_rgba(255,255,255,1)]">
                Full Stack Developer & AI Engineer based in Delhi, specializing in building high-performance, scalable web applications and intelligent digital experiences. Working with Next.js, TypeScript, modern backend architectures, and AI integrations.
              </p>
            </motion.div>
          </div>

          {/* Right: India & Timezone + Pixelated Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0 flex flex-col items-start md:items-end justify-end gap-3 pb-1"
          >
            {/* India & Timezone (Normal Text with Dashed Underline, No Badge) */}
            <span className="text-xs sm:text-sm font-mono text-neutral-800 dark:text-neutral-200 underline underline-offset-4 decoration-dashed decoration-neutral-400 dark:decoration-neutral-600 cursor-default select-none">
              India, {time ? `${time} IST` : "IST"}
            </span>

            <PixelSocialIcons />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
