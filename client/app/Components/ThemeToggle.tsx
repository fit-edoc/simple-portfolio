"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // avoid hydration mismatch

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia?.("(prefers-color-scheme: dark)")?.matches);

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => {
        if (!document.startViewTransition) {
          setTheme(isDark ? "light" : "dark");
          return;
        }
        document.startViewTransition(() => {
          setTheme(isDark ? "light" : "dark");
        });
      }}
      className="w-15 h-8 flex ml-2 items-center justify-center  px-1.5 rounded-full  transition-all duration-300"
    >
      <span
        className={`w-10 h-7 rounded-2xl bg-white  flex justify-center items-center dark:bg-black shadow-md transform transition-transform duration-1000 ${isDark ? "shadow-neutral-400 shadow-md" : "shadow-neutral-500 shadow-md"
          }`}
      >
        {isDark ? <Moon className="h-4 w-4 m-auto text-blue-300" /> : <Sun className="h-4 w-4 m-auto text-yellow-500" />}
      </span>
    </button>
  );
}
