// Node >= 18
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const srcRoot = path.join(root, ".claude", "commands");
const dstRoot = path.join(root, ".agent", "workflows");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function walkFiles(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(full, out);
    } else if (entry.isFile()) {
      out.push(full);
    }
  }
  return out;
}

function main() {
  if (!fs.existsSync(srcRoot)) {
    console.error(`Source not found: ${srcRoot}`);
    process.exit(1);
  }

  ensureDir(dstRoot);

  const files = walkFiles(srcRoot);
  for (const file of files) {
    const rel = path.relative(srcRoot, file);
    const dest = path.join(dstRoot, rel);
    const destDir = path.dirname(dest);
    ensureDir(destDir);
    fs.copyFileSync(file, dest);
  }

  console.log(`Copied ${files.length} files to ${dstRoot}`);
}

main();
