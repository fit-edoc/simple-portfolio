import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getAllSlugs,
  CaseStudy,
} from "@/app/data/caseStudiesData";
import ThemeToggle from "@/app/Components/common/ThemeToggle";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: "Case Study Not Found | Himanshu Verma",
    };
  }

  return {
    title: `${study.name} — Case Study | Himanshu Verma`,
    description: `${study.tagline}. Detailed case study on problem solving, architectural choices, and technical implementation.`,
    alternates: {
      canonical: `/case-study/${study.slug}`,
    },
    openGraph: {
      title: `${study.name} — Case Study | Himanshu Verma`,
      description: study.tagline,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const allStudies = getAllCaseStudies();
  const currentIndex = allStudies.findIndex((s) => s.slug === study.slug);
  const prevStudy =
    currentIndex > 0 ? allStudies[currentIndex - 1] : allStudies[allStudies.length - 1];
  const nextStudy =
    currentIndex < allStudies.length - 1 ? allStudies[currentIndex + 1] : allStudies[0];

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] transition-colors duration-250 flex flex-col">
      {/* Top Navigation Bar - Minimal & Clean */}
      <header className="w-full px-[6%] sm:px-[10%] py-6 flex items-center justify-between border-b border-[var(--cell)]/40">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--mut)] hover:text-[var(--fg)] transition-colors group"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Himanshu Verma</span>
          </Link>
          <span className="text-[var(--cell)] select-none">/</span>
          <span className="text-sm text-[var(--fg)] font-medium">Case Studies</span>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </header>

      {/* Main Editorial Case Study Article */}
      <main className="flex-1 w-full px-[6%] sm:px-[10%] pt-[clamp(48px,6vw,96px)] pb-[clamp(56px,8vw,110px)]">
        {/* Constrained Reading Column Aligned to Left */}
        <div className="max-w-2xl sm:max-w-3xl">
          {/* Project Navigation Switcher Tabs */}
          <nav
            role="tablist"
            aria-label="Projects case studies"
            className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-3 mb-14 sm:mb-20 text-sm sm:text-[15px]"
          >
            {allStudies.map((s) => {
              const isActive = s.slug === study.slug;
              return (
                <Link
                  key={s.slug}
                  href={`/case-study/${s.slug}`}
                  role="tab"
                  aria-selected={isActive}
                  className={`transition-colors duration-150 pb-1 border-b ${
                    isActive
                      ? "border-[var(--fg)] text-[var(--fg)] font-medium"
                      : "border-transparent text-[var(--mut)] hover:text-[var(--fg)]"
                  }`}
                >
                  {s.name}
                </Link>
              );
            })}
          </nav>

          {/* Typography-Led Editorial Article Body */}
          <article className="space-y-16 sm:space-y-20">
            {/* Article Header & Meta */}
            <header className="reveal-text-1">
              {/* Meta line: category · year · readTime */}
              <div className="text-xs sm:text-[13px] text-[var(--mut)] tracking-wide mb-3">
                <span>{study.category}</span>
                <span className="mx-2 opacity-60">·</span>
                <span>{study.year}</span>
                <span className="mx-2 opacity-60">·</span>
                <span>{study.readTime}</span>
              </div>

              {/* Title with Favicon: large, light weight, tight leading */}
              <div className="flex items-start gap-3.5 sm:gap-4 mb-4">
                <img
                  src={study.icon}
                  alt=""
                  className="w-7 h-7 sm:w-9 sm:h-9 object-contain shrink-0 mt-1 sm:mt-1.5"
                  aria-hidden="true"
                />
                <h1 className="m-0 font-light text-[clamp(28px,3.6vw,44px)] leading-[1.2] text-[var(--fg)] tracking-tight">
                  {study.name} <span className="text-[var(--mut)] font-extralight">—</span> {study.tagline}
                </h1>
              </div>

              {/* Tech stack: single muted text line separated by slashes */}
              <p className="text-xs sm:text-sm text-[var(--mut)] m-0 mb-5 leading-normal">
                {study.stack.join(" / ")}
              </p>

              {/* Plain text links on one line with SVG external icons */}
              <div className="flex flex-wrap items-center gap-x-2 text-xs sm:text-sm text-[var(--mut)]">
                <a
                  href={study.href}
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
                {study.github && (
                  <>
                    <span className="opacity-60">·</span>
                    <a
                      href={study.github}
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
              &ldquo;{study.quote}&rdquo;
            </blockquote>

            {/* Section: What I'm solving - Generous distinct top gap */}
            <section className="reveal-text-2 pt-6 sm:pt-10 space-y-4 sm:space-y-5">
              <h2 className="m-0 text-xl sm:text-2xl font-normal text-[var(--fg)] tracking-tight">
                What I&apos;m solving
              </h2>
              <div className="space-y-4 sm:space-y-5 text-[16px] sm:text-[17px] leading-[1.75] text-[var(--fg)] opacity-90">
                {study.problem.map((p, i) => (
                  <p key={i} className="m-0">
                    {p}
                  </p>
                ))}
              </div>
            </section>

            {/* Section: Why I built this */}
            <section className="reveal-text-3 space-y-4 sm:space-y-5">
              <h2 className="m-0 text-xl sm:text-2xl font-normal text-[var(--fg)] tracking-tight">
                Why I built this
              </h2>
              <div className="space-y-4 sm:space-y-5 text-[16px] sm:text-[17px] leading-[1.75] text-[var(--fg)] opacity-90">
                {study.whyBuilt.map((p, i) => (
                  <p key={i} className="m-0">
                    {p}
                  </p>
                ))}
              </div>
            </section>

            {/* Section: Architecture & technical highlights - Vertical list with hairline dividers */}
            <section className="reveal-text-4 space-y-5 sm:space-y-6">
              <h2 className="m-0 text-xl sm:text-2xl font-normal text-[var(--fg)] tracking-tight">
                Architecture &amp; technical highlights
              </h2>
              <div className="border-t border-[var(--cell)]/40 divide-y divide-[var(--cell)]/40">
                {study.architecture.map((arch, i) => (
                  <div key={i} className="py-5 sm:py-6 first:pt-4 last:pb-0">
                    <h3 className="m-0 mb-2 text-base sm:text-[17px] font-medium text-[var(--fg)]">
                      {arch.title}
                    </h3>
                    <p className="m-0 text-sm sm:text-[15px] leading-[1.7] text-[var(--mut)]">
                      {arch.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: Impact - Plain list with simple dashes */}
            <section className="reveal-text-4 space-y-4 sm:space-y-5">
              <h2 className="m-0 text-xl sm:text-2xl font-normal text-[var(--fg)] tracking-tight">
                Impact
              </h2>
              <ul className="list-none p-0 m-0 space-y-2.5 text-[15px] sm:text-[16px] leading-[1.7] text-[var(--fg)] opacity-90">
                {study.impact.map((imp, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[var(--mut)] select-none" aria-hidden="true">
                      —
                    </span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Bottom Navigation Between Projects - Quiet & Editorial with SVG icons */}
            <nav
              aria-label="Other case studies"
              className="reveal-text-4 pt-12 sm:pt-16 border-t border-[var(--cell)]/40 flex flex-wrap items-center justify-between gap-6"
            >
              <Link
                href={`/case-study/${prevStudy.slug}`}
                className="group inline-flex flex-col items-start text-sm hover:underline"
              >
                <span className="inline-flex items-center gap-1 text-xs text-[var(--mut)] mb-0.5">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3 h-3 transition-transform group-hover:-translate-x-0.5"
                    aria-hidden="true"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  <span>Previous</span>
                </span>
                <span className="text-[var(--fg)] font-medium group-hover:text-[var(--link)]">
                  {prevStudy.name}
                </span>
              </Link>

              <Link
                href={`/case-study/${nextStudy.slug}`}
                className="group inline-flex flex-col items-end text-sm hover:underline text-right"
              >
                <span className="inline-flex items-center gap-1 text-xs text-[var(--mut)] mb-0.5">
                  <span>Next</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3 h-3 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
                <span className="text-[var(--fg)] font-medium group-hover:text-[var(--link)]">
                  {nextStudy.name}
                </span>
              </Link>
            </nav>
          </article>
        </div>
      </main>

      {/* Understated Editorial Footer */}
      <footer className="w-full px-[6%] sm:px-[10%] py-8 border-t border-[var(--cell)]/40 flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--mut)]">
        <div>
          <span>© 2026 Himanshu Verma</span>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/" className="hover:underline text-[var(--fg)]">
            Portfolio
          </Link>
          <a
            href="https://github.com/fit-edoc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-[var(--fg)]"
          >
            GitHub
          </a>
          <a
            href="https://x.com/fitedocc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-[var(--fg)]"
          >
            X
          </a>
          <a
            href="mailto:himanshuverma2660@gmail.com"
            className="hover:underline text-[var(--fg)]"
          >
            Email
          </a>
        </div>
      </footer>
    </div>
  );
}
