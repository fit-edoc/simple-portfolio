"use client";

import React, { useState } from "react";
import Eat from "../ui/icons/Eat";
import Sleep from "../ui/icons/Sleep";
import Code from "../ui/icons/Code";
import Repeat from "../ui/icons/Repeat";
import { motion, Variants } from "motion/react";
import Resume from "../ui/icons/Resume";
import Talk from "../ui/icons/Talk";

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
    <div>
      <main className="max-w-3xl mx-auto py-20 px-4">
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
              className="relative cursor-pointer"
              onMouseEnter={() => handleMouse(item.id)}
              onMouseLeave={() => setCurrent(null)}
            >
              {current === item.id && (
                <div className="absolute top-[-75%] left-[-40%] bg-black text-white px-2.5 rounded-md dark:bg-white dark:text-black">
                  {item.tooltip}
                </div>
              )}

              {item.icons}
            </motion.div>
          ))}
        </motion.div>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Full Stack Developer — I build modern web apps using MERN / Next.js /
          TypeScript.
        </p>

<div className="flex gap-1.5"> <button  className="px-4 py-1 text-white rounded-full border border-white bg-[#000000]"><Resume/></button><button className="px-4 py-1 text-white rounded-full border border-white bg-black flex items-center gap-1.5 justify-center">Connect with <Talk/></button></div>
      
      </main>
    </div>
  );
};

export default Hero;
