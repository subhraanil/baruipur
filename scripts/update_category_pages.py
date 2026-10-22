import json
import re

# 1. Update src/app/[slug]/page.tsx
with open('src/app/[slug]/page.tsx', 'r', encoding='utf-8') as f:
    slug_code = f.read()

# Replace category badge span with anchor link
old_badge = '''            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              {article.categoryNameBn}
            </span>'''

new_badge = '''            <a 
              href={`/category/${article.category}`}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1 rounded-full transition shadow-sm hover:shadow inline-block"
              title={`${article.categoryNameBn} বিভাগের সমস্ত খবর দেখুন`}
            >
              {article.categoryNameBn}
            </a>'''

if old_badge in slug_code:
    slug_code = slug_code.replace(old_badge, new_badge)
    with open('src/app/[slug]/page.tsx', 'w', encoding='utf-8') as f:
        f.write(slug_code)
    print("Updated src/app/[slug]/page.tsx category badge successfully!")
else:
    # Try normalized whitespace
    print("Looking for badge pattern with regex...")
    pattern = r'<span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">\s*\{article\.categoryNameBn\}\s*</span>'
    repl = '''<a 
              href={`/category/${article.category}`}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1 rounded-full transition shadow-sm hover:shadow inline-block"
              title={`${article.categoryNameBn} বিভাগের সমস্ত খবর দেখুন`}
            >
              {article.categoryNameBn}
            </a>'''
    slug_code, count = re.subn(pattern, repl, slug_code)
    if count > 0:
        with open('src/app/[slug]/page.tsx', 'w', encoding='utf-8') as f:
            f.write(slug_code)
        print(f"Updated src/app/[slug]/page.tsx via regex! ({count} replacements)")
    else:
        print("Pattern not matched in src/app/[slug]/page.tsx")

# 2. Update src/data/news_data.json
with open('src/data/news_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

articles = data.get('articles', [])
updated_count = 0

# Slugs that should be in 'food' category
FOOD_SLUGS = {
    'best-restaurants-in-baruipur-family-dining-biryani-guide',
    'best-cafes-in-baruipur-hangout-coffee-food-guide',
    'famous-sweet-shops-in-baruipur-traditional-mishti-guide',
    'best-restaurants-cafes-and-food-guide-in-baruipur',
    'best-restaurants-cafes-and-sweets-in-baruipur-food-guide',
    'বারুইপুরে-প্রথম-গার্ডেন-ক্যাফে-আড্ডা-ও-খাবারের-নতুন-ঠিকানা'
}

# Slugs that should be in 'travel' category
TRAVEL_SLUGS = {
    'বারুইপুর-ভ্রমণ-গাইড-সেরা-দর্শনীয়-স্থান-ও-অভিজ্ঞতা',
    'top-things-to-do-in-baruipur-complete-experience-guide',
    'best-places-to-visit-in-baruipur-travel-guide',
    'adi-ganga-and-atghara-archaeological-heritage-baruipur-guide'
}

# Slugs that should be in 'lifestyle' category
LIFESTYLE_SLUGS = {
    'shopping-malls-and-top-brands-in-baruipur-market-guide',
    'best-banquet-halls-and-marriage-venues-in-baruipur',
    'baruipur-real-estate-property-and-flat-buying-guide'
}

for a in articles:
    slug = a.get('slug', '')
    old_cat = a.get('category')
    old_bn = a.get('categoryNameBn')

    # Food assignment
    if slug in FOOD_SLUGS or a.get('categoryNameBn') == 'খাবার ও রেস্তোরাঁ' or (old_cat == 'lifestyle' and 'food' in slug):
        a['category'] = 'food'
        a['categoryNameBn'] = 'খাবার ও রেস্তোরাঁ'
        updated_count += 1
        continue

    # Travel assignment
    if slug in TRAVEL_SLUGS or (old_cat == 'lifestyle' and ('travel' in slug or 'দর্শনীয়' in slug or 'things-to-do' in slug)):
        a['category'] = 'travel'
        a['categoryNameBn'] = 'ভ্রমণ ও দর্শনীয় স্থান'
        updated_count += 1
        continue

    # Lifestyle assignment
    if slug in LIFESTYLE_SLUGS or old_cat == 'lifestyle':
        a['category'] = 'lifestyle'
        a['categoryNameBn'] = 'লাইফস্টাইল ও জীবনযাত্রা'
        updated_count += 1
        continue

    # Map legacy 'local' -> crime / municipality
    if old_cat == 'local':
        a['category'] = 'municipality'
        a['categoryNameBn'] = 'পৌরসভা ও নাগরিক'
        updated_count += 1
        continue

    # Map legacy 'social' -> culture
    if old_cat == 'social':
        a['category'] = 'culture'
        a['categoryNameBn'] = 'উৎসব ও সংস্কৃতি'
        updated_count += 1
        continue

    # Standardize remaining categories
    if old_cat == 'crime':
        a['categoryNameBn'] = 'অপরাধ ও প্রশাসন'
    elif old_cat == 'culture':
        a['categoryNameBn'] = 'উৎসব ও সংস্কৃতি'
    elif old_cat == 'municipality':
        a['categoryNameBn'] = 'পৌরসভা ও নাগরিক'
    elif old_cat == 'railway':
        a['categoryNameBn'] = 'ট্রেন ও যাতায়াত'
    elif old_cat == 'health':
        a['categoryNameBn'] = 'স্বাস্থ্য ও হাসপাতাল'
    elif old_cat == 'education':
        a['categoryNameBn'] = 'শিক্ষা ও বিদ্যায়তন'
    elif old_cat == 'general' or old_cat == 'all':
        a['category'] = 'general'
        a['categoryNameBn'] = 'সাধারণ সংবাদ'

with open('src/data/news_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Standardized categories across all {len(articles)} articles in src/data/news_data.json!")

# 3. Update src/components/Header.tsx
with open('src/components/Header.tsx', 'r', encoding='utf-8') as f:
    hdr = f.read()

hdr_norm = hdr.replace('\r\n', '\n')

desktop_target = '''            <a
              href="/#featured-guides"
              className="px-3 py-2 rounded-md text-sm font-semibold whitespace-nowrap text-slate-700 hover:bg-cyan-50 hover:text-cyan-800 transition"
            >
              🧭 স্পেশাল গাইড
            </a>'''

desktop_repl = '''            <a
              href="/category/food"
              className={`px-3 py-2 rounded-md text-sm font-bold whitespace-nowrap transition-all ${
                pathname === '/category/food' 
                  ? 'bg-amber-600 text-white shadow-sm' 
                  : 'text-amber-800 hover:bg-amber-50 hover:text-amber-900'
              }`}
            >
              🍽️ খাবার ও রেস্তোরাঁ
            </a>
            <a
              href="/#featured-guides"
              className="px-3 py-2 rounded-md text-sm font-semibold whitespace-nowrap text-slate-700 hover:bg-cyan-50 hover:text-cyan-800 transition"
            >
              🧭 স্পেশাল গাইড
            </a>'''

mobile_target = '''                <a
                  href="/#featured-guides"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold text-cyan-800 hover:bg-cyan-50 transition"
                >
                  <span className="text-base">🧭</span> স্পেশাল গাইড (Guides)
                </a>'''

mobile_repl = '''                <a
                  href="/category/food"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold text-amber-900 bg-amber-50/70 hover:bg-amber-100/80 transition"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-base">🍽️</span> খাবার ও রেস্তোরাঁ (Food & Dining)
                  </span>
                  <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-bold">
                    Food
                  </span>
                </a>
                <a
                  href="/#featured-guides"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold text-cyan-800 hover:bg-cyan-50 transition"
                >
                  <span className="text-base">🧭</span> স্পেশাল গাইড (Guides)
                </a>'''

if desktop_target in hdr_norm and mobile_target in hdr_norm:
    hdr_norm = hdr_norm.replace(desktop_target, desktop_repl)
    hdr_norm = hdr_norm.replace(mobile_target, mobile_repl)
    with open('src/components/Header.tsx', 'w', encoding='utf-8') as f:
        f.write(hdr_norm)
    print("Header.tsx updated with Food & Dining link successfully!")
else:
    print("Header.tsx targets not found")

