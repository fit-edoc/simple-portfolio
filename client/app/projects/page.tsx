"use client";

import React, { useState, useEffect } from "react";
import { projects, Project as ProjectType } from "../data/projectData";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GithubIcon, X, ExternalLink, Sparkles, Layers, CheckCircle2, AlertCircle } from "lucide-react";

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
      className="h-full font-geist"
    >
      <div
        onClick={onSelect}
        className="group relative cursor-pointer bg-white dark:bg-zinc-950 rounded-[2rem] overflow-hidden border border-black/8 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:shadow-2xl transition-all duration-300 flex flex-col h-full p-2.5"
      >
        {/* Top Image Container */}
        <div className="relative h-60 w-full overflow-hidden rounded-[1.5rem] bg-zinc-100 dark:bg-zinc-900">
          <div className="w-full h-full relative overflow-hidden transition-transform duration-500 ease-out group-hover:scale-105">
            {project.img && (
              <Image
                src={project.img}
                alt={project.title}
                fill
                className="object-cover"
              />
            )}
          </div>

          {/* Top Section Overlay Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex justify-between items-end z-10">
            <div className="flex flex-col">
              <h3 className="text-lg sm:text-xl font-medium tracking-tight text-white mb-0.5">
                {project.title}
              </h3>
              <p className="text-white/70 text-[11px] sm:text-xs font-light">
                {project.category || "Featured Project"}
              </p>
            </div>

            <div className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-normal transition-all border border-white/15 flex-shrink-0">
              View Details
            </div>
          </div>
        </div>

        {/* Bottom Content Area */}
        <div className="px-4 py-5 flex flex-col flex-grow">
          {/* Description */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-xs font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Overview
              </h4>
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <Link
                  href={project.href}
                  target="_blank"
                  className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  title="Live Demo"
                >
                  <ArrowUpRight size={15} />
                </Link>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    title="Source Code"
                  >
                    <GithubIcon size={15} />
                  </a>
                )}
              </div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm font-light line-clamp-3 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="w-full h-px bg-neutral-100 dark:bg-neutral-900 my-2" />

          {/* Stats/Tech */}
          <div className="flex flex-wrap items-center gap-2 mt-auto pt-3">
            {project.techstack?.slice(0, 3).map((tech: any, i: number) => (
              <div
                key={i}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 text-xs font-light text-neutral-700 dark:text-neutral-300"
              >
                <span className="text-xs flex items-center justify-center">{tech.icon}</span>
                <span>{tech.name}</span>
              </div>
            ))}
            {project.techstack && project.techstack.length > 3 && (
              <span className="text-[11px] text-neutral-400 dark:text-neutral-500 font-mono">
                +{project.techstack.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const projectsort = [...projects].sort((a, b) => b.id - a.id);

  // Prevent scroll, pause Lenis, and listen for ESC key
  useEffect(() => {
    const lenis = (window as any).lenis;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }

    return () => {
      document.body.style.overflow = "";
      lenis?.start();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <section
      className="min-h-screen w-full py-24 bg-transparent text-foreground relative font-geist"
      id="projects"
    >
      <div className="max-w-4xl mx-auto px-6 border-x-[0.5px] border-black/10 dark:border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight mb-3 text-neutral-900 dark:text-white">
            All Projects
          </h1>
          <p className="text-base font-light text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl font-geist">
            A comprehensive showcase of full-stack web applications, AI tools, and frontend interfaces I&apos;ve built.
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

      {/* Smooth Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
            {/* Backdrop with Smooth Fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Body with Smooth Scale & Slide (No Stretchy Distortion) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white dark:bg-zinc-950 rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-2xl w-full max-w-5xl z-10 max-h-[92vh] flex flex-col md:flex-row font-geist"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3.5 right-3.5 z-30 p-2 rounded-full bg-neutral-900/60 hover:bg-neutral-900 text-white dark:bg-neutral-800/80 dark:hover:bg-neutral-700 backdrop-blur-md transition-all duration-200 shadow-md cursor-pointer group"
                aria-label="Close modal"
              >
                <X size={17} className="transition-transform group-hover:rotate-90 duration-200" />
              </button>

              {/* Left Side: Browser Preview Mockup */}
              <div className="relative w-full md:w-[54%] h-[32vh] sm:h-[40vh] md:h-auto min-h-[300px] md:min-h-full bg-neutral-100 dark:bg-zinc-900/90 border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800 flex flex-col flex-shrink-0">
                {/* Browser Mockup Bar */}
                <div className="w-full h-10 bg-neutral-200/70 dark:bg-neutral-900 flex items-center px-4 gap-2 flex-shrink-0 border-b border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80 inline-block" />
                  </div>
                  <div className="mx-auto px-3 py-0.5 bg-white/70 dark:bg-black/40 rounded-full text-[11px] text-neutral-500 dark:text-neutral-400 font-mono truncate max-w-[240px] flex items-center gap-1.5 border border-black/5 dark:border-white/5">
                    <span>{selectedProject.href.replace("https://", "")}</span>
                  </div>
                </div>

                {/* Preview Frame */}
                <div className="relative flex-grow w-full bg-neutral-950 overflow-hidden">
                  {selectedProject.href ? (
                    <div className="w-full h-full relative">
                      <iframe
                        src={selectedProject.href}
                        className="w-full h-full border-none bg-white"
                        title={selectedProject.title}
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin"
                      />
                      <a
                        href={selectedProject.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-950/80 hover:bg-neutral-950 text-white text-xs backdrop-blur-md border border-white/10 transition-colors shadow-lg"
                      >
                        <span>Open preview</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <Image
                        src={selectedProject.img}
                        alt={selectedProject.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side: Structured Details */}
              <div className="w-full md:w-[46%] p-6 sm:p-8 overflow-y-auto flex flex-col h-full max-h-[58vh] md:max-h-[92vh] bg-white dark:bg-zinc-950">
                {/* Header Info */}
                <div className="flex flex-col mb-5 gap-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {selectedProject.category && (
                        <span className="text-[10px] uppercase tracking-wider font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2.5 py-0.5 rounded-md border border-indigo-200/50 dark:border-indigo-500/20">
                          {selectedProject.category}
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 flex items-center gap-1">
                        <Sparkles size={11} /> Project #{selectedProject.id}
                      </span>
                    </div>

                    {/* Header Quick Links */}
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 transition-colors shadow-xs"
                      >
                        <GithubIcon size={13} />
                        <span>Source</span>
                        <ArrowUpRight size={11} />
                      </a>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900 dark:text-white">
                    {selectedProject.title}
                  </h3>
                </div>

                {/* Main Content Sections */}
                <div className="space-y-5 flex-grow font-light">
                  {/* Overview */}
                  <div>
                    <h4 className="text-[11px] uppercase tracking-wider font-mono text-neutral-400 dark:text-neutral-500 mb-1.5 flex items-center gap-1.5">
                      <Layers size={13} /> Overview
                    </h4>
                    <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Problem Solved Card - Vibrant Sunset Gradient */}
                  {selectedProject.painPoint && (
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-500/15 via-pink-500/10 to-orange-500/15 border border-rose-500/35 dark:border-rose-400/30 shadow-xs relative overflow-hidden">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="p-1 rounded-md bg-rose-500/20 text-rose-600 dark:text-rose-300">
                          <AlertCircle size={14} />
                        </span>
                        <h4 className="text-xs uppercase tracking-wider font-mono font-medium text-rose-700 dark:text-rose-300">
                          The Challenge
                        </h4>
                      </div>
                      <p className="text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm leading-relaxed font-normal">
                        {selectedProject.painPoint}
                      </p>
                    </div>
                  )}

                  {/* Output & Results Card - Vibrant Aurora Cyan/Teal Gradient */}
                  {selectedProject.output && (
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/15 via-teal-500/10 to-emerald-500/15 border border-cyan-500/35 dark:border-teal-400/30 shadow-xs relative overflow-hidden">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="p-1 rounded-md bg-teal-500/20 text-teal-600 dark:text-teal-300">
                          <CheckCircle2 size={14} />
                        </span>
                        <h4 className="text-xs uppercase tracking-wider font-mono font-medium text-teal-700 dark:text-teal-300">
                          Solution & Impact
                        </h4>
                      </div>
                      <p className="text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm leading-relaxed font-normal">
                        {selectedProject.output}
                      </p>
                    </div>
                  )}

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-[11px] uppercase tracking-wider font-mono text-neutral-400 dark:text-neutral-500 mb-2.5">
                      Tech Stack & Tools
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techstack?.map((tech: any, i: number) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-neutral-100 dark:bg-neutral-900 text-xs font-light text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-800/60"
                        >
                          <span className="text-sm">{tech.icon}</span>
                          <span>{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action CTAs */}
                <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-900 flex flex-wrap items-center gap-3">
                  <Link
                    href={selectedProject.href}
                    target="_blank"
                    className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-100 text-xs sm:text-sm font-normal tracking-tight transition-all duration-200 shadow-md group"
                  >
                    <span>Visit Live Site</span>
                    <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white text-xs sm:text-sm font-medium tracking-tight transition-all duration-200 shadow-xs group"
                    >
                      <GithubIcon size={16} className="transition-transform group-hover:scale-110" />
                      <span>Source Code</span>
                      <ArrowUpRight size={13} className="opacity-60 group-hover:opacity-100" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

