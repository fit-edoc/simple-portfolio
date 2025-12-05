"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "motion/react";
import * as motion_framer from "motion/react-client";
import TechShape from "./TechShape";
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
    <section className="min-h-[400px] w-full py-10 overflow-hidden  relative">
      <div className="max-w-4xl mx-auto px-4 border-x-[1px] border-black/30 dark:border-white/20">
        <motion_framer.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl text-start md:text-2xl font-bold mb-4  dark:text-white">
            Technical Skills
          </h2>
          <p className="text-lg text-start text-gray-600 dark:text-gray-300">
            A showcase of my technical expertise and the technologies I work with to build modern applications.
          </p>
        </motion_framer.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Skills Grid */}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <motion_framer.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex  px-3 py-1.5  gap-1 items-center justify-center  bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-white/10 hover:shadow-lg hover:border-indigo-500/50 transition-all group"
              >
                <skill.icon
                  className={`text-lg   transition-transform group-hover:scale-110 duration-300 ${skill.color.includes(" ") ? skill.color : ""
                    }`}
                  style={{ color: skill.color.includes(" ") ? undefined : skill.color }}
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {skill.name}
                </span>
              </motion_framer.div>
            ))}
          </div>

          {/* Right Column: 3D Element */}
          {/* <div className="h-[400px] lg:h-[600px] w-full relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl -z-10" />
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <TechShape />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Skill;
