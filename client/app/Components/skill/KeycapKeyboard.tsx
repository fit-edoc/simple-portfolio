"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export interface TechItem {
  id: string;
  name: string;
  shortLabel: string;
  category: "Frontend" | "Backend" | "Infra & Deployment" | "Tools";
  color: string;
  textColor: string;
  iconType: string;
}

export const CATEGORIZED_TECHS: Record<
  "Frontend" | "Backend" | "Infra & Deployment" | "Tools",
  TechItem[]
> = {
  Frontend: [
    {
      id: "nextjs",
      name: "Next.js",
      shortLabel: "NEXT",
      category: "Frontend",
      color: "#18181b",
      textColor: "#ffffff",
      iconType: "nextjs",
    },
    {
      id: "react",
      name: "React",
      shortLabel: "REACT",
      category: "Frontend",
      color: "#00d8ff",
      textColor: "#000000",
      iconType: "react",
    },
    {
      id: "typescript",
      name: "TypeScript",
      shortLabel: "TS",
      category: "Frontend",
      color: "#3178c6",
      textColor: "#ffffff",
      iconType: "typescript",
    },
    {
      id: "tailwind",
      name: "Tailwind CSS",
      shortLabel: "TW",
      category: "Frontend",
      color: "#06b6d4",
      textColor: "#000000",
      iconType: "tailwind",
    },
    {
      id: "javascript",
      name: "JavaScript",
      shortLabel: "JS",
      category: "Frontend",
      color: "#f7df1e",
      textColor: "#000000",
      iconType: "javascript",
    },
  ],
  Backend: [
    {
      id: "nodejs",
      name: "Node.js",
      shortLabel: "NODE",
      category: "Backend",
      color: "#22c55e",
      textColor: "#000000",
      iconType: "nodejs",
    },
    {
      id: "postgresql",
      name: "PostgreSQL",
      shortLabel: "PGSQL",
      category: "Backend",
      color: "#336791",
      textColor: "#ffffff",
      iconType: "postgresql",
    },
    {
      id: "mongodb",
      name: "MongoDB",
      shortLabel: "MONGO",
      category: "Backend",
      color: "#10b981",
      textColor: "#ffffff",
      iconType: "mongodb",
    },
    {
      id: "redis",
      name: "Redis",
      shortLabel: "REDIS",
      category: "Backend",
      color: "#ef4444",
      textColor: "#ffffff",
      iconType: "redis",
    },
    {
      id: "fastapi",
      name: "Python / FastAPI",
      shortLabel: "PY",
      category: "Backend",
      color: "#009688",
      textColor: "#ffffff",
      iconType: "fastapi",
    },
  ],
  "Infra & Deployment": [
    {
      id: "docker",
      name: "Docker",
      shortLabel: "DOCKER",
      category: "Infra & Deployment",
      color: "#0284c7",
      textColor: "#ffffff",
      iconType: "docker",
    },
    {
      id: "git",
      name: "Git",
      shortLabel: "GIT",
      category: "Infra & Deployment",
      color: "#f97316",
      textColor: "#ffffff",
      iconType: "git",
    },
    {
      id: "vercel",
      name: "Vercel",
      shortLabel: "VERCEL",
      category: "Infra & Deployment",
      color: "#000000",
      textColor: "#ffffff",
      iconType: "vercel",
    },
    {
      id: "linux",
      name: "Linux / Bash",
      shortLabel: "LINUX",
      category: "Infra & Deployment",
      color: "#eab308",
      textColor: "#000000",
      iconType: "linux",
    },
    {
      id: "cicd",
      name: "CI / CD",
      shortLabel: "CI/CD",
      category: "Infra & Deployment",
      color: "#6366f1",
      textColor: "#ffffff",
      iconType: "cicd",
    },
  ],
  Tools: [
    {
      id: "webgl",
      name: "WebGL / Three.js",
      shortLabel: "3D",
      category: "Tools",
      color: "#ff2d87",
      textColor: "#000000",
      iconType: "globe",
    },
    {
      id: "figma",
      name: "Figma",
      shortLabel: "FIGMA",
      category: "Tools",
      color: "#ff2d87",
      textColor: "#000000",
      iconType: "figma",
    },
    {
      id: "vscode",
      name: "VS Code",
      shortLabel: "VSCODE",
      category: "Tools",
      color: "#007acc",
      textColor: "#ffffff",
      iconType: "vscode",
    },
    {
      id: "postman",
      name: "Postman",
      shortLabel: "API",
      category: "Tools",
      color: "#f97316",
      textColor: "#ffffff",
      iconType: "postman",
    },
    {
      id: "ai",
      name: "AI & LLMs",
      shortLabel: "AI",
      category: "Tools",
      color: "#10a37f",
      textColor: "#ffffff",
      iconType: "ai",
    },
  ],
};

// ============================================================================
// WEBGL AVAILABILITY DETECTOR
// ============================================================================
export function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") ||
          canvas.getContext("webgl") ||
          canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// ============================================================================
// SINGLETON TEXTURE & CANVAS CACHES
// ============================================================================
const canvasCache = new Map<string, HTMLCanvasElement>();
const textureCache = new Map<string, THREE.CanvasTexture>();
let cachedSmallKeyGeom: THREE.BufferGeometry | null = null;
let cachedHeroKeyGeom: THREE.BufferGeometry | null = null;
let sharedAudioCtx: AudioContext | null = null;

function renderPixelGlyph(
  iconType: string,
  keyColor: string,
  drawPixelRect: (px: number, py: number, pw: number, ph: number) => void,
  ctx: CanvasRenderingContext2D
) {
  switch (iconType) {
    case "globe":
      drawPixelRect(5, 1, 6, 1);
      drawPixelRect(3, 2, 10, 1);
      drawPixelRect(2, 3, 12, 1);
      drawPixelRect(1, 4, 14, 1);
      drawPixelRect(1, 5, 14, 6);
      drawPixelRect(1, 11, 14, 1);
      drawPixelRect(2, 12, 12, 1);
      drawPixelRect(3, 13, 10, 1);
      drawPixelRect(5, 14, 6, 1);

      ctx.fillStyle = keyColor;
      drawPixelRect(4, 3, 2, 2);
      drawPixelRect(3, 5, 3, 3);
      drawPixelRect(4, 8, 2, 4);
      drawPixelRect(5, 9, 2, 3);
      drawPixelRect(9, 3, 3, 2);
      drawPixelRect(8, 5, 4, 3);
      drawPixelRect(9, 8, 3, 4);
      drawPixelRect(10, 9, 2, 3);
      break;

    case "react":
      drawPixelRect(7, 7, 2, 2);
      drawPixelRect(4, 4, 8, 1);
      drawPixelRect(4, 11, 8, 1);
      drawPixelRect(2, 6, 1, 4);
      drawPixelRect(13, 6, 1, 4);
      drawPixelRect(3, 5, 1, 1);
      drawPixelRect(12, 5, 1, 1);
      drawPixelRect(3, 10, 1, 1);
      drawPixelRect(12, 10, 1, 1);
      break;

    case "nextjs":
      drawPixelRect(2, 2, 2, 12);
      drawPixelRect(12, 2, 2, 12);
      drawPixelRect(4, 4, 2, 2);
      drawPixelRect(6, 6, 2, 2);
      drawPixelRect(8, 8, 2, 2);
      drawPixelRect(10, 10, 2, 2);
      break;

    case "typescript":
      drawPixelRect(2, 4, 6, 2);
      drawPixelRect(4, 6, 2, 7);
      drawPixelRect(9, 4, 5, 2);
      drawPixelRect(9, 6, 2, 2);
      drawPixelRect(9, 8, 5, 2);
      drawPixelRect(12, 10, 2, 2);
      drawPixelRect(9, 11, 5, 2);
      break;

    case "tailwind":
      drawPixelRect(2, 7, 3, 2);
      drawPixelRect(5, 5, 4, 2);
      drawPixelRect(9, 5, 2, 2);
      drawPixelRect(10, 7, 4, 2);
      drawPixelRect(4, 10, 3, 2);
      drawPixelRect(7, 9, 4, 2);
      drawPixelRect(11, 11, 3, 2);
      break;

    case "javascript":
      drawPixelRect(4, 4, 2, 7);
      drawPixelRect(2, 9, 2, 2);
      drawPixelRect(3, 11, 3, 2);
      drawPixelRect(9, 4, 5, 2);
      drawPixelRect(9, 6, 2, 2);
      drawPixelRect(9, 8, 5, 2);
      drawPixelRect(12, 10, 2, 2);
      drawPixelRect(9, 11, 5, 2);
      break;

    case "nodejs":
      drawPixelRect(5, 2, 6, 2);
      drawPixelRect(2, 4, 2, 8);
      drawPixelRect(12, 4, 2, 8);
      drawPixelRect(5, 12, 6, 2);
      drawPixelRect(5, 6, 2, 4);
      drawPixelRect(7, 6, 2, 4);
      drawPixelRect(9, 6, 2, 4);
      break;

    case "postgresql":
      drawPixelRect(3, 3, 8, 2);
      drawPixelRect(2, 5, 10, 6);
      drawPixelRect(12, 6, 2, 5);
      drawPixelRect(4, 11, 2, 3);
      drawPixelRect(8, 11, 2, 3);
      break;

    case "mongodb":
      drawPixelRect(7, 2, 2, 3);
      drawPixelRect(5, 5, 6, 6);
      drawPixelRect(6, 11, 4, 3);
      drawPixelRect(7, 4, 2, 8);
      break;

    case "redis":
      drawPixelRect(4, 3, 8, 2);
      drawPixelRect(3, 5, 10, 2);
      drawPixelRect(4, 8, 8, 2);
      drawPixelRect(3, 10, 10, 2);
      break;

    case "fastapi":
      drawPixelRect(8, 1, 4, 4);
      drawPixelRect(6, 5, 6, 3);
      drawPixelRect(4, 8, 6, 4);
      drawPixelRect(6, 12, 2, 3);
      break;

    case "docker":
      drawPixelRect(5, 4, 2, 2);
      drawPixelRect(8, 4, 2, 2);
      drawPixelRect(5, 7, 2, 2);
      drawPixelRect(8, 7, 2, 2);
      drawPixelRect(11, 7, 2, 2);
      drawPixelRect(2, 10, 12, 3);
      drawPixelRect(13, 9, 2, 2);
      break;

    case "git":
      drawPixelRect(3, 3, 3, 3);
      drawPixelRect(4, 6, 2, 5);
      drawPixelRect(3, 11, 3, 3);
      drawPixelRect(6, 6, 2, 2);
      drawPixelRect(8, 5, 2, 2);
      drawPixelRect(10, 4, 3, 3);
      break;

    case "vercel":
      drawPixelRect(7, 2, 2, 2);
      drawPixelRect(6, 4, 4, 2);
      drawPixelRect(5, 6, 6, 2);
      drawPixelRect(4, 8, 8, 2);
      drawPixelRect(3, 10, 10, 2);
      drawPixelRect(2, 12, 12, 2);
      break;

    case "linux":
      drawPixelRect(3, 4, 2, 2);
      drawPixelRect(5, 6, 2, 2);
      drawPixelRect(3, 8, 2, 2);
      drawPixelRect(8, 10, 5, 2);
      break;

    case "cicd":
      drawPixelRect(5, 3, 6, 2);
      drawPixelRect(3, 5, 2, 6);
      drawPixelRect(11, 5, 2, 6);
      drawPixelRect(5, 11, 6, 2);
      drawPixelRect(11, 3, 2, 2);
      drawPixelRect(3, 11, 2, 2);
      break;

    case "figma":
      drawPixelRect(4, 2, 4, 4);
      drawPixelRect(8, 2, 4, 4);
      drawPixelRect(4, 6, 4, 4);
      drawPixelRect(8, 6, 4, 4);
      drawPixelRect(4, 10, 4, 4);
      break;

    case "vscode":
      drawPixelRect(3, 4, 3, 2);
      drawPixelRect(2, 6, 2, 4);
      drawPixelRect(3, 10, 3, 2);
      drawPixelRect(10, 4, 3, 2);
      drawPixelRect(12, 6, 2, 4);
      drawPixelRect(10, 10, 3, 2);
      break;

    case "postman":
      drawPixelRect(3, 3, 10, 2);
      drawPixelRect(5, 5, 6, 2);
      drawPixelRect(7, 7, 3, 2);
      drawPixelRect(8, 9, 2, 4);
      break;

    case "ai":
      drawPixelRect(7, 2, 2, 4);
      drawPixelRect(7, 10, 2, 4);
      drawPixelRect(2, 7, 4, 2);
      drawPixelRect(10, 7, 4, 2);
      drawPixelRect(6, 6, 4, 4);
      break;

    default:
      drawPixelRect(4, 4, 8, 8);
      break;
  }
}

export function getOrCreateKeycapCanvas(tech: TechItem): HTMLCanvasElement {
  const key = `${tech.id}_${tech.color}_${tech.textColor}`;
  let canvas = canvasCache.get(key);
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.width = 320;
    canvas.height = 320;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // 1. Base Color
      ctx.fillStyle = tech.color;
      ctx.fillRect(0, 0, 320, 320);

      // 2. XL Inner Dish Radius
      const margin = 20;
      const size = 320 - margin * 2;
      const xlRadius = 48;

      ctx.save();
      ctx.beginPath();
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(margin, margin, size, size, xlRadius);
      } else {
        const r = xlRadius;
        ctx.moveTo(margin + r, margin);
        ctx.lineTo(margin + size - r, margin);
        ctx.quadraticCurveTo(margin + size, margin, margin + size, margin + r);
        ctx.lineTo(margin + size, margin + size - r);
        ctx.quadraticCurveTo(margin + size, margin + size, margin + size - r, margin + size);
        ctx.lineTo(margin + r, margin + size);
        ctx.quadraticCurveTo(margin, margin + size, margin, margin + size - r);
        ctx.lineTo(margin, margin + r);
        ctx.quadraticCurveTo(margin, margin, margin + r, margin);
      }
      ctx.closePath();
      ctx.clip();

      // Radial Lighting Scoop
      const dishGrad = ctx.createRadialGradient(160, 160, 30, 160, 160, 150);
      dishGrad.addColorStop(0, "rgba(255, 255, 255, 0.22)");
      dishGrad.addColorStop(0.65, "rgba(255, 255, 255, 0.03)");
      dishGrad.addColorStop(0.88, "rgba(0, 0, 0, 0.12)");
      dishGrad.addColorStop(1, "rgba(0, 0, 0, 0.38)");
      ctx.fillStyle = dishGrad;
      ctx.fill();

      // Rim Stroke
      ctx.lineWidth = 10;
      ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
      ctx.stroke();

      ctx.lineWidth = 4;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
      ctx.stroke();

      // 3. Pixel Glyph
      ctx.fillStyle = tech.textColor;
      const cx = 160;
      const cy = 160;
      const s = 8.5;

      const drawPixelRect = (px: number, py: number, pw: number, ph: number) => {
        ctx.fillRect(
          Math.round(cx + (px - 8) * s),
          Math.round(cy + (py - 8) * s),
          Math.round(pw * s),
          Math.round(ph * s)
        );
      };

      renderPixelGlyph(tech.iconType, tech.color, drawPixelRect, ctx);
      ctx.restore();
    }

    canvasCache.set(key, canvas);
  }
  return canvas;
}

export function getOrCreateKeycapTexture(tech: TechItem): THREE.CanvasTexture {
  const key = `${tech.id}_${tech.color}_${tech.textColor}`;
  let tex = textureCache.get(key);
  if (!tex) {
    const canvas = getOrCreateKeycapCanvas(tech);
    tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    textureCache.set(key, tex);
  }
  return tex;
}

function createKeycapGeometry(size: number, height: number): THREE.BufferGeometry {
  const geom = new THREE.BoxGeometry(size, height, size, 8, 8, 8);
  const pos = geom.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i);
    let y = pos.getY(i);
    let z = pos.getZ(i);

    const normY = (y + height / 2) / height;
    const taper = 1.12 - normY * 0.28;
    x *= taper;
    z *= taper;

    if (y > height * 0.42) {
      const dist = Math.sqrt(x * x + z * z);
      const dish = Math.max(0, 0.06 * (1 - Math.min(1, (dist / (size * 0.5)) ** 2)));
      y -= dish;
    }

    pos.setXYZ(i, x, y, z);
  }

  geom.computeVertexNormals();
  return geom;
}

function getSmallKeycapGeometry(): THREE.BufferGeometry {
  if (!cachedSmallKeyGeom) {
    cachedSmallKeyGeom = createKeycapGeometry(1.2, 0.52);
  }
  return cachedSmallKeyGeom;
}

function getHeroKeycapGeometry(): THREE.BufferGeometry {
  if (!cachedHeroKeyGeom) {
    cachedHeroKeyGeom = createKeycapGeometry(1.65, 0.75);
  }
  return cachedHeroKeyGeom;
}

// Reusable audio player using singleton context
function playSwitchSound() {
  try {
    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!sharedAudioCtx || sharedAudioCtx.state === "closed") {
      sharedAudioCtx = new AudioContextClass();
    }
    if (sharedAudioCtx.state === "suspended") {
      sharedAudioCtx.resume();
    }

    const ctx = sharedAudioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(170, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.04);
  } catch {
    // Audio blocked or uninitialized
  }
}

// ============================================================================
// CRASH-PROOF 2D CANVAS ICON COMPONENT
// ============================================================================
const KeycapIconCanvas: React.FC<{ tech: TechItem; size?: number }> = ({ tech, size = 64 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const source = getOrCreateKeycapCanvas(tech);
    ctx.clearRect(0, 0, size, size);
    ctx.drawImage(source, 0, 0, size, size);
  }, [tech, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="w-full h-full object-contain pointer-events-none rounded-lg"
    />
  );
};

// ============================================================================
// LEFT CANVAS: CATEGORY 3D KEYCAPS (WITH GRACEFUL FALLBACK)
// ============================================================================
interface CategoryKeysCanvasProps {
  category: "Frontend" | "Backend" | "Infra & Deployment" | "Tools";
  onSelectTech: (tech: TechItem) => void;
  selectedTech: TechItem;
}

interface KeyEntity {
  mesh: THREE.Mesh;
  tech: TechItem;
  velocity: number;
  isPressed: boolean;
  isHovered: boolean;
  materials: THREE.MeshStandardMaterial[];
}

export const CategoryKeysCanvas: React.FC<CategoryKeysCanvasProps> = ({
  category,
  onSelectTech,
  selectedTech,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [useFallback, setUseFallback] = useState(false);
  const [pressedId, setPressedId] = useState<string | null>(null);

  const onSelectRef = useRef(onSelectTech);
  onSelectRef.current = onSelectTech;

  const isVisibleRef = useRef(true);
  const deckGroupRef = useRef<THREE.Group | null>(null);
  const plateMeshRef = useRef<THREE.Mesh | null>(null);
  const keysRef = useRef<KeyEntity[]>([]);
  const interactiveMeshesRef = useRef<THREE.Mesh[]>([]);

  // 1. Initial WebGL Mount (Guarded by try-catch & WebGL detection)
  useEffect(() => {
    if (!isWebGLAvailable()) {
      setUseFallback(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "default",
        failIfMajorPerformanceCaveat: false,
      });
    } catch {
      setUseFallback(true);
      return;
    }

    const scene = new THREE.Scene();
    scene.background = null;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 340;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 5.8, 7.8);
    camera.lookAt(0, -0.2, 0);

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 8, 6);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xffffff, 2.6, 20);
    rimLight.position.set(6, 5, -4);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight(0xff2d87, 1.2, 18);
    accentLight.position.set(-5, 2, 5);
    scene.add(accentLight);

    const deckGroup = new THREE.Group();
    deckGroupRef.current = deckGroup;
    scene.add(deckGroup);

    // Dark Switch Plate Base
    const plateGeom = new THREE.BoxGeometry(1, 0.35, 2.6);
    const plateMat = new THREE.MeshStandardMaterial({
      color: "#606060",
      roughness: 0.8,
      metalness: 0.65,
    });
    const plateMesh = new THREE.Mesh(plateGeom, plateMat);
    plateMesh.position.y = -0.32;
    plateMeshRef.current = plateMesh;
    deckGroup.add(plateMesh);

    // Pointer Raycasting
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);
    let targetTiltX = 0;
    let targetTiltY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.x = x;
      mouse.y = y;

      targetTiltY = x * 0.12;
      targetTiltX = -y * 0.08;

      setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handlePointerLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      targetTiltX = 0;
      targetTiltY = 0;
      setHoveredTech(null);
      container.style.cursor = "default";
      keysRef.current.forEach((k) => (k.isHovered = false));
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshesRef.current);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const key = keysRef.current.find((k) => k.mesh === hit);
        if (key) {
          key.isPressed = true;
          key.velocity = -6.0;
          playSwitchSound();
          onSelectRef.current(key.tech);
        }
      }
    };

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("mouseleave", handlePointerLeave);
    container.addEventListener("click", handleClick);

    const handleResize = () => {
      if (!container || !renderer) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW <= 0 || newH <= 0) return;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    });
    observer.observe(container);

    let animId: number;
    let lastTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisibleRef.current || !renderer) return;

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      deckGroup.rotation.y += (targetTiltY - deckGroup.rotation.y) * 0.08;
      deckGroup.rotation.x += (targetTiltX - deckGroup.rotation.x) * 0.08;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshesRef.current);

      let found: TechItem | null = null;

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        keysRef.current.forEach((k) => {
          if (k.mesh === hit) {
            k.isHovered = true;
            found = k.tech;
          } else {
            k.isHovered = false;
          }
        });
        container.style.cursor = "pointer";
      } else {
        keysRef.current.forEach((k) => (k.isHovered = false));
        container.style.cursor = "default";
      }

      setHoveredTech(found);

      // Spring physics
      keysRef.current.forEach((k) => {
        let targetY = 0;
        if (k.isPressed) {
          targetY = -0.22;
        } else if (k.isHovered) {
          targetY = 0.12;
        }

        const force = (targetY - k.mesh.position.y) * 320;
        k.velocity += force * delta;
        k.velocity *= Math.exp(-15 * delta);
        k.mesh.position.y += k.velocity * delta;

        if (k.isPressed && k.mesh.position.y <= -0.18) {
          k.isPressed = false;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("mouseleave", handlePointerLeave);
      container.removeEventListener("click", handleClick);

      plateGeom.dispose();
      plateMat.dispose();

      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  // 2. Category Switch (Zero WebGL context recreation)
  useEffect(() => {
    if (useFallback) return;

    const deckGroup = deckGroupRef.current;
    const plateMesh = plateMeshRef.current;
    if (!deckGroup || !plateMesh) return;

    const techList = CATEGORIZED_TECHS[category];
    const keyGeom = getSmallKeycapGeometry();

    keysRef.current.forEach((k) => {
      deckGroup.remove(k.mesh);
      k.materials.forEach((m) => m.dispose());
    });
    keysRef.current = [];
    interactiveMeshesRef.current = [];

    const keyCount = techList.length;
    const spacing = 1.45;
    const plateWidth = keyCount * spacing + 0.6;
    plateMesh.scale.x = plateWidth;

    techList.forEach((tech, i) => {
      const posX = (i - (keyCount - 1) / 2) * spacing;
      const topTexture = getOrCreateKeycapTexture(tech);

      const sideMat = new THREE.MeshStandardMaterial({
        color: tech.color,
        roughness: 0.26,
        metalness: 0.04,
      });

      const topMat = new THREE.MeshStandardMaterial({
        map: topTexture,
        roughness: 0.2,
        metalness: 0.04,
      });

      const materials = [sideMat, sideMat, topMat, sideMat, sideMat, sideMat];
      const mesh = new THREE.Mesh(keyGeom, materials);
      mesh.position.set(posX, 0, 0);

      deckGroup.add(mesh);
      interactiveMeshesRef.current.push(mesh);

      keysRef.current.push({
        mesh,
        tech,
        velocity: 0,
        isPressed: false,
        isHovered: false,
        materials,
      });
    });
  }, [category, useFallback]);

  // If WebGL failed or is unavailable, render the 100% crash-proof 3D Keycap switchboard!
  if (useFallback) {
    const techList = CATEGORIZED_TECHS[category];

    return (
      <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] select-none overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl flex flex-col items-center justify-center p-6">
        {/* Switch Plate Mount */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 p-4 sm:p-6 bg-neutral-900/90 rounded-2xl border border-neutral-800/80 shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)]">
          {techList.map((tech) => {
            const isSelected = selectedTech.id === tech.id;
            const isPressed = pressedId === tech.id;

            return (
              <button
                key={tech.id}
                onClick={() => {
                  setPressedId(tech.id);
                  playSwitchSound();
                  onSelectTech(tech);
                  setTimeout(() => setPressedId(null), 150);
                }}
                onMouseEnter={() => setHoveredTech(tech)}
                onMouseLeave={() => setHoveredTech(null)}
                style={{
                  backgroundColor: tech.color,
                  boxShadow: isPressed
                    ? "0 2px 0 rgba(0,0,0,0.5), inset 0 2px 4px rgba(0,0,0,0.4)"
                    : "0 6px 0 rgba(0,0,0,0.4), 0 10px 20px rgba(0,0,0,0.6), inset 0 2px 2px rgba(255,255,255,0.35)",
                  transform: isPressed ? "translateY(4px)" : "translateY(0px)",
                }}
                className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl transition-all duration-100 flex items-center justify-center cursor-pointer p-1.5 ${
                  isSelected ? "ring-2 ring-white/80 ring-offset-2 ring-offset-neutral-950 scale-105" : ""
                }`}
              >
                {/* XL Ergonomic Inner Dish */}
                <div
                  style={{
                    background:
                      "radial-gradient(circle at 50% 35%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.03) 65%, rgba(0,0,0,0.3) 100%)",
                  }}
                  className="w-full h-full rounded-lg sm:rounded-xl border border-black/15 shadow-[inset_0_2px_4px_rgba(0,0,0,0.25)] flex items-center justify-center overflow-hidden"
                >
                  <KeycapIconCanvas tech={tech} size={48} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Floating Tooltip showing ONLY the name */}
        {hoveredTech && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/95 text-white dark:bg-white dark:text-black text-xs font-mono px-3 py-1.5 rounded-md shadow-2xl backdrop-blur-md whitespace-nowrap border border-white/20 dark:border-black/20 pointer-events-none">
            {hoveredTech.name}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] select-none overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl">
      <div ref={containerRef} className="w-full h-full relative" />

      {/* Floating Tooltip: ONLY SHOWS THE ICON NAME */}
      {hoveredTech && (
        <div
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
          }}
          className="absolute pointer-events-none z-50 -translate-x-1/2 -translate-y-[135%] bg-black/95 text-white dark:bg-white dark:text-black text-xs font-mono px-3 py-1.5 rounded-md shadow-2xl backdrop-blur-md whitespace-nowrap border border-white/20 dark:border-black/20"
        >
          {hoveredTech.name}
        </div>
      )}
    </div>
  );
};

// ============================================================================
// RIGHT CANVAS: HERO 3D KEYCAP (WITH GRACEFUL FALLBACK)
// ============================================================================
interface HeroIconCanvasProps {
  tech: TechItem;
}

export const HeroIconCanvas: React.FC<HeroIconCanvasProps> = ({ tech }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const isVisibleRef = useRef(true);
  const bounceScaleRef = useRef(1);
  const [useFallback, setUseFallback] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const techRef = useRef(tech);
  techRef.current = tech;

  // 1. Initial WebGL Mount (Guarded by try-catch & WebGL detection)
  useEffect(() => {
    if (!isWebGLAvailable()) {
      setUseFallback(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "default",
        failIfMajorPerformanceCaveat: false,
      });
    } catch {
      setUseFallback(true);
      return;
    }

    const scene = new THREE.Scene();
    scene.background = null;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 340;

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 3.4, 4.4);
    camera.lookAt(0, 0, 0);

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(2, 6, 4);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xffffff, 3.4, 15);
    rimLight.position.set(4, 3, -3);
    scene.add(rimLight);

    const accentRim = new THREE.PointLight(0xff2d87, 1.8, 15);
    accentRim.position.set(-4, -1, 3);
    scene.add(accentRim);

    // Hero Keycap
    const geom = getHeroKeycapGeometry();
    const topTexture = getOrCreateKeycapTexture(techRef.current);

    const sideMat = new THREE.MeshStandardMaterial({
      color: techRef.current.color,
      roughness: 0.24,
      metalness: 0.04,
    });

    const topMat = new THREE.MeshStandardMaterial({
      map: topTexture,
      roughness: 0.2,
      metalness: 0.04,
    });

    const materials = [sideMat, sideMat, topMat, sideMat, sideMat, sideMat];
    materialsRef.current = materials;

    const keyMesh = new THREE.Mesh(geom, materials);
    meshRef.current = keyMesh;
    scene.add(keyMesh);

    // Parallax
    let targetRotY = 0;
    let targetRotX = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.25;
      targetRotX = -y * 0.2;
    };

    const handlePointerLeave = () => {
      targetRotY = 0;
      targetRotX = 0;
    };

    container.addEventListener("mousemove", handlePointerMove);
    container.addEventListener("mouseleave", handlePointerLeave);

    const handleResize = () => {
      if (!container || !renderer) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW <= 0 || newH <= 0) return;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    });
    observer.observe(container);

    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisibleRef.current || !renderer) return;

      keyMesh.rotation.y += (targetRotY - keyMesh.rotation.y) * 0.06;
      keyMesh.rotation.x += (targetRotX - keyMesh.rotation.x) * 0.06;

      bounceScaleRef.current += (1 - bounceScaleRef.current) * 0.12;
      const s = bounceScaleRef.current;
      keyMesh.scale.set(s, s, s);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("mouseleave", handlePointerLeave);

      if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  // 2. Material Swap on Tech Change
  useEffect(() => {
    if (useFallback) return;
    if (!meshRef.current || materialsRef.current.length === 0) return;

    const mats = materialsRef.current;
    const newTex = getOrCreateKeycapTexture(tech);

    for (let i = 0; i < 6; i++) {
      if (i !== 2) {
        mats[i].color.set(tech.color);
      }
    }
    mats[2].map = newTex;
    mats[2].color.set("#ffffff");
    mats[2].needsUpdate = true;

    bounceScaleRef.current = 0.82;
  }, [tech, useFallback]);

  // If WebGL is unavailable, render the 100% crash-proof 3D CSS Hero Keycap!
  if (useFallback) {
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setTilt({ x: -y * 14, y: x * 14 });
    };

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
    };

    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] select-none overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl flex flex-col items-center justify-center p-4 [perspective:800px]"
      >
        {/* 3D Parallax Keycap Body */}
        <div
          style={{
            backgroundColor: tech.color,
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            boxShadow:
              "0 14px 0 rgba(0,0,0,0.5), 0 24px 44px rgba(0,0,0,0.7), inset 0 3px 4px rgba(255,255,255,0.4)",
          }}
          className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl p-3.5 transition-transform duration-100 ease-out flex items-center justify-center cursor-pointer shadow-2xl relative"
        >
          {/* XL Inner Ergonomic Dish */}
          <div
            style={{
              background:
                "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.03) 65%, rgba(0,0,0,0.36) 100%)",
            }}
            className="w-full h-full rounded-2xl border border-black/20 shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)] flex items-center justify-center overflow-hidden p-2"
          >
            <KeycapIconCanvas tech={tech} size={160} />
          </div>
        </div>

        {/* Bottom Name with Dashed Underline */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <span className="text-sm sm:text-base font-mono font-medium text-white tracking-wide underline underline-offset-4 decoration-dashed decoration-neutral-500 cursor-default">
            {tech.name}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] select-none overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl flex flex-col items-center justify-center p-4">
      {/* 3D Hero Keycap Canvas */}
      <div ref={containerRef} className="w-full h-full relative" />

      {/* Bottom Name with Dashed Underline */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <span className="text-sm sm:text-base font-mono font-medium text-white tracking-wide underline underline-offset-4 decoration-dashed decoration-neutral-500 cursor-default">
          {tech.name}
        </span>
      </div>
    </div>
  );
};
