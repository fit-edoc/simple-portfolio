import React from "react";
import { DiNodejs, DiReact } from "react-icons/di";
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaDocker } from "react-icons/fa";
import { RiNextjsFill, RiSupabaseFill } from "react-icons/ri";
import { SiTypescript, SiMongodb, SiTailwindcss, SiNextdotjs, SiPostgresql, SiFirebase, SiRedux } from "react-icons/si";

export interface Project {
  id: number;
  title: string;
  description: string;
  img: string;
  href: string;
  color?: string;
  github?: string;
  category?: string;
  painPoint?: string;
  output?: string;
  techstack?: {
    name: string;
    icon: React.ReactNode;
  }[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "JobCatch",
    description: "A job portal platform that connects job seekers with opportunities and allows companies to post and view listings.",
    img: "/images/job.jpg",
    color: "black",
    href: "https://job-catch.vercel.app/",
    github: "https://github.com/fit-edoc/JOB-CATCH",
    techstack: [
      { name: "MERN Stack", icon: <SiMongodb className="text-green-500" /> },
      { name: "Redux", icon: <SiRedux className="text-purple-500" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
    ],
  },
  {
    id: 2,
    title: "InstaGen",
    description: "Its generate instagram style profile and comments",
    img: "/images/insta.jpg",
    color: "black",
    href: "https://instagen-three.vercel.app/",
    github: "https://github.com/fit-edoc/INSTAGEN",
    techstack: [
      { name: "Nextjs", icon: <RiNextjsFill className="dark:text-white" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
    ],
  },
  {
    id: 3,
    title: "ATS PROB",
    description: "Its AI based tool to check your Resume",
    img: "/images/ats.jpg",
    color: "",
    href: "https://ats-resume-snowy.vercel.app/",
    github: "https://github.com/fit-edoc/ATS-Prob",
    techstack: [
      { name: "Nextjs", icon: <RiNextjsFill className="dark:text-white" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
      { name: "MERN STACK", icon: <SiMongodb className="text-green-500" /> }
    ]
  },
 
 
  {
    id: 4,
    title: "TaskTogether",
    description: "TaskTogether is a collaborative platform designed to streamline task delegation and improve team productivity.",
    img: "/images/tasktogether.jpg",
    category: "Productivity Tool",
    painPoint: "Teams often struggle with scattered communication and unclear task delegation, leading to missed deadlines and confusion.",
    output: "A centralized, real-time collaboration hub where teams can seamlessly assign, track, and complete tasks together.",
    href: "https://task-together-ethara.vercel.app/",
    github: "https://github.com/fit-edoc/TaskTogether",
    techstack: [
      { name: "Nextjs", icon: <RiNextjsFill className="dark:text-white" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> }
    ]
  },
  {
    id: 5,
    title: "Tasker",
    description: "Tasker is a simple CRUD application for effortless task management. Create, read, update, and delete your daily to-dos with ease.",
    img: "/images/tasker.jpg",
    category: "CRUD Application",
    painPoint: "Users struggle to find a straightforward, fast tool for managing daily tasks without complex features getting in the way.",
    output: "A clean, minimalistic to-do application that provides instant task management and effortless organization.",
    href: "https://taskerwebb.vercel.app/",
    github: "https://github.com/fit-edoc/Tasker",
    techstack: [
      { name: "React", icon: <FaReact className="text-blue-400" /> },
      { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
    ]
  }
];
