import React from "react";

interface SocialItem {
  name: string;
  href: string;
  bg: string;
  icon: React.ReactNode;
}

const SOCIAL_ITEMS: SocialItem[] = [
  {
    name: "GitHub",
    href: "https://github.com/fit-edoc",
    bg: "linear-gradient(145deg,#a99bff,#5b45e0)",
    icon: (
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/himanshu-verma-docs",
    bg: "linear-gradient(145deg,#6fd3ff,#1d7bf0)",
    icon: (
      <path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.3zM5.3 7.4a2.1 2.1 0 1 1 0-4.1 2.1 2.1 0 0 1 0 4.1zm1.8 13.1H3.6V9h3.5v11.5z" />
    ),
  },
  {
    name: "X",
    href: "https://x.com/fitedocc",
    bg: "linear-gradient(145deg,#ff9ec4,#ec4a8a)",
    icon: (
      <path d="M18.9 1.2h3.7l-8 9.2L24 22.8h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9 6.1-6.9zm-1.3 19.4h2L6.5 3.2H4.3l13.3 17.4z" />
    ),
  },
  {
    name: "Email",
    href: "mailto:himanshuverma2660@gmail.com",
    bg: "linear-gradient(145deg,#ffc27a,#ff6b4a)",
    icon: (
      <>
        <rect
          x="3"
          y="5.5"
          width="18"
          height="13"
          rx="3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
        />
        <path
          d="M4.5 8l7.5 5.5L19.5 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
  },
];

export const SocialIcons: React.FC = () => {
  return (
    <div id="socials" className="flex items-center gap-5">
      {SOCIAL_ITEMS.map((item) => (
        <a
          key={item.name}
          className="puffy grid place-items-center w-14 h-14 md:w-16 md:h-16 rounded-3xl text-white select-none"
          style={{ background: item.bg }}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.name}
          title={item.name}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7 md:w-8 md:h-8"
            fill="currentColor"
            aria-hidden="true"
          >
            {item.icon}
          </svg>
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
