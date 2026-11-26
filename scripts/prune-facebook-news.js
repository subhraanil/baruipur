/**
 * prune-facebook-news.js
 * Keeps all our created evergreen guides, curated articles, and editorial pillars (~85 articles).
 * Prunes all daily Facebook crawled news posts (~252 articles).
 */

const fs = require('fs');
const path = require('path');

const NEWS_FILE = path.join(__dirname, '..', 'src', 'data', 'news_data.json');
const newsData = JSON.parse(fs.readFileSync(NEWS_FILE, 'utf8'));

console.log('Total articles before pruning:', newsData.articles.length);

const keepArticles = [];
const prunedArticles = [];

newsData.articles.forEach(a => {
  const isGuide = a.isGuide || (a.id && a.id.startsWith('art-guide')) || (a.id && a.id.includes('-guide'));
  const isOurCurated = a.id && a.id.startsWith('art-2026');
  const isPortalOriginal = a.sourceType === 'portal_original' || a.sourceType === 'guide' || a.sourceType === 'editorial' || a.sourceType === 'manual' || a.sourceType === 'original' || a.sourceType === 'health_directory';
  const isOurAuthoredPillar = a.id === 'art-1795194062359-z5vd' || a.id === 'art-1795576644863-raer' || a.id === 'art-1795576647033-tgg8';

  const isFacebookCrawl = (a.sourceType === 'facebook' || (a.sourceId && a.sourceId.startsWith('src-fb-')) || (a.sourceUrl && a.sourceUrl.includes('facebook.com')) || (a.originalPostUrl && a.originalPostUrl.includes('facebook.com'))) && !isGuide && !isOurCurated && !isOurAuthoredPillar;

  if (isFacebookCrawl) {
    prunedArticles.push(a);
  } else {
    keepArticles.push(a);
  }
});

console.log('✓ Kept our created posts & guides:', keepArticles.length);
console.log('✓ Pruned Facebook crawled posts:', prunedArticles.length);

newsData.articles = keepArticles;
fs.writeFileSync(NEWS_FILE, JSON.stringify(newsData, null, 2), 'utf8');
console.log('✓ Saved updated news_data.json!');
