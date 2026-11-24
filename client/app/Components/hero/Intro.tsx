import React from "react";

export const Intro: React.FC = () => {
  return (
    <h1 className="font-sans text-lg md:text-xl font-medium leading-relaxed max-w-xl text-left text-black/45 select-text">
      Hey, I am <span className="text-black font-semibold">Himanshu Verma</span>, full stack engineer. I build web products end to end, from the first database table to the last pixel on screen. I enjoy turning vague ideas into fast, reliable software, whether that means designing APIs, shaping clean data models or crafting interfaces people love using. I care about small details and shipping often.
    </h1>
  );
};

export default Intro;
