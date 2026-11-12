const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../src/data/news_data.json');
const raw = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

let strippedCount = 0;
let demotedCount = 0;
let keptCount = 0;
let recategorized = 0;

const BOILERPLATE_PATTERNS = [
  /\n*###\s*ঘটনার প্রাসঙ্গিক প্রেক্ষাপট ও স্থানীয় বিবরণ[\s\S]*$/m,
  /\n*###\s*জরুরি প্রশাসনিক হেল্পলাইন ও যোগাযোগ[\s\S]*$/m,
  /\n*>\s*\*\*সম্পাদকীয় স্বচ্ছতা ও ফ্যাক্ট-চেক নীতি:\*\*[\s\S]*$/m,
];

for (const article of raw.articles || []) {
  if (article.status !== 'published') continue;

  let content = article.content || '';
  const origLen = content.length;

  for (const pat of BOILERPLATE_PATTERNS) {
    content = content.replace(pat, '');
  }
  content = content.trim();

  if (content.length !== origLen) {
    strippedCount++;
  }

  const realWords = content.split(/\s+/).filter(Boolean).length;

  if (!article.isGuide && realWords < 150) {
    article.status = 'draft';
    article.content = content;
    demotedCount++;
  } else {
    article.content = content;
    keptCount++;

    if (article.id === 'art-1794463041324-pyj1' && article.category === 'culture') {
      article.category = 'crime';
      article.categoryNameBn = 'অপরাধ ও প্রশাসন';
      recategorized++;
    }
    if (article.id === 'art-1794463037704-3md7' && article.category === 'culture') {
      article.category = 'health';
      article.categoryNameBn = 'স্বাস্থ্য ও হাসপাতাল';
      recategorized++;
    }
  }
}

fs.writeFileSync(DATA_FILE, JSON.stringify(raw, null, 2), 'utf8');

console.log(JSON.stringify({
  totalArticles: (raw.articles || []).length,
  boilerplateStripped: strippedCount,
  demotedThinToDraft: demotedCount,
  remainingPublished: keptCount,
  recategorized,
}, null, 2));
