import React from "react";
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaDocker } from "react-icons/fa";
import { SiTypescript, SiMongodb, SiTailwindcss, SiNextdotjs, SiPostgresql, SiFirebase, SiRedux } from "react-icons/si";

export interface Project {
  id: number;
  title: string;
  description: string;
  img: string;
  href: string;
  color?: string;
  github?:string;
  techstack?: {
    name: string;
    icon: React.ReactNode;
  }[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "TECHYOGEEK",
    description:
      "A modern tech event platform that helps users discover the latest tech meetups, workshops, and events happening nearby.",
    img: "/images/project1.jpg",
    href: "https://techyogeek.vercel.app/",
    github:"https://github.com/fit-edoc/TECHYOGEEK",
    techstack: [
      { name: "Next.js", icon: <SiNextdotjs className="text-black dark:text-white" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
    ],
  },
  {
    id: 2,
    title: "CREATIVESTUDIO",
    description:
      "A digital creative agency website showcasing services, branding solutions, and stunning UI/UX designs.",
    img: "/images/project2.jpg",
    color: "black",
    href: "https://creativefoldsstudio.vercel.app/",
     github:"https://github.com/fit-edoc/twofoldsstudio",
    techstack: [
      { name: "React", icon: <FaReact className="text-blue-400" /> },
      { name: "Framer Motion", icon: <div className="font-bold">FM</div> }, // Placeholder if icon not available
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
    ],
  },
  {
    id: 3,
    title: "MENTAL HEALTH",
    description:
      "A mental wellness platform where users can check their mental health status and explore supportive resources.",
    img: "/images/project3.jpg",
    color: "black",
    href: "https://evalwell.vercel.app/",
     github:"",
    techstack: [
      { name: "React", icon: <FaReact className="text-blue-400" /> },
      { name: "Firebase", icon: <SiFirebase className="text-yellow-500" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
    ],
  },
  {
    id: 4,
    title: "PIZZAMANIAC",
    description:
      "A visually appealing food landing page designed for a pizza brand with engaging UI and smooth interactions.",
    img: "/images/project4.jpg",
    color: "black",
    href: "https://pizzamaniac.vercel.app/",
     github:"https://github.com/fit-edoc/PIZZA-SHOP",
    techstack: [
      { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
      { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" /> },
      { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
    ],
  },
  {
    id: 5,
    title: "FlekxyShop",
    description:
      "A minimal and responsive e-commerce storefront showcasing products with clean UI and intuitive navigation.",
    img: "/images/project5.jpg",
    color: "white",
    href: "https://flekxyshop.vercel.app/",
     github:"https://github.com/fit-edoc/flekxy",
    techstack: [
      { name: "Next.js", icon: <SiNextdotjs className="text-black dark:text-white" /> },
      { name: "Redux", icon: <SiRedux className="text-purple-500" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
    ],
  },
  {
    id: 6,
    title: "JobCatch",
    description:
      "A job portal platform that connects job seekers with opportunities and allows companies to post and view listings.",
    img: "/images/project6.png",
    color: "black",
    href: "https://job-catch.vercel.app/",
     github:"https://github.com/fit-edoc/JOB-CATCH",
    techstack: [
      { name: "MERN Stack", icon: <SiMongodb className="text-green-500" /> },
      { name: "Redux", icon: <SiRedux className="text-purple-500" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
    ],
  },
];
