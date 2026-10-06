# Portfolio Architecture, Design System & Layout Context

This document outlines the current visual design language, layout architecture, typography, styling tokens, and component structure implemented across this developer portfolio.

---

## 1. Design Philosophy & Aesthetic Style

The portfolio embodies a **Modern Developer Minimalist / Swiss-Grid aesthetic**, fusing clean architectural structure with interactive micro-animations and developer-centric cues.

### Key Visual Pillars
- **Architectural Framing (Grid Lines)**: Key sections are bound by subtle vertical border guidelines (`border-x-[0.5px] border-black/10 dark:border-white/10`) set within a standardized `max-w-6xl` container, creating an editorial, structured feel.
- **Glassmorphism & Surface Depth**: Floating elements (such as the navigation pill, modal backdrops, and interactive skill tiles) leverage `backdrop-blur-md` with semi-transparent surfaces (`bg-white/75 dark:bg-zinc-950/75`).
- **High-Affordance Micro-Interactions**: Hover scales (`scale-105` to `scale-110`), floating tooltips, rotating routine loops, smooth card lifts (`hover:-translate-y-1`), and interactive iframe previews.
- **Curated Accents**: Subtle gradients (Rose/Sunset for project challenges, Cyan/Teal for solutions/outcomes, Emerald for live availability).

---

## 2. Layout & Spatial Architecture

The main application layout (`app/page.tsx`) organizes the content in a continuous vertical flow wrapped in `<div className="flex flex-col gap-10">`:

```
┌────────────────────────────────────────────────────────┐
│                   Floating Navbar                      │
│             (Fixed Top Pill, Backdrop Blur)            │
├────────────────────────────────────────────────────────┤
│                      Hero Section                      │
│  - "OPEN TO WORK" Pulsing Availability Badge          │
│  - Large Headline: "Hi, I'm Himanshu"                  │
│  - Looping Routine Icons (Eat, Sleep, Code, Repeat)    │
│  - Bio Description                                     │
│  - Social Link Badges & CTA Buttons (Resume / Talk)    │
├────────────────────────────────────────────────────────┤
│                    Projects Section                    │
│  - Section Title & Subheading                          │
│  - 2-Column Responsive Card Grid (max-w-5xl)          │
│  - Interactive Detail Modal with Live Iframe Preview   │
├────────────────────────────────────────────────────────┤
│                 Technical & AI Stack                   │
│  - Section Title & Subheading                          │
│  - Squircle Icon Box Grid (AI & ML, Frontend, Backend) │
│  - Dynamic Hover Tooltips with Category Tags           │
├────────────────────────────────────────────────────────┤
│                 Freelancer Footer & Contact            │
│  - Availability Banner & Value Proposition             │
│  - "What I Can Build For You" Badges                   │
│  - Direct Inquiries Card (Click-to-Copy Email)         │
│  - Social Profile Badges & Response Meta               │
└────────────────────────────────────────────────────────┘
```

### Layout Constraints
- **Global Container Width**: `max-w-6xl mx-auto px-6` (1152px width) with unified horizontal padding across Hero, Projects, and Skills.
- **Inner Content Widths**: Cards and project grids align internally within `max-w-5xl mx-auto`.
- **Vertical Spacing**: Sections utilize `py-16` padding with `gap-10` between sections to maintain rhythm without vertical crowding.

---

## 3. Typography System

The application is styled with tight tracking and a technical, code-inspired personality:

- **Primary Font**: **Inconsolata** (Loaded locally via `next/font/local` from `public/Inconsolata-VariableFont_wdth,wght.ttf`).
- **CSS Variable Mapping**:
  ```css
  --font-sans: var(--font-inconsolata), "Inconsolata", monospace;
  --font-mono: var(--font-inconsolata), "Inconsolata", monospace;
  --font-heading: var(--font-inconsolata), "Inconsolata", monospace;
  --font-geist: var(--font-inconsolata), "Inconsolata", monospace;
  ```
- **Tracking & Weighting**:
  - Headings: `font-light` to `font-normal`, `tracking-[-0.035em]` or `tracking-tight`.
  - Section Titles: `text-3xl sm:text-4xl font-light tracking-tight`.
  - Badges & Tooltips: `text-[10px]` to `text-xs font-mono uppercase tracking-wider`.
  - Body Copy: `text-sm sm:text-base font-light leading-relaxed`.

---

## 4. Theme System & Color Palette

The interface supports seamless **Light** and **Dark** themes with custom view transition effects:

| Element | Light Theme | Dark Theme |
| :--- | :--- | :--- |
| **Page Background** | `#fafafa` / `#fbfbfb` | `#111112` / `#09090b` |
| **Primary Text** | `#121212` / `#18181b` | `#f5f5f7` / `#ffffff` |
| **Secondary Text** | `#52525b` / `#71717a` | `#a1a1aa` / `#71717a` |
| **Card Surfaces** | `bg-white/70`, `bg-neutral-100` | `bg-zinc-900/70`, `bg-zinc-950` |
| **Dividers & Borders** | `border-black/10` | `border-white/10` |
| **Status Badge** | `bg-orange-700` | `bg-white` (Text: black) |

### Theme Transition Animation
In `globals.css`, theme toggles trigger a central cyclone/vortex animation using `::view-transition-old(root)` and `::view-transition-new(root)`.

---

## 5. Component Breakdown

### 5.1 Navigation (`Components/Nav.tsx`)
- **Structure**: Centered floating pill navbar (`w-[310px] sm:w-[360px] h-14 rounded-full`).
- **Styling**: `bg-white/75 dark:bg-zinc-950/75 backdrop-blur-md border border-black/10 dark:border-white/10`.
- **Components**:
  - Profile avatar image (32px circular with scale on hover).
  - Navigation links: `Projects` and `Contact` with hover color transitions.
  - Interactive `ThemeToggle` button with animated Sun/Moon toggle.

---

### 5.2 Hero Section (`Components/hero/Hero.tsx`)
- **Availability Pill (`Work.tsx`)**:
  - Displays `"OPEN TO WORK"` in bold uppercase typography.
  - Features an animated radar ping dot (`animate-ping bg-black dark:bg-white`).
- **Heading**:
  - Staggered headline: `"Hi, I'm Himanshu"`.
- **Routine Icons**:
  - Infinite looping stagger animation rotating through `Eat`, `Sleep`, `Code`, and `Repeat`.
  - Hovering reveals a dark/light tooltip tag.
- **Bio Copy**:
  - Clear narrative focusing on Full Stack (Next.js, TypeScript, MERN) & AI Engineering.
- **Social & Actions**:
  - Circular bordered icon links for GitHub, X (Twitter), and LinkedIn with hover inversion.
  - Action buttons: Clean `Resume` button & black/white `Connect with Talk` button.

---

### 5.3 Projects Section (`Components/project/Project.tsx`)
- **Layout**: 2-column responsive grid (`grid-cols-1 md:grid-cols-2 gap-8`).
- **Card Design**:
  - `rounded-[2rem]` with inner `p-2.5` padding.
  - 240px tall cover image with zoom on hover.
  - Gradient overlay showing title, category pill, and `"View Details"` button.
  - Overview section with 3-line text clamp.
  - Tech stack chip badges (`Next.js`, `Tailwind CSS`, `MongoDB`, etc.) with icon and label.
- **Modal Preview**:
  - Full-screen modal with Lenis smooth-scroll pause and `ESC` key dismiss.
  - Left side: Simulated browser window with traffic light buttons (red/yellow/green), URL bar, and interactive live `iframe` or responsive image fallback.
  - Right side: Overview, gradient **The Challenge** card (Rose/Sunset gradient), gradient **Solution & Impact** card (Cyan/Teal gradient), tech stack list, and direct links to live demo and GitHub repository.

---

### 5.4 Skills Section (`Components/skill/Skill.tsx`)
- **Layout**: Responsive flex-wrap grid of squircle tiles.
- **Tile Styling**:
  - Dimensions: `w-13 h-13 sm:w-14 sm:h-14 rounded-2xl`.
  - Surface: `bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-neutral-400 dark:border-neutral-800`.
  - Brand-colored icon (`FaReact`, `SiNextdotjs`, `SiTypescript`, `SiOpenai`, `SiFastapi`, `SiDocker`, etc.).
  - Physics: `whileHover={{ y: -4, scale: 1.08 }}` and `whileTap={{ scale: 0.95 }}`.
- **Interactive Tooltip**:
  - Floating pill on hover displaying the technology name and its category (`AI & ML`, `Frontend`, `Backend & DB`, `DevOps & Tools`).

---

### 5.5 Contact & Footer (`Components/contact/Contact.tsx`)
- **Structure**: High-conversion freelancer contact section.
- **Headline**: `"Have a project in mind? Let's build something great together."`
- **Freelancer Deliverables**: Pill badges for *Full-Stack Web Apps*, *AI & LLM Integrations*, *MVPs 0 to 1*, and *Scalable APIs*.
- **Direct Contact Box**:
  - Prominent display of `himanshuverma2660@gmail.com`.
  - One-click copy button with dynamic *"Copied to Clipboard!"* state feedback.
  - Send Email button opening a pre-filled `mailto:` client.
- **Social Profiles & Meta**:
  - Badges for GitHub, X, LinkedIn, and Resume.
  - Meta tags: Location (`Delhi, India • Remote Worldwide`) and response guarantee (`Response within 12 hours`).
  - Back-to-top smooth scrolling trigger.

---

## 6. Libraries & Technical Dependencies

- **Framework**: Next.js 16 (App Router) + React 19.
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`).
- **Icons**: `lucide-react`, `react-icons`, `@tabler/icons-react`.
- **Motion & Physics**: `motion/react` (Framer Motion v12).
- **Smooth Scroll**: `lenis`.
- **Theme**: `next-themes`.
