import json
import os

HEALTHCARE_FILE = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'healthcare_data.json')

with open(HEALTHCARE_FILE, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Check if already exists
existing_slugs = [x['slug'] for x in data]
if 'kabita-sebayatan-baruipur' in existing_slugs:
    print("Already exists! Updating entry...")
    data = [x for x in data if x['slug'] != 'kabita-sebayatan-baruipur']

kabita_facility = {
    "slug": "kabita-sebayatan-baruipur",
    "nameBn": "কবিতা সেবায়তন (Kabita Sebayatan - ডক্টরস চেম্বার ও ডায়াগনস্টিক)",
    "nameEn": "Kabita Sebayatan Doctors Chamber & Diagnostic Centre",
    "type": "polyclinic",
    "typeBn": "ডক্টরস চেম্বার, পলিক্লিনিক ও প্যাথলজি সেন্টার",
    "taglineBn": "বারুইপুর মহকুমা হাসপাতালের বিপরীতে অভিজ্ঞ ১৫ জন বিশেষজ্ঞ ডাক্তারের ওপিডি চেম্বার, আল্ট্রাসনোগ্রাফি ও ডিজিটাল প্যাথলজি",
    "overviewBn": "বারুইপুর ডি. ডি. অধিকারী রোড, নতুনপাড়ায় বারুইপুর মহকুমা হাসপাতালের ঠিক বিপরীতে (মঞ্জুশ্রী মেডিকেলের ভিতরে) অবস্থিত 'কবিতা সেবায়তন' (Kabita Sebayatan) এলাকার একটি সুপরিচিত ও নির্ভরযোগ্য পলিক্লিনিক ও ডায়াগনস্টিক হাব। এখানে কলকাতা ও বিভিন্ন শীর্ষস্থানীয় সরকারি মেডিক্যাল কলেজের ১৫ জন অভিজ্ঞ বিশেষজ্ঞ চিকিৎসক নিয়মিত বহির্বিভাগ (OPD) চেম্বার পরিচালনা করেন। এছাড়া এখানে ২০% বিশেষ ছাড়ে আল্ট্রাসনোগ্রাফি (USG), ডিজিটাল এক্স-রে, ২ডি ইকো ও ইসিজি এবং ৩০% বিশেষ ছাড়ে রক্ত, মল ও মূত্রের নির্ভুল বায়োকেমিক্যাল পরীক্ষা করা হয়।",
    "addressBn": "ডি. ডি. অধিকারী রোড, নতুনপাড়া (মঞ্জুশ্রী মেডিকেলের ভিতরে, বারুইপুর মহকুমা হাসপাতালের বিপরীতে), বারুইপুর, দক্ষিণ ২৪ পরগনা - ৭০০১৪৪",
    "addressEn": "D. D. Adhikari Road, Notunpara, Inside Manjushree Medical, Opposite Baruipur Hospital, Baruipur, South 24 Parganas - 700144",
    "landmarkBn": "বারুইপুর মহকুমা হাসপাতালের ঠিক বিপরীতে, নতুনপাড়া মঞ্জুশ্রী মেডিকেলের ভিতরে",
    "phone": "9062524649",
    "altPhone": "8927786790",
    "emergencyPhone": "9062524649",
    "whatsapp": "+919062524649",
    "googleMapUrl": "https://maps.google.com/?q=DD+Adhikari+Road+Notunpara+Baruipur",
    "openingHoursBn": "সোম থেকে রবি: সকাল ৮:০০ - রাত ৯:০০ (বিশেষজ্ঞ ডাক্তারদের সময়সূচি তালিকা অনুযায়ী)",
    "isOpen24Hours": False,
    "hasEmergency": False,
    "hasPharmacy": True,
    "hasDiagnostic": True,
    "hasAmbulance": False,
    "swasthyaSathiAccepted": False,
    "insuranceAccepted": False,
    "establishedYear": "নতুনপাড়া, বারুইপুর",
    "coverImage": "/images/health/kabita-sebayatan-board.jpg",
    "images": [
        "/images/health/kabita-sebayatan-board.jpg"
    ],
    "keyServicesBn": [
        "কলকাতা, পিজি (SSKM), বি.সি. রায় ও বারুইপুর হাসপাতালের অভিজ্ঞ ১৫ জন বিশেষজ্ঞ ডাক্তারের নিয়মিত ওপিডি চেম্বার",
        "৩০% বিশেষ ছাড়ে রক্ত, মল ও মূত্রের সম্পূর্ণ প্যাথলজিক্যাল ও বায়োকেমিক্যাল পরীক্ষা",
        "২০% বিশেষ ছাড়ে আল্ট্রাসনোগ্রাফি (USG), ডিজিটাল এক্স-রে, ২ডি ইকো (Echo) ও ইসিজি (ECG)",
        "ইন-হাউস মঞ্জুশ্রী মেডিকেল স্টোর থেকে প্রেসক্রিপশনের ওষুধ সংগ্রহের সুবিধা",
        "ফোনের মাধ্যমে সহজ সিরিয়াল বুকিং ও হোয়াটসঅ্যাপ হেল্পলাইন (9062524649 / 8927786790)"
    ],
    "diagnosticFacilitiesBn": [
        "আল্ট্রাসনোগ্রাফি (USG - 20% Discount)",
        "ডিজিটাল এক্স-রে (Digital X-Ray - 20% Discount)",
        "ইকোকার্ডিওগ্রাফি (2D Echo) ও ১২-লিড ইসিজি (ECG)",
        "রক্তের বায়োকেমিক্যাল, সিবিসি ও সুগার টেস্ট (30% Discount)",
        "মল ও মূত্র পরীক্ষা (Stool & Urine Routine Examination)"
    ],
    "doctorsCount": 15,
    "doctors": [
        {
            "id": "kabita-doc-1",
            "nameBn": "ডাঃ ঝিলিক বসু",
            "nameEn": "Dr. Jhilik Basu",
            "degrees": "M.B.B.S. (WBUHS), M.S. (Obst & Gynae), DNB (Obst & Gynae), MRCOG-1 (London)",
            "specialtyKey": "gynecology",
            "specialtyBn": "স্ত্রী রোগ ও প্রসূতি বিশেষজ্ঞ",
            "specialtyEn": "Gynaecologist & Obstetrician",
            "daysBn": "মঙ্গলবার ও শুক্রবার",
            "timingBn": "মঙ্গলবার ৩:০০ - ৪:০০, শুক্রবার ১:০০ - ২:০০",
            "visitingFeeBn": "₹ ৬০০",
            "appointmentPhone": "9062524649",
            "appointmentWhatsapp": "+919062524649",
            "notesBn": "হাই-রিস্ক প্রেগন্যান্সি, বন্ধ্যাত্ব ও নরমাল ডেলিভারি পরামর্শ"
        },
        {
            "id": "kabita-doc-2",
            "nameBn": "ডাঃ সিদ্ধার্থ মণ্ডল",
            "nameEn": "Dr. Siddhartha Mondal",
            "degrees": "MBBS, MS - Medical Officer (বারুইপুর ও এস.এস.কে.এম হাসপাতালের সাথে যুক্ত)",
            "specialtyKey": "general_surgery",
            "specialtyBn": "জেনারেল সার্জন ও মাইক্রো সার্জন",
            "specialtyEn": "General & Micro Surgeon",
            "experienceBn": "বারুইপুর মহকুমা হাসপাতাল ও এসএসকেএম (PG) হাসপাতালের চিকিৎসক",
            "daysBn": "প্রতিদিন (বাই অ্যাপয়েন্টমেন্ট)",
            "timingBn": "অগ্রিম ফোনে সময় নির্ধারিত",
            "visitingFeeBn": "₹ ৬০০",
            "appointmentPhone": "9062524649",
            "appointmentWhatsapp": "+919062524649",
            "notesBn": "পেটের যে কোন সমস্যা, হার্নিয়া, অ্যাপেন্ডিক্স ও মাইক্রো সার্জারি"
        },
        {
            "id": "kabita-doc-3",
            "nameBn": "ডাঃ রতন নস্কর",
            "nameEn": "Dr. Ratan Naskar",
            "degrees": "MBBS, MS - Medical Officer",
            "specialtyKey": "general_surgery",
            "specialtyBn": "জেনারেল ও ল্যাপারোস্কোপিক সার্জন",
            "specialtyEn": "General & Laparoscopic Surgeon",
            "daysBn": "প্রতিদিন (বাই অ্যাপয়েন্টমেন্ট)",
            "timingBn": "অগ্রিম অ্যাপয়েন্টমেন্ট অনুযায়ী",
            "visitingFeeBn": "₹ ৫০০",
            "appointmentPhone": "9062524649",
            "appointmentWhatsapp": "+919062524649",
            "notesBn": "সাধারণ সার্জারি ও পেটের সমস্যা চিকিৎসা"
        },
        {
            "id": "kabita-doc-4",
            "nameBn": "ডাঃ সাওন হালদার",
            "nameEn": "Dr. Saon Haldar",
            "degrees": "MBBS (Hons) WBUHS - Medical Officer",
            "specialtyKey": "general_physician",
            "specialtyBn": "জেনারেল ফিজিশিয়ান",
            "specialtyEn": "General Physician",
            "daysBn": "প্রতিদিন (বাই অ্যাপয়েন্টমেন্ট)",
            "timingBn": "সকাল ও সন্ধ্যা (ফোন করে আসুন)",
            "visitingFeeBn": "₹ ৪০০",
            "appointmentPhone": "9062524649",
            "appointmentWhatsapp": "+919062524649",
            "notesBn": "সাধারণ রোগ, জ্বর, পেটের গোলযোগ ও নিয়মিত চিকিৎসা"
        },
        {
            "id": "kabita-doc-5",
            "nameBn": "ডাঃ জি. এস মহাপাত্র",
            "nameEn": "Dr. G. S. Mahapatra",
            "degrees": "MBBS, MD (Medicine) - বারুইপুর ও এস.এস.কে.এম হাসপাতালের সাথে যুক্ত",
            "specialtyKey": "general_medicine",
            "specialtyBn": "মেডিসিন বিশেষজ্ঞ",
            "specialtyEn": "Consultant Physician & Medicine Specialist",
            "experienceBn": "বারুইপুর ও এসএসকেএম হাসপাতালের অভিজ্ঞ চিকিৎসক",
            "daysBn": "মঙ্গলবার, বুধবার, শুক্রবার ও শনিবার",
            "timingBn": "মঙ্গলবার সন্ধ্যা ৭:০০, বুধবার বিকাল ৫:০০ - ৭:০০, শুক্রবার দুপুর ৩:০০ - ৪:০০ এবং শুক্র ও শনিবার বিকাল ৫:০০ - সন্ধ্যা ৭:০০",
            "visitingFeeBn": "₹ ৬০০",
            "appointmentPhone": "9062524649",
            "appointmentWhatsapp": "+919062524649",
            "notesBn": "সুগার, কিডনি ও হার্টের চিকিৎসার বিশেষ অভিজ্ঞ"
        },
        {
            "id": "kabita-doc-6",
            "nameBn": "ডাঃ পুতুল চন্দ্র নস্কর",
            "nameEn": "Dr. Putul Chandra Naskar",
            "degrees": "MBBS, MD (Medicine)",
            "specialtyKey": "general_medicine",
            "specialtyBn": "মেডিসিন বিশেষজ্ঞ",
            "specialtyEn": "General Medicine Specialist",
            "daysBn": "প্রতিদিন (বাই অ্যাপয়েন্টমেন্ট)",
            "timingBn": "কল করে সময় জেনে নিন",
            "visitingFeeBn": "₹ ৫০০",
            "appointmentPhone": "9062524649",
            "appointmentWhatsapp": "+919062524649",
            "notesBn": "জটিল অভ্যন্তরীণ রোগ, ডায়াবেটিস ও রক্তচাপ নিয়ন্ত্রণ"
        },
        {
            "id": "kabita-doc-7",
            "nameBn": "ডাঃ অরজিৎ রায় চৌধুরী",
            "nameEn": "Dr. Arijit Roy Chowdhury",
            "degrees": "MBBS, MD (Medicine)",
            "specialtyKey": "general_medicine",
            "specialtyBn": "মেডিসিন বিশেষজ্ঞ",
            "specialtyEn": "General Medicine Specialist",
            "daysBn": "প্রতিদিন (বাই অ্যাপয়েন্টমেন্ট)",
            "timingBn": "অগ্রিম অ্যাপয়েন্টমেন্ট অনুযায়ী",
            "visitingFeeBn": "₹ ৫০০",
            "appointmentPhone": "9062524649",
            "appointmentWhatsapp": "+919062524649",
            "notesBn": "মেডিসিন ও দীর্ঘমেয়াদী রোগের বিশেষজ্ঞ পরামর্শ"
        },
        {
            "id": "kabita-doc-8",
            "nameBn": "ডাঃ বিক্রম মণ্ডল",
            "nameEn": "Dr. Bikram Mondal",
            "degrees": "MBBS (Kol), DCH (Kol), PGPN (Boston) - ডাঃ বি.সি.রায় ও এস.এস.কে.এম হাসপাতালের সাথে যুক্ত",
            "specialtyKey": "pediatrics",
            "specialtyBn": "শিশুরোগ বিশেষজ্ঞ (Pediatrician)",
            "specialtyEn": "Consultant Pediatrician & Neonatologist",
            "experienceBn": "ডাঃ বি. সি. রায় শিশু হাসপাতাল ও এসএসকেএম হাসপাতালের সাথে যুক্ত",
            "daysBn": "সোম থেকে রবিবার (সপ্তাহে ৭ দিন)",
            "timingBn": "সোমবার বিকাল ৫:০০ - ৬:০০; মঙ্গল, বুধ, বৃহস্পতি, শুক্র, শনি ও রবি বৈকাল ৫:০০ - ৬:০০",
            "visitingFeeBn": "₹ ৬০০",
            "appointmentPhone": "9062524649",
            "appointmentWhatsapp": "+919062524649",
            "notesBn": "নবজাতক ও শিশুদের রোগ, ওজন ও পুষ্টি পরামর্শ এবং টিকাকরণ"
        },
        {
            "id": "kabita-doc-9",
            "nameBn": "ডাঃ পার্থপ্রতিম সিংহ রায়",
            "nameEn": "Dr. Parthapratim Singha Roy",
            "degrees": "MBBS, MS, MCh (Urology) - ইউরেটেরিক এবং ল্যাপারোস্কোপিক সার্জন",
            "specialtyKey": "urology",
            "specialtyBn": "কিডনি ও প্রস্টেট বিশেষজ্ঞ (ইউরোলজিস্ট)",
            "specialtyEn": "Urologist, Ureteric & Laparoscopic Surgeon",
            "daysBn": "বুধবার",
            "timingBn": "বুধবার বিকাল ৪:০০ - ৫:০০",
            "visitingFeeBn": "₹ ৮০০",
            "appointmentPhone": "9062524649",
            "appointmentWhatsapp": "+919062524649",
            "notesBn": "ইউরেটেরিক স্টোন, প্রস্টেট সমস্যা ও মূত্রনালীর ল্যাপারোস্কোপিক সার্জারি"
        },
        {
            "id": "kabita-doc-10",
            "nameBn": "ডাঃ কুণাল মণ্ডল",
            "nameEn": "Dr. Kunal Mondal",
            "degrees": "MBBS, MS (Ortho) - পি.জি. (IPGMER) হাসপাতালের সাথে যুক্ত",
            "specialtyKey": "orthopedics",
            "specialtyBn": "অর্থোপেডিক সার্জন ও বিশিষ্ট হাড়ের চিকিৎসক",
            "specialtyEn": "Orthopedic Surgeon",
            "experienceBn": "বারুইপুরের বিশিষ্ট হাড়ের চিকিৎসক ও এসএসকেএম (PG) হাসপাতালের সার্জন",
            "daysBn": "সোম, মঙ্গল, বুধ ও শনিবার",
            "timingBn": "সোম ও বুধবার বিকাল ৫:০০ - ৬:০০, মঙ্গল ও শনিবার দুপুর ১২:০০ - ১:০০",
            "visitingFeeBn": "₹ ৭০০",
            "appointmentPhone": "9062524649",
            "appointmentWhatsapp": "+919062524649",
            "notesBn": "হাড়ভাঙা, বাতের ব্যথা, হাঁটু ও কোমর ব্যথা, স্পন্ডিলাইটিস ও ফ্র্যাকচার চিকিৎসা"
        },
        {
            "id": "kabita-doc-11",
            "nameBn": "ডাঃ অভিষেক নস্কর",
            "nameEn": "Dr. Abhishek Naskar",
            "degrees": "MBBS, MD, DM (Cardiology)",
            "specialtyKey": "cardiology",
            "specialtyBn": "হৃদরোগ বিশেষজ্ঞ (Cardiologist)",
            "specialtyEn": "Consultant Cardiologist",
            "daysBn": "বুধবার (অন্য দিনে ফোন করে আসুন)",
            "timingBn": "বুধবার সন্ধ্যা ৬:০০ - ৬:৩০",
            "visitingFeeBn": "₹ ৮০০",
            "appointmentPhone": "9062524649",
            "appointmentWhatsapp": "+919062524649",
            "notesBn": "হার্টের সমস্যা, বুকে ব্যথা, উচ্চ রক্তচাপ ও ইসিজি/ইকো মূল্যায়ন"
        },
        {
            "id": "kabita-doc-12",
            "nameBn": "ডাঃ অম্লান কান্তি বিশ্বাস",
            "nameEn": "Dr. Amlan Kanti Biswas",
            "degrees": "MBBS, MD, DM (Nephrology)",
            "specialtyKey": "nephrology",
            "specialtyBn": "কিডনি বিশেষজ্ঞ (Nephrologist)",
            "specialtyEn": "Consultant Nephrologist",
            "daysBn": "মঙ্গলবার",
            "timingBn": "মঙ্গলবার দুপুর ২:০০ - ৩:০০",
            "visitingFeeBn": "₹ ৮০০",
            "appointmentPhone": "9062524649",
            "appointmentWhatsapp": "+919062524649",
            "notesBn": "কিডনি রোগ, ইউরিন প্রোটিন লিক ও ক্রিয়েটিনিন বৃদ্ধি চিকিৎসা"
        },
        {
            "id": "kabita-doc-13",
            "nameBn": "ডাঃ শান্ত্বারী রায়",
            "nameEn": "Dr. Santwari Roy",
            "degrees": "MBBS (Cal), MD (Psychiatry, IPGMER, Kolkata)",
            "specialtyKey": "psychiatry",
            "specialtyBn": "নার্ভ ও সাইকো বিশেষজ্ঞ (Neuropsychiatrist)",
            "specialtyEn": "Associate Professor & Consultant Neuropsychiatrist",
            "experienceBn": "অ্যাসোসিয়েট প্রফেসর ও কনসালট্যান্ট নিউরোসাইকিয়াট্রিস্ট (IPGMER/PG Hospital)",
            "daysBn": "শনিবার",
            "timingBn": "শনিবার বিকাল ৩:০০ - ৪:০০",
            "visitingFeeBn": "₹ ৮০০",
            "appointmentPhone": "9062524649",
            "appointmentWhatsapp": "+919062524649",
            "notesBn": "মানসিক উদ্বেগ, ডিপ্রেশন, ঘুমের সমস্যা, নার্ভের দুর্বলতা ও কাউন্সেলিং"
        },
        {
            "id": "kabita-doc-14",
            "nameBn": "ডাঃ অয়ন ঘড়ুই",
            "nameEn": "Dr. Ayan Gharui",
            "degrees": "MBBS, MD, DM (Neurologist)",
            "specialtyKey": "neurology",
            "specialtyBn": "নিউরোলজি ও স্নায়ুরোগ বিশেষজ্ঞ",
            "specialtyEn": "Consultant Neurologist",
            "daysBn": "বুধবার",
            "timingBn": "বুধবার বৈকাল ৫:০০ - ৬:০০",
            "visitingFeeBn": "₹ ৮০০",
            "appointmentPhone": "9062524649",
            "appointmentWhatsapp": "+919062524649",
            "notesBn": "মাথাব্যথা, প্যারালাইসিস, ব্রেন স্ট্রোক ও স্নায়ুর সমস্যা"
        },
        {
            "id": "kabita-doc-15",
            "nameBn": "ডাঃ সাথী হালদার",
            "nameEn": "Dr. Sathi Haldar",
            "degrees": "MBBS, MS (ENT)",
            "specialtyKey": "ent",
            "specialtyBn": "নাক, কান ও গলা বিশেষজ্ঞ (ENT Surgeon)",
            "specialtyEn": "ENT Head & Neck Specialist",
            "daysBn": "প্রতিদিন (বাই অ্যাপয়েন্টমেন্ট)",
            "timingBn": "অগ্রিম ফোনে বুকিং অনুযায়ী",
            "visitingFeeBn": "₹ ৬০০",
            "appointmentPhone": "9062524649",
            "appointmentWhatsapp": "+919062524649",
            "notesBn": "কানের ব্যথা ও পুঁজ, টনসিল, সাইনাস, গলার সমস্যা ও মাইক্রো স্ক্রিনিং"
        }
    ]
}

# Insert Kabita Sebayatan right near other Baruipur polyclinics
data.insert(0, kabita_facility)

with open(HEALTHCARE_FILE, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Successfully added Kabita Sebayatan! Total facilities now: {len(data)}")
