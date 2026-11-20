"use client";

import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import PixelIcon from "./PixelIcon";

export type TechCategory = "Frontend" | "Backend" | "Infra" | "Deploy" | "Tools";

export interface TechItem {
  name: string;
  category: TechCategory;
  icon: string;
}

export const CATEGORIES: TechCategory[] = [
  "Frontend",
  "Backend",
  "Infra",
  "Deploy",
  "Tools",
];

// Data-driven list: add or remove technologies easily
export const TECH_STACK: TechItem[] = [
  // 1. Frontend
  { name: "React", category: "Frontend", icon: "/icons/react.svg" },
  { name: "Next.js", category: "Frontend", icon: "/icons/nextjs.svg" },
  { name: "TypeScript", category: "Frontend", icon: "/icons/typescript.svg" },
  { name: "Tailwind CSS", category: "Frontend", icon: "/icons/tailwind.svg" },
  { name: "JavaScript", category: "Frontend", icon: "/icons/javascript.svg" },
  { name: "Three.js", category: "Frontend", icon: "/icons/threejs.svg" },

  // 2. Backend
  { name: "Node.js", category: "Backend", icon: "/icons/nodejs.svg" },
  { name: "Express", category: "Backend", icon: "/icons/express.svg" },
  { name: "PostgreSQL", category: "Backend", icon: "/icons/postgresql.svg" },
  { name: "MongoDB", category: "Backend", icon: "/icons/mongodb.svg" },
  { name: "Redis", category: "Backend", icon: "/icons/redis.svg" },
  { name: "FastAPI", category: "Backend", icon: "/icons/fastapi.svg" },

  // 3. Infra
  { name: "AWS", category: "Infra", icon: "/icons/aws.svg" },
  { name: "Docker", category: "Infra", icon: "/icons/docker.svg" },
  { name: "Linux", category: "Infra", icon: "/icons/linux.svg" },
  { name: "Nginx", category: "Infra", icon: "/icons/nginx.svg" },

  // 4. Deploy
  { name: "Vercel", category: "Deploy", icon: "/icons/vercel.svg" },
  { name: "Netlify", category: "Deploy", icon: "/icons/netlify.svg" },
  { name: "GitHub Actions", category: "Deploy", icon: "/icons/githubactions.svg" },
  { name: "CI / CD", category: "Deploy", icon: "/icons/cicd.svg" },

  // 5. Tools
  { name: "Git", category: "Tools", icon: "/icons/git.svg" },
  { name: "VS Code", category: "Tools", icon: "/icons/vscode.svg" },
  { name: "Figma", category: "Tools", icon: "/icons/figma.svg" },
  { name: "Postman", category: "Tools", icon: "/icons/postman.svg" },
];

/**
 * Individual Tech Tile: circular black icon (rounded-full bg-black p-2) with tech name at the bottom.
 */
interface TechTileProps {
  tech: TechItem;
  index: number;
}

const TechTile: React.FC<TechTileProps> = ({ tech, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const tileRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tileRef.current) return;
    const rect = tileRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setMousePos({ x, y });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    handleMouseMove(e);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos(null);
  };

  return (
    <motion.div
      ref={tileRef}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.03 }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="article"
      aria-label={tech.name}
      className="group flex flex-col items-center cursor-pointer select-none bg-transparent"
    >
      {/* Circular Black Icon Container */}
      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black p-2 flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 ease-out group-hover:scale-110">
        <PixelIcon
          icon={tech.icon}
          name={tech.name}
          gridSize={20}
          radiusRatio={0.40}
          isHovered={isHovered}
          mousePos={mousePos}
        />
      </div>

      {/* Tech Name at the bottom of the icon */}
      <span className="mt-2 font-mono text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-200 text-center truncate max-w-[90px]">
        {tech.name}
      </span>
    </motion.div>
  );
};

export const Skill: React.FC = () => {
  return (
    <section
      className="w-full py-16 sm:py-24 md:py-28 bg-white text-neutral-950 dark:bg-black dark:text-white relative overflow-hidden font-sans border-t border-black/10 dark:border-white/10"
      id="skills"
    >
      <div className="max-w-7xl mx-auto px-6 border-x-[0.5px] border-black/10 dark:border-white/10">
        
        {/* ===================================================================
            SECTION HEADER
           =================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 rounded-2xl border-b border-black/15 dark:border-white/10"
        >
          <div className="flex flex-col items-start text-left">
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold mb-2">
              Technical Capabilities
            </span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.035em] text-neutral-950 dark:text-white leading-[1.05]">
              Tech Stack
            </h2>
          </div>

          
        </motion.div>

        {/* ===================================================================
            CATEGORIES LIST (Frontend, Backend, Infra, Deploy, Tools)
           =================================================================== */}
        <div className="flex flex-col gap-10 sm:gap-12">
          {CATEGORIES.map((category) => {
            const categoryItems = TECH_STACK.filter(
              (item) => item.category === category
            );

            return (
              <div key={category} className="flex flex-col">
                
                {/* Category Heading without orange dot, separation border, or total count */}
                <div className="mb-4 sm:mb-5">
                  <h3 className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
                    {category}
                  </h3>
                </div>

                {/* Row of circular icons with names below */}
                <div className="flex flex-wrap items-start gap-x-5 sm:gap-x-7 md:gap-x-8 gap-y-5 sm:gap-y-6">
                  {categoryItems.map((tech, idx) => (
                    <TechTile key={tech.name} tech={tech} index={idx} />
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Skill;
