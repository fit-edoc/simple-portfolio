"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  CategoryKeysCanvas,
  HeroIconCanvas,
  CATEGORIZED_TECHS,
  TechItem,
} from "./KeycapKeyboard";

type CategoryKey = "Frontend" | "Backend" | "Infra & Deployment" | "Tools";

const CATEGORIES: CategoryKey[] = [
  "Frontend",
  "Backend",
  "Infra & Deployment",
  "Tools",
];

const Skill = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("Frontend");
  const [selectedTech, setSelectedTech] = useState<TechItem>(
    CATEGORIZED_TECHS["Frontend"][0]
  );

  // When category changes, set active tech to the first key in that category
  const handleCategoryChange = (category: CategoryKey) => {
    setActiveCategory(category);
    setSelectedTech(CATEGORIZED_TECHS[category][0]);
  };

  return (
    <section
      className="py-20 sm:py-0 w-full overflow-hidden bg-transparent relative font-geist"
      id="skills"
    >
      <div className="max-w-6xl mx-auto px-6 border-x-[0.5px] border-black/10 dark:border-white/10">
        
        {/* ===================================================================
            SECTION HEADER
           =================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12 pb-6 border-b border-neutral-200/60 dark:border-neutral-800/60"
        >
          <div className="flex flex-col items-start text-left">
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.035em] text-neutral-950 dark:text-white leading-[1.05]">
              Technical Stack
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-normal text-neutral-500 dark:text-neutral-400 max-w-md text-left md:text-right leading-relaxed">
            A curated set of technologies, frameworks, and cloud tooling I use to design, build, and deploy production-grade software and scalable digital systems.
          </p>
        </motion.div>

        {/* ===================================================================
            CATEGORY TABS (Frontend, Backend, Infra & Deployment, Tools)
           =================================================================== */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-8">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            const count = CATEGORIZED_TECHS[category].length;

            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-1.5 rounded-lg text-xs sm:text-sm font-mono tracking-tight transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-md"
                    : "bg-neutral-100 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600"
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded ${
                    isActive
                      ? "bg-white/20 dark:bg-black/20 text-white dark:text-black"
                      : "bg-neutral-200 dark:bg-neutral-800 text-neutral-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ===================================================================
            SPLIT LAYOUT:
            LEFT: Available 3D Category Keycaps (Small smooth keys, clickable)
            RIGHT: Just Show the Icon (Hero Keycap / Icon Showcase)
           =================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch"
        >
          {/* Left: Available Keys in Category (58% width on desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <CategoryKeysCanvas
              category={activeCategory}
              onSelectTech={(tech) => setSelectedTech(tech)}
              selectedTech={selectedTech}
            />
          </div>

          {/* Right: Just Show the Icon (42% width on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <HeroIconCanvas tech={selectedTech} />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Skill;
