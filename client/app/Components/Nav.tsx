"use client";

import Image from "next/image";
import ThemeToggle from "./ThemeToggle";


import { TransitionLink } from "./common/TransitionLink";

export function Navbar() {
    return (
       <div className="w-full h-[90px]   py-2.5 px-10 flex justify-center">
         <nav className="mx-auto  fixed w-[300px] h-[60px] z-50 px-5.5 rounded-xl py-4 border-b   border-gray-800 flex  gap-5 items-center  shadow-[0px_0px_1px_white] bg-[#ffffff88] backdrop-blur-[30px] dark:border-gray-100 dark:bg-[#0007] dark:text-white text-black md:w-[350px] md:justify-center">
            <TransitionLink href="/" className=""><img alt="profile" className="rounded-full   md:w-[40px] md:h-[40px]" src='/profile.jpg'/></TransitionLink>
            <TransitionLink href="/projects" className="">Projects</TransitionLink>
            <TransitionLink href="/contact" className="">Contact</TransitionLink>
            <ThemeToggle />
        </nav>
       </div>
    );
}