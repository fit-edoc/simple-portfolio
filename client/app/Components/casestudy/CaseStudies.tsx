"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CASE_STUDIES, CaseStudy } from "@/app/data/caseStudiesData";

export const CaseStudies: React.FC = () => {
  const [selectedSlug, setSelectedSlug] = useState<string>("prospail");
  const [animKey, setAnimKey] = useState<number>(0);

  // Listen to custom event when someone selects a case study externally
  useEffect(() => {
    const handleSelect = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        const found = CASE_STUDIES.find(
          (c) =>
            c.name.toLowerCase() === customEvent.detail.toLowerCase() ||
            c.slug.toLowerCase() === customEvent.detail.toLowerCase()
        );
        if (found) {
          setSelectedSlug(found.slug);
          setAnimKey((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("select-case-study", handleSelect);
    return () => window.removeEventListener("select-case-study", handleSelect);
  }, []);

  const handleTabChange = (slug: string) => {
    if (slug === selectedSlug) return;
    setSelectedSlug(slug);
    setAnimKey((prev) => prev + 1);
  };

  const activeStudy: CaseStudy =
    CASE_STUDIES.find((c) => c.slug === selectedSlug) || CASE_STUDIES[0];

  return (
    <section
      id="case-studies"
      className="w-full px-[6%] sm:px-[10%] pt-[clamp(64px,8vw,120px)] pb-[clamp(56px,8vw,110px)] border-t border-[var(--cell)]/40"
    >
      {/* Editorial Content Container - Left Aligned Single Column */}
      <div className="max-w-2xl sm:max-w-3xl">
        {/* Section Header */}
        <header className="mb-12 sm:mb-16">
          <h2 className="m-0 mb-3 font-normal text-[clamp(26px,3vw,36px)] text-[var(--fg)] tracking-tight">
            Case Studies
          </h2>
          <p className="m-0 text-sm sm:text-base text-[var(--mut)] max-w-xl leading-relaxed">
            Deep dives into why I build, what problems I am solving, and how each system was engineered.
          </p>
        </header>

        {/* Project Selector - Plain text tabs with quiet 1px underline */}
        <nav
          role="tablist"
          aria-label="Projects case studies"
          className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-3 mb-14 sm:mb-20 text-sm sm:text-[15px]"
        >
          {CASE_STUDIES.map((study) => {
            const isActive = study.slug === selectedSlug;
            return (
              <button
                key={study.slug}
                type="button"
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleTabChange(study.slug)}
                className={`cursor-pointer transition-colors duration-150 pb-1 border-b ${
                  isActive
                    ? "border-[var(--fg)] text-[var(--fg)] font-medium"
                    : "border-transparent text-[var(--mut)] hover:text-[var(--fg)]"
                } focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--fg)]`}
              >
                {study.name}
              </button>
            );
          })}
        </nav>

        {/* Editorial Article Body - Typography-Led, Sits Directly on Page */}
        <article key={animKey} className="space-y-16 sm:space-y-20">
          {/* Article Header & Meta */}
          <header className="reveal-text-1">
            {/* Meta line: category · year · readTime */}
            <div className="text-xs sm:text-[13px] text-[var(--mut)] tracking-wide mb-3">
              <span>{activeStudy.category}</span>
              <span className="mx-2 opacity-60">·</span>
              <span>{activeStudy.year}</span>
              <span className="mx-2 opacity-60">·</span>
              <span>{activeStudy.readTime}</span>
            </div>

            {/* Title with Favicon: large, light weight, tight leading */}
            <div className="flex items-start gap-3.5 sm:gap-4 mb-4">
              <img
                src={activeStudy.icon}
                alt=""
                className="w-7 h-7 sm:w-9 sm:h-9 object-contain shrink-0 mt-1 sm:mt-1.5"
                aria-hidden="true"
              />
              <h3 className="m-0 font-light text-[clamp(28px,3.6vw,44px)] leading-[1.2] text-[var(--fg)] tracking-tight">
                {activeStudy.name} <span className="text-[var(--mut)] font-extralight">—</span> {activeStudy.tagline}
              </h3>
            </div>

            {/* Tech stack: single muted text line separated by slashes */}
            <p className="text-xs sm:text-sm text-[var(--mut)] m-0 mb-5 leading-normal">
              {activeStudy.stack.join(" / ")}
            </p>

            {/* Plain text links on one line with SVG external icons */}
            <div className="flex flex-wrap items-center gap-x-2 text-xs sm:text-sm text-[var(--mut)]">
              <Link
                href={`/case-study/${activeStudy.slug}`}
                className="inline-flex items-center gap-1 text-[var(--link)] hover:underline group"
              >
                <span>Full page</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </Link>
              <span className="opacity-60">·</span>
              <a
                href={activeStudy.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[var(--link)] hover:underline group"
              >
                <span>Live app</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
              {activeStudy.github && (
                <>
                  <span className="opacity-60">·</span>
                  <a
                    href={activeStudy.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[var(--link)] hover:underline group"
                  >
                    <span>GitHub</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                </>
              )}
            </div>
          </header>

          {/* Pull Quote: generous margins, thin muted left rule, no background box */}
          <blockquote className="reveal-text-1 my-14 sm:my-20 pl-6 sm:pl-8 border-l border-[var(--cell)]/70 italic text-[18px] sm:text-[21px] leading-[1.65] text-[var(--fg)] opacity-95">
            &ldquo;{activeStudy.quote}&rdquo;
          </blockquote>

          {/* Section: What I'm solving - Generous distinct top gap */}
          <section className="reveal-text-2 pt-6 sm:pt-10 space-y-4 sm:space-y-5">
            <h4 className="m-0 text-xl sm:text-2xl font-normal text-[var(--fg)] tracking-tight">
              What I&apos;m solving
            </h4>
            <div className="space-y-4 sm:space-y-5 text-[16px] sm:text-[17px] leading-[1.75] text-[var(--fg)] opacity-90">
              {activeStudy.problem.map((p, i) => (
                <p key={i} className="m-0">
                  {p}
                </p>
              ))}
            </div>
          </section>

          {/* Section: Why I built this */}
          <section className="reveal-text-3 space-y-4 sm:space-y-5">
            <h4 className="m-0 text-xl sm:text-2xl font-normal text-[var(--fg)] tracking-tight">
              Why I built this
            </h4>
            <div className="space-y-4 sm:space-y-5 text-[16px] sm:text-[17px] leading-[1.75] text-[var(--fg)] opacity-90">
              {activeStudy.whyBuilt.map((p, i) => (
                <p key={i} className="m-0">
                  {p}
                </p>
              ))}
            </div>
          </section>

          {/* Section: Architecture & technical highlights - Vertical list with hairline dividers */}
          <section className="reveal-text-4 space-y-5 sm:space-y-6">
            <h4 className="m-0 text-xl sm:text-2xl font-normal text-[var(--fg)] tracking-tight">
              Architecture &amp; technical highlights
            </h4>
            <div className="border-t border-[var(--cell)]/40 divide-y divide-[var(--cell)]/40">
              {activeStudy.architecture.map((arch, i) => (
                <div key={i} className="py-5 sm:py-6 first:pt-4 last:pb-0">
                  <h5 className="m-0 mb-2 text-base sm:text-[17px] font-medium text-[var(--fg)]">
                    {arch.title}
                  </h5>
                  <p className="m-0 text-sm sm:text-[15px] leading-[1.7] text-[var(--mut)]">
                    {arch.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Impact - Plain list with simple dashes */}
          <section className="reveal-text-4 space-y-4 sm:space-y-5">
            <h4 className="m-0 text-xl sm:text-2xl font-normal text-[var(--fg)] tracking-tight">
              Impact
            </h4>
            <ul className="list-none p-0 m-0 space-y-2.5 text-[15px] sm:text-[16px] leading-[1.7] text-[var(--fg)] opacity-90">
              {activeStudy.impact.map((imp, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[var(--mut)] select-none" aria-hidden="true">
                    —
                  </span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Closing - Understated single text link with SVG arrow */}
          <div className="reveal-text-4 pt-4 sm:pt-6">
            <Link
              href={`/case-study/${activeStudy.slug}`}
              className="inline-flex items-center gap-1.5 text-sm sm:text-base text-[var(--link)] hover:underline group font-medium"
            >
              <span>Read the full case study</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
};

export default CaseStudies;
