/**
 * postbuild-copy.js
 * Ensures that critical server configuration files (like public/.htaccess)
 * are copied into Next.js static output directory (`out/`) after `next build`.
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const PUBLIC_HTACCESS = path.join(ROOT_DIR, 'public', '.htaccess');
const OUT_DIR = path.join(ROOT_DIR, 'out');
const OUT_HTACCESS = path.join(OUT_DIR, '.htaccess');

if (fs.existsSync(OUT_DIR)) {
  if (fs.existsSync(PUBLIC_HTACCESS)) {
    fs.copyFileSync(PUBLIC_HTACCESS, OUT_HTACCESS);
    console.log('✓ Copied public/.htaccess to out/.htaccess for cPanel & Cloudflare');
  } else {
    console.warn('⚠️ public/.htaccess not found!');
  }
} else {
  console.warn('⚠️ out/ directory does not exist yet.');
}
