"use client";

import React from "react";

interface StackGroup {
  title: string;
  items: string[];
}

const GROUPS: StackGroup[] = [
  {
    title: "Frontend",
    items: ["Next.js", "Tailwind CSS", "TypeScript", "Framer Motion", "GSAP"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "TypeScript", "npm", "Bun"],
  },
  {
    title: "Infrastructure",
    items: ["AWS", "Vercel", "Render"],
  },
  {
    title: "Databases",
    items: ["MongoDB", "PostgreSQL", "Supabase", "MySQL"],
  },
  {
    title: "ORM",
    items: ["Drizzle"],
  },
  {
    title: "Tooling",
    items: ["GitHub", "Git", "Postman"],
  },
  {
    title: "AI",
    items: ["RAG"],
  },
];

const ICONS: Record<string, React.ReactNode> = {
  "Next.js": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] shrink-0 block">
      <circle cx="12" cy="12" r="9" />
      <path d="M9 16V8l7 9V8" />
    </svg>
  ),
  "Tailwind CSS": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px] shrink-0 block">
      <path d="M12 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.3 1 1 2.1 2.2 4.6 2.2 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.3C15.6 7.2 14.5 6 12 6zM7 12c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.7 1.9 1.3 1 1 2.1 2.2 4.6 2.2 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.7-1.9-1.3C10.6 13.2 9.5 12 7 12z" />
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] shrink-0 block">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7 11h5M9.5 11v6M17 11.5c-.5-.4-1.2-.5-1.8-.5-1 0-1.7.5-1.7 1.3 0 1.8 3.5 1.1 3.5 3.1 0 .9-.8 1.6-2 1.6-.8 0-1.5-.2-2-.6" />
    </svg>
  ),
  "Framer Motion": (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px] shrink-0 block">
      <path d="M4 3h16v6h-8L4 3zm0 6h8l8 6H4V9zm0 6h8v6l-8-6z" />
    </svg>
  ),
  GSAP: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] shrink-0 block">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  ),
  "Node.js": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" className="w-[14px] h-[14px] shrink-0 block">
      <polygon points="12 2 21 7 21 17 12 22 3 17 3 7 12 2" />
    </svg>
  ),
  Express: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] shrink-0 block">
      <path d="M4 8h7M4 12h5M4 16h7M14 9l6 7M20 9l-6 7" />
    </svg>
  ),
  npm: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" className="w-[14px] h-[14px] shrink-0 block">
      <rect x="3" y="6" width="18" height="12" rx="1" />
      <path d="M9 18v-6h3v6M15 12v6" />
    </svg>
  ),
  Bun: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-[14px] h-[14px] shrink-0 block">
      <ellipse cx="12" cy="13" rx="8" ry="6" />
      <circle cx="9.5" cy="12" r="1" fill="currentColor" />
      <circle cx="14.5" cy="12" r="1" fill="currentColor" />
      <path d="M10.5 15c.9.7 2.1.7 3 0" />
    </svg>
  ),
  AWS: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] shrink-0 block">
      <path d="M6.5 15a4 4 0 0 1-.5-7.9A5.5 5.5 0 0 1 16.8 6 4 4 0 0 1 17.5 15H6.5z" />
      <path d="M5 19c4 2 10 2 14 0" />
    </svg>
  ),
  Vercel: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px] shrink-0 block">
      <polygon points="12 4 22 20 2 20" />
    </svg>
  ),
  Render: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[14px] h-[14px] shrink-0 block">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <circle cx="15" cy="9" r="2" fill="currentColor" />
      <path d="M4 16l6-6 4 4 6-4" />
    </svg>
  ),
  MongoDB: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] shrink-0 block">
      <path d="M12 3c4 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 2-7 6-11z" />
      <path d="M12 8v13" />
    </svg>
  ),
  PostgreSQL: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-[14px] h-[14px] shrink-0 block">
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
    </svg>
  ),
  Supabase: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px] shrink-0 block">
      <path d="M13 3L4 14h7v7l9-11h-7V3z" />
    </svg>
  ),
  MySQL: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] shrink-0 block">
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  ),
  Drizzle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-[14px] h-[14px] shrink-0 block">
      <path d="M8 5l-3 6M14 5l-3 6M20 5l-3 6M6 14l-2 5M12 14l-2 5M18 14l-2 5" />
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px] shrink-0 block">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.84c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
    </svg>
  ),
  Git: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-[14px] h-[14px] shrink-0 block">
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <path d="M6 8.5v7M8.5 6h7M18 8.5c0 4-3 5.5-9.5 5.5" />
    </svg>
  ),
  Postman: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] shrink-0 block">
      <circle cx="12" cy="12" r="9" />
      <path d="M9 15l7-7M11 8h5v5" />
    </svg>
  ),
  RAG: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] shrink-0 block">
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="M10.8 6.7L6.2 16.3M13.2 6.7l4.6 9.6M7 18h10" />
    </svg>
  ),
};

const TechChip: React.FC<{ name: string }> = ({ name }) => {
  return (
    <span className="chip group/chip inline-flex items-center text-sm border-none py-1 px-2 rounded cursor-default transition-colors duration-150 hover:bg-[#97c1ff] hover:text-[#0c1b33]">
      <i
        aria-hidden="true"
        className="ti inline-flex items-center justify-center w-0 mr-0 opacity-0 overflow-hidden scale-50 transition-[width,margin-right,opacity,transform] duration-[220ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/chip:w-[15px] group-hover/chip:mr-1.5 group-hover/chip:opacity-100 group-hover/chip:scale-100"
      >
        {ICONS[name] || null}
      </i>
      <span>{name}</span>
    </span>
  );
};

export const TechStack: React.FC = () => {
  return (
    <section className="px-[8%] pt-[clamp(64px,8vw,120px)] pb-[clamp(56px,8vw,110px)] border-t border-[var(--cell)]/40">
      <h2 className="m-0 mb-[22px] font-normal text-[clamp(22px,2.6vw,32px)]">
        Tech stack
      </h2>
      <p className="sub -mt-2.5 mb-7 text-sm" style={{ color: "var(--mut)" }}>
        The tools behind the products I ship, grouped by where they belong.
      </p>

      <div className="stack grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-9 gap-y-7">
        {GROUPS.map((group) => (
          <div key={group.title} className="g">
            <h4
              className="m-0 mb-2.5 font-normal text-xs"
              style={{ color: "var(--mut)" }}
            >
              {group.title}
            </h4>
            <div className="chips flex flex-wrap gap-x-2.5 gap-y-1.5">
              {group.items.map((item) => (
                <TechChip key={item} name={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
