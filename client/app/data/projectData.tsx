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
  github?:string;
  techstack?: {
    name: string;
    icon: React.ReactNode;
  }[];
}

export const projects: Project[] = [

  {
    id: 1,
    title: "CREATIVESTUDIO",
    description:
      "A digital creative agency website showcasing services, branding solutions, and stunning UI/UX designs.",
    img: "/images/creative.jpg",
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
    id: 2,
    title: "MENTAL HEALTH",
    description:
      "A mental wellness platform where users can check their mental health status and explore supportive resources.",
    img: "/images/mental.jpg",
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
    id: 3,
    title: "JobCatch",
    description:
      "A job portal platform that connects job seekers with opportunities and allows companies to post and view listings.",
    img: "/images/job.jpg",
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
    id: 4,
    title: "Digital-marketplace",
    description:
      "Landing page for digital market agency",
    img: "/images/digi.jpg",
    color: "black",
    href: "https://digital-marketplace-opal.vercel.app/",
     github:"https://github.com/fit-edoc/Digital-marketplace",
    techstack: [
      { name: "React", icon: <FaReact className="text-blue-400" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
    ],
  },
  {
    id: 5,
    title: "InstaGen",
    description:
      "Its generate instagram style profile and comments",
    img: "/images/insta.jpg",
    color: "black",
    href: "https://instagen-three.vercel.app/",
     github:"https://github.com/fit-edoc/INSTAGEN",
    techstack: [
      { name: "Nextjs", icon: <RiNextjsFill className="dark:text-white" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
    ],
  },
 
    {
    id: 6,
    title: "flowdense",
    description:
      "video gradient tool",
    img: "/images/flow.jpg",
    color: "black",
    href: "https://flow-dense.vercel.app/",
     github:"https://github.com/fit-edoc/FlowDense",
    techstack: [
      {name: "Nextjs", icon: <RiNextjsFill className="dark:text-white" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-500" /> },
    ],

  },
  {
    id: 7,
    title:"ATS PROB",
    description:"Its AI based tool to check your Resume",
    img:"/images/ats.jpg",
    color:"",
    href:"https://ats-prob.vercel.app/",
    github:"https://github.com/fit-edoc/ATS-Prob",
    techstack:[
      {name:"Nextjs",icon:<RiNextjsFill className="dark:text-white" />},
      {name:"Tailwind CSS",icon:<SiTailwindcss className="text-cyan-500" />},
      {name:"MERN STACK",icon:<SiMongodb className="text-green-500" />}
    ]
  }

  
];
