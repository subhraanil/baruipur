const fs = require('fs');

const data = JSON.parse(fs.readFileSync('src/data/news_data.json', 'utf8'));
const articles = data.articles || [];

const drafts = articles.filter(a => a.status === 'draft');
console.log(`Total drafts: ${drafts.length}`);
drafts.forEach((d, idx) => {
  console.log(`\n--- Draft ${idx + 1} [ID: ${d.id}] ---`);
  console.log(`Title: ${d.title}`);
  console.log(`Category: ${d.category}`);
  console.log(`Words: ${(d.content || '').split(/\s+/).length}`);
  console.log(`Content:\n${(d.content || '').slice(0, 300)}...`);
});
