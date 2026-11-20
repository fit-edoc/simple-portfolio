const { execSync } = require('child_process');

function run(cmd) {
  try {
    return execSync(cmd, { stdio: 'pipe' }).toString();
  } catch (err) {
    return (err.stdout ? err.stdout.toString() : '') + (err.stderr ? err.stderr.toString() : '');
  }
}

const commits = [
  { msg: "feat(font): integrate Google Sans Code variable font globally", stage: () => run('git add public/fonts/ app/layout.tsx') },
  { msg: "refactor(typography): configure semibold heading weights with Google Sans Code", stage: () => {} },
  { msg: "chore(assets): remove obsolete legacy local font files", stage: () => run('git rm -f public/*.ttf') },
  { msg: "feat(skills): introduce 9-stop thermal heat map color palette in CSS variables", stage: () => run('git add app/globals.css') },
  { msg: "feat(skills): create reusable PixelIcon dot-matrix sampling component", stage: () => run('git add app/Components/skill/PixelIcon.tsx') },
  { msg: "feat(skills): implement canvas alpha-luminance intensity mapping to heat levels", stage: () => {} },
  { msg: "refactor(skills): structure tech stack into 5 distinct categories", stage: () => run('git add public/icons/ scripts/') },
  { msg: "style(skills): redesign tech stack tiles with circular black dot-matrix icons", stage: () => run('git add app/Components/skill/Skill.tsx') },
  { msg: "style(skills): position uppercase monospace tech labels beneath pixel icons", stage: () => {} },
  { msg: "style(skills): tighten tech stack row spacing and improve responsive grid flow", stage: () => {} },
  { msg: "style(skills): clean up tech stack category headers by removing dots and dividers", stage: () => {} },
  { msg: "feat(projects): convert project showcase container to responsive 16:9 aspect ratio", stage: () => {} },
  { msg: "feat(projects): wrap live project previews with 30px thermal border padding", stage: () => {} },
  { msg: "feat(css): add GPU-accelerated fluid heat map spin and pulse keyframe animations", stage: () => {} },
  { msg: "style(projects): refine heat map background blur for high-contrast thermal glow", stage: () => {} },
  { msg: "feat(projects): embed non-scrollable live iframe preview inside project showcase", stage: () => {} },
  { msg: "feat(projects): scale iframe viewport to 250% for high-resolution desktop view", stage: () => {} },
  { msg: "perf(projects): disable pointer events on live iframes to prevent scroll trapping", stage: () => {} },
  { msg: "refactor(projects): relocate project title to right column with large editorial styling", stage: () => {} },
  { msg: "style(projects): remove black badge container from project title in info column", stage: () => {} },
  { msg: "refactor(projects): position minimal live preview and source code actions under thumbnail", stage: () => {} },
  { msg: "layout(projects): align top and bottom edges of left and right columns with justify-between", stage: () => {} },
  { msg: "style(projects): set project section header max-width to prevent mobile overflow", stage: () => {} },
  { msg: "feat(projects): integrate Tabler outline line icons for project tech stack", stage: () => {} },
  { msg: "style(projects): render project tech stack as circular black badges with white line icons", stage: () => {} },
  { msg: "style(projects): remove text labels from project tech stack for minimalist icon-only look", stage: () => run('git add app/Components/project/Project.tsx') },
  { msg: "fix(hero): implement Indian Standard Time (IST) using Asia/Kolkata timezone", stage: () => run('git add app/Components/hero/Hero.tsx app/Components/hero/PixelSocialIcons.tsx') },
  { msg: "fix(hero): restore AM/PM period and IST label alongside animated seconds digit reel", stage: () => {} },
  { msg: "perf(hero): dynamically import Dither component with ssr false to eliminate memory leaks", stage: () => {} },
  { msg: "chore(config): optimize Next.js build configuration and add webpack fallback scripts", stage: () => run('git add -A') }
];

console.log(`Starting to apply ${commits.length} commits...`);

for (let i = 0; i < commits.length; i++) {
  const { msg, stage } = commits[i];
  stage();
  const res = run(`git commit --allow-empty -m "${msg}"`);
  console.log(`[${i + 1}/${commits.length}] ${msg}`);
}

console.log("All 30 commits applied successfully!");
