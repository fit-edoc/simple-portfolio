import React from "react";
import ProductFavicon from "./ProductFavicon";

export interface ShippedProduct {
  name: string;
  description: string;
  year: string;
  stack: string[];
  href: string;
  icon?: string;
  note?: string;
}

export const SHIPPED_PRODUCTS: ShippedProduct[] = [
  {
    name: "Prospail",
    description:
      "An autonomous GTM intelligence and real-time lead enrichment platform designed to discover verified B2B buyers with live signal evidence, vector grounding, and automated CRM sync.",
    year: "2025",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Drizzle"],
    href: "https://prospail.vercel.app/",
    icon: "/favicons/prospail.png",
    note: "Live signal enrichment",
  },
  {
    name: "WayHyre",
    description:
      "An advanced recruitment platform designed to help HR professionals filter applications and access real-time salary intelligence based on live market conditions.",
    year: "2024",
    stack: ["React", "Node.js", "MongoDB", "Redux", "Tailwind CSS"],
    href: "https://wayhyre.himanshudocs.online/",
    icon: "/favicons/wayhyre.png",
    note: "Resume analyzer & salary data",
  },
  {
    name: "Crawson",
    description:
      "A high-performance web scraper that extracts structural data, meta tags, links, images, and descriptions from any URL with an instant live preview.",
    year: "2024",
    stack: ["Next.js", "TypeScript", "FastAPI", "Tailwind CSS"],
    href: "https://crawson.vercel.app",
    icon: "/favicons/crawson.png",
    note: "Live web scraper",
  },
  {
    name: "Better Way",
    description:
      "A screenshot editor that converts standard screen captures into presentation-ready visuals with dynamic gradients, exporting to both image and video formats.",
    year: "2024",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    href: "https://betterwayone.vercel.app/",
    icon: "/favicons/betterway.png",
    note: "Screenshot & video export",
  },
  {
    name: "ATS PROB",
    description:
      "An AI-based tool designed to analyze and optimize resumes against job descriptions to surface missing keyword signals and actionable improvements.",
    year: "2024",
    stack: ["Next.js", "TypeScript", "Node.js", "Tailwind CSS"],
    href: "https://ats-resume-snowy.vercel.app/",
    icon: "/favicons/atsprob.png",
    note: "Resume keyword analysis",
  },
  {
    name: "InstaGen",
    description:
      "An interface tool that generates realistic Instagram-style profiles, posts, and interactive comment mockups for creative layouts and testing.",
    year: "2023",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    href: "https://instagen-three.vercel.app/",
    icon: "/favicons/instagen.png",
    note: "Social mockup tool",
  },
];

export const ShippedProducts: React.FC = () => {
  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="w-full bg-white text-black font-sans px-6 md:px-12 py-20 md:py-28"
    >
      <div className="max-w-3xl text-left">
        {/* Section Heading */}
        <h2
          id="products-heading"
          className="text-lg md:text-xl font-semibold tracking-tight text-black"
        >
          Products I've shipped
          
        </h2>

        {/* Product List */}
        <ul
          className="group/list flex flex-col gap-10 md:gap-12 mt-10 md:mt-12"
          role="list"
        >
          {SHIPPED_PRODUCTS.map((product) => (
            <li key={product.name}>
              <a
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 md:gap-5 group/item transition-opacity duration-300 group-hover/list:opacity-35 hover:!opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-8 rounded-2xl"
              >
                {/* Left: Favicon Tile */}
                <ProductFavicon
                  name={product.name}
                  href={product.href}
                  icon={product.icon}
                />

                {/* Right: Details */}
                <div className="flex-1 min-w-0">
                  {/* Name with ↗ arrow */}
                  <h3 className="text-2xl  font-semibold tracking-tight text-black inline-flex items-center gap-1.5">
                    <span>{product.name}</span>
                    <span
                      className="inline-block transition-all duration-300 ease-out opacity-0 -translate-x-1 translate-y-1 text-black group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:translate-y-0 motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:transition-none select-none"
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </h3>

                  {/* Description */}
                  <p className="text-base md:text-lg leading-relaxed text-black/55 max-w-xl mt-1.5">
                    {product.description}
                  </p>

                  {/* Meta Row */}
                  <div className="text-sm text-black/40 flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-3">
                    <span className="tabular-nums">{product.year}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.stack.join(", ")}</span>
                   
                    
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ShippedProducts;
