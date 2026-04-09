import React from "react";
import { DiNodejs, DiReact } from "react-icons/di";
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaDocker } from "react-icons/fa";
import { RiSupabaseFill } from "react-icons/ri";
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
    img: "/images/projectt1.jpg",
    href: "https://techyogeek.vercel.app/",
    github:"https://github.com/fit-edoc/TECHYOGEEK",
    techstack: [
      { name: "Supabase", icon: <RiSupabaseFill className="text-black dark:text-white" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
    ],
  },
  {
    id: 2,
    title: "CREATIVESTUDIO",
    description:
      "A digital creative agency website showcasing services, branding solutions, and stunning UI/UX designs.",
    img: "/images/projecttt2.jpg",
    color: "black",
    href: "https://creativefoldsstudio.vercel.app/",
     github:"https://github.com/fit-edoc/twofoldsstudio",
    techstack: [
      { name: "React", icon: <FaReact className="text-blue-400" /> },
     // Placeholder if icon not available
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
    ],
  },
  {
    id: 3,
    title: "MENTAL HEALTH",
    description:
      "A mental wellness platform where users can check their mental health status and explore supportive resources.",
    img: "/images/projecttt3.jpg",
    color: "black",
    href: "https://evalwell.vercel.app/",
     github:"https://github.com/fit-edoc/evalwell-client",
    techstack: [
      { name: "React", icon: <FaReact className="text-blue-400" /> },
     { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
      { name: "Nodejs", icon: <DiNodejs className="text-green-400" /> },
    ],
  },
  {
    id: 4,
    title: "PIZZAMANIAC",
    description:
      "A visually appealing food landing page designed for a pizza brand with engaging UI and smooth interactions.",
    img: "/images/projectt4.jpg",
    color: "black",
    href: "https://pizzamaniac.vercel.app/",
     github:"https://github.com/fit-edoc/PIZZA-SHOP",
    techstack: [
      { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
     { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
       { name: "React", icon: <DiReact className="text-blue-500" /> },
      { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
    ],
  },
  {
    id: 5,
    title: "FlekxyShop",
    description:
      "A minimal and responsive e-commerce storefront showcasing products with clean UI and intuitive navigation.",
    img: "/images/projectt5.jpg",
    color: "white",
    href: "https://flekxyshop.vercel.app/",
     github:"https://github.com/fit-edoc/flekxy",
    techstack: [
     { name: "React", icon: <FaReact className="text-blue-400" /> },
      { name: "Redux", icon: <SiRedux className="text-purple-500" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
    ],
  },
  {
    id: 6,
    title: "JobCatch",
    description:
      "A job portal platform that connects job seekers with opportunities and allows companies to post and view listings.",
    img: "/images/projectt6.jpg",
    color: "black",
    href: "https://job-catch.vercel.app/",
     github:"https://github.com/fit-edoc/JOB-CATCH",
    techstack: [
      { name: "MERN Stack", icon: <SiMongodb className="text-green-500" /> },
      { name: "Redux", icon: <SiRedux className="text-purple-500" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
    ],
  },
   {
    id: 7,
    title: "Digital-marketplace",
    description:
      "Landing page for digital market agency",
    img: "/images/projectt7.jpg",
    color: "black",
    href: "https://digital-marketplace-opal.vercel.app/",
     github:"https://github.com/fit-edoc/Digital-marketplace",
    techstack: [
      { name: "React", icon: <FaReact className="text-blue-400" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
    ],
  },
  {
    id: 8,
    title: "InstaGen",
    description:
      "Its generate instagram style profile and comments",
    img: "/images/projectt8.jpg",
    color: "black",
    href: "https://instagen-three.vercel.app/",
     github:"https://github.com/fit-edoc/INSTAGEN",
    techstack: [
      { name: "React", icon: <FaReact className="text-blue-400" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
    ],
  },
    {
    id: 9,
    title: "reusableblock",
    description:
      "reusable compoents library",
    img: "/images/project9.jpg",
    color: "black",
    href: "https://reusableblocks.vercel.app/",
     github:"https://github.com/fit-edoc/compoLib",
    techstack: [
      { name: "React", icon: <FaReact className="text-blue-400" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
    ],
  },
    {
    id: 10,
    title: "flowdense",
    description:
      "video gradient tool",
    img: "/images/project10.jpg",
    color: "black",
    href: "https://flow-dense.vercel.app/",
     github:"https://github.com/fit-edoc/FlowDense",
    techstack: [
      { name: "React", icon: <FaReact className="text-blue-400" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
    ],
  },
];
