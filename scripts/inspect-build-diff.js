const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, '../out');
const STATE_FILE = path.join(__dirname, '../.build-hash-state.json');

function getAllFiles(dir, base = '', results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const relPath = base ? `${base}/${entry.name}` : entry.name;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(fullPath, relPath, results);
    } else if (entry.isFile()) {
      const stat = fs.statSync(fullPath);
      results.push({ relPath, size: stat.size, mtime: Math.floor(stat.mtimeMs) });
    }
  }
  return results;
}

function run() {
  if (!fs.existsSync(OUT_DIR)) {
    console.error('Error: out/ directory does not exist.');
    process.exit(1);
  }

  const t0 = Date.now();
  const allFiles = getAllFiles(OUT_DIR);
  const currentSignatures = {};

  for (const f of allFiles) {
    currentSignatures[f.relPath] = `${f.size}`;
  }

  let previousSignatures = {};
  if (fs.existsSync(STATE_FILE)) {
    try {
      previousSignatures = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
    } catch (e) {
      previousSignatures = {};
    }
  }

  const added = [];
  const modified = [];
  const unchanged = [];
  const deleted = [];

  for (const [relPath, sig] of Object.entries(currentSignatures)) {
    if (!previousSignatures[relPath]) {
      added.push(relPath);
    } else if (previousSignatures[relPath] !== sig) {
      modified.push(relPath);
    } else {
      unchanged.push(relPath);
    }
  }

  for (const prevPath of Object.keys(previousSignatures)) {
    if (!currentSignatures[prevPath]) {
      deleted.push(prevPath);
    }
  }

  const elapsed = ((Date.now() - t0) / 1000).toFixed(2);
  console.log(`\n======================================================`);
  console.log(`BUILD DIFFERENTIAL SUMMARY (Scanned in ${elapsed}s)`);
  console.log(`======================================================`);
  console.log(`Total files in out/:       ${allFiles.length}`);
  console.log(`Unchanged files (Skipped): ${unchanged.length} (${((unchanged.length / (allFiles.length || 1)) * 100).toFixed(1)}%)`);
  console.log(`Modified files (Changed):  ${modified.length}`);
  console.log(`Newly Added files:         ${added.length}`);
  console.log(`Deleted files:             ${deleted.length}`);
  console.log(`======================================================`);

  fs.writeFileSync(STATE_FILE, JSON.stringify(currentSignatures, null, 2), 'utf8');
}

run();
