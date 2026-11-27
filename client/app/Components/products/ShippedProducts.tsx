"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Product {
  name: string;
  slug: string;
  href: string;
  desc: string;
  year: string;
  stack: string;
  icon: string;
}

const PRODUCTS: Product[] = [
  {
    name: "Prospail",
    slug: "prospail",
    href: "https://prospail.vercel.app/",
    desc: "An autonomous GTM intelligence and real-time lead enrichment platform designed to discover verified B2B buyers with live signal evidence, vector grounding, and automated CRM sync.",
    year: "2025",
    stack: "Next.js, TypeScript, Node.js, PostgreSQL, Drizzle",
    icon: "/favicons/prospail.png",
  },
  {
    name: "WayHyre",
    slug: "wayhyre",
    href: "https://wayhyre.himanshudocs.online/",
    desc: "An advanced recruitment platform designed to help HR professionals filter applications and access real-time salary intelligence based on live market conditions.",
    year: "2024",
    stack: "React, Node.js, MongoDB, Redux, Tailwind CSS",
    icon: "/favicons/wayhyre.png",
  },
  {
    name: "Crawson",
    slug: "crawson",
    href: "https://crawson.vercel.app",
    desc: "A high-performance web scraper that extracts structural data, meta tags, links, images, and descriptions from any URL with an instant live preview.",
    year: "2024",
    stack: "Next.js, TypeScript, FastAPI, Tailwind CSS",
    icon: "/favicons/crawson.png",
  },
  {
    name: "Better Way",
    slug: "better-way",
    href: "https://betterwayone.vercel.app/",
    desc: "A screenshot editor that converts standard screen captures into presentation-ready visuals with dynamic gradients, exporting to both image and video formats.",
    year: "2024",
    stack: "Next.js, TypeScript, Tailwind CSS",
    icon: "/favicons/betterway.png",
  },
  {
    name: "ATS PROB",
    slug: "ats-prob",
    href: "https://ats-resume-snowy.vercel.app/",
    desc: "An AI-based tool designed to analyze and optimize resumes against job descriptions to surface missing keyword signals and actionable improvements.",
    year: "2024",
    stack: "Next.js, TypeScript, Node.js, Tailwind CSS",
    icon: "/favicons/atsprob.png",
  },
  {
    name: "InstaGen",
    slug: "instagen",
    href: "https://instagen-three.vercel.app/",
    desc: "An interface tool that generates realistic Instagram-style profiles, posts, and interactive comment mockups for creative layouts and testing.",
    year: "2023",
    stack: "Next.js, TypeScript, Tailwind CSS",
    icon: "/favicons/instagen.png",
  },
];

const CELL_COUNT = 28;

const ProductRow: React.FC<{ product: Product; index: number }> = ({
  product,
  index,
}) => {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      io.observe(el);
      return () => io.disconnect();
    } else {
      el.classList.add("in");
    }
  }, []);

  return (
    <div
      ref={rowRef}
      className="row group relative grid grid-cols-[34px_1fr] min-[701px]:grid-cols-[34px_1fr_auto] gap-x-[18px] gap-y-[6px] py-[22px] border-none text-inherit no-underline items-start transition-[padding-left] duration-[180ms] ease-out hover:pl-[10px]"
      style={
        {
          "--row-delay": `${index * 70}ms`,
        } as React.CSSProperties
      }
    >
      {/* Borderless real favicon (only icon) */}
      <a
        href={product.href}
        target="_blank"
        rel="noopener noreferrer"
        className="bd relative w-[32px] h-[32px] shrink-0 flex items-center justify-center transition-transform duration-150 select-none group-hover:scale-110"
        aria-label={`${product.name} live application`}
      >
        {!imgError ? (
          <img
            src={product.icon}
            alt=""
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain block"
          />
        ) : (
          <span
            className="font-semibold text-base select-none"
            style={{ color: "var(--link)" }}
          >
            {product.name[0]}
          </span>
        )}
      </a>

      {/* Product Body */}
      <div className="pbody max-w-[60ch] w-full min-w-0">
        <h3 className="m-0 font-normal text-[clamp(18px,2vw,22px)] transition-colors duration-150 group-hover:text-[var(--link)]">
          <a
            href={product.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-inherit no-underline hover:text-[var(--link)]"
          >
            <span>{product.name}</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 opacity-70 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
              aria-hidden="true"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </h3>
        <p
          className="mt-1.5 mb-0 text-sm leading-[1.5] max-w-[60ch]"
          style={{ color: "var(--mut)" }}
        >
          {product.desc}
        </p>

        {/* Small height square staggered heat cells with white-to-blue gradient */}
        <div className="hsep" aria-hidden="true">
          {Array.from({ length: CELL_COUNT }, (_, k) => (
            <i
              key={k}
              className="hc"
              style={{ "--i": k } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

      {/* Meta: Year, Stack & Direct Link to Separate Case Study */}
      <div
        className="meta text-xs col-start-2 min-[701px]:col-auto text-left min-[701px]:text-right max-w-[240px] leading-[1.5] flex flex-col items-start min-[701px]:items-end gap-1.5"
        style={{ color: "var(--mut)" }}
      >
        <span>
          {product.year} · {product.stack}
        </span>
        <Link
          href={`/case-study/${product.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold cursor-pointer transition-colors duration-150 hover:underline text-[var(--link)] group/link"
        >
          <span>Case Study</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5 transition-transform duration-150 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            aria-hidden="true"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export const ShippedProducts: React.FC = () => {
  return (
    <section className="px-[8%] pt-[clamp(64px,8vw,120px)] pb-[clamp(56px,8vw,110px)] border-t border-[var(--cell)]/40">
      <h2 className="m-0 mb-[22px] font-normal text-[clamp(22px,2.6vw,32px)]">
        Products I’ve shipped
      </h2>
      <div id="pr">
        {PRODUCTS.map((product, index) => (
          <ProductRow key={product.name} product={product} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ShippedProducts;
