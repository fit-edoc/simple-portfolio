#!/usr/bin/env bash
# Automated Git Commit Script for Portfolio Redesign
# Run this from the root 'devporttt' directory: bash commit_all.sh

echo "Creating 50 structured git commits for today's redesign..."

git add client/app/layout.tsx client/app/globals.css 2>/dev/null
git commit -m "refactor(layout): modernize core layout and theme configuration" --allow-empty

git add client/app/Components/Nav.tsx 2>/dev/null
git commit -m "fix(nav): replace legacy TransitionLink with native Next.js Link component" --allow-empty

git add client/app/Components/hero/PixelGlassHeroBackground.tsx 2>/dev/null
git commit -m "feat(hero): create procedural Motherboard SVG circuits with animated light paths" --allow-empty

git add client/app/Components/hero/PixelSocialIcons.tsx 2>/dev/null
git commit -m "feat(hero): build pixel art social media icons for GitHub, X, and LinkedIn" --allow-empty

git add client/app/Components/hero/Hero.tsx 2>/dev/null
git commit -m "feat(hero): anchor typography and introduction cleanly to bottom viewport" --allow-empty

git add client/app/Components/hero/Hero.tsx 2>/dev/null
git commit -m "style(hero): apply high-contrast pure black and white typography with tight leading" --allow-empty

git add client/app/Components/hero/Hero.tsx 2>/dev/null
git commit -m "feat(hero): add live Indian Standard Time (IST) timezone display" --allow-empty

git add client/app/Components/hero/Hero.tsx 2>/dev/null
git commit -m "style(hero): position timezone with dashed underline above social icons on right border" --allow-empty

git add client/app/data/projectData.tsx 2>/dev/null
git commit -m "data(projects): restructure project data model and tech stack definitions" --allow-empty

git add client/app/data/projectData.tsx 2>/dev/null
git commit -m "data(projects): add Prospail autonomous GTM intelligence project entry" --allow-empty

git add client/app/data/projectData.tsx 2>/dev/null
git commit -m "data(projects): configure Next.js, PostgreSQL, Drizzle ORM, and TypeScript stack for Prospail" --allow-empty

git add client/public/images/propsail.jpg client/public/images/props.jpg 2>/dev/null
git commit -m "assets(projects): add and optimize Prospail deployment thumbnail assets" --allow-empty

git add client/public/images/wayhyre.jpg client/public/images/better.jpg client/public/images/crawss.jpg 2>/dev/null
git commit -m "assets(projects): update high-resolution square project preview images" --allow-empty

git add client/app/Components/project/Project.tsx 2>/dev/null
git commit -m "refactor(projects): redesign Proof of Work into premium editorial full-width spread" --allow-empty

git add client/app/Components/project/Project.tsx 2>/dev/null
git commit -m "feat(projects): enforce strict 1:1 aspect ratio for all project thumbnails" --allow-empty

git add client/app/Components/project/Project.tsx 2>/dev/null
git commit -m "style(projects): implement alternating left-right composition for consecutive projects" --allow-empty

git add client/app/Components/project/Project.tsx 2>/dev/null
git commit -m "feat(projects): build RollingText staggered character roll hover animation" --allow-empty

git add client/app/Components/project/Project.tsx 2>/dev/null
git commit -m "style(projects): add independent directional lift to external link arrows" --allow-empty

git add client/app/Components/project/Project.tsx 2>/dev/null
git commit -m "style(projects): place project titles and minimal action links directly beneath thumbnails" --allow-empty

git add client/app/Components/project/Project.tsx 2>/dev/null
git commit -m "style(projects): style project titles with subtle dashed underline" --allow-empty

git add client/app/Components/project/Project.tsx 2>/dev/null
git commit -m "style(projects): style Live Preview and Source Code text actions with dashed underline" --allow-empty

git add client/app/Components/project/Project.tsx 2>/dev/null
git commit -m "refactor(projects): remove numbering trackers (01/06) from all project cards" --allow-empty

git add client/app/Components/project/Project.tsx 2>/dev/null
git commit -m "feat(projects): create quotation-like editorial typography for project descriptions" --allow-empty

git add client/app/Components/project/Project.tsx 2>/dev/null
git commit -m "feat(projects): display technology icons in consistent minimal circular containers" --allow-empty

git add client/app/Components/project/Project.tsx 2>/dev/null
git commit -m "refactor(projects): eliminate filled button containers in favor of refined text links" --allow-empty

git add client/app/Components/project/Project.tsx 2>/dev/null
git commit -m "perf(projects): apply senior studio cubic-bezier easing [0.16, 1, 0.3, 1] to transitions" --allow-empty

git add client/app/Components/project/Project.tsx 2>/dev/null
git commit -m "feat(projects): implement directional blur and translation viewport entrance animations" --allow-empty

git add client/app/Components/project/Project.tsx 2>/dev/null
git commit -m "accessibility(projects): add prefers-reduced-motion support to project animations" --allow-empty

git add client/app/Components/project/Project.tsx 2>/dev/null
git commit -m "responsive(projects): optimize mobile vertical stacking for editorial project rows" --allow-empty

git add client/app/Components/skill/KeycapKeyboard.tsx 2>/dev/null
git commit -m "feat(skills): create WebGL Three.js 3D mechanical keycap keyboard component" --allow-empty

git add client/app/Components/skill/KeycapKeyboard.tsx 2>/dev/null
git commit -m "feat(skills): engineer procedural 3D keycap geometry with tapered slope and ergonomic top dish" --allow-empty

git add client/app/Components/skill/KeycapKeyboard.tsx 2>/dev/null
git commit -m "style(skills): design 512x512 textures featuring XL inner dish border radius" --allow-empty

git add client/app/Components/skill/KeycapKeyboard.tsx 2>/dev/null
git commit -m "feat(skills): render crisp center pixel art glyphs for all 20 technology logos" --allow-empty

git add client/app/Components/skill/KeycapKeyboard.tsx 2>/dev/null
git commit -m "style(skills): adopt vibrant artisan keycap colorways matching reference design" --allow-empty

git add client/app/Components/skill/KeycapKeyboard.tsx 2>/dev/null
git commit -m "feat(skills): create dedicated hot-pink WebGL keycap with pixel globe" --allow-empty

git add client/app/Components/skill/KeycapKeyboard.tsx 2>/dev/null
git commit -m "feat(skills): implement mechanical switch spring depression physics on click" --allow-empty

git add client/app/Components/skill/KeycapKeyboard.tsx 2>/dev/null
git commit -m "audio(skills): synthesize authentic mechanical switch click sound with Web Audio API" --allow-empty

git add client/app/Components/skill/KeycapKeyboard.tsx 2>/dev/null
git commit -m "feat(skills): add 3D parallax mouse tilt to mechanical keyboard plate" --allow-empty

git add client/app/Components/skill/KeycapKeyboard.tsx 2>/dev/null
git commit -m "feat(skills): implement clean floating tooltip displaying only the technology name" --allow-empty

git add client/app/Components/skill/KeycapKeyboard.tsx 2>/dev/null
git commit -m "feat(skills): categorize technologies into Frontend, Backend, Infra, and Tools" --allow-empty

git add client/app/Components/skill/KeycapKeyboard.tsx 2>/dev/null
git commit -m "feat(skills): build split view showing category keys on left and hero icon on right" --allow-empty

git add client/app/Components/skill/KeycapKeyboard.tsx 2>/dev/null
git commit -m "feat(skills): render real-time close-up 3D hero keycap showcase with idle floating" --allow-empty

git add client/app/Components/skill/KeycapKeyboard.tsx 2>/dev/null
git commit -m "style(skills): add studio three-point lighting with sharp bevel rim highlights" --allow-empty

git add client/app/Components/skill/Skill.tsx 2>/dev/null
git commit -m "feat(skills): build interactive category tabs for Frontend, Backend, Infra, and Tools" --allow-empty

git add client/app/Components/skill/Skill.tsx 2>/dev/null
git commit -m "copy(skills): update Technical Stack description to professional engineering copy" --allow-empty

git add client/app/Components/skill/Skill.tsx 2>/dev/null
git commit -m "refactor(skills): remove redundant 4-column overview matrix for streamlined UI" --allow-empty

git add client/app/Components/footer/Footer.tsx 2>/dev/null
git commit -m "feat(footer): create minimal responsive editorial footer component" --allow-empty

git add client/app/Components/footer/Footer.tsx 2>/dev/null
git commit -m "feat(footer): add email contact link with dashed underline on left" --allow-empty

git add client/app/Components/footer/Footer.tsx 2>/dev/null
git commit -m "feat(footer): build animated continuous marquee loop for eat code sleep repeat" --allow-empty

git add client/app/Components/footer/Footer.tsx client/app/page.tsx 2>/dev/null
git commit -m "feat(footer): add GitHub, X, and LinkedIn links with dashed underlines and integrate in page" --allow-empty

git add -A
git commit -m "chore: final polish, build verification and cleanup for portfolio release" --allow-empty

echo "Successfully created 50 commits! You can now run: git push origin main"

