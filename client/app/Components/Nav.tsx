"use client";

import Image from "next/image";
import ThemeToggle from "./ThemeToggle";


import { TransitionLink } from "./common/TransitionLink";

export function Navbar() {
    return (
       <div className="w-full h-[90px]   py-2.5 px-10 flex justify-center">
         <nav className="nav mx-auto  fixed w-[300px] h-[60px] z-40 px-5.5 rounded-xl py-4 border-b-2   border-gray-800 flex  gap-5 items-center shadow-[inset_3px_4px_6px_-6px_rgba(0,0,0,0.37),inset_-1px_-1px_6px_-1px_rgba(0,0,0,0.3)] bg-[#ffffff88] backdrop-blur-[30px] dark:border-gray-100 dark:bg-[#0007] dark:text-white text-black dark:shadow-[inset_3px_4px_6px_-6px_rgba(240,240,240,0.37),inset_-1px_-1px_6px_-1px_rgba(240,240,240,0.3)] md:w-[350px] md:justify-center">
            <TransitionLink href="/" className="h-[40px] w-[40px]"><Image width={200} height={200} alt="profile" className="rounded-lg mr-4 border-2  h-full w-full  object-cover border-black dark:border-white/70" src='/dp.jpg'/></TransitionLink>
            <TransitionLink href="/projects" className="">Projects</TransitionLink>
            <TransitionLink href="/contact" className="">Contact</TransitionLink>
            <ThemeToggle />
        </nav>
       </div>
    );
}