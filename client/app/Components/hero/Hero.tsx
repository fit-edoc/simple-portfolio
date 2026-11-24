"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Intro } from "./Intro";
import { SocialIcons } from "./SocialIcons";
import { AnalogClock } from "./AnalogClock";

const OilScene = dynamic(() => import("./OilScene"), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0 w-full h-full bg-[#fae8c8]"
      aria-hidden="true"
    />
  ),
});

export const Hero: React.FC = () => {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    const tick = () => {
      setTime(formatter.format(new Date()).toLowerCase());
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="md:h-screen md:grid md:grid-rows-2 font-sans">
      {/* Top half: animated oil painting illustration */}
      <section className="relative h-[55vh] md:h-auto bg-amber-100 overflow-hidden">
        <OilScene />
      </section>

      {/* Bottom half: white background, black text, intro & timezone/socials */}
      <section className="bg-white text-black px-6 py-8 md:px-12 md:py-10 flex flex-col md:flex-row md:justify-between gap-10">
        <Intro />
        <div className="flex flex-col items-start md:items-end gap-8 md:justify-between">
          {/* Small analog clock horizontally aligned with timezone */}
          <div className="flex items-center gap-2.5 text-sm text-black/50 tabular-nums">
            <AnalogClock size={20} />
            <p>
              India · <span id="time">{time}</span>
            </p>
          </div>
          <SocialIcons />
        </div>
      </section>
    </main>
  );
};

export default Hero;
