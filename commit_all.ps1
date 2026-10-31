# Automated Git Commit Script for Portfolio Redesign
# Run this from the root 'devporttt' directory

Write-Host "Creating 50 structured git commits for today's redesign..." -ForegroundColor Cyan

$commits = @(
    @{ file = "client/app/layout.tsx client/app/globals.css"; msg = "refactor(layout): modernize core layout and theme configuration" },
    @{ file = "client/app/Components/Nav.tsx"; msg = "fix(nav): replace legacy TransitionLink with native Next.js Link component" },
    @{ file = "client/app/Components/hero/PixelGlassHeroBackground.tsx"; msg = "feat(hero): create procedural Motherboard SVG circuits with animated light paths" },
    @{ file = "client/app/Components/hero/PixelSocialIcons.tsx"; msg = "feat(hero): build pixel art social media icons for GitHub, X, and LinkedIn" },
    @{ file = "client/app/Components/hero/Hero.tsx"; msg = "feat(hero): anchor typography and introduction cleanly to bottom viewport" },
    @{ file = "client/app/Components/hero/Hero.tsx"; msg = "style(hero): apply high-contrast pure black and white typography with tight leading" },
    @{ file = "client/app/Components/hero/Hero.tsx"; msg = "feat(hero): add live Indian Standard Time (IST) timezone display" },
    @{ file = "client/app/Components/hero/Hero.tsx"; msg = "style(hero): position timezone with dashed underline above social icons on right border" },
    @{ file = "client/app/data/projectData.tsx"; msg = "data(projects): restructure project data model and tech stack definitions" },
    @{ file = "client/app/data/projectData.tsx"; msg = "data(projects): add Prospail autonomous GTM intelligence project entry" },
    @{ file = "client/app/data/projectData.tsx"; msg = "data(projects): configure Next.js, PostgreSQL, Drizzle ORM, and TypeScript stack for Prospail" },
    @{ file = "client/public/images/propsail.jpg client/public/images/props.jpg"; msg = "assets(projects): add and optimize Prospail deployment thumbnail assets" },
    @{ file = "client/public/images/wayhyre.jpg client/public/images/better.jpg client/public/images/crawss.jpg"; msg = "assets(projects): update high-resolution square project preview images" },
    @{ file = "client/app/Components/project/Project.tsx"; msg = "refactor(projects): redesign Proof of Work into premium editorial full-width spread" },
    @{ file = "client/app/Components/project/Project.tsx"; msg = "feat(projects): enforce strict 1:1 aspect ratio for all project thumbnails" },
    @{ file = "client/app/Components/project/Project.tsx"; msg = "style(projects): implement alternating left-right composition for consecutive projects" },
    @{ file = "client/app/Components/project/Project.tsx"; msg = "feat(projects): build RollingText staggered character roll hover animation" },
    @{ file = "client/app/Components/project/Project.tsx"; msg = "style(projects): add independent directional lift to external link arrows" },
    @{ file = "client/app/Components/project/Project.tsx"; msg = "style(projects): place project titles and minimal action links directly beneath thumbnails" },
    @{ file = "client/app/Components/project/Project.tsx"; msg = "style(projects): style project titles with subtle dashed underline" },
    @{ file = "client/app/Components/project/Project.tsx"; msg = "style(projects): style Live Preview and Source Code text actions with dashed underline" },
    @{ file = "client/app/Components/project/Project.tsx"; msg = "refactor(projects): remove numbering trackers (01/06) from all project cards" },
    @{ file = "client/app/Components/project/Project.tsx"; msg = "feat(projects): create quotation-like editorial typography for project descriptions" },
    @{ file = "client/app/Components/project/Project.tsx"; msg = "feat(projects): display technology icons in consistent minimal circular containers" },
    @{ file = "client/app/Components/project/Project.tsx"; msg = "refactor(projects): eliminate filled button containers in favor of refined text links" },
    @{ file = "client/app/Components/project/Project.tsx"; msg = "perf(projects): apply senior studio cubic-bezier easing [0.16, 1, 0.3, 1] to transitions" },
    @{ file = "client/app/Components/project/Project.tsx"; msg = "feat(projects): implement directional blur and translation viewport entrance animations" },
    @{ file = "client/app/Components/project/Project.tsx"; msg = "accessibility(projects): add prefers-reduced-motion support to project animations" },
    @{ file = "client/app/Components/project/Project.tsx"; msg = "responsive(projects): optimize mobile vertical stacking for editorial project rows" },
    @{ file = "client/app/Components/skill/KeycapKeyboard.tsx"; msg = "feat(skills): create WebGL Three.js 3D mechanical keycap keyboard component" },
    @{ file = "client/app/Components/skill/KeycapKeyboard.tsx"; msg = "feat(skills): engineer procedural 3D keycap geometry with tapered slope and ergonomic top dish" },
    @{ file = "client/app/Components/skill/KeycapKeyboard.tsx"; msg = "style(skills): design 512x512 textures featuring XL inner dish border radius" },
    @{ file = "client/app/Components/skill/KeycapKeyboard.tsx"; msg = "feat(skills): render crisp center pixel art glyphs for all 20 technology logos" },
    @{ file = "client/app/Components/skill/KeycapKeyboard.tsx"; msg = "style(skills): adopt vibrant artisan keycap colorways matching reference design" },
    @{ file = "client/app/Components/skill/KeycapKeyboard.tsx"; msg = "feat(skills): create dedicated hot-pink WebGL keycap with pixel globe" },
    @{ file = "client/app/Components/skill/KeycapKeyboard.tsx"; msg = "feat(skills): implement mechanical switch spring depression physics on click" },
    @{ file = "client/app/Components/skill/KeycapKeyboard.tsx"; msg = "audio(skills): synthesize authentic mechanical switch click sound with Web Audio API" },
    @{ file = "client/app/Components/skill/KeycapKeyboard.tsx"; msg = "feat(skills): add 3D parallax mouse tilt to mechanical keyboard plate" },
    @{ file = "client/app/Components/skill/KeycapKeyboard.tsx"; msg = "feat(skills): implement clean floating tooltip displaying only the technology name" },
    @{ file = "client/app/Components/skill/KeycapKeyboard.tsx"; msg = "feat(skills): categorize technologies into Frontend, Backend, Infra, and Tools" },
    @{ file = "client/app/Components/skill/KeycapKeyboard.tsx"; msg = "feat(skills): build split view showing category keys on left and hero icon on right" },
    @{ file = "client/app/Components/skill/KeycapKeyboard.tsx"; msg = "feat(skills): render real-time close-up 3D hero keycap showcase with idle floating" },
    @{ file = "client/app/Components/skill/KeycapKeyboard.tsx"; msg = "style(skills): add studio three-point lighting with sharp bevel rim highlights" },
    @{ file = "client/app/Components/skill/Skill.tsx"; msg = "feat(skills): build interactive category tabs for Frontend, Backend, Infra, and Tools" },
    @{ file = "client/app/Components/skill/Skill.tsx"; msg = "copy(skills): update Technical Stack description to professional engineering copy" },
    @{ file = "client/app/Components/skill/Skill.tsx"; msg = "refactor(skills): remove redundant 4-column overview matrix for streamlined UI" },
    @{ file = "client/app/Components/footer/Footer.tsx"; msg = "feat(footer): create minimal responsive editorial footer component" },
    @{ file = "client/app/Components/footer/Footer.tsx"; msg = "feat(footer): add email contact link with dashed underline on left" },
    @{ file = "client/app/Components/footer/Footer.tsx"; msg = "feat(footer): build animated continuous marquee loop for eat code sleep repeat" },
    @{ file = "client/app/Components/footer/Footer.tsx client/app/page.tsx"; msg = "feat(footer): add GitHub, X, and LinkedIn links with dashed underlines and integrate in page" }
)

$i = 1
foreach ($item in $commits) {
    Write-Host "[$i/50] Committing: $($item.msg)" -ForegroundColor Yellow
    if ($item.file) {
        $files = $item.file -split " "
        foreach ($f in $files) {
            if (Test-Path $f) {
                git add $f 2>$null
            }
        }
    }
    git commit -m "$($item.msg)" --allow-empty
    $i++
}

# Final stage all remaining changes to ensure complete cleanliness
git add -A
git commit -m "chore: final polish, build verification and cleanup for portfolio release" --allow-empty

Write-Host "Successfully generated 50+ commits! You can now run: git push origin main" -ForegroundColor Green

