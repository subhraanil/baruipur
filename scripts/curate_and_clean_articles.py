import json
import os
import re

file_path = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'news_data.json')

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

articles = data['articles']
print(f"Total articles in DB: {len(articles)}")

# Specific keywords or patterns of non-news social chatter, check-ins, promos, greetings
JUNK_TITLE_PATTERNS = [
    r'চলো নতুন বন্ধু বানানো হোক',
    r'তোমাদের পুজোর সুন্দর মুহূর্ত',
    r'Education field এ আছেন তারা কমেন্ট করুন',
    r'Only Teachers',
    r'কিউট গণেশ ঠাকুর',
    r'BIG ACHIEVEMENT',
    r'PADMAPUKUR BYPASS, BARUIPUR',
    r'Baruipur Fultala More',
    r'Jodhpur Park, Kolkata',
    r'Ballygunge Cultural',
    r'Tridhara Sammilani',
    r'Santosh Mitra Square',
    r'Barisha Sarbojanin',
    r'আজ ৮ অক্টোবর হওয়ায়',
    r'রাত পোহালেই মহালয়া',
    r'গভীর শোক ও শ্রদ্ধাঞ্জলি',
    r'বাড়ি সাজাবেন, কিন্তু খরচ নিয়ে',
    r'আমার শহর বারুইপুর is in',
    r'বিহারের ভয়াবহ বন্যার ছবি',
    r'জয় বাবা বিশ্বকর্মার',
    r'আজ রান্না পূজা, আগামীকাল পান্না',
    r'সবার দুর্গাপূজার শপিং হয়েছে তো',
    r'কর্তব্যের সীমানা পেরিয়ে',
    r'গণপতি বাপ্পা আসছে',
    r'TVS IQUBE মিলিয়নার',
    r'আর হবে না দুর্গাপুজোর কার্নিভাল',
    r'পুজো তো অনেকেই করেন',
    r'ঢাকের কাঠি পড়তে আর মাত্র',
    r'ঘুরে আসতে পারো এই সুন্দর রাস্তা',
    r'হিমালয়ের কোলে শান্তিতে',
    r'সত্যের কণ্ঠ রুদ্ধ',
    r'পথে এবার নামো সাথী',
    r'জয়া কিশোরীজির লাইভ ভজন',
    r'ইডেন গার্ডেন্সে.*ড্রোন',
    r'প্রিন্সেপ ঘাট ও কুমোরটুলি',
    r'চোর বাগানের দুর্ঘটনা নিয়ে কি জানালেন',
    r'হাতিবাগান-শ্যামবাজার অঞ্চলের',
    r'১ নং ওয়ার্ড সাধারণ দুর্গোৎসব',
    r'বৈষ্ণবঘাটা পাটুলি উপনগরী',
    r'বাঘাযতীন বাজারে আগুন',
    r'দিল্লিতে তৃণমূলের প্রতিবাদ',
    r'হিমন্ত বিশ্বশর্মার',
    r'LIVE \| মহা দশমীতে সিঁদুরে রাঙা',
    r'Live বারুইপুর ফুলতলা',
    r'Live দক্ষিণ ২৪ পরগনার বারুইপুর বিধান',
    r'Live বারইপুর কাচারি বাজারে ব্যবসায়ী',
    r'LIVE UPDATE \| বারুইপুর রবীন্দ্র ভবন',
    r'বারুইপুর থানায় বিশ্বকর্মা পূজার পবিত্র মন্ত্রপাঠ.*LIVE',
    r'সপ্তপল্লী সার্বজনীন দুর্গোৎসব কমিটির ৫২ তম বর্ষের ভাবনা',
    r'বিশেষভাবে সক্ষম.*স্বামীকে নিয়ে'
]

combined_junk = re.compile('|'.join(JUNK_TITLE_PATTERNS), re.I)

archived_list = []
retained_list = []

for a in articles:
    if a.get('isGuide'):
        retained_list.append(a)
        continue

    title = a.get('title', '').strip()
    
    # Check if matching junk pattern
    if combined_junk.search(title):
        a['status'] = 'archived'
        archived_list.append((a['id'], title))
    else:
        # Check if title is mostly English location or incomplete
        if title.startswith('Live ') or title.startswith('LIVE '):
            cleaned_title = re.sub(r'^LIVE\s*(?:UPDATE)?\s*[:|–—\-]?\s*', '', title, flags=re.I).strip()
            if len(cleaned_title) > 15:
                a['title'] = cleaned_title
                retained_list.append(a)
            else:
                a['status'] = 'archived'
                archived_list.append((a['id'], title))
        elif len(title) < 15 and not a.get('isGuide'):
            a['status'] = 'archived'
            archived_list.append((a['id'], title))
        else:
            # Clean emojis and leading symbols from title
            cleaned = re.sub(r'^[#*:|–—\-🙏🌺✨🌸🛍️🔥😍🕉️🛵⚡🇮🇳🔴\s]+', '', a['title']).strip()
            cleaned = re.sub(r'[#*:|–—\-🙏🌺✨🌸🛍️🔥😍🕉️🛵⚡🇮🇳🔴\s]+$', '', cleaned).strip()
            if cleaned:
                a['title'] = cleaned
            retained_list.append(a)

print(f"Total retained curated articles: {len(retained_list)}")
print(f"Total archived junk / social chatter / promos: {len(archived_list)}")

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Saved updated news_data.json.")
