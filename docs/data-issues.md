# Data Issues Report (`scripts/data-lint.js`)

Generated: 2026-11-27T11:57:34.140Z

## Computed Inventory Counts
- Places: **35**
- Organizations: **25**
- Health Facilities: **33**
- Doctors: **295**
- Notices: **54**
- Tenders: **67**
- Properties: **41** (Bank Auctions: **5**)

## Findings

| Severity | Code | Details |
|---|---|---|
| WARN | D4/D5 | Phone `9073085883` appears on multiple entities: place:pubali-clinic-baruipur (পূবালী ক্লিনিক, বারুইপুর), health:pubali-clinic-baruipur (পূবালী ক্লিনিক) |
| WARN | D4/D5 | Phone `03324338201` appears on multiple entities: place:baruipur-municipality (বারুইপুর পৌরসভা), place:baruipur-rto (বারুইপুর মহকুমা পরিবহন দপ্তর (ARTO Office)), place:baruipur-rabindra-bhawan (বারুইপুর রবীন্দ্র ভবন ও নিউ ইন্ডিয়ান গ্রাউন্ড) |
| WARN | D4/D5 | Phone `03324338260` appears on multiple entities: place:baruipur-swimming-pool (বারুইপুর সুইমিং পুল), place:baruipur-rashmath (বারুইপুর রাসমাঠ ও ঐতিহ্যবাহী রাসমেলা) |
| WARN | D4/D5 | Phone `03324335303` appears on multiple entities: place:baruipur-subdivisional-hospital (বারুইপুর মহকুমা হাসপাতাল), health:baruipur-subdivisional-hospital (বারুইপুর মহকুমা হাসপাতাল) |
| WARN | D4/D5 | Phone `03324338550` appears on multiple entities: place:baruipur-jail (বারুইপুর কেন্দ্রীয় সংশোধনাগার (বারুইপুর জেল / Baruipur Jail)), org:real-star-club-baruipur (রিয়েল স্টার ক্লাব) |
| WARN | D4/D5 | Phone `03324337250` appears on multiple entities: place:ashram-math-baruipur (আশ্রম মাঠ (শ্রী শ্রী রামকৃষ্ণ বিবেকানন্দ মন্দির)), org:baruipur-ramakrishna-sevashram-trust (বারুইপুর শ্রীরামকৃষ্ণ বিবেকানন্দ ভাবাদর্শ প্রচার সমিতি) |
| WARN | D4/D5 | Phone `03324338210` appears on multiple entities: place:baruipur-stadium-sports-complex (বারুইপুর মহকুমা স্টেডিয়াম ও ক্রীড়াঙ্গন), place:atghara-heritage-site (আটঘরা প্রাচীন প্রত্নতাত্ত্বিক ক্ষেত্র) |
| WARN | TENDER-EXPIRY | 25 tenders have closingDate in the past while status is 'active' (filtered out on homepage; labeled expired on /tenders). |
| INFO | VERIFIED-AT | Missing lastVerified counts — Places: 0/35, Health: 0/33, Orgs: 0/25 |