"use client";

import React, { useState, useEffect } from "react";
import { projects, Project as ProjectType } from "../data/projectData";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GithubIcon, X } from "lucide-react";

// Snappy and smooth spring transition settings
const modalTransition = {
  type: "spring",
  stiffness: 350,
  damping: 30,
  mass: 0.8,
} as const;

const ProjectCard = ({
  project,
  index,
  onSelect,
}: {
  project: ProjectType;
  index: number;
  onSelect: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="h-full"
    >
      <motion.div
        layoutId={`project-card-${project.id}`}
        transition={modalTransition}
        onClick={onSelect}
        className="group relative cursor-pointer bg-white dark:bg-zinc-950 rounded-[2rem] overflow-hidden border border-black/5 dark:border-white/5 hover:shadow-2xl transition-all duration-300 flex flex-col h-full p-2"
      >
        {/* Top Image/Blob Container */}
        <div className="relative h-60 w-full overflow-hidden rounded-[1.5rem] bg-zinc-100 dark:bg-zinc-900">
          <motion.div
            layoutId={`project-image-wrapper-${project.id}`}
            transition={modalTransition}
            className="w-full h-full relative"
          >
            <div className="w-full h-full relative flex items-center justify-center overflow-hidden transition-transform duration-700 ease-out group-hover:scale-105">
              {/* Blobs */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-orange-500/40 rounded-full blur-[50px] mix-blend-multiply dark:mix-blend-screen" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-orange-700/40 rounded-full blur-[50px] mix-blend-multiply dark:mix-blend-screen" />
              
              {/* Half Blur Overlay */}
              <div className="absolute inset-0 bg-black/10 dark:bg-black/40 backdrop-blur-md" />
            </div>
          </motion.div>
          
          {/* Top Section Overlay Content (Title & Button) */}
          <div className="absolute bottom-0 left-0 right-0 p-5 flex justify-between items-end bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10">
            <div className="flex flex-col">
              <motion.h3
                layoutId={`project-title-${project.id}`}
                transition={modalTransition}
                className="text-lg sm:text-xl font-heading font-bold text-white mb-0.5"
              >
                {project.title}
              </motion.h3>
              <p className="text-white/70 text-[11px] sm:text-xs font-medium">
                Featured Project
              </p>
            </div>
            
            <div className="px-5 py-2.5 rounded-2xl bg-white/20 backdrop-blur-md text-white text-sm font-semibold transition-colors border border-white/10 flex-shrink-0">
              Details
            </div>
          </div>
        </div>

        {/* Bottom Content Area */}
        <div className="px-4 py-5 flex flex-col flex-grow">
          {/* Description */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">Overview</h4>
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <Link
                  href={project.href}
                  target="_blank"
                  className="p-1 rounded-full text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                >
                  <ArrowUpRight size={16} />
                </Link>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded-full text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                  >
                    <GithubIcon size={16} />
                  </a>
                )}
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-4 leading-relaxed font-sans">
              {project.description}
            </p>
          </div>
          
          <div className="w-full h-px bg-gray-100 dark:bg-zinc-800/50 my-2" />

          {/* Stats/Tech */}
          <div className="flex flex-wrap items-end gap-6 mt-auto pt-4">
            {project.techstack?.slice(0, 3).map((tech: any, i: number) => (
              <div key={i} className="flex flex-col">
                <div className="flex items-center gap-1.5 font-bold text-gray-900 dark:text-white mb-1">
                  <span className="text-base flex items-center justify-center">{tech.icon}</span>
                  <span className="text-sm">{tech.name}</span>
                </div>
                
              </div>
            ))}
            {project.techstack && project.techstack.length > 3 && (
              <div className="flex flex-col">
                <div className="flex items-center font-bold text-gray-900 dark:text-white mb-1">
                  <span className="text-sm">+{project.techstack.length - 3}</span>
                </div>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider">
                  More
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Project = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const projectsort = [...projects].sort((a, b) => b.id - a.id);

  // Prevent scroll and pause Lenis when modal is open
  useEffect(() => {
    const lenis = (window as any).lenis;
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [selectedProject]);

  return (
    <section
      className="min-h-screen w-full py-16 bg-transparent text-foreground relative"
      id="projects"
    >
      <div className="max-w-4xl mx-auto px-6 border-x-[0.5px] border-black/10 dark:border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="text-3xl font-heading font-bold mb-4 dark:text-white relative inline-block">
            Featured Projects
            <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-neutral-700 dark:bg-neutral-500 rounded-full" />
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl font-sans">
            A curated selection of applications and platforms I've crafted, demonstrating end-to-end full-stack capabilities and detailed design interfaces.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projectsort.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              layoutId={`project-card-${selectedProject.id}`}
              transition={modalTransition}
              className="relative bg-white dark:bg-zinc-950 rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl w-full max-w-6xl z-10 h-[90vh] flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 transition-colors backdrop-blur-sm md:bg-gray-100 md:dark:bg-zinc-800 md:text-black md:dark:text-white shadow-md"
              >
                <X size={18} />
              </button>

              {/* Left Side: Iframe/Image */}
              <div className="relative w-full md:w-[55%] h-[40vh] md:h-full bg-gray-100 dark:bg-zinc-900 border-b md:border-b-0 md:border-r border-black/5 dark:border-white/5 md:sticky md:top-0 flex-shrink-0">
                <motion.div
                  layoutId={`project-image-wrapper-${selectedProject.id}`}
                  transition={modalTransition}
                  className="w-full h-full relative overflow-hidden"
                >
                  {selectedProject.href ? (
                    <div className="w-full h-full relative group bg-white dark:bg-zinc-950 flex flex-col">
                      {/* Browser Mockup Header */}
                      <div className="w-full h-8 bg-gray-200 dark:bg-zinc-800 flex items-center px-3 gap-1.5 flex-shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                        <div className="ml-3 px-2 py-0.5 bg-white/50 dark:bg-black/20 rounded text-[9px] text-gray-500 font-mono truncate max-w-[200px]">
                          {selectedProject.href}
                        </div>
                      </div>
                      
                      <div className="relative flex-grow w-full">
                        {/* Loading State Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-zinc-900 text-gray-400">
                          <span className="text-sm font-medium animate-pulse">Loading Live Site...</span>
                        </div>
                        <iframe 
                          src={selectedProject.href} 
                          className="relative z-10 w-full h-full border-none"
                          title={selectedProject.title}
                          loading="lazy"
                          sandbox="allow-scripts allow-same-origin"
                        />
                        {/* Invisible overlay for easier scrolling unless hovering */}
                        <div className="absolute inset-0 z-20 bg-transparent transition-opacity hover:opacity-0 pointer-events-auto hover:pointer-events-none" />
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={selectedProject.img}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  )}
                </motion.div>
              </div>

              {/* Right Side: Content */}
              <div className="w-full md:w-[45%] p-6 sm:p-8 sm:px-10 overflow-y-auto flex flex-col h-full bg-white dark:bg-zinc-950">
                <div className="flex flex-col mb-6 gap-3">
                  {selectedProject.category && (
                    <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-1 rounded-md w-fit">
                      {selectedProject.category}
                    </span>
                  )}
                  
                  <motion.h3
                    layoutId={`project-title-${selectedProject.id}`}
                    transition={modalTransition}
                    className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 dark:text-white"
                  >
                    {selectedProject.title}
                  </motion.h3>

                  <div className="flex gap-2 mt-2">
                    <Link
                      href={selectedProject.href}
                      target="_blank"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-900 dark:bg-neutral-300 dark:text-black hover:bg-neutral-700 text-white font-medium text-xs transition-colors shadow-md shadow-neutral-400"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight size={14} />
                    </Link>
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-100 dark:bg-zinc-900 text-gray-800 dark:text-gray-200 hover:bg-gray-250 dark:hover:bg-zinc-800 font-medium text-xs transition-colors border border-black/10 dark:border-white/10"
                      >
                        <span>Source Code</span>
                        <GithubIcon size={14} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="space-y-6 flex-grow">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 font-heading">
                      Overview
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line font-sans">
                      {selectedProject.description}
                    </p>
                  </div>

                  {selectedProject.painPoint && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 font-heading">
                        Problem Solved
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line font-sans">
                        {selectedProject.painPoint}
                      </p>
                    </div>
                  )}

                  {selectedProject.output && (
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 font-heading">
                        Output & Results
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line font-sans">
                        {selectedProject.output}
                      </p>
                    </div>
                  )}

                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3 font-heading">
                      Technologies & Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techstack?.map((tech: any, i: number) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 text-xs font-medium text-gray-700 dark:text-gray-300 border border-black/5 dark:border-white/5"
                        >
                          <span className="text-sm">{tech.icon}</span>
                          <span>{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Project;
