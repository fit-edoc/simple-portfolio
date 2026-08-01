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
    id: 5,
    title: "WayHyre",
    description: "An advanced recruitment platform designed to help HR professionals find the best candidates efficiently.",
    img: "/images/wayhyre.jpg",
    category: "Recruitment Tech",
    painPoint: "HR recruiters spend countless hours manually filtering applications and lack accurate, up-to-date salary data to make competitive offers.",
    output: "Features a powerful resume analyzer for inbound applications and provides real-time salary intelligence based on the current market.",
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
    description: "An AI-based tool designed to analyze and optimize your resume against specific job descriptions.",
    img: "/images/atsprob.jpg",
    category: "Career Tool",
    painPoint: "Job seekers often get rejected by Applicant Tracking Systems (ATS) because their resumes lack the specific keywords required for the role.",
    output: "Analyzes your resume against job roles to provide missing keyword signals and actionable feedback, making your resume significantly better.",
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
    id: 6,
    title: "Better Way",
    description: "A screenshot editor that converts normal screenshots into better ones. You can add video gradients as well, and export both video and images.",
    img: "/images/betterway.jpg",
    category: "Design Tool",
    painPoint: "Creating beautiful, presentation-ready screenshots usually requires complex design software and takes too much time.",
    output: "An easy-to-use editor that instantly upgrades standard screenshots with image or video gradients, exporting to both image and video formats.",
    href: "https://betterwayone.vercel.app/",
    techstack: [
      { name: "Nextjs", icon: <RiNextjsFill className="dark:text-white" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
    ]

  }
]