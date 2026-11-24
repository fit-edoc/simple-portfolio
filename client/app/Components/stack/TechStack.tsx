import React from "react";

interface StackGroup {
  title: string;
  icon: string;
  items: [icon: string, name: string][];
}

const GROUPS: StackGroup[] = [
  {
    title: "Frontend",
    icon: "desk",
    items: [
      ["next", "Next.js"],
      ["tailwind", "Tailwind CSS"],
      ["ts", "TypeScript"],
      ["framer", "Framer Motion"],
      ["gsap", "GSAP"],
    ],
  },
  {
    title: "Backend",
    icon: "term",
    items: [
      ["node", "Node.js"],
      ["express", "Express"],
      ["ts", "TypeScript"],
      ["npm", "npm"],
      ["bun", "Bun"],
    ],
  },
  {
    title: "Infrastructure",
    icon: "globe",
    items: [
      ["aws", "AWS"],
      ["vercel", "Vercel"],
      ["render", "Render"],
    ],
  },
  {
    title: "Databases",
    icon: "db",
    items: [
      ["mongo", "MongoDB"],
      ["pg", "PostgreSQL"],
      ["supabase", "Supabase"],
      ["mysql", "MySQL"],
    ],
  },
  {
    title: "ORM",
    icon: "swap",
    items: [["drizzle", "Drizzle"]],
  },
  {
    title: "Tooling",
    icon: "toolbox",
    items: [
      ["github", "GitHub"],
      ["git", "Git"],
      ["postman", "Postman"],
    ],
  },
  {
    title: "AI",
    icon: "spark",
    items: [["rag", "RAG"]],
  },
];

const ICONS: Record<string, React.ReactNode> = {
  desk: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  term: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M7 9.5l3 2.5-3 2.5M12.5 15H17" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9S14.5 18.3 12 21c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
    </>
  ),
  db: (
    <>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
    </>
  ),
  swap: <path d="M4 8h13l-3-3.5M20 16H7l3 3.5" />,
  toolbox: (
    <>
      <rect x="3" y="8" width="18" height="12" rx="2.5" />
      <path d="M9 8V6.5A1.5 1.5 0 0 1 10.5 5h3A1.5 1.5 0 0 1 15 6.5V8M3 13.5h18M11 13.5V16h2v-2.5" />
    </>
  ),
  spark: (
    <>
      <path d="M11 3l1.9 5.6L18.5 10.5 12.9 12.4 11 18l-1.9-5.6L3.5 10.5l5.6-1.9zM18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
    </>
  ),
  next: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.2 16V8.2L16 17M15.8 8v4" />
    </>
  ),
  tailwind: (
    <path d="M3 10c2.4-4.2 5-4.2 7.5-2s5.1 2 7.5-1M3 17c2.4-4.2 5-4.2 7.5-2s5.1 2 7.5-1" />
  ),
  ts: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4.5" />
      <path d="M7.5 11h5M10 11v6.5M16.8 11.3c-.9-.5-2.4-.5-2.8.4-.5 1 .7 1.5 1.6 1.8 1 .4 1.6 1 1.2 1.9-.5.9-2.1.8-3 .1" />
    </>
  ),
  framer: <path d="M6 3h12v6h-6zM6 9h6l6 6H6zM6 15h6v6z" />,
  gsap: (
    <>
      <path d="M3.5 19c6.5 0 6-13.5 17-13.5" />
      <circle cx="3.5" cy="19" r="1.6" fill="currentColor" />
      <circle cx="20.5" cy="5.5" r="1.6" fill="currentColor" />
    </>
  ),
  node: (
    <>
      <path d="M12 2.5l8 4.6v9.8l-8 4.6-8-4.6V7.1z" />
      <circle cx="12" cy="12" r="2.3" fill="currentColor" />
    </>
  ),
  express: (
    <path d="M4 8h14m-3.5-3.5L18 8l-3.5 3.5M20 16H6m3.5-3.5L6 16l3.5 3.5" />
  ),
  npm: (
    <>
      <rect x="2.5" y="6.5" width="19" height="11" rx="2" />
      <text
        x="12"
        y="14.4"
        textAnchor="middle"
        fontSize="6.2"
        fontWeight="700"
        fill="currentColor"
        stroke="none"
        fontFamily="Inter, sans-serif"
      >
        npm
      </text>
    </>
  ),
  bun: (
    <>
      <path d="M12 4c5 0 8.5 3 8.5 7.2 0 4.6-3.8 8.3-8.5 8.3s-8.5-3.7-8.5-8.3C3.5 7 7 4 12 4z" />
      <circle cx="9" cy="12.5" r=".9" fill="currentColor" />
      <circle cx="15" cy="12.5" r=".9" fill="currentColor" />
      <path d="M10.5 15.5c.9.7 2.1.7 3 0" />
    </>
  ),
  aws: (
    <path d="M6.8 19A4.3 4.3 0 0 1 6 10.5a6 6 0 0 1 11.5 1.2A3.7 3.7 0 0 1 17.5 19z" />
  ),
  vercel: <path d="M12 4.5l9 15.5H3z" fill="currentColor" />,
  render: (
    <>
      <rect x="3" y="4" width="18" height="6.5" rx="2" />
      <rect x="3" y="13.5" width="18" height="6.5" rx="2" />
      <path d="M7 7.25h.01M7 16.75h.01" />
    </>
  ),
  mongo: (
    <>
      <path d="M12 2.5c3.2 3.2 5 6.3 5 9.8 0 3.4-1.9 6.2-5 8.2-3.1-2-5-4.8-5-8.2 0-3.5 1.8-6.6 5-9.8z" />
      <path d="M12 9v13" />
    </>
  ),
  pg: (
    <>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
      <path d="M10 13l2 2 4-4" />
    </>
  ),
  supabase: <path d="M13 2.5L4.5 13.5H11l-1 8 8.5-11H12z" />,
  mysql: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
      <path d="M3.5 10h17M3.5 14.5h17M10 5v14" />
    </>
  ),
  drizzle: (
    <>
      <path d="M12 3c2.8 3.6 4.5 6.3 4.5 8.8a4.5 4.5 0 0 1-9 0C7.5 9.3 9.2 6.6 12 3z" />
      <path d="M6 19l-1 2.2M12 19l-1 2.2M18 19l-1 2.2" />
    </>
  ),
  github: (
    <>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </>
  ),
  git: (
    <>
      <circle cx="6" cy="5.5" r="2" />
      <circle cx="6" cy="18.5" r="2" />
      <circle cx="18" cy="9" r="2" />
      <path d="M6 7.5v9M18 11c0 4-6 3-10.5 6" />
    </>
  ),
  postman: (
    <path d="M6 12L3.3 3.1A59.8 59.8 0 0 1 21.5 12 59.8 59.8 0 0 1 3.3 20.9L6 12zm0 0h7.5" />
  ),
  rag: (
    <>
      <path d="M12.5 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h3.5" />
      <path d="M12.5 3.5L18 9v1.5" />
      <path d="M12.5 3.5V9H18" />
      <circle cx="16" cy="16.5" r="3.2" />
      <path d="M18.4 19l2.6 2.5" />
    </>
  ),
};

const renderIcon = (name: string, className: string) => {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name] || <circle cx="12" cy="12" r="8" />}
    </svg>
  );
};

export const TechStack: React.FC = () => {
  const totalCount = GROUPS.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="bg-white text-black px-6 pb-20 md:px-12 md:pb-28 font-sans"
    >
      <h2
        id="stack-title"
        className="text-lg md:text-xl font-semibold tracking-tight text-left"
      >
        Tech stack{" "}
       
      </h2>
      <p className="mt-3 max-w-xl text-base md:text-lg leading-relaxed text-black/55 text-left">
        The tools behind the products I ship, grouped by where they belong.
      </p>

      {/* Grid: 3 cols desktop, 2 cols tab, 1 col mobile */}
      <div
        id="stack-grid"
        className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14"
      >
        {GROUPS.map((g) => (
          <div key={g.title}>
            {/* Category Header */}
            <div className="flex items-center gap-3">
             
              <h3 className="text-xl font-semibold tracking-tight text-black">
                {g.title}
              </h3>
            </div>

            {/* Dashed divider */}
            <div className="dash my-3" aria-hidden="true" />

            {/* Wrap Items */}
            <ul className="flex flex-wrap gap-x-6 gap-y-4">
              {g.items.map(([ic, name]) => (
                <li
                  key={name}
                  className="row flex items-center gap-1 select-none cursor-default"
                >
                  <span className="tile grid h-9 w-9 shrink-0 place-items-center rounded-xl text-black">
                    {renderIcon(ic, "h-[18px] w-[18px]")}
                  </span>
                  <span className="text-base font-medium text-black">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStack;
