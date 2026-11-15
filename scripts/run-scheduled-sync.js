const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT_DIR = path.resolve(__dirname, '..');

function run(cmd, desc) {
  console.log(`\n========================================`);
  console.log(`▶️ ${desc}`);
  console.log(`💻 Command: ${cmd}`);
  console.log(`========================================`);
  try {
    execSync(cmd, { cwd: ROOT_DIR, stdio: 'inherit', env: process.env });
    console.log(`✅ ${desc} - সম্পন্ন!`);
    return true;
  } catch (err) {
    console.error(`❌ ${desc} ত্রুটি:`, err.message);
    return false;
  }
}

async function main() {
  const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  console.log(`\n###############################################################`);
  console.log(`🕒 বারুইপুর অটোমেটেড সিঙ্ক সাইকেল শুরু: ${now} (IST)`);
  console.log(`📁 পাথ: ${ROOT_DIR}`);
  console.log(`###############################################################\n`);

  // Step 1: Facebook and local news crawler
  run('node scripts/sync-news.js', '১. নিউজ পোস্ট ক্রলার ও সিন্থেসিস (sync-news.js)');

  // Step 2: Buy & Sale, Tenders, and Notices sync
  run('node scripts/sync-buy-sale-tenders-notices.js', '২. নোটিস, টেন্ডার ও প্রপার্টি সিঙ্ক (sync-buy-sale-tenders-notices.js)');

  // Step 3: Refresh SEO assets (sitemaps, RSS feed, llms.txt)
  run('node scripts/generate-seo-assets.js', '৩. এসইও সাইটম্যাপ ও ফিড জেনারেশন (generate-seo-assets.js)');

  // Step 4: Next.js production build verification
  const buildSuccess = run('npm.cmd run build', '৪. Next.js প্রোডাকশন স্ট্যাটিক পেজ বিল্ড (npm run build)');
  if (!buildSuccess) {
    console.error('⚠️ বিল্ড ত্রুটির কারণে গিট পুশ স্থগিত করা হলো।');
    process.exit(1);
  }

  // Step 5: Git commit and push to origin main
  run('git add -A', '৫A. গিট স্টেজ (git add -A)');
  run(`git commit -m "Automated twice-daily sync: news, notices, tenders & properties [${now}]"`, '৫B. গিট কমিট');
  run('git push origin main', '৫C. লাইভ সার্ভারে ডেপ্লয় (git push origin main)');

  // Step 6: Notify search engines via IndexNow
  run('python scripts/submit_indexnow.py', '৬. সার্চ ইঞ্জিন ইন্ডেক্সনাও সাবমিশন (submit_indexnow.py)');

  console.log(`\n🎉 বারুইপুর পোর্টালের দ্বিদৈনিক অটোমেশন সিঙ্ক সফলভাবে সমাপ্ত হয়েছে! [${now}]`);
}

main();
