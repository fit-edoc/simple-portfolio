"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaPython,
} from "react-icons/fa";
import {
  SiTypescript,
  SiMongodb,
  SiTailwindcss,
  SiNextdotjs,
  SiPostgresql,
  SiOpenai,
  SiHuggingface,
  SiFastapi,
  SiPytorch,
  SiLangchain,
  SiRedis,
  SiJavascript,
} from "react-icons/si";

interface SkillItem {
  name: string;
  category: "AI & ML" | "Frontend" | "Backend & DB" | "DevOps & Tools";
  icon: React.ElementType;
  color: string;
}

const skills: SkillItem[] = [
  // AI & ML Stack
  { name: "OpenAI / LLMs", category: "AI & ML", icon: SiOpenai, color: "#10A37F" },
  { name: "LangChain", category: "AI & ML", icon: SiLangchain, color: "#1C3C3C" },
  { name: "Hugging Face", category: "AI & ML", icon: SiHuggingface, color: "#FFA000" },
  { name: "PyTorch", category: "AI & ML", icon: SiPytorch, color: "#EE4C2C" },
  { name: "Python", category: "AI & ML", icon: FaPython, color: "#3776AB" },
  { name: "FastAPI", category: "AI & ML", icon: SiFastapi, color: "#009688" },

  // Frontend Stack
  { name: "Next.js", category: "Frontend", icon: SiNextdotjs, color: "text-neutral-900 dark:text-white" },
  { name: "React", category: "Frontend", icon: FaReact, color: "#61DAFB" },
  { name: "TypeScript", category: "Frontend", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", category: "Frontend", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Tailwind CSS", category: "Frontend", icon: SiTailwindcss, color: "#06B6D4" },

  // Backend & Database
  { name: "Node.js", category: "Backend & DB", icon: FaNodeJs, color: "#339933" },
  { name: "PostgreSQL", category: "Backend & DB", icon: SiPostgresql, color: "#4169E1" },
  { name: "MongoDB", category: "Backend & DB", icon: SiMongodb, color: "#47A248" },
  { name: "Redis", category: "Backend & DB", icon: SiRedis, color: "#DC382D" },

  // DevOps & Tooling
  { name: "Docker", category: "DevOps & Tools", icon: FaDocker, color: "#2496ED" },
  { name: "Git", category: "DevOps & Tools", icon: FaGitAlt, color: "#F05032" },
];

const Skill = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section className="py-16 w-full overflow-hidden bg-transparent relative font-geist">
      <div className="max-w-4xl mx-auto px-6 border-x-[0.5px] border-black/10 dark:border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-3 text-neutral-900 dark:text-white">
            Technical & AI Stack
          </h2>
          <p className="text-base font-light text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
            Core technologies, AI frameworks, and development tooling I utilize to build modern, intelligent, and scalable applications.
          </p>
        </motion.div>

        {/* Icon Grid */}
        <div className="flex flex-wrap gap-3 sm:gap-3.5">
          {skills.map((skill, index) => {
            const SkillIcon = skill.icon;
            const isTailwindClass = skill.color.startsWith("text-");
            const isHovered = hoveredSkill === skill.name;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.025 }}
                whileHover={{ y: -4, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="relative cursor-pointer"
              >
                {/* Icon Box */}
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center bg-white/70 dark:bg-zinc-900/70 border border-neutral-400 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-lg dark:hover:shadow-neutral-900/80 backdrop-blur-md transition-all duration-300">
                  <SkillIcon
                    className={`text-2xl sm:text-[26px] transition-transform duration-300 ${
                      isTailwindClass ? skill.color : ""
                    }`}
                    style={{ color: !isTailwindClass ? skill.color : undefined }}
                  />
                </div>

                {/* Animated Tooltip on Hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.95 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-[11px] font-medium tracking-tight py-1 px-2.5 rounded-lg shadow-xl pointer-events-none whitespace-nowrap z-30 flex items-center gap-1.5 border border-white/10 dark:border-black/10"
                    >
                      <span>{skill.name}</span>
                      <span className="text-[9px] opacity-60 font-mono">({skill.category})</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skill;
