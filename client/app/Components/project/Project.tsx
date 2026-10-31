"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { projects, Project as ProjectType } from "../../data/projectData";

// ============================================================================
// CHARACTER-BASED ROLLING TEXT COMPONENT
// Staggered letter-by-letter vertical translation on hover with zero layout shift
// ============================================================================
interface RollingTextProps {
  text: string;
  className?: string;
  stagger?: number;
}

const RollingText: React.FC<RollingTextProps> = ({
  text,
  className = "",
  stagger = 0.014,
}) => {
  return (
    <span className={`inline-flex flex-wrap items-center overflow-hidden leading-tight ${className}`}>
      {text.split("").map((char, index) => {
        if (char === " ") {
          return (
            <span key={index} className="inline-block whitespace-pre">
              &nbsp;
            </span>
          );
        }

        return (
          <span
            key={index}
            className="relative inline-block overflow-hidden align-top"
          >
            {/* Primary character: moves up out of view */}
            <span
              className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/text:-translate-y-full"
              style={{
                transitionDelay: `${index * stagger}s`,
              }}
            >
              {char}
            </span>

            {/* Duplicate character: enters from below into view */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 inline-block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/text:translate-y-0 select-none"
              style={{
                transitionDelay: `${index * stagger}s`,
              }}
            >
              {char}
            </span>
          </span>
        );
      })}
    </span>
  );
};

// ============================================================================
// INDIVIDUAL PROJECT SECTION (ALTERNATING EDITORIAL SPREAD)
// ============================================================================
interface ProjectRowProps {
  project: ProjectType;
  index: number;
}

const ProjectRow: React.FC<ProjectRowProps> = ({
  project,
  index,
}) => {
  const isEven = index % 2 === 0;
  const shouldReduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const cubicEase = [0.16, 1, 0.3, 1] as const;

  // Directional entrance animation matching layout side:
  // Elements on the left enter from -45px; elements on the right enter from +45px.
  const thumbnailVariants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : isDesktop ? (isEven ? -45 : 45) : 0,
      y: shouldReduceMotion ? 0 : isDesktop ? 0 : 28,
      filter: shouldReduceMotion ? "none" : "blur(8px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.85,
        ease: cubicEase,
      },
    },
  };

  const infoVariants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : isDesktop ? (isEven ? 45 : -45) : 0,
      y: shouldReduceMotion ? 0 : isDesktop ? 0 : 28,
      filter: shouldReduceMotion ? "none" : "blur(8px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.85,
        delay: shouldReduceMotion ? 0 : 0.1,
        ease: cubicEase,
      },
    },
  };

  return (
    <article className="w-full py-16 sm:py-24 md:py-32 lg:py-6 border-t border-neutral-200/60 dark:border-neutral-800/60 first:border-t-0">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 xl:gap-24 items-center">
        
        {/* ===================================================================
            THUMBNAIL COLUMN:
            Strict 1:1 Aspect Ratio + Project Name and Actions Directly Beneath
            Desktop Order: Alternates based on index (isEven ? order-1 : order-2)
            Mobile Order: Always comes first (order 1)
           =================================================================== */}
        <motion.div
          variants={thumbnailVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className={`w-full lg:col-span-6 xl:col-span-6 flex flex-col ${
            isEven ? "lg:order-1" : "lg:order-2"
          }`}
        >
          {/* Prominent 1:1 Aspect Ratio Image */}
          <div className="relative w-full aspect-square overflow-hidden rounded-[2px] bg-neutral-100 dark:bg-neutral-900 group/image">
            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full relative cursor-pointer"
                aria-label={`View live deployment of ${project.title}`}
              >
                {project.img && (
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={index < 2}
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/image:scale-[1.025]"
                  />
                )}
              </a>
            ) : (
              project.img && (
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={index < 2}
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/image:scale-[1.025]"
                />
              )
            )}
          </div>

          {/* Project Name & Actions Placed Directly Beneath the Thumbnail */}
          <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 sm:gap-4">
            {/* Project Name (text-lg, medium weight, character-roll on hover, dashed underline) */}
            <div className="group/text inline-block border-b border-dashed border-neutral-400 dark:border-neutral-600 pb-0.5">
              <h3 className="text-base sm:text-lg font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                <RollingText text={project.title} />
              </h3>
            </div>

            {/* Minimal Text Actions: Live Preview ↗ and Source Code ↗ with dashed underline */}
            <div className="flex items-center gap-5 sm:gap-6 text-sm text-neutral-500 dark:text-neutral-400">
              {project.href && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/text inline-flex items-center gap-1.5 text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white transition-colors border-b border-dashed border-neutral-400 dark:border-neutral-600 pb-0.5"
                >
                  <RollingText text="Live Preview" className="text-xs sm:text-sm font-normal" />
                  <span className="inline-block text-xs transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/text:translate-x-0.5 group-hover/text:-translate-y-0.5 opacity-70 group-hover/text:opacity-100 no-underline">
                    ↗
                  </span>
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/text inline-flex items-center gap-1.5 text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white transition-colors border-b border-dashed border-neutral-400 dark:border-neutral-600 pb-0.5"
                >
                  <RollingText text="Source Code" className="text-xs sm:text-sm font-normal" />
                  <span className="inline-block text-xs transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/text:translate-x-0.5 group-hover/text:-translate-y-0.5 opacity-70 group-hover/text:opacity-100 no-underline">
                    ↗
                  </span>
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* ===================================================================
            PROJECT INFORMATION COLUMN:
            Quotation-like Editorial Typography + Circular Technology Containers
            Desktop Order: Alternates based on index (isEven ? order-2 : order-1)
            Mobile Order: Follows thumbnail and actions (order 2)
           =================================================================== */}
        <motion.div
          variants={infoVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className={`w-full lg:col-span-6 xl:col-span-6 flex flex-col justify-center ${
            isEven ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div className="max-w-xl xl:max-w-2xl">
            {/* Project Description (Quotation-like editorial treatment through typography and spacing) */}
            <p className="text-lg sm:text-xl md:text-2xl lg:text-[25px] font-normal text-neutral-800 dark:text-neutral-200 leading-[1.5] sm:leading-[1.55] tracking-[-0.015em]">
              {project.description}
            </p>

            {/* Technology Icons in Consistent Circular Containers (No "Tech Stack" heading) */}
            {project.techstack && project.techstack.length > 0 && (
              <div className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap items-center gap-3">
                {project.techstack.map((tool) => (
                  <div
                    key={tool.name}
                    title={tool.name}
                    className="w-10 h-10 sm:w-11 sm:h-11   rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center bg-transparent text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600 hover:text-black dark:hover:text-white transition-colors duration-200"
                  >
                    <span className="text-base sm:text-3xl flex p-2  items-center justify-center">
                      {tool.icon}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </article>
  );
};

// ============================================================================
// MAIN PROJECTS SECTION (FULL WIDTH EDITORIAL PORTFOLIO)
// ============================================================================
const Project = () => {
  // Preserve original ordering or reverse by id if preferred
  const projectsList = [...projects].sort((a, b) => b.id - a.id);

  return (
    <section
      className="w-full py-20 sm:py-28 md:py-36 bg-transparent text-foreground relative font-geist"
      id="projects"
    >
      {/* Full-Width Fluid Container with Generous Studio Padding */}
      <div className="w-full px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 2xl:px-32">
        
        {/* ===================================================================
            SECTION HEADER: MINIMAL & EDITORIAL
           =================================================================== */}
        <header className="w-full mb-16 sm:mb-24 md:mb-28 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-neutral-200/60 dark:border-neutral-800/60">
          <div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.035em] text-neutral-950 dark:text-white leading-[1.05]">
              Proof of Work
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-normal text-neutral-500 dark:text-neutral-400 max-w-sm text-left md:text-right leading-relaxed">
            A curated index of production applications, interactive web systems, and full-stack digital products.
          </p>
        </header>

        {/* ===================================================================
            ALTERNATING EDITORIAL PROJECTS LIST
           =================================================================== */}
        <div className="w-full flex flex-col">
          {projectsList.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Project;
