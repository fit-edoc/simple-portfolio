"use client";

import dynamic from "next/dynamic";
import Hero from "./Components/hero/Hero";

const Skill = dynamic(() => import("./Components/skill/Skill"), {
  ssr: false,
  loading: () => <div className="min-h-[200px] flex items-center justify-center text-xs opacity-50 uppercase tracking-widest font-mono">Loading Skills...</div>
});

const Project = dynamic(() => import("./Components/project/Project"), {
  ssr: false,
  loading: () => <div className="min-h-[300px] flex items-center justify-center text-xs opacity-50 uppercase tracking-widest font-mono">Loading Projects...</div>
});

const Contact = dynamic(() => import("./Components/contact/Contact"), {
  ssr: false,
  loading: () => <div className="min-h-[300px] flex items-center justify-center text-xs opacity-50 uppercase tracking-widest font-mono">Loading Contact...</div>
});

export default function Home() {
  return (
    <>
      <Hero />
      <Skill />
      <Project />
      <Contact />
    </>
  );
}