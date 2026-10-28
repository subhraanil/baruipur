const fs = require('fs');
const path = require('path');

// 1. Update places/[slug]/page.tsx
const placesPath = path.join(__dirname, '..', 'src', 'app', 'places', '[slug]', 'page.tsx');
let placesCode = fs.readFileSync(placesPath, 'utf-8').replace(/\r\n/g, '\n');

if (!placesCode.includes('import SocialShareBar')) {
  placesCode = placesCode.replace(
    "import AdSenseSlot from '@/components/AdSenseSlot';",
    "import AdSenseSlot from '@/components/AdSenseSlot';\nimport SocialShareBar from '@/components/SocialShareBar';"
  );
}

if (!placesCode.includes('<SocialShareBar')) {
  placesCode = placesCode.replace(
    '{/* Top Leaderboard Ad Space */}',
    `{/* Social Share Bar */}
      <SocialShareBar url={canonicalUrl} title={place.nameBn} />

      {/* Top Leaderboard Ad Space */}`
  );
}

const crossDirPlaces = `
          {/* Cross-Directory Discover Navigation Bar */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">
              বারুইপুরের অন্যান্য গুরুত্বপূর্ণ তথ্য ও নির্দেশিকা
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <a 
                href="/health-directory" 
                className="flex items-center gap-2 p-3 rounded-xl bg-red-50/70 border border-red-200/60 hover:bg-red-100/70 text-red-900 font-bold transition shadow-xs"
              >
                <Hospital className="w-4 h-4 text-red-600 shrink-0" />
                <span>স্বাস্থ্য ও ডাক্তার</span>
              </a>
              <a 
                href="/places" 
                className="flex items-center gap-2 p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 hover:bg-amber-100/70 text-amber-900 font-bold transition shadow-xs"
              >
                <Landmark className="w-4 h-4 text-amber-700 shrink-0" />
                <span>দর্শনীয় স্থান</span>
              </a>
              <a 
                href="/organizations" 
                className="flex items-center gap-2 p-3 rounded-xl bg-purple-50/70 border border-purple-200/60 hover:bg-purple-100/70 text-purple-900 font-bold transition shadow-xs"
              >
                <Building2 className="w-4 h-4 text-purple-700 shrink-0" />
                <span>প্রতিষ্ঠান ও ক্লাব</span>
              </a>
              <a 
                href="/transport" 
                className="flex items-center gap-2 p-3 rounded-xl bg-blue-50/70 border border-blue-200/60 hover:bg-blue-100/70 text-blue-900 font-bold transition shadow-xs"
              >
                <TrainTrack className="w-4 h-4 text-blue-700 shrink-0" />
                <span>পরিবহন ও ট্রেন</span>
              </a>
            </div>
          </div>
`;

if (!placesCode.includes('Cross-Directory Discover Navigation Bar')) {
  placesCode = placesCode.replace(
    '{/* Back to Guides */}',
    `${crossDirPlaces}\n\n          {/* Back to Guides */}`
  );
}

fs.writeFileSync(placesPath, placesCode, 'utf-8');
console.log('✓ Successfully enhanced src/app/places/[slug]/page.tsx');


// 2. Update organizations/[slug]/page.tsx
const orgsPath = path.join(__dirname, '..', 'src', 'app', 'organizations', '[slug]', 'page.tsx');
let orgsCode = fs.readFileSync(orgsPath, 'utf-8').replace(/\r\n/g, '\n');

if (!orgsCode.includes('import SocialShareBar')) {
  orgsCode = orgsCode.replace(
    "import AdSenseSlot from '@/components/AdSenseSlot';",
    "import AdSenseSlot from '@/components/AdSenseSlot';\nimport SocialShareBar from '@/components/SocialShareBar';"
  );
}

if (!orgsCode.includes('<SocialShareBar')) {
  orgsCode = orgsCode.replace(
    '{/* Top Leaderboard Ad Space */}',
    `{/* Social Share Bar */}
      <SocialShareBar url={\`https://baruipur.online/organizations/\${org.slug}/\`} title={org.nameBn} />

      {/* Top Leaderboard Ad Space */}`
  );
}

const crossDirOrgs = `
            {/* Cross-Directory Discover Navigation Bar */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">
                বারুইপুরের অন্যান্য গুরুত্বপূর্ণ তথ্য ও নির্দেশিকা
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <a 
                  href="/health-directory" 
                  className="flex items-center gap-2 p-3 rounded-xl bg-red-50/70 border border-red-200/60 hover:bg-red-100/70 text-red-900 font-bold transition shadow-xs"
                >
                  <Building2 className="w-4 h-4 text-red-600 shrink-0" />
                  <span>স্বাস্থ্য ও ডাক্তার</span>
                </a>
                <a 
                  href="/places" 
                  className="flex items-center gap-2 p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 hover:bg-amber-100/70 text-amber-900 font-bold transition shadow-xs"
                >
                  <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>দর্শনীয় স্থান</span>
                </a>
                <a 
                  href="/organizations" 
                  className="flex items-center gap-2 p-3 rounded-xl bg-purple-50/70 border border-purple-200/60 hover:bg-purple-100/70 text-purple-900 font-bold transition shadow-xs"
                >
                  <Building2 className="w-4 h-4 text-purple-700 shrink-0" />
                  <span>প্রতিষ্ঠান ও ক্লাব</span>
                </a>
                <a 
                  href="/transport" 
                  className="flex items-center gap-2 p-3 rounded-xl bg-blue-50/70 border border-blue-200/60 hover:bg-blue-100/70 text-blue-900 font-bold transition shadow-xs"
                >
                  <Navigation className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>পরিবহন ও ট্রেন</span>
                </a>
              </div>
            </div>
`;

if (!orgsCode.includes('Cross-Directory Discover Navigation Bar')) {
  orgsCode = orgsCode.replace(
    '{/* Leadership & Key People Card */}',
    `${crossDirOrgs}\n\n            {/* Leadership & Key People Card */}`
  );
}

fs.writeFileSync(orgsPath, orgsCode, 'utf-8');
console.log('✓ Successfully enhanced src/app/organizations/[slug]/page.tsx');


// 3. Update health-directory/[slug]/page.tsx
const healthPath = path.join(__dirname, '..', 'src', 'app', 'health-directory', '[slug]', 'page.tsx');
let healthCode = fs.readFileSync(healthPath, 'utf-8').replace(/\r\n/g, '\n');

if (!healthCode.includes('import SocialShareBar')) {
  healthCode = healthCode.replace(
    "import { formatBilingualLocation, cleanBengaliName, cleanEnglishName } from '@/lib/seoUtils';",
    "import { formatBilingualLocation, cleanBengaliName, cleanEnglishName } from '@/lib/seoUtils';\nimport SocialShareBar from '@/components/SocialShareBar';"
  );
}

if (!healthCode.includes('<SocialShareBar')) {
  healthCode = healthCode.replace(
    '{/* Header / Hero Section */}\n          <div className="bg-white rounded-3xl',
    `{/* Social Share Bar */}
          <SocialShareBar url={\`https://baruipur.online/health-directory/\${facility.slug}/\`} title={facility.nameBn} />

          {/* Header / Hero Section */}
          <div className="bg-white rounded-3xl`
  );
}

const crossDirHealth = `
          {/* Cross-Directory Discover Navigation Bar */}
          <div className="mt-8 mb-8 pt-6 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">
              বারুইপুরের অন্যান্য গুরুত্বপূর্ণ তথ্য ও নির্দেশিকা
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <a 
                href="/health-directory" 
                className="flex items-center gap-2 p-3 rounded-xl bg-red-50/70 border border-red-200/60 hover:bg-red-100/70 text-red-900 font-bold transition shadow-xs"
              >
                <Hospital className="w-4 h-4 text-red-600 shrink-0" />
                <span>স্বাস্থ্য ও ডাক্তার</span>
              </a>
              <a 
                href="/places" 
                className="flex items-center gap-2 p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 hover:bg-amber-100/70 text-amber-900 font-bold transition shadow-xs"
              >
                <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                <span>দর্শনীয় স্থান</span>
              </a>
              <a 
                href="/organizations" 
                className="flex items-center gap-2 p-3 rounded-xl bg-purple-50/70 border border-purple-200/60 hover:bg-purple-100/70 text-purple-900 font-bold transition shadow-xs"
              >
                <Building2 className="w-4 h-4 text-purple-700 shrink-0" />
                <span>প্রতিষ্ঠান ও ক্লাব</span>
              </a>
              <a 
                href="/transport" 
                className="flex items-center gap-2 p-3 rounded-xl bg-blue-50/70 border border-blue-200/60 hover:bg-blue-100/70 text-blue-900 font-bold transition shadow-xs"
              >
                <Clock className="w-4 h-4 text-blue-700 shrink-0" />
                <span>পরিবহন ও ট্রেন</span>
              </a>
            </div>
          </div>
`;

if (!healthCode.includes('Cross-Directory Discover Navigation Bar')) {
  healthCode = healthCode.replace(
    '{/* Navigation Back link */}',
    `${crossDirHealth}\n\n          {/* Navigation Back link */}`
  );
}

fs.writeFileSync(healthPath, healthCode, 'utf-8');
console.log('✓ Successfully enhanced src/app/health-directory/[slug]/page.tsx');
