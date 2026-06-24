"use client";

import React, { useState, useEffect } from "react";
import { projects, Project as ProjectType } from "../../data/projectData";
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
  const [imgError, setImgError] = useState(false);

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
        className="group relative cursor-pointer bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 hover:shadow-xl transition-all duration-300 flex flex-col h-full"
      >
        {/* Image Container */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-zinc-900 border-b border-black/5 dark:border-white/5">
          <motion.div
            layoutId={`project-image-wrapper-${project.id}`}
            transition={modalTransition}
            className="w-full h-full relative"
          >
            {!imgError ? (
              <Image
                src={project.img}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                onError={() => setImgError(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-indigo-500/80 via-purple-600/80 to-pink-500/80 flex items-center justify-center">
                <span className="text-white font-heading font-bold opacity-80">{project.title}</span>
              </div>
            )}
          </motion.div>
          
          {/* Glow Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end p-4">
            <span className="text-xs text-white/90 font-medium tracking-wider uppercase">View Project Details</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-center mb-3">
            <motion.h3
              layoutId={`project-title-${project.id}`}
              transition={modalTransition}
              className="text-lg font-heading font-bold text-gray-900 dark:text-white transition-colors group-hover:text-neutral-400 dark:group-hover:text-neutral-50"
            >
              {project.title}
            </motion.h3>
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              <Link
                href={project.href}
                target="_blank"
                className="p-1.5 rounded-full bg-gray-100/80 dark:bg-zinc-900/80 text-gray-600 dark:text-gray-300 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-black transition-colors"
              >
                <ArrowUpRight size={14} />
              </Link>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full bg-gray-100/80 dark:bg-zinc-900/80 text-gray-600 dark:text-gray-300 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-black transition-colors"
                >
                  <GithubIcon size={14} />
                </a>
              )}
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-xs mb-4 line-clamp-2 leading-relaxed font-sans">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="mt-auto pt-3 border-t border-black/5 dark:border-white/5">
            <div className="flex flex-wrap gap-1.5">
              {project.techstack?.slice(0, 3).map((tech: any, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-[10px] font-medium text-gray-600 dark:text-gray-300 border border-black/5 dark:border-white/5"
                >
                  <span>{tech.icon}</span>
                  <span>{tech.name}</span>
                </div>
              ))}
              {project.techstack && project.techstack.length > 3 && (
                <div className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/5 text-[9px] font-medium text-gray-500 dark:text-gray-400 font-sans">
                  +{project.techstack.length - 3} more
                </div>
              )}
            </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="relative bg-white dark:bg-zinc-950 rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl w-full max-w-2xl z-10 max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 text-white hover:bg-black/70 transition-colors backdrop-blur-sm"
              >
                <X size={18} />
              </button>

              {/* Banner Image */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-gray-100 dark:bg-zinc-900 border-b border-black/5 dark:border-white/5">
                <motion.div
                  layoutId={`project-image-wrapper-${selectedProject.id}`}
                  transition={modalTransition}
                  className="w-full h-full relative"
                >
                  <Image
                    src={selectedProject.img}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 overflow-y-auto flex-grow">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                  <motion.h3
                    layoutId={`project-title-${selectedProject.id}`}
                    transition={modalTransition}
                    className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 dark:text-white"
                  >
                    {selectedProject.title}
                  </motion.h3>

                  <div className="flex gap-2">
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

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 font-heading">
                      About the Project
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line font-sans">
                      {selectedProject.description}
                    </p>
                  </div>

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
