"use client";

import React, { useState } from "react";
import Eat from "../ui/icons/Eat";
import Sleep from "../ui/icons/Sleep";
import Code from "../ui/icons/Code";
import Repeat from "../ui/icons/Repeat";
import { motion, Variants } from "motion/react";
import Resume from "../ui/icons/Resume";
import Talk from "../ui/icons/Talk";
import Github from "../technologies/Github";
import { GithubIcon, Linkedin, X } from "lucide-react";

const iconItem = [
  { id: 1, icons: <Eat />, tooltip: "Eat" },
  { id: 2, icons: <Sleep />, tooltip: "Sleep" },
  { id: 3, icons: <Code />, tooltip: "Code" },
  { id: 4, icons: <Repeat />, tooltip: "Repeat" },
];

const Hero = () => {
  const [current, setCurrent] = useState<number | null>(null);

  const handleMouse = (id: number) => {
    setCurrent(id);
  };

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariant: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotate: 180,
      filter: "blur(10px)",
    },
    show: {
      opacity: 1,
      y: 0,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-[400px]">
      <main className="max-w-4xl mx-auto py-20 px-4 border-x-[0.5px] border-black/30 dark:border-white/20">
        <div className="flex">
          <h1 className="text-5xl font-bold mb-4">Hi, I'm Himanshu</h1>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex gap-4 relative"
        >
          {iconItem.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariant}
              className="relative cursor-pointer my-2.5"
              onMouseEnter={() => handleMouse(item.id)}
              onMouseLeave={() => setCurrent(null)}
            >
              {current === item.id && (
                <div className="absolute top-[-90%] left-[-40%] bg-black text-white px-2.5 rounded-md dark:bg-white dark:text-black">
                  {item.tooltip}
                </div>
              )}

              {item.icons}
            </motion.div>
          ))}
        </motion.div>

        <p className="text-lg text-gray-600 dark:text-gray-300 mt-1.5">
          Full Stack Developer — I build modern web apps using MERN / Next.js /
          TypeScript.
        </p>
        <div className="flex py-2.5 gap-1 items-center"> <GithubIcon size={30} className="  border-[1px] border-black/30  rounded-full px-1.5 py-1.5  hover:bg-black hover:text-white dark:hover:text-black dark:hover:bg-white " /> <X size={30} className="border-[1px] border-black/30  rounded-full px-1.5 py-1.5  hover:bg-black hover:text-white dark:hover:text-black dark:hover:bg-white " /><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-brand-linkedin  fill-blue-400 border-[1px] border-black/30  rounded-full px-1.5 py-1.5  hover:bg-black hover:text-white dark:hover:text-black dark:hover:bg-white dark:border-white/30"><path stroke="" d="M0 0h24v24H0z" fill="none" /><path d="M17 2a5 5 0 0 1 5 5v10a5 5 0 0 1 -5 5h-10a5 5 0 0 1 -5 -5v-10a5 5 0 0 1 5 -5zm-9 8a1 1 0 0 0 -1 1v5a1 1 0 0 0 2 0v-5a1 1 0 0 0 -1 -1m6 0a3 3 0 0 0 -1.168 .236l-.125 .057a1 1 0 0 0 -1.707 .707v5a1 1 0 0 0 2 0v-3a1 1 0 0 1 2 0v3a1 1 0 0 0 2 0v-3a3 3 0 0 0 -3 -3m-6 -3a1 1 0 0 0 -.993 .883l-.007 .127a1 1 0 0 0 1.993 .117l.007 -.127a1 1 0 0 0 -1 -1" /></svg></div>
        <div className="flex gap-1.5 mt-1.5"> <button className="px-4 py-1 text-white rounded-full border border-white/50 bg-[#000000]"><Resume /></button><button className="px-4 py-1 text-white rounded-full border border-white/50 bg-black flex items-center gap-1.5 justify-center">Connect with <Talk /></button></div>

      </main>
    </div>
  );
};

export default Hero;
