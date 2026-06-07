const fs = require('fs');
const path = require('path');

function checkDirectory(dir) {
  const files = fs.readdirSync(dir);
  let failed = false;

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        if (checkDirectory(fullPath)) failed = true;
      }
    } else {
      if (file.endsWith('.png') || file.startsWith('.') || file === 'package-lock.json') {
        continue;
      }
      const content = fs.readFileSync(fullPath, 'utf-8');
      const lines = content.split(/\r?\n/).length;
      if (lines > 50) {
        console.error(`❌ File ${file} has ${lines} lines (limit: 50)!`);
        failed = true;
      } else {
        console.log(`✅ File ${file} has ${lines} lines.`);
      }
    }
  }
  return failed;
}

const failed = checkDirectory(__dirname);
if (failed) process.exit(1);
console.log('🎉 All files comply with the 50 lines limit!');
