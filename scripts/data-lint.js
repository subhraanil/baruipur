/**
 * Report-only Data Linter (Baruipur Online v3.0 Section 18)
 * Never modifies data files. Generates docs/data-issues.md and docs/specialty-mapping.csv.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const DOCS_DIR = path.join(ROOT, 'docs');
if (!fs.existsSync(DOCS_DIR)) fs.mkdirSync(DOCS_DIR, { recursive: true });

function loadJson(name) {
  const p = path.join(DATA_DIR, name);
  if (!fs.existsSync(p)) return [];
  const d = JSON.parse(fs.readFileSync(p, 'utf8'));
  return Array.isArray(d) ? d : (d.notices || d.tenders || d.properties || d.articles || []);
}

function bnToEnDigits(str) {
  const map = { '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9' };
  return String(str || '').replace(/[০-৯]/g, d => map[d] || d);
}

const places = loadJson('places_data.json');
const orgs = loadJson('organizations_data.json');
const health = loadJson('healthcare_data.json');
const notices = loadJson('notices_data.json');
const tenders = loadJson('tenders_data.json');
const properties = loadJson('properties_data.json');

const issues = [];
let blockingErrors = 0;

// 1. Check duplicate phone numbers across distinct entities
const phoneRegistry = new Map();
function registerPhone(type, item, phoneRaw) {
  if (!phoneRaw) return;
  const digits = bnToEnDigits(phoneRaw).replace(/[^0-9]/g, '');
  if (digits.length < 6) return;
  if (!phoneRegistry.has(digits)) phoneRegistry.set(digits, []);
  phoneRegistry.get(digits).push(`${type}:${item.slug || item.id} (${item.nameBn || item.title})`);
}

places.forEach(p => registerPhone('place', p, p.phone || p.contact?.phone));
orgs.forEach(o => registerPhone('org', o, o.phone || o.contact?.phone));
health.forEach(h => registerPhone('health', h, h.phone));

for (const [digits, refs] of phoneRegistry.entries()) {
  if (refs.length > 1) {
    // Allow same slug across place + health (e.g. Pubali / SDH) to be surfaced as warn
    issues.push({
      severity: 'WARN',
      code: 'D4/D5',
      message: `Phone \`${digits}\` appears on multiple entities: ${refs.join(', ')}`
    });
  }
}

// 2. Check tenders with passed deadline but active status
const now = new Date();
let expiredActiveTenders = 0;
for (const t of tenders) {
  const rawDate = t.closingDate || t.submissionDeadline || t.lastDate;
  if (rawDate && t.status === 'active') {
    const d = new Date(bnToEnDigits(rawDate));
    if (!isNaN(d.getTime()) && d < now) {
      expiredActiveTenders++;
    }
  }
}
if (expiredActiveTenders > 0) {
  issues.push({
    severity: 'WARN',
    code: 'TENDER-EXPIRY',
    message: `${expiredActiveTenders} tenders have closingDate in the past while status is 'active' (filtered out on homepage; labeled expired on /tenders).`
  });
}

// 3. Check missing verified_at / lastVerified summary
const unverifiedPlaces = places.filter(p => !p.lastVerified).length;
const unverifiedHealth = health.filter(h => !h.lastVerified).length;
const unverifiedOrgs = orgs.filter(o => !o.lastVerified).length;
issues.push({
  severity: 'INFO',
  code: 'VERIFIED-AT',
  message: `Missing lastVerified counts — Places: ${unverifiedPlaces}/${places.length}, Health: ${unverifiedHealth}/${health.length}, Orgs: ${unverifiedOrgs}/${orgs.length}`
});

// 4. Specialty mapping CSV
const specRows = ['raw_specialty_bn,canonical_key,canonical_bn'];
const seenRaw = new Set();
for (const h of health) {
  for (const d of (h.doctors || [])) {
    const raw = (d.specialtyBn || '').replace(/,/g, ' ').trim();
    if (raw && !seenRaw.has(raw)) {
      seenRaw.add(raw);
      specRows.push(`"${raw}",${d.canonicalSpecialtyKey || d.specialtyKey || ''},"${d.canonicalSpecialtyBn || ''}"`);
    }
  }
}
fs.writeFileSync(path.join(DOCS_DIR, 'specialty-mapping.csv'), specRows.join('\n'), 'utf8');

// 5. Write docs/data-issues.md
const md = [
  '# Data Issues Report (`scripts/data-lint.js`)',
  '',
  `Generated: ${new Date().toISOString()}`,
  '',
  '## Computed Inventory Counts',
  `- Places: **${places.length}**`,
  `- Organizations: **${orgs.length}**`,
  `- Health Facilities: **${health.length}**`,
  `- Doctors: **${health.reduce((s, h) => s + (h.doctors?.length || 0), 0)}**`,
  `- Notices: **${notices.length}**`,
  `- Tenders: **${tenders.length}**`,
  `- Properties: **${properties.length}** (Bank Auctions: **${properties.filter(p => p.category === 'bank_auction').length}**)`,
  '',
  '## Findings',
  '',
  '| Severity | Code | Details |',
  '|---|---|---|',
  ...issues.map(i => `| ${i.severity} | ${i.code} | ${i.message} |`)
].join('\n');

fs.writeFileSync(path.join(DOCS_DIR, 'data-issues.md'), md, 'utf8');
console.log(`✓ Generated docs/data-issues.md (${issues.length} findings) and docs/specialty-mapping.csv (${seenRaw.size} specialties).`);
if (blockingErrors > 0) process.exit(1);
