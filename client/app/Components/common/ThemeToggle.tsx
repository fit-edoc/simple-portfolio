"use client";

import React, { useEffect, useState } from "react";

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark =
      document.documentElement.classList.contains("dark") ||
      document.documentElement.getAttribute("data-theme") === "dark";
    setTheme(isDark ? "dark" : "light");
  }, []);

  const changeTheme = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    try {
      localStorage.setItem("theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      }
    } catch {
      // LocalStorage fallback
    }
  };

  if (!mounted) {
    return (
      <div
        className={`inline-flex items-center p-0.5 rounded-full border border-[var(--cell)] bg-[var(--ice)] text-xs select-none opacity-80 ${className}`}
        style={{ width: "136px", height: "30px" }}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <div
      role="radiogroup"
      aria-label="Theme mode selection"
      className={`inline-flex items-center p-0.5 rounded-full border text-xs select-none transition-all duration-150 ${className}`}
      style={{
        backgroundColor: isDark ? "rgba(255, 255, 255, 0.08)" : "var(--ice)",
        borderColor: isDark ? "rgba(255, 255, 255, 0.16)" : "var(--cell)",
      }}
    >
      {/* Light option */}
      <button
        type="button"
        role="radio"
        aria-checked={theme === "light"}
        onClick={() => changeTheme("light")}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all duration-150 cursor-pointer ${
          theme === "light"
            ? "bg-[#97c1ff] text-[#0c1b33] shadow-sm font-semibold"
            : isDark
            ? "text-white/60 hover:text-white"
            : "text-[var(--mut)] hover:text-[var(--fg)]"
        }`}
        title="Switch to light mode (white background)"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3.5 h-3.5 shrink-0"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
        <span>Light</span>
      </button>

      {/* Dark option with white background when selected */}
      <button
        type="button"
        role="radio"
        aria-checked={theme === "dark"}
        onClick={() => changeTheme("dark")}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all duration-150 cursor-pointer ${
          theme === "dark"
            ? "bg-white text-black shadow-sm font-medium"
            : "text-[var(--mut)] hover:text-[var(--fg)]"
        }`}
        style={
          theme === "dark"
            ? { backgroundColor: "#ffffff", color: "#000000" }
            : undefined
        }
        title="Switch to dark mode (black/90 background)"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3.5 h-3.5 shrink-0"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
        <span>Dark</span>
      </button>
    </div>
  );
};

export default ThemeToggle;
