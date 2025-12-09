"use client"

import Hero from "./Components/hero/Hero";
import Skill from "./Components/skill/Skill";
import Project from "./Components/project/Project";
import Contact from "./Components/contact/Contact";

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