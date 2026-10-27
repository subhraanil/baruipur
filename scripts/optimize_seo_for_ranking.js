const fs = require('fs');
const path = require('path');

const normalize = (str) => str.replace(/\r\n/g, '\n');

// ==========================================
// 1. Optimize src/app/health-directory/[slug]/page.tsx
// ==========================================
const healthPagePath = path.join(__dirname, '../src/app/health-directory/[slug]/page.tsx');
let healthPage = fs.readFileSync(healthPagePath, 'utf8');
const isHealthCrlf = healthPage.includes('\r\n');
healthPage = normalize(healthPage);

// Ensure imports include cleanBengaliName and cleanEnglishName
healthPage = healthPage.replace(
  `import { formatBilingualLocation } from '@/lib/seoUtils';`,
  `import { formatBilingualLocation, cleanBengaliName, cleanEnglishName } from '@/lib/seoUtils';`
);

// Optimize generateMetadata
const oldHealthMeta = `  const bilingualName = formatBilingualLocation(facility.nameBn, facility.nameEn);
  const title = \`\${bilingualName} | ডাক্তার তালিকা ও সময়সূচি\`;
  const rawDesc = \`\${bilingualName}: ঠিকানা, ওপিডি ডাক্তারদের রোস্টার, বসার দিন ও সময়, ভিজিটিং ফি এবং যোগাযোগের নম্বর।\`;
  const cleanDesc = rawDesc.length > 160 ? rawDesc.slice(0, 157) + '...' : rawDesc;

  return {
    title,
    description: cleanDesc,
    alternates: {
      canonical: \`https://baruipur.online/health-directory/\${facility.slug}/\`,
    },
    openGraph: {
      title,
      description: cleanDesc,
      url: \`https://baruipur.online/health-directory/\${facility.slug}/\`,
      type: 'website',
      images: [
        {
          url: facility.coverImage ? (facility.coverImage.startsWith('http') ? facility.coverImage : \`https://baruipur.online\${facility.coverImage}\`) : 'https://baruipur.online/images/og-image.png',
          width: 1200,
          height: 630,
          alt: bilingualName,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: cleanDesc,
    }
  };`;

const newHealthMeta = `  const cleanBn = cleanBengaliName(facility.nameBn);
  const cleanEn = cleanEnglishName(facility.nameEn);
  const bilingualName = formatBilingualLocation(facility.nameBn, facility.nameEn);
  const title = \`\${bilingualName} | ডাক্তার তালিকা ও সময়সূচি\`;
  const rawDesc = \`\${bilingualName}: ঠিকানা, ওপিডি ডাক্তারদের রোস্টার, বসার দিন ও সময়, ভিজিটিং ফি এবং যোগাযোগের নম্বর।\`;
  const cleanDesc = rawDesc.length > 160 ? rawDesc.slice(0, 157) + '...' : rawDesc;

  const doctorKeywords = facility.doctors ? facility.doctors.flatMap(d => [
    d.nameBn,
    d.nameEn,
    \`\${d.nameBn} বারুইপুর\`,
    \`\${d.nameEn} Baruipur\`
  ]) : [];

  return {
    title,
    description: cleanDesc,
    keywords: [
      cleanBn,
      cleanEn,
      \`\${cleanBn}, বারুইপুর\`,
      \`\${cleanEn}, Baruipur\`,
      \`\${cleanBn} বারুইপুর\`,
      \`\${cleanEn} Baruipur\`,
      bilingualName,
      'Baruipur',
      'বারুইপুর',
      'Baruipur doctor list',
      'বারুইপুর ডাক্তার চেম্বার',
      'Baruipur clinic OPD',
      ...doctorKeywords
    ],
    alternates: {
      canonical: \`https://baruipur.online/health-directory/\${facility.slug}/\`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description: cleanDesc,
      url: \`https://baruipur.online/health-directory/\${facility.slug}/\`,
      type: 'website',
      images: [
        {
          url: facility.coverImage ? (facility.coverImage.startsWith('http') ? facility.coverImage : \`https://baruipur.online\${facility.coverImage}\`) : 'https://baruipur.online/images/og-image.png',
          width: 1200,
          height: 630,
          alt: bilingualName,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: cleanDesc,
    }
  };`;

if (healthPage.includes(oldHealthMeta)) {
  healthPage = healthPage.replace(oldHealthMeta, newHealthMeta);
  console.log('✓ Updated health directory metadata with keywords & robots');
}

// Enhance Schema in FacilityDetailPage
const oldHealthSchema = `  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: facility.nameBn,
    alternateName: facility.nameEn,
    description: facility.overviewBn,
    url: \`https://baruipur.online/health-directory/\${facility.slug}/\`,
    ...(facility.coverImage ? { image: facility.coverImage.startsWith('http') ? facility.coverImage : \`https://baruipur.online\${facility.coverImage}\` } : {}),
    telephone: facility.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: facility.addressBn,
      addressLocality: 'Baruipur',
      addressRegion: 'West Bengal',
      postalCode: '700144',
      addressCountry: 'IN'
    },
    openingHours: facility.isOpen24Hours ? 'Mo-Su 00:00-24:00' : 'Mo-Sa 08:00-21:00',
    medicalSpecialty: facility.doctors.map(d => d.specialtyEn),
    employee: facility.doctors.map(d => ({
      '@type': 'Physician',
      name: d.nameBn,
      alternateName: d.nameEn,
      medicalSpecialty: d.specialtyEn,
      description: \`\${d.degrees} - \${d.specialtyBn}\`
    }))
  };`;

const newHealthSchema = `  const cleanBn = cleanBengaliName(facility.nameBn);
  const cleanEn = cleanEnglishName(facility.nameEn);
  const bilingualName = formatBilingualLocation(facility.nameBn, facility.nameEn);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    name: facility.nameBn,
    alternateName: [
      facility.nameEn,
      \`\${cleanBn}, বারুইপুর\`,
      \`\${cleanEn}, Baruipur\`,
      \`\${cleanBn} বারুইপুর\`,
      \`\${cleanEn} Baruipur\`,
      bilingualName
    ],
    description: facility.overviewBn,
    url: \`https://baruipur.online/health-directory/\${facility.slug}/\`,
    ...(facility.coverImage ? { image: facility.coverImage.startsWith('http') ? facility.coverImage : \`https://baruipur.online\${facility.coverImage}\` } : {}),
    telephone: facility.phone,
    hasMap: facility.googleMapUrl,
    sameAs: [
      facility.googleMapUrl,
      facility.websiteUrl,
      facility.facebookUrl
    ].filter(Boolean),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 22.3654,
      longitude: 88.4325
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: facility.addressBn,
      addressLocality: 'Baruipur',
      addressRegion: 'West Bengal',
      postalCode: '700144',
      addressCountry: 'IN'
    },
    openingHours: facility.isOpen24Hours ? 'Mo-Su 00:00-24:00' : 'Mo-Sa 08:00-21:00',
    medicalSpecialty: facility.doctors.map(d => d.specialtyEn),
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Baruipur',
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'South 24 Parganas'
      }
    },
    employee: facility.doctors.map(d => ({
      '@type': 'Physician',
      name: d.nameBn,
      alternateName: d.nameEn,
      medicalSpecialty: d.specialtyEn,
      description: \`\${d.degrees} - \${d.specialtyBn}\`
    }))
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'প্রচ্ছদ',
        item: 'https://baruipur.online/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'স্বাস্থ্য ও ডাক্তার চেম্বার',
        item: 'https://baruipur.online/health-directory/'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: bilingualName,
        item: \`https://baruipur.online/health-directory/\${facility.slug}/\`
      }
    ]
  };`;

if (healthPage.includes(oldHealthSchema)) {
  healthPage = healthPage.replace(oldHealthSchema, newHealthSchema);
  healthPage = healthPage.replace(
    `<script\n        type="application/ld+json"\n        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}\n      />`,
    `<script\n        type="application/ld+json"\n        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}\n      />\n      <script\n        type="application/ld+json"\n        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}\n      />`
  );
  console.log('✓ Enhanced Schema.org JSON-LD with alternateName, geo, breadcrumbs in health page');
}

// Enhance H1 header in Hero card
const oldH1 = `              <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-2">
                {facility.nameBn}
              </h1>
              <p className="text-sm sm:text-base text-slate-300 font-medium mb-4">
                {facility.nameEn}
              </p>`;

const newH1 = `              <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-2">
                <span>{facility.nameBn}, বারুইপুর</span>
                <span className="block sm:inline sm:ml-2 text-xl sm:text-3xl font-semibold text-slate-300">({facility.nameEn}, Baruipur)</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 font-medium mb-4">
                {facility.nameBn} • {facility.nameEn}
              </p>`;

if (healthPage.includes(oldH1)) {
  healthPage = healthPage.replace(oldH1, newH1);
  console.log('✓ Updated H1 tag in health detail page');
}

fs.writeFileSync(healthPagePath, isHealthCrlf ? healthPage.replace(/\n/g, '\r\n') : healthPage, 'utf8');

// ==========================================
// 2. Enhance src/components/HealthcareListClient.tsx
// ==========================================
const clientListPath = path.join(__dirname, '../src/components/HealthcareListClient.tsx');
let clientList = fs.readFileSync(clientListPath, 'utf8');
const isClientCrlf = clientList.includes('\r\n');
clientList = normalize(clientList);

const oldClientLink = `                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug group">
                      <Link 
                        href={\`/health-directory/\${fac.slug}/\`}
                        className="hover:text-red-600 transition"
                      >
                        {fac.nameBn}
                      </Link>
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {fac.nameEn}
                    </p>`;

const newClientLink = `                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug group">
                      <Link 
                        href={\`/health-directory/\${fac.slug}/\`}
                        className="hover:text-red-600 transition"
                        title={\`\${fac.nameBn}, বারুইপুর (\${fac.nameEn}, Baruipur)\`}
                      >
                        {fac.nameBn}, বারুইপুর
                      </Link>
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {fac.nameEn}, Baruipur
                    </p>`;

if (clientList.includes(oldClientLink)) {
  clientList = clientList.replace(oldClientLink, newClientLink);
  fs.writeFileSync(clientListPath, isClientCrlf ? clientList.replace(/\n/g, '\r\n') : clientList, 'utf8');
  console.log('✓ Updated internal links and anchor text in HealthcareListClient.tsx');
}

// ==========================================
// 3. Optimize src/app/organizations/[slug]/page.tsx
// ==========================================
const orgPagePath = path.join(__dirname, '../src/app/organizations/[slug]/page.tsx');
let orgPage = fs.readFileSync(orgPagePath, 'utf8');
const isOrgCrlf = orgPage.includes('\r\n');
orgPage = normalize(orgPage);

orgPage = orgPage.replace(
  `import { formatBilingualLocation } from '@/lib/seoUtils';`,
  `import { formatBilingualLocation, cleanBengaliName, cleanEnglishName } from '@/lib/seoUtils';`
);

const oldOrgMeta = `  const bilingualName = formatBilingualLocation(org.nameBn, org.nameEn);
  const title = \`\${bilingualName} | ইতিহাস, সমাজসেবা ও যোগাযোগের তথ্য\`;
  const rawDesc = \`\${bilingualName}: ক্লাবের ইতিহাস, ক্রীড়া ও ফুটবল টুর্নামেন্ট, রক্তদান শিবির, সমাজকল্যাণমূলক কর্মকাণ্ড এবং যোগাযোগের সম্পূর্ণ তথ্য।\`;
  const cleanDesc = rawDesc.length > 160 ? rawDesc.slice(0, 157) + '...' : rawDesc;

  return {
    title,
    description: cleanDesc,
    alternates: {
      canonical: \`https://baruipur.online/organizations/\${org.slug}/\`,
    },`;

const newOrgMeta = `  const cleanBn = cleanBengaliName(org.nameBn);
  const cleanEn = cleanEnglishName(org.nameEn);
  const bilingualName = formatBilingualLocation(org.nameBn, org.nameEn);
  const title = \`\${bilingualName} | ইতিহাস, সমাজসেবা ও যোগাযোগের তথ্য\`;
  const rawDesc = \`\${bilingualName}: ক্লাবের ইতিহাস, ক্রীড়া ও ফুটবল টুর্নামেন্ট, রক্তদান শিবির, সমাজকল্যাণমূলক কর্মকাণ্ড এবং যোগাযোগের সম্পূর্ণ তথ্য।\`;
  const cleanDesc = rawDesc.length > 160 ? rawDesc.slice(0, 157) + '...' : rawDesc;

  return {
    title,
    description: cleanDesc,
    keywords: [
      cleanBn,
      cleanEn,
      \`\${cleanBn}, বারুইপুর\`,
      \`\${cleanEn}, Baruipur\`,
      \`\${cleanBn} বারুইপুর\`,
      \`\${cleanEn} Baruipur\`,
      bilingualName,
      'Baruipur',
      'বারুইপুর',
      'Baruipur clubs',
      'বারুইপুর প্রতিষ্ঠান ও ক্লাব',
      ...(org.keyPeople ? org.keyPeople.map(k => k.name) : [])
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: \`https://baruipur.online/organizations/\${org.slug}/\`,
    },`;

if (orgPage.includes(oldOrgMeta)) {
  orgPage = orgPage.replace(oldOrgMeta, newOrgMeta);
  console.log('✓ Updated organizations metadata with keywords & robots');
}

// Enhance Schema in OrganizationDetailPage
const oldOrgSchema = `  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': org.schemaType || 'Organization',
    name: org.nameBn,
    alternateName: org.nameEn,
    description: org.overview,
    url: \`https://baruipur.online/organizations/\${org.slug}/\`,
    logo: \`https://baruipur.online\${org.coverImage}\`,
    image: org.images?.map(i => i.url.startsWith('http') ? i.url : \`https://baruipur.online\${i.url}\`) || [\`https://baruipur.online\${org.coverImage}\`],
    address: {
      '@type': 'PostalAddress',
      streetAddress: org.address,
      addressLocality: 'Baruipur',
      addressRegion: 'West Bengal',
      postalCode: org.pincode,
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: org.coordinates.lat,
      longitude: org.coordinates.lng
    },
    telephone: org.contact.phone || undefined,
    email: org.contact.email || undefined
  };`;

const newOrgSchema = `  const cleanBn = cleanBengaliName(org.nameBn);
  const cleanEn = cleanEnglishName(org.nameEn);
  const bilingualName = formatBilingualLocation(org.nameBn, org.nameEn);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': org.schemaType || 'Organization',
    name: org.nameBn,
    alternateName: [
      org.nameEn,
      \`\${cleanBn}, বারুইপুর\`,
      \`\${cleanEn}, Baruipur\`,
      \`\${cleanBn} বারুইপুর\`,
      \`\${cleanEn} Baruipur\`,
      bilingualName
    ],
    description: org.overview,
    url: \`https://baruipur.online/organizations/\${org.slug}/\`,
    logo: \`https://baruipur.online\${org.coverImage}\`,
    image: org.images?.map(i => i.url.startsWith('http') ? i.url : \`https://baruipur.online\${i.url}\`) || [\`https://baruipur.online\${org.coverImage}\`],
    address: {
      '@type': 'PostalAddress',
      streetAddress: org.address,
      addressLocality: 'Baruipur',
      addressRegion: 'West Bengal',
      postalCode: org.pincode,
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: org.coordinates.lat,
      longitude: org.coordinates.lng
    },
    hasMap: org.gmbMapUrl,
    sameAs: [
      org.gmbMapUrl,
      org.contact.facebookUrl,
      org.contact.website
    ].filter(Boolean),
    telephone: org.contact.phone || undefined,
    email: org.contact.email || undefined
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'প্রচ্ছদ',
        item: 'https://baruipur.online/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'প্রতিষ্ঠান ও ক্লাব',
        item: 'https://baruipur.online/organizations/'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: bilingualName,
        item: \`https://baruipur.online/organizations/\${org.slug}/\`
      }
    ]
  };`;

if (orgPage.includes(oldOrgSchema)) {
  orgPage = orgPage.replace(oldOrgSchema, newOrgSchema);
  orgPage = orgPage.replace(
    `<script\n        type="application/ld+json"\n        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}\n      />`,
    `<script\n        type="application/ld+json"\n        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}\n      />\n      <script\n        type="application/ld+json"\n        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}\n      />`
  );
  console.log('✓ Enhanced Schema.org JSON-LD in organizations page');
}

// Enhance Hero H1 in OrganizationDetailPage
const oldOrgH1 = `              <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-2">
                {org.nameBn}
              </h1>`;

const newOrgH1 = `              <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-2">
                <span>{org.nameBn}, বারুইপুর</span>
                <span className="block sm:inline sm:ml-2 text-xl sm:text-3xl font-semibold text-slate-300">({org.nameEn}, Baruipur)</span>
              </h1>`;

if (orgPage.includes(oldOrgH1)) {
  orgPage = orgPage.replace(oldOrgH1, newOrgH1);
  console.log('✓ Updated H1 tag in organization detail page');
}

fs.writeFileSync(orgPagePath, isOrgCrlf ? orgPage.replace(/\n/g, '\r\n') : orgPage, 'utf8');

// ==========================================
// 4. Optimize src/app/places/[slug]/page.tsx
// ==========================================
const placesPagePath = path.join(__dirname, '../src/app/places/[slug]/page.tsx');
let placesPage = fs.readFileSync(placesPagePath, 'utf8');
const isPlacesCrlf = placesPage.includes('\r\n');
placesPage = normalize(placesPage);

placesPage = placesPage.replace(
  `import { formatBilingualLocation } from '@/lib/seoUtils';`,
  `import { formatBilingualLocation, cleanBengaliName, cleanEnglishName } from '@/lib/seoUtils';`
);

const oldPlacesMeta = `  const bilingualName = formatBilingualLocation(place.nameBn, place.nameEn);
  const canonicalUrl = \`https://baruipur.online/places/\${place.slug}/\`;
  const title = \`\${bilingualName} | ইতিহাস, নাগরিক তথ্য ও গাইড\`;
  const rawDesc = \`\${bilingualName}: ঠিকানা, যোগাযোগ, ইতিহাস, নাগরিক পরিষেবা ও প্রশাসনিক সম্পূর্ণ তথ্য নির্দেশিকা।\`;
  const description = rawDesc.length > 160 ? rawDesc.slice(0, 157) + '...' : rawDesc;
  const image = place.coverImage || place.images?.[0]?.url || 'https://baruipur.online/images/baruipur-logo.png';

  return {
    title,
    description,
    keywords: [
      place.nameBn,
      place.nameEn,
      'Baruipur',
      'বারুইপুর',
      'দক্ষিণ ২৪ পরগনা',
      place.taglineBn,
      'Baruipur guide'
    ],
    alternates: {
      canonical: canonicalUrl,
    },`;

const newPlacesMeta = `  const cleanBn = cleanBengaliName(place.nameBn);
  const cleanEn = cleanEnglishName(place.nameEn);
  const bilingualName = formatBilingualLocation(place.nameBn, place.nameEn);
  const canonicalUrl = \`https://baruipur.online/places/\${place.slug}/\`;
  const title = \`\${bilingualName} | ইতিহাস, নাগরিক তথ্য ও গাইড\`;
  const rawDesc = \`\${bilingualName}: ঠিকানা, যোগাযোগ, ইতিহাস, নাগরিক পরিষেবা ও প্রশাসনিক সম্পূর্ণ তথ্য নির্দেশিকা।\`;
  const description = rawDesc.length > 160 ? rawDesc.slice(0, 157) + '...' : rawDesc;
  const image = place.coverImage || place.images?.[0]?.url || 'https://baruipur.online/images/baruipur-logo.png';

  return {
    title,
    description,
    keywords: [
      cleanBn,
      cleanEn,
      \`\${cleanBn}, বারুইপুর\`,
      \`\${cleanEn}, Baruipur\`,
      \`\${cleanBn} বারুইপুর\`,
      \`\${cleanEn} Baruipur\`,
      bilingualName,
      'Baruipur',
      'বারুইপুর',
      'দক্ষিণ ২৪ পরগনা',
      place.taglineBn,
      'Baruipur guide',
      'Baruipur places'
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },`;

if (placesPage.includes(oldPlacesMeta)) {
  placesPage = placesPage.replace(oldPlacesMeta, newPlacesMeta);
  console.log('✓ Updated places metadata with keywords & robots');
}

// Enhance Schema in PlaceDetailPage
const oldPlaceSchema = `  const placeSchema = {
    '@context': 'https://schema.org',
    '@type': place.schemaType || 'Place',
    name: \`\${place.nameBn} (\${place.nameEn})\`,
    description: place.overview,
    url: canonicalUrl,`;

const newPlaceSchema = `  const cleanBn = cleanBengaliName(place.nameBn);
  const cleanEn = cleanEnglishName(place.nameEn);
  const bilingualName = formatBilingualLocation(place.nameBn, place.nameEn);

  const placeSchema = {
    '@context': 'https://schema.org',
    '@type': place.schemaType || 'Place',
    name: place.nameBn,
    alternateName: [
      place.nameEn,
      \`\${cleanBn}, বারুইপুর\`,
      \`\${cleanEn}, Baruipur\`,
      \`\${cleanBn} বারুইপুর\`,
      \`\${cleanEn} Baruipur\`,
      bilingualName
    ],
    description: place.overview,
    url: canonicalUrl,`;

if (placesPage.includes(oldPlaceSchema)) {
  placesPage = placesPage.replace(oldPlaceSchema, newPlaceSchema);
  console.log('✓ Enhanced Schema.org JSON-LD with alternateName in places page');
}

// Enhance Hero H1 in PlaceDetailPage
const oldPlaceH1 = `          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2 leading-tight">
            {place.nameBn}
          </h1>
          <p className="text-lg sm:text-xl font-medium text-red-300 mb-4">
            {place.nameEn}
          </p>`;

const newPlaceH1 = `          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2 leading-tight">
            <span>{place.nameBn}, বারুইপুর</span>
            <span className="block sm:inline sm:ml-2 text-xl sm:text-3xl font-semibold text-slate-300">({place.nameEn}, Baruipur)</span>
          </h1>
          <p className="text-lg sm:text-xl font-medium text-red-300 mb-4">
            {place.nameBn} • {place.nameEn}
          </p>`;

if (placesPage.includes(oldPlaceH1)) {
  placesPage = placesPage.replace(oldPlaceH1, newPlaceH1);
  console.log('✓ Updated H1 tag in place detail page');
}

fs.writeFileSync(placesPagePath, isPlacesCrlf ? placesPage.replace(/\n/g, '\r\n') : placesPage, 'utf8');

// ==========================================
// 5. Enhance src/app/health-directory/page.tsx with ItemList Schema
// ==========================================
const healthHubPath = path.join(__dirname, '../src/app/health-directory/page.tsx');
let healthHub = fs.readFileSync(healthHubPath, 'utf8');
const isHubCrlf = healthHub.includes('\r\n');
healthHub = normalize(healthHub);

if (!healthHub.includes('itemListJsonLd')) {
  const targetJsonLd = `  // Schema.org MedicalWebPage JSON-LD
  const jsonLd = {`;

  const replacementJsonLd = `  // Schema.org ItemList JSON-LD
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'বারুইপুর স্বাস্থ্য ও ডাক্তার চেম্বার তালিকা',
    itemListElement: facilities.map((f, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: \`\${f.nameBn}, বারুইপুর (\${f.nameEn}, Baruipur)\`,
      url: \`https://baruipur.online/health-directory/\${f.slug}/\`
    }))
  };

  // Schema.org MedicalWebPage JSON-LD
  const jsonLd = {`;

  healthHub = healthHub.replace(targetJsonLd, replacementJsonLd);
  healthHub = healthHub.replace(
    `<script\n        type="application/ld+json"\n        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}\n      />`,
    `<script\n        type="application/ld+json"\n        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}\n      />\n      <script\n        type="application/ld+json"\n        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}\n      />`
  );
  fs.writeFileSync(healthHubPath, isHubCrlf ? healthHub.replace(/\n/g, '\r\n') : healthHub, 'utf8');
  console.log('✓ Added ItemList schema to health directory hub page');
}

console.log('--- All SEO optimizations for Google Name Search Ranking Applied Successfully! ---');
