"use client";

import React, { useState, useEffect, useRef } from "react";

/**
 * -----------------------------------------------------------------------------
 * SONGS DATA
 * Exactly 3 royalty-free placeholder songs
 * -----------------------------------------------------------------------------
 */
interface Song {
  title: string;
  artist: string;
  src: string;
}

const SONGS: Song[] = [
  {
    title: "Midnight City Lofi",
    artist: "Chill Beats",
    src: "/audio/song-1.mp3",
  },
  {
    title: "Retro Tape Deck",
    artist: "Analog Dream",
    src: "/audio/song-2.mp3",
  },
  {
    title: "Velvet Groove",
    artist: "Downtown Trio",
    src: "/audio/song-3.mp3",
  },
];

/**
 * -----------------------------------------------------------------------------
 * TYPEWRITER COMPONENT
 * Monospace "play the songs" with blinking cursor when music is paused.
 * Completely hidden and stops typing as soon as music is playing.
 * -----------------------------------------------------------------------------
 */
const TypewriterPrompt: React.FC<{ isPlaying: boolean }> = ({ isPlaying }) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const fullText = "play the songs";

  useEffect(() => {
    if (isPlaying) {
      setDisplayText("");
      return;
    }

    let timer: NodeJS.Timeout;
    const typingSpeed = 120;
    const deleteSpeed = 70;
    const holdDuration = 1800;
    const pauseBeforeRetype = 600;

    if (!isDeleting) {
      if (displayText.length < fullText.length) {
        timer = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, holdDuration);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length - 1));
        }, deleteSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
        }, pauseBeforeRetype);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, isPlaying]);

  if (isPlaying) return null;

  return (
    <div className="h-6 mb-2 flex items-center justify-center font-mono text-xs sm:text-sm text-neutral-600 select-none tracking-wider">
      <span>{displayText}</span>
      <span className="inline-block w-1.5 h-3.5 bg-neutral-700 ml-1 animate-pulse" />
    </div>
  );
};

/**
 * -----------------------------------------------------------------------------
 * PIXEL ART CROWD COMPONENT
 * 10 distinct pixel-art people of different heights, clothes, and hairstyles.
 * Theme: Black, charcoal, mid-grey, light-grey, and white only.
 * Grooves (bounces, sways, raises arms) when playing; stands still when paused.
 * -----------------------------------------------------------------------------
 */
const PixelCrowd: React.FC<{ isPlaying: boolean }> = ({ isPlaying }) => {
  // 10 unique pixel art people defined with pixel blocks
  const characters = [
    // 1: Afro groover (tall, mid-grey sweater)
    {
      name: "Afro",
      animClass: "crowd-bounce-1",
      delay: "0s",
      width: 14,
      height: 32,
      pixels: [
        // Afro hair
        { x: 3, y: 0, w: 8, h: 6, c: "#111" },
        { x: 2, y: 2, w: 10, h: 4, c: "#111" },
        // Face
        { x: 4, y: 6, w: 6, h: 5, c: "#d4d4d4" },
        { x: 5, y: 7, w: 1, h: 1, c: "#111" },
        { x: 8, y: 7, w: 1, h: 1, c: "#111" },
        // Sweater
        { x: 3, y: 11, w: 8, h: 9, c: "#525252" },
        { x: 2, y: 12, w: 1, h: 7, c: "#404040" },
        { x: 11, y: 12, w: 1, h: 7, c: "#404040" },
        // Pants
        { x: 4, y: 20, w: 3, h: 9, c: "#262626" },
        { x: 7, y: 20, w: 3, h: 9, c: "#1a1a1a" },
        // Shoes
        { x: 3, y: 29, w: 4, h: 3, c: "#ffffff" },
        { x: 7, y: 29, w: 4, h: 3, c: "#ffffff" },
      ],
    },
    // 2: Short kid with big headphones & hoodie
    {
      name: "Headphones",
      animClass: "crowd-bounce-3",
      delay: "0.15s",
      width: 14,
      height: 27,
      pixels: [
        // Hair & headphones band
        { x: 3, y: 1, w: 8, h: 4, c: "#262626" },
        { x: 2, y: 0, w: 10, h: 1, c: "#ffffff" }, // headband
        { x: 1, y: 2, w: 2, h: 4, c: "#ffffff" }, // ear cup left
        { x: 11, y: 2, w: 2, h: 4, c: "#ffffff" }, // ear cup right
        // Face
        { x: 4, y: 4, w: 6, h: 4, c: "#e5e5e5" },
        { x: 5, y: 5, w: 1, h: 1, c: "#111" },
        { x: 8, y: 5, w: 1, h: 1, c: "#111" },
        // Charcoal Hoodie
        { x: 3, y: 8, w: 8, h: 8, c: "#171717" },
        { x: 2, y: 9, w: 1, h: 6, c: "#262626" },
        { x: 11, y: 9, w: 1, h: 6, c: "#262626" },
        // Jeans
        { x: 4, y: 16, w: 3, h: 8, c: "#737373" },
        { x: 7, y: 16, w: 3, h: 8, c: "#525252" },
        // Shoes
        { x: 3, y: 24, w: 4, h: 3, c: "#000000" },
        { x: 7, y: 24, w: 4, h: 3, c: "#000000" },
      ],
    },
    // 3: Tall music lover with beanie & hands in pockets
    {
      name: "Beanie",
      animClass: "crowd-bounce-2",
      delay: "0.28s",
      width: 14,
      height: 33,
      pixels: [
        // Beanie hat
        { x: 3, y: 0, w: 8, h: 4, c: "#e5e5e5" },
        { x: 2, y: 3, w: 10, h: 2, c: "#a3a3a3" },
        // Hair & face
        { x: 4, y: 5, w: 6, h: 5, c: "#d4d4d4" },
        { x: 5, y: 6, w: 1, h: 1, c: "#111" },
        { x: 8, y: 6, w: 1, h: 1, c: "#111" },
        // Long coat
        { x: 3, y: 10, w: 8, h: 12, c: "#404040" },
        { x: 2, y: 11, w: 1, h: 9, c: "#262626" },
        { x: 11, y: 11, w: 1, h: 9, c: "#262626" },
        // Pants
        { x: 4, y: 22, w: 3, h: 8, c: "#171717" },
        { x: 7, y: 22, w: 3, h: 8, c: "#0a0a0a" },
        // Boots
        { x: 3, y: 30, w: 4, h: 3, c: "#ffffff" },
        { x: 7, y: 30, w: 4, h: 3, c: "#ffffff" },
      ],
    },
    // 4: Dancer with high ponytail & striped top
    {
      name: "Ponytail",
      animClass: "crowd-bounce-1",
      delay: "0.42s",
      width: 14,
      height: 30,
      pixels: [
        // Ponytail flicking up
        { x: 9, y: 0, w: 3, h: 4, c: "#000" },
        { x: 11, y: 3, w: 2, h: 3, c: "#000" },
        // Hair & Face
        { x: 3, y: 2, w: 7, h: 5, c: "#111" },
        { x: 4, y: 6, w: 6, h: 4, c: "#e5e5e5" },
        { x: 5, y: 7, w: 1, h: 1, c: "#111" },
        { x: 8, y: 7, w: 1, h: 1, c: "#111" },
        // Striped top
        { x: 3, y: 10, w: 8, h: 2, c: "#ffffff" },
        { x: 3, y: 12, w: 8, h: 2, c: "#262626" },
        { x: 3, y: 14, w: 8, h: 2, c: "#ffffff" },
        { x: 3, y: 16, w: 8, h: 2, c: "#262626" },
        // Arms
        { x: 2, y: 10, w: 1, h: 7, c: "#e5e5e5" },
        { x: 11, y: 10, w: 1, h: 7, c: "#e5e5e5" },
        // Dark trousers
        { x: 4, y: 18, w: 3, h: 9, c: "#171717" },
        { x: 7, y: 18, w: 3, h: 9, c: "#262626" },
        // Shoes
        { x: 3, y: 27, w: 4, h: 3, c: "#d4d4d4" },
        { x: 7, y: 27, w: 4, h: 3, c: "#d4d4d4" },
      ],
    },
    // 5: Cool guy with glasses and vest
    {
      name: "Glasses",
      animClass: "crowd-bounce-3",
      delay: "0.2s",
      width: 14,
      height: 31,
      pixels: [
        // Slick hair
        { x: 3, y: 1, w: 8, h: 4, c: "#1a1a1a" },
        // Face & Glasses
        { x: 4, y: 5, w: 6, h: 5, c: "#d4d4d4" },
        { x: 4, y: 6, w: 3, h: 2, c: "#000" }, // left glass
        { x: 7, y: 6, w: 3, h: 2, c: "#000" }, // right glass
        { x: 5, y: 7, w: 1, h: 1, c: "#fff" }, // reflection
        { x: 8, y: 7, w: 1, h: 1, c: "#fff" }, // reflection
        // White shirt + Black vest
        { x: 3, y: 10, w: 8, h: 9, c: "#ffffff" },
        { x: 3, y: 10, w: 2, h: 9, c: "#000000" },
        { x: 9, y: 10, w: 2, h: 9, c: "#000000" },
        // Pants
        { x: 4, y: 19, w: 3, h: 9, c: "#404040" },
        { x: 7, y: 19, w: 3, h: 9, c: "#262626" },
        // Shoes
        { x: 3, y: 28, w: 4, h: 3, c: "#000000" },
        { x: 7, y: 28, w: 4, h: 3, c: "#000000" },
      ],
    },
    // 6: Enthusiastic dancer with spiky hair
    {
      name: "Spiky",
      animClass: "crowd-bounce-2",
      delay: "0.35s",
      width: 14,
      height: 32,
      pixels: [
        // Spiky hair
        { x: 2, y: 0, w: 2, h: 3, c: "#262626" },
        { x: 5, y: 0, w: 2, h: 2, c: "#262626" },
        { x: 8, y: 0, w: 2, h: 3, c: "#262626" },
        { x: 10, y: 1, w: 2, h: 3, c: "#262626" },
        { x: 3, y: 2, w: 8, h: 3, c: "#262626" },
        // Face
        { x: 4, y: 5, w: 6, h: 5, c: "#e5e5e5" },
        { x: 5, y: 6, w: 1, h: 1, c: "#111" },
        { x: 8, y: 6, w: 1, h: 1, c: "#111" },
        // Grey Jacket
        { x: 3, y: 10, w: 8, h: 9, c: "#737373" },
        { x: 2, y: 9, w: 1, h: 8, c: "#525252" },
        { x: 11, y: 9, w: 1, h: 8, c: "#525252" },
        // Dark jeans
        { x: 4, y: 19, w: 3, h: 10, c: "#171717" },
        { x: 7, y: 19, w: 3, h: 10, c: "#262626" },
        // White high-tops
        { x: 3, y: 29, w: 4, h: 3, c: "#ffffff" },
        { x: 7, y: 29, w: 4, h: 3, c: "#ffffff" },
      ],
    },
    // 7: Girl with bob cut hairstyle
    {
      name: "BobCut",
      animClass: "crowd-bounce-1",
      delay: "0.08s",
      width: 14,
      height: 28,
      pixels: [
        // Bob cut helmet hair
        { x: 3, y: 1, w: 8, h: 4, c: "#000" },
        { x: 2, y: 4, w: 3, h: 5, c: "#000" },
        { x: 9, y: 4, w: 3, h: 5, c: "#000" },
        // Face
        { x: 4, y: 4, w: 6, h: 5, c: "#d4d4d4" },
        { x: 5, y: 5, w: 1, h: 1, c: "#111" },
        { x: 8, y: 5, w: 1, h: 1, c: "#111" },
        // Turtleneck sweater
        { x: 3, y: 9, w: 8, h: 8, c: "#e5e5e5" },
        { x: 2, y: 10, w: 1, h: 6, c: "#d4d4d4" },
        { x: 11, y: 10, w: 1, h: 6, c: "#d4d4d4" },
        // Pants
        { x: 4, y: 17, w: 3, h: 8, c: "#404040" },
        { x: 7, y: 17, w: 3, h: 8, c: "#525252" },
        // Shoes
        { x: 3, y: 25, w: 4, h: 3, c: "#000000" },
        { x: 7, y: 25, w: 4, h: 3, c: "#000000" },
      ],
    },
    // 8: Guy with backward cap and hoodie
    {
      name: "CapBackward",
      animClass: "crowd-bounce-3",
      delay: "0.48s",
      width: 14,
      height: 29,
      pixels: [
        // Backward cap
        { x: 3, y: 0, w: 8, h: 4, c: "#ffffff" },
        { x: 10, y: 2, w: 3, h: 2, c: "#a3a3a3" }, // visor backward
        // Face
        { x: 4, y: 4, w: 6, h: 5, c: "#e5e5e5" },
        { x: 5, y: 5, w: 1, h: 1, c: "#111" },
        { x: 8, y: 5, w: 1, h: 1, c: "#111" },
        // Hoodie
        { x: 3, y: 9, w: 8, h: 9, c: "#262626" },
        { x: 2, y: 10, w: 1, h: 7, c: "#171717" },
        { x: 11, y: 10, w: 1, h: 7, c: "#171717" },
        // Shorts / Cargo
        { x: 4, y: 18, w: 3, h: 8, c: "#525252" },
        { x: 7, y: 18, w: 3, h: 8, c: "#404040" },
        // Sneakers
        { x: 3, y: 26, w: 4, h: 3, c: "#ffffff" },
        { x: 7, y: 26, w: 4, h: 3, c: "#ffffff" },
      ],
    },
    // 9: Short cheerful listener
    {
      name: "Cheerful",
      animClass: "crowd-bounce-2",
      delay: "0.18s",
      width: 14,
      height: 26,
      pixels: [
        // Wavy hair
        { x: 3, y: 0, w: 8, h: 4, c: "#404040" },
        { x: 2, y: 2, w: 2, h: 4, c: "#404040" },
        { x: 10, y: 2, w: 2, h: 4, c: "#404040" },
        // Face
        { x: 4, y: 4, w: 6, h: 4, c: "#d4d4d4" },
        { x: 5, y: 5, w: 1, h: 1, c: "#111" },
        { x: 8, y: 5, w: 1, h: 1, c: "#111" },
        // Knit sweater
        { x: 3, y: 8, w: 8, h: 8, c: "#a3a3a3" },
        { x: 2, y: 9, w: 1, h: 6, c: "#737373" },
        { x: 11, y: 9, w: 1, h: 6, c: "#737373" },
        // Jeans
        { x: 4, y: 16, w: 3, h: 7, c: "#262626" },
        { x: 7, y: 16, w: 3, h: 7, c: "#171717" },
        // Shoes
        { x: 3, y: 23, w: 4, h: 3, c: "#000000" },
        { x: 7, y: 23, w: 4, h: 3, c: "#000000" },
      ],
    },
    // 10: Tall fan with oversized scarf
    {
      name: "ScarfFan",
      animClass: "crowd-bounce-1",
      delay: "0.32s",
      width: 14,
      height: 34,
      pixels: [
        // Messy top hair
        { x: 3, y: 0, w: 8, h: 4, c: "#000000" },
        // Face
        { x: 4, y: 4, w: 6, h: 4, c: "#e5e5e5" },
        { x: 5, y: 5, w: 1, h: 1, c: "#111" },
        { x: 8, y: 5, w: 1, h: 1, c: "#111" },
        // Big Scarf
        { x: 2, y: 8, w: 10, h: 4, c: "#ffffff" },
        { x: 7, y: 11, w: 3, h: 5, c: "#d4d4d4" }, // hanging end
        // Dark Coat
        { x: 3, y: 12, w: 8, h: 11, c: "#171717" },
        { x: 2, y: 13, w: 1, h: 8, c: "#262626" },
        { x: 11, y: 13, w: 1, h: 8, c: "#262626" },
        // Pants
        { x: 4, y: 23, w: 3, h: 8, c: "#404040" },
        { x: 7, y: 23, w: 3, h: 8, c: "#525252" },
        // Shoes
        { x: 3, y: 31, w: 4, h: 3, c: "#000000" },
        { x: 7, y: 31, w: 4, h: 3, c: "#000000" },
      ],
    },
  ];

  return (
    <div className="w-full flex items-end justify-center gap-2 sm:gap-3.5 pt-4 pb-2 select-none overflow-hidden">
      {characters.map((char, index) => {
        const isDancing = isPlaying;
        return (
          <div
            key={index}
            className={`flex flex-col items-center origin-bottom transition-transform duration-300 ${
              isDancing ? char.animClass : ""
            }`}
            style={{
              animationDelay: isDancing ? char.delay : "0s",
            }}
          >
            {/* Pixel Sprite Canvas / Inline SVG with crispEdges */}
            <svg
              width={char.width * 2.2}
              height={char.height * 2.2}
              viewBox={`0 0 ${char.width} ${char.height}`}
              className="rendering-pixelated drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
              style={{
                imageRendering: "pixelated",
                shapeRendering: "crispEdges",
              }}
              aria-hidden="true"
            >
              {char.pixels.map((p, pIdx) => (
                <rect
                  key={pIdx}
                  x={p.x}
                  y={p.y}
                  width={p.w}
                  height={p.h}
                  fill={p.c}
                />
              ))}
            </svg>
          </div>
        );
      })}
    </div>
  );
};

/**
 * -----------------------------------------------------------------------------
 * MAIN FOOTER COMPONENT
 * -----------------------------------------------------------------------------
 */
export const Footer: React.FC = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [signatureInView, setSignatureInView] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const signatureRef = useRef<HTMLDivElement>(null);

  const currentSong = SONGS[currentSongIndex];

  // Observe when signature enters viewport to trigger smooth entry animation
  useEffect(() => {
    const el = signatureRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSignatureInView(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Initialize Audio
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleEnded = () => {
      // Auto-play next song on completion
      setCurrentSongIndex((prev) => (prev + 1) % SONGS.length);
    };

    const handleTimeUpdate = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.pause();
    };
  }, []);

  // Update track when index changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = currentSong.src;
    audio.currentTime = 0;
    setProgress(0);

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser policy or missing file blocks playback, simulate progress
          startSimulatedProgress();
        });
      }
    }
  }, [currentSongIndex]);

  // Fallback simulation timer if local mp3 can't decode or is silent
  const startSimulatedProgress = () => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSongIndex((i) => (i + 1) % SONGS.length);
          return 0;
        }
        return prev + 1.2;
      });
    }, 200);
  };

  const stopSimulatedProgress = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  // Play / Pause Toggle
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      stopSimulatedProgress();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser audio blocked, smoothly simulate playback
          startSimulatedProgress();
        });
      }
    }
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % SONGS.length);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + SONGS.length) % SONGS.length);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    setProgress(newProgress);

    const audio = audioRef.current;
    if (audio && audio.duration) {
      audio.currentTime = (newProgress / 100) * audio.duration;
    }
  };

  return (
    <footer
      id="contact"
      className="w-full bg-[#ececec] text-black border-t border-black/15 font-sans relative overflow-hidden"
    >
      <div className="w-full min-h-[70vh] flex flex-col lg:flex-row">
        {/* ===================================================================
            LEFT 45%: RECORD PLAYER & PIXEL ART CROWD
           =================================================================== */}
        <section
          aria-label="Vinyl record player and interactive pixel art crowd"
          className="w-full lg:w-[45%] p-6 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-between items-center border-b lg:border-b-0 lg:border-r border-black/10"
        >
          {/* Top section of Left block: Neumorphic Record Player & Controls */}
          <div className="w-full flex flex-col items-center">
            {/* Turntable + Controls Container */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-9 max-w-lg w-full">
              {/* -------------------------------------------------------------
                  NEUMORPHIC TURNTABLE CHASSIS
                  Raised slab with top-left light and bottom-right dark shadow
                 ------------------------------------------------------------- */}
              <div
                className="relative w-[210px] h-[210px] sm:w-[230px] sm:h-[230px] rounded-[28px] bg-[#ececec] p-4 flex items-center justify-center shrink-0 select-none"
                style={{
                  boxShadow:
                    "-8px -8px 16px rgba(255, 255, 255, 0.95), 8px 8px 18px rgba(0, 0, 0, 0.18)",
                }}
              >
                {/* INSET CIRCULAR WELL FOR VINYL */}
                <div
                  className="w-[160px] h-[160px] sm:w-[176px] sm:h-[176px] rounded-full bg-[#e4e4e4] flex items-center justify-center relative overflow-hidden"
                  style={{
                    boxShadow:
                      "inset 6px 6px 12px rgba(0, 0, 0, 0.22), inset -6px -6px 12px rgba(255, 255, 255, 0.95)",
                  }}
                >
                  {/* VINYL DISC */}
                  <div
                    className={`w-[148px] h-[148px] sm:w-[162px] sm:h-[162px] rounded-full relative flex items-center justify-center shadow-md ${
                      isPlaying ? "spin-vinyl" : ""
                    }`}
                    style={{
                      background:
                        "radial-gradient(circle at center, #1c1c1c 0%, #111111 60%, #080808 100%)",
                    }}
                  >
                    {/* Concentric Vinyl Grooves SVG */}
                    <svg
                      viewBox="0 0 160 160"
                      className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
                      aria-hidden="true"
                    >
                      <circle cx="80" cy="80" r="74" fill="none" stroke="#2a2a2a" strokeWidth="0.6" />
                      <circle cx="80" cy="80" r="70" fill="none" stroke="#1f1f1f" strokeWidth="0.8" />
                      <circle cx="80" cy="80" r="66" fill="none" stroke="#2f2f2f" strokeWidth="0.5" />
                      <circle cx="80" cy="80" r="62" fill="none" stroke="#1c1c1c" strokeWidth="0.9" />
                      <circle cx="80" cy="80" r="57" fill="none" stroke="#2d2d2d" strokeWidth="0.6" />
                      <circle cx="80" cy="80" r="53" fill="none" stroke="#222222" strokeWidth="0.8" />
                      <circle cx="80" cy="80" r="48" fill="none" stroke="#333333" strokeWidth="0.5" />
                      <circle cx="80" cy="80" r="44" fill="none" stroke="#1f1f1f" strokeWidth="0.7" />
                      <circle cx="80" cy="80" r="39" fill="none" stroke="#2a2a2a" strokeWidth="0.5" />

                      {/* Sheen / Specular light reflection on vinyl */}
                      <path
                        d="M 20 20 Q 80 80 20 140"
                        fill="none"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="8"
                      />
                      <path
                        d="M 140 20 Q 80 80 140 140"
                        fill="none"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="8"
                      />
                    </svg>

                    {/* Light-grey Center Label with Center Hole */}
                    <div
                      className="w-[52px] h-[52px] rounded-full bg-[#e8e8e8] border border-black/10 flex flex-col items-center justify-center relative shadow-sm"
                      style={{
                        boxShadow:
                          "0 1px 3px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.8)",
                      }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-[#111] shadow-inner" />
                      <span className="text-[6px] font-bold text-black/60 tracking-tighter mt-1 select-none">
                        33 RPM
                      </span>
                    </div>
                  </div>
                </div>

                {/* TONEARM ASSEMBLY (Top Right of Chassis) */}
                <div
                  className="absolute top-2.5 right-2.5 w-14 h-28 pointer-events-none origin-top-right transition-transform duration-700"
                  style={{
                    transformOrigin: "38px 16px",
                    transform: isPlaying ? "rotate(24deg)" : "rotate(-6deg)",
                    transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                >
                  {/* Round Raised Pivot Base */}
                  <div
                    className="absolute top-1.5 right-1.5 w-8 h-8 rounded-full bg-[#ececec] flex items-center justify-center"
                    style={{
                      boxShadow:
                        "-2px -2px 5px rgba(255, 255, 255, 0.9), 3px 3px 6px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <div className="w-3 h-3 rounded-full bg-[#d0d0d0] border border-black/20 shadow-inner" />
                  </div>

                  {/* Tonearm & Headshell SVG */}
                  <svg
                    viewBox="0 0 50 110"
                    className="w-full h-full overflow-visible"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="metalArm" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#f5f5f5" />
                        <stop offset="50%" stopColor="#9a9a9a" />
                        <stop offset="100%" stopColor="#dcdcdc" />
                      </linearGradient>
                    </defs>
                    {/* Metal arm rod */}
                    <path
                      d="M 38 18 L 30 70 L 22 96"
                      fill="none"
                      stroke="url(#metalArm)"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* Counterweight */}
                    <rect
                      x="34"
                      y="7"
                      width="8"
                      height="8"
                      rx="2"
                      fill="#525252"
                      stroke="#262626"
                      strokeWidth="0.8"
                    />
                    {/* Cartridge / Headshell */}
                    <path
                      d="M 18 94 L 25 99 L 20 108 L 13 103 Z"
                      fill="#262626"
                      stroke="#111"
                      strokeWidth="0.8"
                    />
                    {/* Tiny needle stylus tip */}
                    <circle cx="16" cy="107" r="1" fill="#fff" />
                  </svg>
                </div>

                {/* NEUMORPHIC POWER / PLAYBACK LED (Bottom Left) */}
                <div
                  className="absolute bottom-3.5 left-3.5 w-3.5 h-3.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: isPlaying ? "#ffffff" : "#1a1a1a",
                    boxShadow: isPlaying
                      ? "0 0 8px rgba(255, 255, 255, 0.95), 0 0 16px rgba(255, 255, 255, 0.8), inset 0 0 2px rgba(255,255,255,1)"
                      : "inset 1px 1px 2px rgba(0, 0, 0, 0.8), inset -1px -1px 2px rgba(255, 255, 255, 0.15)",
                  }}
                  title={isPlaying ? "LED: Active" : "LED: Standby"}
                />
              </div>

              {/* -------------------------------------------------------------
                  NEUMORPHIC CONTROLS & TRACK DETAILS
                 ------------------------------------------------------------- */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                {/* Playback Buttons Group */}
                <div className="flex items-center gap-3.5 mb-4">
                  {/* Previous Button */}
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous song"
                    className="w-10 h-10 rounded-full bg-[#ececec] flex items-center justify-center text-black/75 hover:text-black transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:outline-none"
                    style={{
                      boxShadow:
                        "-3px -3px 7px rgba(255, 255, 255, 0.9), 3px 3px 7px rgba(0, 0, 0, 0.16)",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 fill-currentColor"
                      aria-hidden="true"
                    >
                      <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                    </svg>
                  </button>

                  {/* Play / Pause Primary Button */}
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause music" : "Play music"}
                    className="w-14 h-14 rounded-full bg-[#ececec] flex items-center justify-center text-black transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:outline-none"
                    style={{
                      boxShadow: isPlaying
                        ? "inset 4px 4px 8px rgba(0, 0, 0, 0.22), inset -4px -4px 8px rgba(255, 255, 255, 0.95)"
                        : "-5px -5px 11px rgba(255, 255, 255, 0.95), 5px 5px 11px rgba(0, 0, 0, 0.18)",
                    }}
                  >
                    {isPlaying ? (
                      <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5 fill-currentColor"
                        aria-hidden="true"
                      >
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5 fill-currentColor ml-0.5"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  {/* Next Button */}
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next song"
                    className="w-10 h-10 rounded-full bg-[#ececec] flex items-center justify-center text-black/75 hover:text-black transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:outline-none"
                    style={{
                      boxShadow:
                        "-3px -3px 7px rgba(255, 255, 255, 0.9), 3px 3px 7px rgba(0, 0, 0, 0.16)",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 fill-currentColor"
                      aria-hidden="true"
                    >
                      <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                    </svg>
                  </button>
                </div>

                {/* Song Meta Information */}
                <div className="mb-3 max-w-[200px]">
                  <p className="text-sm font-semibold tracking-tight text-black truncate">
                    {currentSong.title}
                  </p>
                  <p className="text-xs text-black/60 truncate mt-0.5">
                    {currentSong.artist}
                  </p>
                </div>

                {/* Thin Neumorphic Progress Track */}
                <div
                  onClick={handleSeek}
                  role="progressbar"
                  aria-valuenow={Math.round(progress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Song progress"
                  className="w-44 h-2 rounded-full bg-[#e2e2e2] cursor-pointer overflow-hidden relative"
                  style={{
                    boxShadow:
                      "inset 2px 2px 4px rgba(0, 0, 0, 0.18), inset -2px -2px 4px rgba(255, 255, 255, 0.9)",
                  }}
                >
                  <div
                    className="h-full bg-neutral-900 rounded-full transition-all duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section of Left block: Typewriter Prompt & Pixel Crowd */}
          <div className="w-full mt-10 lg:mt-8 flex flex-col items-center">
            {/* Typewriter message: visible only when music is paused */}
            <TypewriterPrompt isPlaying={isPlaying} />

            {/* Pixel Art Crowd */}
            <PixelCrowd isPlaying={isPlaying} />
          </div>
        </section>

        {/* ===================================================================
            RIGHT 55%: SIGNATURE, QUOTE, CONTACT LINKS & COPYRIGHT (RIGHT-ALIGNED)
           =================================================================== */}
        <section
          aria-label="Footer signature and contact links"
          className="w-full lg:w-[55%] p-8 sm:p-12 lg:p-16 xl:p-20 flex flex-col justify-between items-end text-right"
        >
          {/* Top Right: Signature and Quote (Right-Aligned) */}
          <div ref={signatureRef} className="pt-2 sm:pt-4 flex flex-col items-end text-right">
            <div className="relative inline-flex flex-col items-end">
              {/* Handwritten Signature in Medium Size with Smooth Right-to-Left Clip Mask (Zero Blur) */}
              <h2
                className={`font-signature text-3xl sm:text-4xl md:text-5xl text-black leading-tight select-none tracking-normal text-right transition-opacity duration-300 ${
                  signatureInView ? "signature-clip-rtl" : "opacity-0"
                }`}
              >
                Himanshu Verma
              </h2>

              {/* Signature Underline Flourish with PathLength 0 to 1 Drawing Right to Left */}
              <svg
                viewBox="0 0 220 24"
                className="w-44 sm:w-52 md:w-60 h-5 sm:h-6 overflow-visible pointer-events-none -mt-1 text-black"
                aria-hidden="true"
              >
                <path
                  d="M 215 12 C 160 22, 90 2, 10 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="1"
                  className={signatureInView ? "path-length-draw" : "opacity-0"}
                />
              </svg>
            </div>

            {/* Quote directly beneath */}
            <p className="mt-3 text-xs sm:text-sm font-normal text-black/50 tracking-wide font-sans text-right">
              &ldquo;men are brave&rdquo;
            </p>
          </div>

          {/* Bottom Right: Contact Links & Copyright (Right-Aligned) */}
          <div className="pt-16 lg:pt-20 flex flex-col items-end text-right w-full">
            {/* Contact Links Row - right-aligned */}
            <div
              aria-label="Contact links"
              className="flex flex-wrap items-center justify-end gap-6 sm:gap-8 text-xs sm:text-sm md:text-base font-medium text-black"
            >
              <a
                href="mailto:himanshuverma2660@gmail.com"
                className="group relative inline-block py-1 hover:text-black focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:outline-none rounded-sm transition-colors"
              >
                himanshuverma2660@gmail.com
                {/* Sliding underline */}
                <span className="absolute bottom-0 right-0 w-full h-[1.5px] bg-black scale-x-0 origin-right transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>

              <a
                href="https://github.com/fit-edoc"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block py-1 hover:text-black focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:outline-none rounded-sm transition-colors"
              >
                GitHub
                {/* Sliding underline */}
                <span className="absolute bottom-0 right-0 w-full h-[1.5px] bg-black scale-x-0 origin-right transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>

              <a
                href="https://x.com/fitedocc"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block py-1 hover:text-black focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:outline-none rounded-sm transition-colors"
              >
                X
                {/* Sliding underline */}
                <span className="absolute bottom-0 right-0 w-full h-[1.5px] bg-black scale-x-0 origin-right transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            </div>

            {/* Copyright Line - right-aligned */}
            <p className="mt-4 sm:mt-5 text-xs text-black/45 font-normal tracking-wide text-right">
              &copy; {new Date().getFullYear()} Himanshu Verma. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
