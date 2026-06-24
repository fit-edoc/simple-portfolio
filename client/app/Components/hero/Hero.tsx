"use client";

import React, { useState } from "react";
import Eat from "../ui/icons/Eat";
import Sleep from "../ui/icons/Sleep";
import Code from "../ui/icons/Code";
import Repeat from "../ui/icons/Repeat";
import { motion, Variants } from "motion/react";
import Resume from "../ui/icons/Resume";
import Talk from "../ui/icons/Talk";
import { GithubIcon, Linkedin, X } from "lucide-react";
import Work from "../ui/icons/Work";

const iconItem = [
  { id: 1, icons: <Eat />, tooltip: "Eat" },
  { id: 2, icons: <Sleep />, tooltip: "Sleep" },
  { id: 3, icons: <Code />, tooltip: "Code" },
  { id: 4, icons: <Repeat />, tooltip: "Repeat" },
];

const socialIcon = [
  {
    id: 1,
    icon: (
      <GithubIcon
        size={36}
        className="border border-black/10 dark:border-white/10 rounded-full p-2 hover:bg-black hover:text-white dark:hover:text-black dark:hover:bg-white transition-all duration-300 hover:scale-110"
      />
    ),
    ref: "https://github.com/fit-edoc",
    tooltip: "GitHub",
  },
  {
    id: 2,
    icon: (
      <X
        size={36}
        className="border border-black/10 dark:border-white/10 rounded-full p-2 hover:bg-black hover:text-white dark:hover:text-black dark:hover:bg-white transition-all duration-300 hover:scale-110"
      />
    ),
    ref: "https://x.com/fitedocc",
    tooltip: "X / Twitter",
  },
  {
    id: 3,
    icon: (
      <Linkedin
        size={36}
        className="border border-black/10 dark:border-white/10 rounded-full p-2 hover:bg-black hover:text-white dark:hover:text-black dark:hover:bg-white transition-all duration-300 hover:scale-110"
      />
    ),
    ref: "https://linkedin.com",
    tooltip: "LinkedIn",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState<{
    id: number;
    type: "icon" | "social";
  } | null>(null);

  const handleMouse = (type: "icon" | "social", id: number) => {
    setCurrent({ type, id });
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
    <div className="min-h-[500px] flex items-center justify-center py-12 relative overflow-hidden">
      <main className="max-w-4xl mx-auto py-16 px-6 border-x-[0.5px] border-black/10 dark:border-white/10 w-full">
        {/* Availability Badge */}
        <Work />

        {/* Heading */}
        <div className="flex flex-col mb-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold tracking-tight text-gray-900 dark:text-white leading-none">
            Hi, I'm{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r  from-neutral-700 to-neutral-400  dark:to-white font-heading">
              Himanshu
            </span>
          </h1>
        </div>

        {/* Rotating Routine Icons */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex gap-4 my-6 relative"
        >
          {iconItem.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariant}
              className="relative cursor-pointer"
              onMouseEnter={() => handleMouse("icon", item.id)}
              onMouseLeave={() => setCurrent(null)}
            >
              {current?.type === "icon" && current.id === item.id && (
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] uppercase tracking-wider font-semibold py-1 px-2.5 rounded-md dark:bg-white dark:text-black whitespace-nowrap z-20 shadow-md border border-white/10 dark:border-black/10"
                >
                  {item.tooltip}
                </motion.div>
              )}

              {item.icons}
            </motion.div>
          ))}
        </motion.div>

        {/* Bio */}
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed mb-8 font-sans">
          Full Stack Developer & ReactJS Developer based in Delhi — I build modern, visually compelling web applications using MERN, Next.js, and TypeScript.
        </p>

        {/* Social Links & CTA Buttons */}
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex gap-2.5">
            {socialIcon.map((item) => (
              <a
                key={item.id}
                className="relative flex items-center justify-center"
                onMouseEnter={() => handleMouse("social", item.id)}
                onMouseLeave={() => setCurrent(null)}
                href={item.ref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {current?.type === "social" && current.id === item.id && (
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] uppercase tracking-wider font-semibold py-1 px-2.5 rounded-md dark:bg-white dark:text-black whitespace-nowrap z-20 shadow-md border border-white/10 dark:border-black/10"
                  >
                    {item.tooltip}
                  </motion.div>
                )}
                {item.icon}
              </a>
            ))}
          </div>

          <div className="flex gap-3">
            <a
              href="https://drive.google.com/file/d/1-PcJGW9BIBqpBqdr5UjB5sWZFB7OaW_K/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center"
            >
              <button className="px-5 py-2 text-sm font-semibold font-heading rounded-full border border-black/15 bg-white text-black hover:bg-black hover:text-white dark:border-white/15 dark:bg-zinc-950 dark:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 flex items-center gap-1.5 shadow-sm">
                <Resume />
              </button>
            </a>
            <a href="mailto:himanshuverma2660@gmail.com">
              <button className="flex items-center gap-2 justify-center px-5 py-2 text-sm font-semibold font-heading text-white bg-neutral-950 hover:bg-neutral-500 rounded-full transition-all duration-300 shadow-md shadow-indigo-600/10">
                Connect with <Talk />
              </button>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hero;
