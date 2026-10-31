"use client";

import React from "react";
import { motion } from "motion/react";

export const Footer = () => {
  return (
    <footer className="w-full pb-12 sm:pb-16 bg-transparent text-foreground relative font-geist">
      <div className="max-w-6xl mx-auto px-6 border-x-[0.5px] border-black/10 dark:border-white/10">
        
        {/* Hairline Separator */}
        <div className="w-full border-t border-neutral-200/70 dark:border-neutral-800/70 pt-8 sm:pt-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
          
          {/* =================================================================
              LEFT: EMAIL WITH DASHED UNDERLINE
             ================================================================= */}
          <div className="flex items-center">
            <a
              href="mailto:himanshuverma2660@gmail.com"
              className="text-xs sm:text-sm font-mono text-neutral-800 hover:text-black dark:text-neutral-200 dark:hover:text-white underline underline-offset-4 decoration-dashed decoration-neutral-400 dark:decoration-neutral-600 transition-colors select-none"
            >
              himanshuverma@gmail.com
            </a>
          </div>

          {/* =================================================================
              CENTER: LOOP "EAT CODE SLEEP REPEAT"
             ================================================================= */}
          <div className="overflow-hidden flex items-center justify-center max-w-[280px] sm:max-w-[320px]">
            <motion.div
            
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 9,
              }}
              className="flex items-center gap-6 text-xs sm:text-sm font-mono text-neutral-600 dark:text-neutral-400 whitespace-nowrap select-none"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5  border-b-4  border-black bg-black inline-block" />
                <span>eat code sleep repeat</span>
                <span className="w-1.5 h-1.5  border-b-4  border-black bg-black inline-block" />
              </span>
             
            </motion.div>
          </div>

          {/* =================================================================
              RIGHT: SOCIAL TEXT WITH DASHED UNDERLINE
             ================================================================= */}
          <div className="flex items-center gap-5 sm:gap-6 text-xs sm:text-sm font-mono">
            <a
              href="https://github.com/fit-edoc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-800 hover:text-black dark:text-neutral-200 dark:hover:text-white underline underline-offset-4 decoration-dashed decoration-neutral-400 dark:decoration-neutral-600 transition-colors select-none"
            >
              GitHub
            </a>
            <a
              href="https://x.com/fitedocc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-800 hover:text-black dark:text-neutral-200 dark:hover:text-white underline underline-offset-4 decoration-dashed decoration-neutral-400 dark:decoration-neutral-600 transition-colors select-none"
            >
              X / Twitter
            </a>
            <a
              href="https://www.linkedin.com/in/himanshu-verma-6b4a94329/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-800 hover:text-black dark:text-neutral-200 dark:hover:text-white underline underline-offset-4 decoration-dashed decoration-neutral-400 dark:decoration-neutral-600 transition-colors select-none"
            >
              LinkedIn
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;

