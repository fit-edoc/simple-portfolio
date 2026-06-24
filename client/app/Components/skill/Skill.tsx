"use client";

import React from "react";
import { motion } from "motion/react";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaGitAlt,
  FaDocker,
} from "react-icons/fa";
import { SiTypescript, SiMongodb, SiTailwindcss, SiNextdotjs, SiPostgresql } from "react-icons/si";

const skills = [
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000 dark:text-white" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Docker", icon: FaDocker, color: "#2496ED" },
  { name: "Git", icon: FaGitAlt, color: "#F05032" },
  { name: "HTML5", icon: FaHtml5, color: "#E34F26" },
  { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
  { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
];

const Skill = () => {
  return (
    <section className="py-16 w-full overflow-hidden bg-transparent relative">
      <div className="max-w-4xl mx-auto px-6 border-x-[0.5px] border-black/10 dark:border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-heading font-bold mb-4 dark:text-white relative inline-block">
            Technical Skills
            <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-neutral-700 dark:bg-neutral-500 rounded-full" />
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
            A showcase of my technical expertise and the languages, frameworks, and tooling I leverage to build robust, modern web architectures.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => {
            const SkillIcon = skill.icon;
            const isDarkOrWhite = skill.color.includes(" ");
            const styleColor = isDarkOrWhite ? undefined : skill.color;
            const classColor = isDarkOrWhite ? skill.color : "";

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                viewport={{ once: true }}
                className="flex px-4 py-2 gap-2.5 items-center justify-center bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md rounded-xl border border-black/10 dark:border-white/10 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:shadow-md transition-all duration-300 group cursor-default"
              >
                <SkillIcon
                  className={`text-xl transition-transform group-hover:scale-110 duration-300 ${classColor}`}
                  style={{ color: styleColor }}
                />
                <span className="text-sm font-semibold font-heading text-gray-800 dark:text-gray-200">
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skill;
