"use client";

import React from "react";
import { projects } from "../../data/projectData";
import { motion } from "motion/react";
import * as motion_framer from "motion/react-client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GithubIcon } from "lucide-react";

const Project = () => {

  const projectsort = projects.sort((a, b) => b.id - a.id)


  return (
    <section className="min-h-screen w-full mt-3 py-4 bg-background text-foreground" id="projects">
      <div className="max-w-4xl mx-auto px-4  border-x-[0.5px] border-black/30 dark:border-white/20">
        <motion_framer.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl text-start  font-bold mb-4 dark:text-white">
            Featured Projects
          </h2>
          <p className="text-lg text-start text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Here are some of the projects I've worked on, showcasing my skills in web development and design.
          </p>
        </motion_framer.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsort.map((project, index) => (
            <motion_framer.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, transition: { type: "spring", stiffness: 200, damping: 20 } }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 hover:shadow-2xl transition-colors duration-500 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500 z-10" />
                {/* Placeholder for image if not found, or use actual image */}
                <div className="w-full h-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center text-gray-400">
                  {/* In a real scenario, use next/image. For now, assuming images might not exist locally, we use a fallback or the img tag if valid */}
                  {/* <Image src={project.img} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" /> */}
                  {/* Using a colored div as placeholder if image fails, but trying img tag */}
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.classList.add('bg-gradient-to-br', 'from-indigo-500', 'to-purple-600');
                    }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-4 gap-3">
                  <div className="flex gap-2.5 items-center ">
                    <h3 className="text-lg font-bold text-gray-900 text-nowrap dark:text-white group-hover:text-indigo-500 transition-colors">
                      {project.title}
                    </h3>
                    <Link
                      href={project.href}
                      target="_blank"
                      className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-indigo-500 hover:text-white transition-colors"
                    >
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                  <a href=""><GithubIcon className="hover:bg-white rounded-full hover:text-black px-0.5 py-0.5" size={18} /></a>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {project.techstack?.map((tech, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-xs font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-zinc-700"
                      >
                        <span className="text-sm">{tech.icon}</span>
                        <span>{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion_framer.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Project;
