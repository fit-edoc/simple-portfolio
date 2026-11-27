"use client";

import React, { useEffect, useState } from "react";
import BannerCanvas from "./BannerCanvas";
import PixelSocialIcons from "./PixelSocialIcons";
import ThemeToggle from "../common/ThemeToggle";

export const Hero: React.FC = () => {
  const [clockText, setClockText] = useState("India · --");

  useEffect(() => {
    function tick() {
      try {
        const t = new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        setClockText("India · " + t.replace(/\s/g, "").toLowerCase());
      } catch (e) {
        // Fallback
      }
    }
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Top Banner with Interactive Pixel Dither Halftone Wave Canvas */}
      <BannerCanvas />

      {/* Main Hero / Bio Section */}
      <main className="flex justify-between gap-10 flex-wrap px-[8%] pt-[clamp(40px,7vw,100px)] pb-[clamp(56px,7vw,96px)]">
        <div className="flex flex-col justify-between items-start gap-8 max-w-[600px] min-h-0 min-[701px]:min-h-[280px]">
          {/* Light / Dark Theme Toggle on the Left */}
          <ThemeToggle />

          {/* 8 Lines Introduction with matched width on every line */}
          <div className="w-full max-w-[620px] text-[clamp(13px,2.4vw,23px)] leading-[1.6] m-0 select-text">
            {[
              <>Hey, I am <b className="font-normal" style={{ color: "var(--link)" }}>Himanshu Verma</b>, a full stack engineer.</>,
              <>I build web products end to end, from the first</>,
              <>database table to the last pixel on the screen.</>,
              <>I enjoy turning vague ideas into fast, reliable</>,
              <>software, whether that means designing APIs and</>,
              <>shaping clean data models or crafting intuitive</>,
              <>interfaces which people love using each day. I</>,
              <>care deeply about the small details and shipping.</>,
            ].map((line, idx) => (
              <span
                key={idx}
                className="block w-full [text-align-last:justify] [text-justify:inter-word]"
              >
                {line}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between items-start min-[701px]:items-end gap-[60px] min-h-0 min-[701px]:min-h-[280px]">
          <p className="text-xs m-0" style={{ color: "var(--mut)" }}>
            {clockText}
          </p>
          <PixelSocialIcons />
        </div>
      </main>
    </div>
  );
};

export default Hero;
