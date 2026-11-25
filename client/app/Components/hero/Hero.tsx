"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Intro } from "./Intro";
import { SocialIcons } from "./SocialIcons";

const OilScene = dynamic(() => import("./OilScene"), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#cfe0f5] via-[#ffe3c2] to-[#8fb84f]"
      aria-hidden="true"
    />
  ),
});

/**
 * Rolling second counter that animates only the right digit from bottom to top
 */
const SecondCounter: React.FC<{ second: string }> = ({ second }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion || second === "--" || second.length < 2) {
    return <span className="tabular-nums font-semibold text-black">{second}</span>;
  }

  const tens = second[0];
  const ones = second[1];

  return (
    <span className="inline-flex items-center tabular-nums font-semibold text-black">
      {/* Left digit: static */}
      <span>{tens}</span>

      {/* Right digit: counter rolling from bottom to top */}
      <span className="relative inline-flex items-center justify-center overflow-hidden h-[1.3em] w-[1ch] align-baseline">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={ones}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block tabular-nums font-semibold text-black"
          >
            {ones}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
};

interface TimeState {
  hour: string;
  minute: string;
  second: string;
  period: string;
}

export const Hero: React.FC = () => {
  const [timeState, setTimeState] = useState<TimeState>({
    hour: "--",
    minute: "--",
    second: "--",
    period: "",
  });

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    const tick = () => {
      const parts = formatter.formatToParts(new Date());
      let h = "--";
      let m = "--";
      let s = "--";
      let p = "";

      for (const part of parts) {
        if (part.type === "hour") h = part.value;
        if (part.type === "minute") m = part.value;
        if (part.type === "second") s = part.value;
        if (part.type === "dayPeriod") p = part.value.toLowerCase();
      }

      setTimeState({ hour: h, minute: m, second: s, period: p });
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
      <section className="bg-white text-black px-6 py-8 md:px-12 md:py-10 flex flex-col md:flex-row md:justify-between items-end gap-10">
        <Intro />
        <div className="flex flex-col items-start md:items-end gap-8 md:justify-between">
          {/* Timezone and right digit rolling counter */}
          <div className="flex items-center text-sm text-black/50 tabular-nums">
            <p className="flex items-center gap-0.5">
              <span>India · </span>
              <span id="time" className="inline-flex items-center">
                <span>{timeState.hour}:{timeState.minute}:</span>
                <SecondCounter second={timeState.second} />
                {timeState.period && <span className="ml-1">{timeState.period}</span>}
              </span>
            </p>
          </div>
          <SocialIcons />
        </div>
      </section>
    </main>
  );
};

export default Hero;

