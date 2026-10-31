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
      color: "#ff2d87", // Vibrant pink matching reference image!
      textColor: "#000000",
      iconType: "globe", // Pixel globe matching user's image!
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

// Generate 512x512 High-Res Texture with XL Inner Dish Border Radius & Bold Pixel Art Icon
export function drawKeycapTexture(tech: TechItem): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    // 1. Keycap Base Color
    ctx.fillStyle = tech.color;
    ctx.fillRect(0, 0, 512, 512);

    // 2. XL Inner Border Radius Dish (Matches reference photo)
    const margin = 32;
    const size = 512 - margin * 2;
    const xlRadius = 76; // XL curvature on inner dish

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

    // Dish Radial Lighting (Simulates concave ergonomic keycap scoop)
    const dishGrad = ctx.createRadialGradient(256, 256, 50, 256, 256, 240);
    dishGrad.addColorStop(0, "rgba(255, 255, 255, 0.22)");
    dishGrad.addColorStop(0.65, "rgba(255, 255, 255, 0.03)");
    dishGrad.addColorStop(0.88, "rgba(0, 0, 0, 0.12)");
    dishGrad.addColorStop(1, "rgba(0, 0, 0, 0.38)");
    ctx.fillStyle = dishGrad;
    ctx.fill();

    // Inner Dish Rim Stroke with XL Radius
    ctx.lineWidth = 14;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
    ctx.stroke();

    ctx.lineWidth = 6;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
    ctx.stroke();

    // 3. Draw Crisp Center Pixel Glyph
    ctx.fillStyle = tech.textColor;
    const cx = 256;
    const cy = 256;
    const s = 13.5; // pixel unit scale

    const drawPixelRect = (px: number, py: number, pw: number, ph: number) => {
      ctx.fillRect(
        Math.round(cx + (px - 8) * s),
        Math.round(cy + (py - 8) * s),
        Math.round(pw * s),
        Math.round(ph * s)
      );
    };

    switch (tech.iconType) {
      case "globe": // Exact Pixel Globe from the uploaded user photo!
        drawPixelRect(5, 1, 6, 1);
        drawPixelRect(3, 2, 10, 1);
        drawPixelRect(2, 3, 12, 1);
        drawPixelRect(1, 4, 14, 1);
        drawPixelRect(1, 5, 14, 6);
        drawPixelRect(1, 11, 14, 1);
        drawPixelRect(2, 12, 12, 1);
        drawPixelRect(3, 13, 10, 1);
        drawPixelRect(5, 14, 6, 1);

        // Negative cutout continents
        ctx.fillStyle = tech.color;
        drawPixelRect(4, 3, 2, 2);
        drawPixelRect(3, 5, 3, 3);
        drawPixelRect(4, 8, 2, 4);
        drawPixelRect(5, 9, 2, 3);
        drawPixelRect(9, 3, 3, 2);
        drawPixelRect(8, 5, 4, 3);
        drawPixelRect(9, 8, 3, 4);
        drawPixelRect(10, 9, 2, 3);
        break;

      case "react": // Atom
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

      case "nextjs": // N
        drawPixelRect(2, 2, 2, 12);
        drawPixelRect(12, 2, 2, 12);
        drawPixelRect(4, 4, 2, 2);
        drawPixelRect(6, 6, 2, 2);
        drawPixelRect(8, 8, 2, 2);
        drawPixelRect(10, 10, 2, 2);
        break;

      case "typescript": // TS
        drawPixelRect(2, 4, 6, 2);
        drawPixelRect(4, 6, 2, 7);
        drawPixelRect(9, 4, 5, 2);
        drawPixelRect(9, 6, 2, 2);
        drawPixelRect(9, 8, 5, 2);
        drawPixelRect(12, 10, 2, 2);
        drawPixelRect(9, 11, 5, 2);
        break;

      case "tailwind": // Wind
        drawPixelRect(2, 7, 3, 2);
        drawPixelRect(5, 5, 4, 2);
        drawPixelRect(9, 5, 2, 2);
        drawPixelRect(10, 7, 4, 2);
        drawPixelRect(4, 10, 3, 2);
        drawPixelRect(7, 9, 4, 2);
        drawPixelRect(11, 11, 3, 2);
        break;

      case "javascript": // JS
        drawPixelRect(4, 4, 2, 7);
        drawPixelRect(2, 9, 2, 2);
        drawPixelRect(3, 11, 3, 2);
        drawPixelRect(9, 4, 5, 2);
        drawPixelRect(9, 6, 2, 2);
        drawPixelRect(9, 8, 5, 2);
        drawPixelRect(12, 10, 2, 2);
        drawPixelRect(9, 11, 5, 2);
        break;

      case "nodejs": // Hexagon
        drawPixelRect(5, 2, 6, 2);
        drawPixelRect(2, 4, 2, 8);
        drawPixelRect(12, 4, 2, 8);
        drawPixelRect(5, 12, 6, 2);
        drawPixelRect(5, 6, 2, 4);
        drawPixelRect(7, 6, 2, 4);
        drawPixelRect(9, 6, 2, 4);
        break;

      case "postgresql": // Database / Elephant
        drawPixelRect(3, 3, 8, 2);
        drawPixelRect(2, 5, 10, 6);
        drawPixelRect(12, 6, 2, 5);
        drawPixelRect(4, 11, 2, 3);
        drawPixelRect(8, 11, 2, 3);
        break;

      case "mongodb": // Leaf
        drawPixelRect(7, 2, 2, 3);
        drawPixelRect(5, 5, 6, 6);
        drawPixelRect(6, 11, 4, 3);
        drawPixelRect(7, 4, 2, 8);
        break;

      case "redis": // Stacked
        drawPixelRect(4, 3, 8, 2);
        drawPixelRect(3, 5, 10, 2);
        drawPixelRect(4, 8, 8, 2);
        drawPixelRect(3, 10, 10, 2);
        break;

      case "fastapi": // Lightning
        drawPixelRect(8, 1, 4, 4);
        drawPixelRect(6, 5, 6, 3);
        drawPixelRect(4, 8, 6, 4);
        drawPixelRect(6, 12, 2, 3);
        break;

      case "docker": // Whale
        drawPixelRect(5, 4, 2, 2);
        drawPixelRect(8, 4, 2, 2);
        drawPixelRect(5, 7, 2, 2);
        drawPixelRect(8, 7, 2, 2);
        drawPixelRect(11, 7, 2, 2);
        drawPixelRect(2, 10, 12, 3);
        drawPixelRect(13, 9, 2, 2);
        break;

      case "git": // Branch
        drawPixelRect(3, 3, 3, 3);
        drawPixelRect(4, 6, 2, 5);
        drawPixelRect(3, 11, 3, 3);
        drawPixelRect(6, 6, 2, 2);
        drawPixelRect(8, 5, 2, 2);
        drawPixelRect(10, 4, 3, 3);
        break;

      case "vercel": // Triangle
        drawPixelRect(7, 2, 2, 2);
        drawPixelRect(6, 4, 4, 2);
        drawPixelRect(5, 6, 6, 2);
        drawPixelRect(4, 8, 8, 2);
        drawPixelRect(3, 10, 10, 2);
        drawPixelRect(2, 12, 12, 2);
        break;

      case "linux": // Terminal
        drawPixelRect(3, 4, 2, 2);
        drawPixelRect(5, 6, 2, 2);
        drawPixelRect(3, 8, 2, 2);
        drawPixelRect(8, 10, 5, 2);
        break;

      case "cicd": // Loop
        drawPixelRect(5, 3, 6, 2);
        drawPixelRect(3, 5, 2, 6);
        drawPixelRect(11, 5, 2, 6);
        drawPixelRect(5, 11, 6, 2);
        drawPixelRect(11, 3, 2, 2);
        drawPixelRect(3, 11, 2, 2);
        break;

      case "figma": // F
        drawPixelRect(4, 2, 4, 4);
        drawPixelRect(8, 2, 4, 4);
        drawPixelRect(4, 6, 4, 4);
        drawPixelRect(8, 6, 4, 4);
        drawPixelRect(4, 10, 4, 4);
        break;

      case "vscode": // Brackets
        drawPixelRect(3, 4, 3, 2);
        drawPixelRect(2, 6, 2, 4);
        drawPixelRect(3, 10, 3, 2);
        drawPixelRect(10, 4, 3, 2);
        drawPixelRect(12, 6, 2, 4);
        drawPixelRect(10, 10, 3, 2);
        break;

      case "postman": // Airplane
        drawPixelRect(3, 3, 10, 2);
        drawPixelRect(5, 5, 6, 2);
        drawPixelRect(7, 7, 3, 2);
        drawPixelRect(8, 9, 2, 4);
        break;

      case "ai": // Sparkle
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

    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  return texture;
}

// Procedural Small Keycap Geometry (Clean, smooth, tapered mechanical switch profile)
function createKeycapGeometry(size = 1.25, height = 0.55): THREE.BufferGeometry {
  const geom = new THREE.BoxGeometry(size, height, size, 8, 8, 8);
  const pos = geom.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i);
    let y = pos.getY(i);
    let z = pos.getZ(i);

    const normY = (y + height / 2) / height;

    // Smooth mechanical taper: bottom is wider, top is narrower
    const taper = 1.12 - normY * 0.28;
    x *= taper;
    z *= taper;

    // Concave dish on top surface
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

// Synthesize tactile switch click audio
function playSwitchSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
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
  } catch (e) {
    // Audio uninitialized or blocked
  }
}

// ============================================================================
// LEFT CANVAS: AVAILABLE CATEGORY 3D KEYCAPS
// Small keys, smooth, clickable with switch depression, tooltip shows ONLY name
// ============================================================================
interface CategoryKeysCanvasProps {
  category: "Frontend" | "Backend" | "Infra & Deployment" | "Tools";
  onSelectTech: (tech: TechItem) => void;
  selectedTech: TechItem;
}

export const CategoryKeysCanvas: React.FC<CategoryKeysCanvasProps> = ({
  category,
  onSelectTech,
  selectedTech,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredTech, setHoveredTech] = useState<TechItem | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const techList = CATEGORIZED_TECHS[category];
  const onSelectRef = useRef(onSelectTech);
  onSelectRef.current = onSelectTech;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    // Isometric angle focusing on the category macropad
    camera.position.set(0, 5.8, 7.8);
    camera.lookAt(0, -0.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 8, 6);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xffffff, 2.8, 20);
    rimLight.position.set(6, 5, -4);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight(0xff2d87, 1.2, 18);
    accentLight.position.set(-5, 2, 5);
    scene.add(accentLight);

    const deckGroup = new THREE.Group();
    scene.add(deckGroup);

    // Dark Switch Plate Base
    const keyCount = techList.length;
    const spacing = 1.45;
    const plateWidth = keyCount * spacing + 0.6;
    const plateDepth = 2.6;

    const plateGeom = new THREE.BoxGeometry(plateWidth, 0.35, plateDepth);
    const plateMat = new THREE.MeshStandardMaterial({
      color: "#717171",
      roughness: 0.8,
      metalness: 0.75,
      
    });
    const plateMesh = new THREE.Mesh(plateGeom, plateMat);
    plateMesh.position.y = -0.32;
    deckGroup.add(plateMesh);

    // Create Small 3D Keycaps
    const keyGeom = createKeycapGeometry(1.2, 0.52);

    interface KeyEntity {
      mesh: THREE.Mesh;
      tech: TechItem;
      velocity: number;
      isPressed: boolean;
      isHovered: boolean;
      materials: THREE.Material[];
    }

    const keys: KeyEntity[] = [];
    const interactiveMeshes: THREE.Mesh[] = [];

    techList.forEach((tech, i) => {
      const posX = (i - (keyCount - 1) / 2) * spacing;
      const topTexture = drawKeycapTexture(tech);

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
      interactiveMeshes.push(mesh);

      keys.push({
        mesh,
        tech,
        velocity: 0,
        isPressed: false,
        isHovered: false,
        materials,
      });
    });

    // Pointer Raycasting for Hover & Click
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
      keys.forEach((k) => (k.isHovered = false));
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const key = keys.find((k) => k.mesh === hit);
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
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop with Spring Physics
    let animId: number;
    let lastTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      deckGroup.rotation.y += (targetTiltY - deckGroup.rotation.y) * 0.08;
      deckGroup.rotation.x += (targetTiltX - deckGroup.rotation.x) * 0.08;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      let found: TechItem | null = null;

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        keys.forEach((k) => {
          if (k.mesh === hit) {
            k.isHovered = true;
            found = k.tech;
          } else {
            k.isHovered = false;
          }
        });
        container.style.cursor = "pointer";
      } else {
        keys.forEach((k) => (k.isHovered = false));
        container.style.cursor = "default";
      }

      setHoveredTech(found);

      // Spring physics per key
      keys.forEach((k) => {
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
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("mouseleave", handlePointerLeave);
      container.removeEventListener("click", handleClick);

      keys.forEach((k) => {
        k.materials.forEach((m) => {
          const mat = m as THREE.MeshStandardMaterial;
          if (mat.map) mat.map.dispose();
          mat.dispose();
        });
      });

      keyGeom.dispose();
      plateGeom.dispose();
      plateMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [category, techList]);

  return (
    <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] select-none overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-800 shadow-2xl">
      <div ref={containerRef} className="w-full h-full relative" />

      {/* Top Left Label */}
     

      {/* Bottom Hint */}
      

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
// RIGHT CANVAS: "RIGHT JUST SHOW THE ICON"
// Hero close-up 3D Keycap matching reference photo with bold black pixel icon
// ============================================================================
interface HeroIconCanvasProps {
  tech: TechItem;
}

export const HeroIconCanvas: React.FC<HeroIconCanvasProps> = ({ tech }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    // Direct close-up perspective matching user's uploaded reference image
    camera.position.set(0, 3.4, 4.4);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Studio Lighting matching reference image (Soft Key + Sharp Rim highlight)
    const ambient = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(2, 6, 4);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xffffff, 3.8, 15);
    rimLight.position.set(4, 3, -3);
    scene.add(rimLight);

    const accentRim = new THREE.PointLight(0xff2d87, 2.0, 15);
    accentRim.position.set(-4, -1, 3);
    scene.add(accentRim);

    // Hero Keycap with XL Inner Dish Radius
    const geom = createKeycapGeometry(1.65, 0.75);
    const topTexture = drawKeycapTexture(tech);

    const sideMat = new THREE.MeshStandardMaterial({
      color: tech.color,
      roughness: 0.24,
      metalness: 0.04,
    });

    const topMat = new THREE.MeshStandardMaterial({
      map: topTexture,
      roughness: 0.2,
      metalness: 0.04,
    });

    const materials = [sideMat, sideMat, topMat, sideMat, sideMat, sideMat];
    const keyMesh = new THREE.Mesh(geom, materials);
    scene.add(keyMesh);

    // Subtle floating animation + Mouse parallax
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
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth idle floating and parallax tilt
      keyMesh.rotation.y += (targetRotY - keyMesh.rotation.y) * 0.06;
      keyMesh.rotation.x += (targetRotX - keyMesh.rotation.x) * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handlePointerMove);
      container.removeEventListener("mouseleave", handlePointerLeave);

      materials.forEach((m) => {
        const mat = m as THREE.MeshStandardMaterial;
        if (mat.map) mat.map.dispose();
        mat.dispose();
      });
      geom.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [tech]);

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
