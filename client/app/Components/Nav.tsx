"use client";

import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export function Navbar() {
  return (
    <div className="w-full fixed top-0 left-0 z-40 flex justify-center py-6 pointer-events-none">
      <nav className="nav mx-auto pointer-events-auto h-14 px-3 sm:px-4 rounded-full border dark:border-t-2 border-black/10 dark:border-white/10 flex items-center  bg-white/75 backdrop-blur-md dark:bg-zinc-950/75 dark:text-white text-black justify-between w-[310px] sm:w-[360px]">
        <Link href="/" className="h-8 w-8 relative shrink-0">
          <Image
            width={80}
            height={80}
            alt="profile"
            className="rounded-full border border-black/10 dark:border-white/10 h-full w-full object-cover shadow-sm hover:scale-105 transition-transform duration-300"
            src="/profile.png"
          />
        </Link>
        <div className="flex items-center gap-4 sm:gap-6 font-heading text-[11px] sm:text-xs uppercase tracking-wider font-semibold">
          <Link href="/projects" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
            Projects
          </Link>
          <Link href="/contact" className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
            Contact
          </Link>
        </div>
        <div className="flex-shrink-0 flex items-center">
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}