// components/CustomCursor.tsx
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }} // Subtract half of width/height to center
      transition={{ type: "spring", damping: 20, stiffness: 250, mass: 0.5 }}
    >
      {/* Your Animated SVG Here */}
      {/* <svg width="32" height="32" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="10" fill="cyan">
          <animate attributeName="r" values="8;12;8" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="fill" values="cyan;magenta;cyan" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg> */}
      <motion.img   src="/images/finalcur.png" className="h-[64px] w-[64px]" alt="" />
    </motion.div>
  );
}