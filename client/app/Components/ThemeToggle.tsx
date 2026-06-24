"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react"; // ✅ added useRef
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia?.("(prefers-color-scheme: dark)")?.matches);

  const handleToggle = () => {
    // 🔊 play sound
  

    // 🎨 theme change
    if (!document.startViewTransition) {
      setTheme(isDark ? "light" : "dark");
      return;
    }

    document.startViewTransition(() => {
      setTheme(isDark ? "light" : "dark");
    });
  };

  return (
    <>
      <button
        aria-label="Toggle theme"
        onClick={handleToggle}
        className="w-12 h-8 flex items-center justify-center px-1 rounded-full transition-all duration-300 cursor-pointer"
      >
        <span
          className={`w-9 h-6.5 rounded-2xl bg-white flex justify-center items-center dark:bg-black shadow-md transform transition-transform duration-500 ${
            isDark
              ? "shadow-neutral-100 shadow-sm"
              : "shadow-neutral-500 shadow-md"
          }`}
        >
          {isDark ? (
            <Moon className="h-3.5 w-3.5 m-auto text-neutral-300" />
          ) : (
            <Sun className="h-3.5 w-3.5 m-auto text-yellow-500" />
          )}
        </span>
      </button>

      {/* 🔊 audio element */}
     
    </>
  );
}