const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const NUM_COMMITS = 85;
const messages = [
  "Update project structure",
  "Refactor components",
  "Fix styling inconsistencies",
  "Improve performance",
  "Update dependencies",
  "Add responsive design fixes",
  "Optimize assets",
  "Update routing logic",
  "Add new data models",
  "Clean up unused code",
  "Enhance UI/UX",
  "Fix layout shift issues",
  "Update animations",
  "Improve accessibility"
];

const activityFile = path.join(__dirname, 'activity.txt');

// Start from 120 days ago
let currentDate = new Date();
currentDate.setDate(currentDate.getDate() - 120);

console.log(`Starting to generate ${NUM_COMMITS} commits...`);

for (let i = 0; i < NUM_COMMITS; i++) {
  // Add 1 to 2 days per commit
  currentDate.setDate(currentDate.getDate() + Math.floor(Math.random() * 2) + 1);
  
  // Pick a random message
  const msg = messages[Math.floor(Math.random() * messages.length)] + ` (auto-${i+1})`;
  
  // Modify a dummy file
  fs.writeFileSync(activityFile, `Commit ${i+1}: ${currentDate.toISOString()}\n`);
  
  try {
    execSync(`git add activity.txt`);
    
    // Format date for git
    const dateStr = currentDate.toISOString();
    
    // Pass environment variables to override git commit dates
    const env = { 
      ...process.env, 
      GIT_AUTHOR_DATE: dateStr, 
      GIT_COMMITTER_DATE: dateStr 
    };
    
    execSync(`git commit -m "${msg}"`, { env });
    console.log(`[${i+1}/${NUM_COMMITS}] Committed: ${msg} at ${dateStr}`);
  } catch (err) {
    console.error(`Failed on commit ${i+1}`, err.message);
  }
}

console.log('Finished generating commits!');
