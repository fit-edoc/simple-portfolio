"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Disable body scroll when loading
    if (loading) {
      document.body.style.overflow = "hidden";
    }

    const timer = setTimeout(() => {
      setLoading(false);
      // Restore body scroll
      document.body.style.overflow = "";
    }, 2800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100vh",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black dark:bg-[#050505]"
        >
          <div className="relative flex flex-col items-center gap-8">
            {/* Ambient glow behind loader */}
            <div className="absolute w-48 h-48 rounded-full bg-neutral-700/30 dark:bg-neutral-50 blur-2xl -z-10" />

            <svg
              viewBox="0 0 100 100"
              className="w-28 h-28 stroke-neutral-400 dark:stroke-neutral-100"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Left Bar of H */}
              <motion.path
                d="M 32,25 L 32,75"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.3, ease: "easeInOut" }}
              />
              {/* Crossbar of H */}
              <motion.path
                d="M 32,50 L 68,50"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: 0.4, ease: "easeInOut" }}
              />
              {/* Right Bar of H */}
              <motion.path
                d="M 68,25 L 68,75"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.3, delay: 0.7, ease: "easeInOut" }}
              />
              {/* Outer Hexagon outline */}
              <motion.path
                d="M 50,8 L 86,29 L 86,71 L 50,92 L 14,71 L 14,29 Z"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.0, ease: "easeInOut" }}
              />
            </svg>

         
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
