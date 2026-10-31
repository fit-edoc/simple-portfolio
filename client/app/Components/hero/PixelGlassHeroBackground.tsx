"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

export const PixelGlassHeroBackground: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`absolute top-0 left-0 w-full h-[52vh] sm:h-[56vh] max-h-[500px] overflow-hidden select-none bg-white z-10 pointer-events-auto ${className}`}
    >
      {/* 1. Pure White Background & Subtle Square Grid Lines */}
      <div className="absolute inset-0 bg-white pointer-events-none z-0" />
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.038)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.038)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none z-0" 
      />

      {/* 2. Vector Motherboard / PCB Circuit SVG with Moving White Light Paths */}
      <svg
        viewBox="0 0 1200 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover block relative z-10"
        preserveAspectRatio="xMidYMid slice"
        style={{ imageRendering: "crisp-edges" }}
      >
        <defs>
          {/* Subtle PCB Dither / Hash Pattern */}
          <pattern id="pcb-dither" width="6" height="6" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="1" height="1" fill="rgba(255,255,255,0.25)" />
            <rect x="3" y="3" width="1" height="1" fill="rgba(255,255,255,0.18)" />
          </pattern>

          {/* Glowing Filter for Moving White Light Paths */}
          <filter id="white-light-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* =====================================================================
            A) BASE STATIC PCB CIRCUIT TRACES (Fine dark grey / black traces)
           ===================================================================== */}
        <g stroke="rgba(0, 0, 0, 0.14)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Main Top Bus Lines */}
          <path d="M 40 40 L 260 40 L 300 80 L 460 80" />
          <path d="M 60 20 L 250 20 L 290 60 L 520 60 L 560 100 L 720 100" />
          <path d="M 120 70 L 230 70 L 260 100 L 410 100" />

          {/* Central Processor Bus Interconnects */}
          <path d="M 490 120 L 580 120 L 610 150 L 740 150" />
          <path d="M 490 140 L 540 140 L 570 170 L 670 170" />
          <path d="M 490 160 L 530 160 L 550 180 L 620 180 L 650 210 L 780 210" />

          {/* Right Sub-system Traces */}
          <path d="M 780 80 L 920 80 L 950 110 L 1140 110" />
          <path d="M 820 120 L 910 120 L 940 150 L 1080 150 L 1110 180 L 1160 180" />
          <path d="M 850 160 L 940 160 L 980 200 L 1120 200" />

          {/* Lower Branching PCB Traces */}
          <path d="M 160 160 L 240 160 L 270 190 L 360 190 L 390 220 L 490 220" />
          <path d="M 180 220 L 260 220 L 300 260 L 440 260 L 480 300 L 580 300" />
          <path d="M 320 280 L 420 280 L 460 320 L 640 320 L 670 350 L 760 350" />
          <path d="M 640 240 L 730 240 L 760 270 L 890 270 L 920 300 L 1060 300" />
          <path d="M 720 300 L 820 300 L 850 330 L 990 330 L 1020 360 L 1140 360" />
        </g>

        {/* =====================================================================
            B) ACTIVE MOVING WHITE LIGHT PATHS ("moving path light white")
            Electric white light pulses continuously traveling along circuit paths
           ===================================================================== */}
        <g stroke="#000000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#white-light-glow)">
          {/* Path 1: Top-Left to Center Core */}
          <motion.path
            d="M 40 40 L 260 40 L 300 80 L 460 80"
            strokeDasharray="14 110"
            animate={shouldReduceMotion ? {} : { strokeDashoffset: [124, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          />

          {/* Path 2: Wide Overhead Highway */}
          <motion.path
            d="M 60 20 L 250 20 L 290 60 L 520 60 L 560 100 L 720 100"
            strokeDasharray="18 160"
            animate={shouldReduceMotion ? {} : { strokeDashoffset: [178, 0] }}
            transition={{ duration: 3.1, repeat: Infinity, ease: "linear", delay: 0.4 }}
          />

          {/* Path 3: Center Bus Transfer */}
          <motion.path
            d="M 490 120 L 580 120 L 610 150 L 740 150"
            strokeDasharray="16 130"
            animate={shouldReduceMotion ? {} : { strokeDashoffset: [146, 0] }}
            transition={{ duration: 2.0, repeat: Infinity, ease: "linear", delay: 0.8 }}
          />

          {/* Path 4: Right Upper Controller Line */}
          <motion.path
            d="M 780 80 L 920 80 L 950 110 L 1140 110"
            strokeDasharray="15 140"
            animate={shouldReduceMotion ? {} : { strokeDashoffset: [155, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "linear", delay: 1.1 }}
          />

          {/* Path 5: Center-Right Diagonal Channel */}
          <motion.path
            d="M 490 160 L 530 160 L 550 180 L 620 180 L 650 210 L 780 210"
            strokeDasharray="14 120"
            animate={shouldReduceMotion ? {} : { strokeDashoffset: [134, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay: 0.2 }}
          />

          {/* Path 6: Lower Transceiver Bus */}
          <motion.path
            d="M 180 220 L 260 220 L 300 260 L 440 260 L 480 300 L 580 300"
            strokeDasharray="16 150"
            animate={shouldReduceMotion ? {} : { strokeDashoffset: [166, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "linear", delay: 1.4 }}
          />

          {/* Path 7: Lower Right Storage Trace */}
          <motion.path
            d="M 640 240 L 730 240 L 760 270 L 890 270 L 920 300 L 1060 300"
            strokeDasharray="18 160"
            animate={shouldReduceMotion ? {} : { strokeDashoffset: [178, 0] }}
            transition={{ duration: 3.0, repeat: Infinity, ease: "linear", delay: 0.6 }}
          />

          {/* Path 8: Bottom-Right I/O Trace */}
          <motion.path
            d="M 720 300 L 820 300 L 850 330 L 990 330 L 1020 360 L 1140 360"
            strokeDasharray="15 130"
            animate={shouldReduceMotion ? {} : { strokeDashoffset: [145, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1.7 }}
          />
        </g>

        {/* =====================================================================
            C) SOLDER PADS & VIAS (Circular Circuit Junctions)
           ===================================================================== */}
        <g fill="white" stroke="black" strokeWidth="1.5">
          <circle cx="40" cy="40" r="3.5" />
          <circle cx="260" cy="40" r="2.5" />
          <circle cx="300" cy="80" r="2.5" />
          <circle cx="460" cy="80" r="3.5" />

          <circle cx="60" cy="20" r="3" />
          <circle cx="250" cy="20" r="2" />
          <circle cx="560" cy="100" r="2.5" />
          <circle cx="720" cy="100" r="3.5" />

          <circle cx="580" cy="120" r="2.5" />
          <circle cx="610" cy="150" r="2.5" />
          <circle cx="740" cy="150" r="3" />

          <circle cx="920" cy="80" r="2" />
          <circle cx="950" cy="110" r="2" />
          <circle cx="1140" cy="110" r="3.5" />

          <circle cx="270" cy="190" r="2.5" />
          <circle cx="390" cy="220" r="2" />
          <circle cx="490" cy="220" r="3" />

          <circle cx="440" cy="260" r="2" />
          <circle cx="580" cy="300" r="3.5" />
          <circle cx="760" cy="270" r="2" />
          <circle cx="890" cy="270" r="2.5" />
          <circle cx="1060" cy="300" r="3.5" />
        </g>

        {/* =====================================================================
            D) MOTHERBOARD SHAPES: SOLID BLACK MICROCHIPS & PROCESSOR UNITS
            Small compact boxes with pins, dither, and traveling white light pulses
           ===================================================================== */}

        {/* Chip 1: Left Microcontroller QFP (x: 100, y: 110, w: 64, h: 64) */}
        <MotherboardChip
          x={100}
          y={110}
          w={64}
          h={64}
          label="MCU-01"
          pinCount={5}
          shouldReduceMotion={!!shouldReduceMotion}
        />

        {/* Chip 2: Center Main CPU Core (x: 410, y: 110, w: 82, h: 82) */}
        <MotherboardChip
          x={410}
          y={110}
          w={82}
          h={82}
          label="CORE-AI"
          pinCount={7}
          isMainProcessor
          shouldReduceMotion={!!shouldReduceMotion}
        />

        {/* Chip 3: Upper RAM / Cache Block (x: 290, y: 30, w: 76, h: 38) */}
        <MotherboardChip
          x={290}
          y={30}
          w={76}
          h={38}
          label="SRAM-64K"
          pinCount={6}
          horizontalOnly
          shouldReduceMotion={!!shouldReduceMotion}
        />

        {/* Chip 4: Center-Right Coprocessor (x: 740, y: 120, w: 68, h: 68) */}
        <MotherboardChip
          x={740}
          y={120}
          w={68}
          h={68}
          label="DSP-X"
          pinCount={5}
          shouldReduceMotion={!!shouldReduceMotion}
        />

        {/* Chip 5: Right High-Density I/O Chip (x: 960, y: 130, w: 80, h: 48) */}
        <MotherboardChip
          x={960}
          y={130}
          w={80}
          h={48}
          label="I/O-BUS"
          pinCount={6}
          horizontalOnly
          shouldReduceMotion={!!shouldReduceMotion}
        />

        {/* Chip 6: Lower Left Clock Generator (x: 250, y: 240, w: 46, h: 46) */}
        <MotherboardChip
          x={250}
          y={240}
          w={46}
          h={46}
          label="CLK-OSC"
          pinCount={4}
          shouldReduceMotion={!!shouldReduceMotion}
        />

        {/* Chip 7: Lower Center Power Controller (x: 580, y: 260, w: 60, h: 44) */}
        <MotherboardChip
          x={580}
          y={260}
          w={60}
          h={44}
          label="PWR-REG"
          pinCount={4}
          shouldReduceMotion={!!shouldReduceMotion}
        />

        {/* Chip 8: Lower Right Security Cryptochip (x: 880, y: 240, w: 54, h: 54) */}
        <MotherboardChip
          x={880}
          y={240}
          w={54}
          h={54}
          label="SEC-KEY"
          pinCount={4}
          shouldReduceMotion={!!shouldReduceMotion}
        />
      </svg>
    </div>
  );
};

interface MotherboardChipProps {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  pinCount: number;
  isMainProcessor?: boolean;
  horizontalOnly?: boolean;
  shouldReduceMotion: boolean;
}

const MotherboardChip: React.FC<MotherboardChipProps> = ({
  x,
  y,
  w,
  h,
  label,
  pinCount,
  isMainProcessor = false,
  horizontalOnly = false,
  shouldReduceMotion,
}) => {
  // Pin generation
  const pinW = 3;
  const pinH = 4;
  const pinSpacingX = w / (pinCount + 1);
  const pinSpacingY = h / (pinCount + 1);

  return (
    <g className="cursor-pointer group">
      {/* 1. Metal Connector Pins (Top & Bottom) */}
      {Array.from({ length: pinCount }).map((_, i) => {
        const px = x + (i + 1) * pinSpacingX - pinW * 0.5;
        return (
          <React.Fragment key={`hpin-${i}`}>
            {/* Top Pin */}
            <rect x={px} y={y - pinH} width={pinW} height={pinH} fill="#000000" />
            {/* Bottom Pin */}
            <rect x={px} y={y + h} width={pinW} height={pinH} fill="#000000" />
          </React.Fragment>
        );
      })}

      {/* 2. Metal Connector Pins (Left & Right) */}
      {!horizontalOnly &&
        Array.from({ length: pinCount }).map((_, i) => {
          const py = y + (i + 1) * pinSpacingY - pinW * 0.5;
          return (
            <React.Fragment key={`vpin-${i}`}>
              {/* Left Pin */}
              <rect x={x - pinH} y={py} width={pinH} height={pinW} fill="#000000" />
              {/* Right Pin */}
              <rect x={x + w} y={py} width={pinH} height={pinW} fill="#000000" />
            </React.Fragment>
          );
        })}

      {/* 3. Solid Black Chip Body with Crisp White Border */}
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="2"
        fill="#000000"
        stroke="rgba(255, 255, 255, 0.45)"
        strokeWidth="1.2"
        className="transition-all duration-200 group-hover:stroke-white"
      />

      {/* 4. Retro PCB Dither Pattern on Chip Surface */}
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="2"
        fill="url(#pcb-dither)"
        className="pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity duration-200"
      />

      {/* 5. Top Specular Glint Hairline */}
      <line
        x1={x + 2}
        y1={y + 1.5}
        x2={x + w - 2}
        y2={y + 1.5}
        stroke="rgba(255, 255, 255, 0.7)"
        strokeWidth="1"
        pointerEvents="none"
      />

      {/* 6. Top-Left 2px Pixel Specular Dot */}
      <rect
        x={x + 2}
        y={y + 2}
        width={2}
        height={2}
        fill="#ffffff"
        pointerEvents="none"
      />

      {/* 7. Moving White Light Circuit Line Inside the Chip */}
      <motion.line
        x1={x + 6}
        y1={y + h * 0.5}
        x2={x + w - 6}
        y2={y + h * 0.5}
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeDasharray="6 24"
        animate={shouldReduceMotion ? {} : { strokeDashoffset: [30, 0] }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: "linear",
          delay: (x % 5) * 0.3,
        }}
        pointerEvents="none"
      />

      {/* 8. Main Processor Core Solder Center Ring (if CPU) */}
      {isMainProcessor && (
        <rect
          x={x + w * 0.25}
          y={y + h * 0.25}
          width={w * 0.5}
          height={h * 0.5}
          rx="1"
          fill="none"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="1"
          strokeDasharray="2 2"
          pointerEvents="none"
        />
      )}

      {/* 9. Monospace Microchip Label */}
      <text
        x={x + w * 0.5}
        y={y + h * 0.78}
        textAnchor="middle"
        fill="rgba(255, 255, 255, 0.85)"
        fontSize="7.5"
        fontFamily="monospace"
        fontWeight="600"
        letterSpacing="0.05em"
        pointerEvents="none"
        className="select-none"
      >
        {label}
      </text>
    </g>
  );
};
