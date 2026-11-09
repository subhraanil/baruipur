const fs = require('fs');
const path = require('path');

const ORGS_FILE = path.join(__dirname, '..', 'src', 'data', 'organizations_data.json');
const HEALTH_FILE = path.join(__dirname, '..', 'src', 'data', 'healthcare_data.json');

// 1. ADD CLUB: Subuddhipur Sarat Smriti Sangha
const orgs = JSON.parse(fs.readFileSync(ORGS_FILE, 'utf-8'));

const newClub = {
  slug: "subuddhipur-sarat-smriti-sangha",
  nameBn: "সুবুদ্ধিপুর শরৎ স্মৃতি সংঘ",
  nameEn: "Subuddhipur Sarat Smriti Sangha",
  taglineBn: "মাস্টারপাড়া সুবুদ্ধিপুরের ঐতিহ্যবাহী যোগব্যায়াম, সঙ্গীত, আবৃত্তি ও সমাজকল্যাণমূলক সাংস্কৃতিক ক্লাব",
  category: "club",
  categoryBn: "যোগব্যায়াম, ক্রীড়া ও সাংস্কৃতিক ক্লাব",
  registrationType: "পশ্চিমবঙ্গ যোগ এ্যাসোসিয়েশন অনুমোদিত ও সোসাইটি নথিভুক্ত",
  regNo: "WB/BRP/SSSS/1976",
  established: "১৯৭৬ সালে প্রতিষ্ঠিত (ভবন উদ্বোধন ১৬ই ডিসেম্বর ১৯৯৪)",
  yearEstablished: 1976,
  schemaType: "SportsClub",
  metaTitle: "সুবুদ্ধিপুর শরৎ স্মৃতি সংঘ বারুইপুর | যোগব্যায়াম, সঙ্গীত, আবৃত্তি ও অক্সিজেন সেবা",
  metaDescription: "সুবুদ্ধিপুর শরৎ স্মৃতি সংঘ (মাস্টারপাড়া, বারুইপুর): পশ্চিমবঙ্গ যোগ এ্যাসোসিয়েশন অনুমোদিত যোগব্যায়াম, আবৃত্তি, সঙ্গীত ও ব্যান্ড প্রশিক্ষণ এবং জরুরি অক্সিজেন সিলিন্ডার পরিষেবা।",
  keyPeople: [
    {
      name: "বাবলি মণ্ডল",
      roleBn: "সাধারণ সমন্বয়ক ও যোগাযোগ",
      roleEn: "General Coordinator",
      phone: "9143204510"
    },
    {
      name: "শ্রী শুভেন্দ মণ্ডল",
      roleBn: "যোগ ব্যায়াম ও শরীর চর্চা প্রশিক্ষক",
      roleEn: "Yoga & Physical Fitness Instructor",
      phone: "9475637919"
    },
    {
      name: "শ্রী সাগর চট্টোপাধ্যায়",
      roleBn: "আবৃত্তি প্রশিক্ষক",
      roleEn: "Recitation Instructor",
      phone: "9163921147"
    },
    {
      name: "শ্রীমতী দীপ্তি বসাক",
      roleBn: "সংগীত শিক্ষিকা",
      roleEn: "Music Teacher",
      phone: "7409824027"
    },
    {
      name: "শ্রী শান্তি রঞ্জন মুখার্জী",
      roleBn: "নাটক প্রশিক্ষক",
      roleEn: "Drama & Theatre Instructor",
      phone: "7439237901"
    },
    {
      name: "শ্রী তূষিত মণ্ডল",
      roleBn: "ব্যান্ড, বাঁশি ও প্যারেড প্রশিক্ষক",
      roleEn: "Band & Parade Instructor",
      phone: "8981813738"
    },
    {
      name: "শ্রী হরিদাস দে",
      roleBn: "জরুরি অক্সিজেন সিলিন্ডার সরবরাহ ইনচার্জ",
      roleEn: "Oxygen Cylinder In-charge",
      phone: "9058003967"
    },
    {
      name: "শ্রী বিশ্বরঞ্জন মায়া",
      roleBn: "গ্রন্থাগারিক",
      roleEn: "Librarian",
      phone: "9833620106"
    }
  ],
  overview: "সুবুদ্ধিপুর শরৎ স্মৃতি সংঘ দক্ষিণ ২৪ পরগনার বারুইপুর মহকুমার সুবুদ্ধিপুর মাস্টারপাড়ায় অবস্থিত একটি সুপ্রাচীন ও ঐতিহ্যবাহী সামাজিক, সাংস্কৃতিক, শরীরচর্চা ও সমাজকল্যাণমূলক প্রতিষ্ঠান। 'সবারে করি আহ্বান' এবং 'যোগ যুক্ত, রোগে মুক্ত' এই মহৎ আদর্শকে সামনে রেখে সংঘটি দীর্ঘ কয়েক দশক ধরে শিশু ও কিশোরদের শারীরিক ও মানসিক বিকাশে নিরলস ভূমিকা পালন করে আসছে। পশ্চিমবঙ্গ যোগ এ্যাসোসিয়েশন (West Bengal Yoga Association)-এর অনুমোদিত কেন্দ্র হিসেবে এখানে অভিজ্ঞ প্রশিক্ষকদের তত্ত্বাবধানে নিয়মিত যোগ ব্যায়াম, শরীর চর্চা, সঙ্গীত, আবৃত্তি, নাটক এবং ড্রামস ও বাঁশির ব্যান্ড প্যারেড প্রশিক্ষণ প্রদান করা হয়। পাশাপাশি ক্লাবের পক্ষ থেকে সাধারণ মানুষের জন্য সমৃদ্ধ পাবলিক লাইব্রেরি এবং জরুরি স্বাস্থ্য সেবায় ২৪ ঘণ্টা অক্সিজেন সিলিন্ডার সরবরাহ করা হয়।",
  history: "১৯৭৬ সালে সুবুদ্ধিপুর মাস্টারপাড়ার সংস্কৃতিপ্রেমী ও সমাজসেবী তরুণদের সম্মিলিত উদ্যোগে কথাসাহিত্যিক শরৎচন্দ্র চট্টোপাধ্যায়ের স্মৃতির উদ্দেশ্যে শরৎ স্মৃতি সংঘের শুভ সূচনা হয়। পরবর্তীতে এলাকার মানুষের অকুণ্ঠ ভালোবাসা ও সহযোগিতায় ১৬ই ডিসেম্বর ১৯৯৪ সালে সংঘের নিজস্ব পাকা ভবনের শুভ উদ্বোধন ঘটে। কোভিড অতিমারী ও প্রাকৃতিক দুর্যোগের সময় এই ক্লাবের সদস্যদের নিরবচ্ছিন্ন অক্সিজেন সরবরাহ এবং ওষুধ-খাদ্য বিতরণ মহকুমাজুড়ে অনন্য দৃষ্টান্ত স্থাপন করেছিল।",
  keyActivities: [
    "পশ্চিমবঙ্গ যোগ এ্যাসোসিয়েশন অনুমোদিত নিয়মিত যোগব্যায়াম, আসন ও ফিটনেস প্রশিক্ষণ",
    "শিশু ও কিশোরদের সুপ্ত প্রতিভার বিকাশে আবৃত্তি, নাটক ও শাস্ত্রীয় সংগীত শিক্ষাদান",
    "ঐতিহ্যবাহী ব্যান্ড, বাঁশি ও প্যারেড প্রশিক্ষণ কর্মসূচি",
    "এলাকার পাঠকদের জন্য দৈনিক সংবাদপত্র ও সমৃদ্ধ গ্রন্থাগার পরিচালনা",
    "জরুরি চিকিৎসায় রোগীদের জন্য সার্বক্ষণিক অক্সিজেন সিলিন্ডার সরবরাহ সেবা",
    "বার্ষিক ক্রীড়া প্রতিযোগিতা, রক্তদান শিবির ও দুঃস্থদের সহায়তা প্রদান"
  ],
  servicesOffered: [
    "নিয়মিত যোগব্যায়াম ও শরীরচর্চা ক্লাস ('যোগ যুক্ত, রোগে মুক্ত')",
    "জরুরি অক্সিজেন সিলিন্ডার পরিষেবা (যোগাযোগ: ৯০৫৮০০৩৯৬৭)",
    "পাবলিক রিডিং রুম ও লাইব্রেরি সেবা (যোগাযোগ: ৯৮৩৩৬২০১০৬)",
    "সাংস্কৃতিক ও দেশাত্মবোধক ব্যান্ড ড্রামস প্রশিক্ষণ"
  ],
  address: "মাস্টারপাড়া, সুবুদ্ধিপুর, বারুইপুর, কোলকাতা, দক্ষিণ ২৪ পরগনা, পশ্চিমবঙ্গ - ৭০০১৪৪",
  landmark: "সুবুদ্ধিপুর মাস্টারপাড়া মোড় ও বারুইপুর স্টেশন ১ নম্বর প্ল্যাটফর্মের সংযোগস্থল",
  wardNo: 15,
  pincode: "700144",
  coordinates: {
    lat: 22.3621,
    lng: 88.4287
  },
  contact: {
    phone: "9130271685",
    helpline: "9143204510",
    whatsapp: "+919143204510"
  },
  timings: "প্রতিদিন সকাল ৭:০০ - ১০:০০ এবং বিকাল ৫:০০ - রাত ৯:০০",
  howToReach: "বারুইপুর রেলওয়ে স্টেশন (১ নম্বর প্ল্যাটফর্ম দিক) থেকে টোটো বা রিকশায় সুবুদ্ধিপুর মাস্টারপাড়া শরৎ স্মৃতি সংঘে পৌঁছাতে মাত্র ৩ থেকে ৫ মিনিট সময় লাগে।",
  coverImage: "/images/organizations/subuddhipur-sarat-smriti-sangha.jpg",
  images: [
    {
      url: "/images/organizations/subuddhipur-sarat-smriti-sangha.jpg",
      captionBn: "সুবুদ্ধিপুর শরৎ স্মৃতি সংঘের ভবন ও প্রশিক্ষণ নির্দেশিকা বোর্ড",
      captionEn: "Subuddhipur Sarat Smriti Sangha building and activity board"
    }
  ],
  faqs: [
    {
      question: "সুবুদ্ধিপুর শরৎ স্মৃতি সংঘে কোন কোন বিষয়ে প্রশিক্ষণ দেওয়া হয়?",
      answer: "পশ্চিমবঙ্গ যোগ এ্যাসোসিয়েশনের আওতায় নিয়মিত যোগব্যায়াম ও শরীরচর্চা ছাড়াও আবৃত্তি, শাস্ত্রীয় ও আধুনিক সঙ্গীত, নাটক এবং ড্রামস/বাঁশির ব্যান্ড প্যারেড প্রশিক্ষণ দেওয়া হয়।"
    },
    {
      question: "জরুরি অক্সিজেন সিলিন্ডার সহায়তার জন্য কীভাবে যোগাযোগ করবেন?",
      answer: "জরুরি অক্সিজেন সিলিন্ডার পরিষেবার জন্য শ্রী হরিদাস দে (৯০৫৮০০৩৯৬৭) অথবা বাবলি মণ্ডল (৯১৪৩২০৪৫১০)-এর সাথে সরাসরি যোগাযোগ করা যাবে।"
    },
    {
      question: "সংঘের ঠিকানা ও পৌঁছানোর উপায় কী?",
      answer: "মাস্টারপাড়া, সুবুদ্ধিপুর, বারুইপুর, কোলকাতা-৭০০১৪৪। বারুইপুর রেলওয়ে স্টেশন (১ নম্বর প্ল্যাটফর্ম) থেকে টোটো বা রিকশায় মাত্র ৩-৫ মিনিটের দূরত্বে অবস্থিত।"
    }
  ]
};

const existingOrgIndex = orgs.findIndex(o => o.slug === newClub.slug);
if (existingOrgIndex >= 0) {
  orgs[existingOrgIndex] = newClub;
  console.log(`Updated existing organization: ${newClub.slug}`);
} else {
  orgs.push(newClub);
  console.log(`Added new organization: ${newClub.slug}`);
}
fs.writeFileSync(ORGS_FILE, JSON.stringify(orgs, null, 2), 'utf-8');

// 2. ADD CLINIC: Dental Clinic (Dr. Tapan Sarkar & Dr. Partha Sarathi Saha)
const healthFacilities = JSON.parse(fs.readFileSync(HEALTH_FILE, 'utf-8'));

const newDentalClinic = {
  slug: "dental-clinic-dr-tapan-sarkar-dr-partha-sarathi-saha-baruipur",
  nameBn: "ডেন্টাল ক্লিনিক (ডাঃ তপন সরকার ও ডাঃ পার্থ সারথী সাহা)",
  nameEn: "Dental Clinic - Dr. Tapan Sarkar & Dr. Partha Sarathi Saha",
  metaTitle: "বারুইপুর ডেন্টাল ক্লিনিক | ডাঃ তপন সরকার ও ডাঃ পার্থ সারথী সাহা (দাঁতের ডাক্তার ও ইমপ্লান্ট)",
  metaDescription: "বারুইপুর ডেন্টাল ক্লিনিক: ডাঃ তপন সরকার (BDS Cal) ও ডাঃ পার্থ সারথী সাহা (BDS, MDS Oral Implantologist)। রুট ক্যানাল, ডেন্টাল ইমপ্লান্ট ও আধুনিক দাঁতের চিকিৎসা।",
  type: "polyclinic",
  typeBn: "স্পেশালাইজড ডেন্টাল ক্লিনিক ও ওরাল ইমপ্লান্টোলজি সেন্টার",
  taglineBn: "বারুইপুরে অভিজ্ঞ ডেন্টাল সার্জন ও ওরাল ইমপ্লান্টোলজিস্টের আধুনিক দাঁতের চিকিৎসাকেন্দ্র",
  overviewBn: "বারুইপুর সুবুদ্ধিপুর ও স্টেশন রোড সংলগ্ন এলাকায় অবস্থিত 'ডেন্টাল ক্লিনিক' (Dental Clinic) দক্ষিণ ২৪ পরগনার এক সুপরিচিত ও নির্ভরযোগ্য আধুনিক দাঁতের চিকিৎসাকেন্দ্র। এখানে চিকিৎসা প্রদান করেন কলকাতা বিশ্ববিদ্যালয় উত্তীর্ণ প্রবীণ ও অভিজ্ঞ ডেন্টাল সার্জন ডাঃ তপন সরকার (B.D.S. CAL) এবং বিশেষজ্ঞ ওরাল ইমপ্লান্টোলজিস্ট ডাঃ পার্থ সারথী সাহা (BDS, MDS)।\n\nক্লিনিকটিতে আধুনিক অটোক্লেভ স্টেরিলাইজেশন প্রযুক্তি, ডিজিটাল ইন্ট্রা-ওরাল এক্স-রে (IOPA), পেইনলেস সিঙ্গেল-সিটিং রুট ক্যানাল ট্রিটমেন্ট (RCT), টাইটানিয়াম ওরাল ইমপ্লান্ট, আঁকাবাঁকা দাঁতের কারেকশন, জেরকোনিয়া ও সেরামিক ক্যাপ-ব্রিজ, আল্ট্রাসনিক স্কেলিং ও মাড়ির চিকিৎসার সমস্ত সুবিধা রয়েছে। অগ্রিম বুকিং ও যোগাযোগের নম্বর: ৮৬৭০৮৩৩৭০৭ (8670833707)।",
  addressBn: "সুবুদ্ধিপুর ও স্টেশন রোড মোড় সংলগ্ন, বারুইপুর, দক্ষিণ ২৪ পরগনা, কোলকাতা - ৭০০১৪৪",
  addressEn: "Near Subuddhipur & Station Road Crossing, Baruipur, Kolkata - 700144",
  landmarkBn: "বারুইপুর স্টেশন ১ নম্বর প্ল্যাটফর্ম ও সুবুদ্ধিপুর মোড়ের সন্নিকটে",
  phone: "8670833707",
  altPhone: "8670833707",
  emergencyPhone: "8670833707",
  whatsapp: "+918670833707",
  googleMapUrl: "https://maps.google.com/?q=Dental+Clinic+Baruipur",
  openingHoursBn: "সোম থেকে রবি (বৃহস্পতিবার বাদে): সকাল ৯:০০ - দুপুর ১২:০০ এবং সন্ধ্যা ৫:০০ - রাত ৮:০০",
  isOpen24Hours: false,
  hasEmergency: false,
  hasPharmacy: true,
  hasDiagnostic: true,
  hasAmbulance: false,
  swasthyaSathiAccepted: false,
  insuranceAccepted: false,
  establishedYear: "বারুইপুর, কোলকাতা - ৭০০১৪৪",
  coverImage: "/images/health/dental-clinic-dr-tapan-sarkar-partha-sarathi-saha.jpg",
  images: [
    "/images/health/dental-clinic-dr-tapan-sarkar-partha-sarathi-saha.jpg"
  ],
  keyServicesBn: [
    "সিঙ্গেল-সিটিং রুট ক্যানাল ট্রিটমেন্ট (Rotary Painless RCT) ও স্থায়ী ফিলিং",
    "টাইটানিয়াম ডেন্টাল ইমপ্লান্ট (Advanced Oral Implantology & Teeth Replacement)",
    "আল্ট্রাসনিক স্কেলিং ও মাড়ির রক্তপাত/পায়োরিয়ার বিশেষজ্ঞ চিকিৎসা (Gum Care)",
    "কসমেটিক স্মাইল ডিজাইনিং, জেরকোনিয়া ক্রাউন ও মেটাল-ফ্রি ডেন্টাল ব্রিজিং",
    "ব্যথাহীন দাঁত তোলা ও জটিল উইজডম টুথ সার্জারি (Impacted Tooth Extraction)",
    "বাচ্চাদের দাঁতের যত্ন ও ক্যাভিটি প্রটেকশন (Pediatric Dental Care)"
  ],
  diagnosticFacilitiesBn: [
    "ডিজিটাল ইন্ট্রা-ওরাল এক্স-রে (Digital IOPA X-Ray)",
    "আল্ট্রাসনিক স্কেলার ও লেটেস্ট রোটো-এন্ডোডন্টিক মেশিনারি",
    "হাসপাতাল গ্রেড ক্লাস-বি ভ্যাকুয়াম অটোক্লেভ ও স্টেরিলাইজেশন রুম"
  ],
  doctorsCount: 2,
  doctors: [
    {
      id: "brp-dental-doc-1",
      nameBn: "ডাঃ তপন সরকার",
      nameEn: "Dr. Tapan Sarkar",
      degrees: "B.D.S. (CAL)",
      specialtyKey: "dental",
      specialtyBn: "সিনিয়র ডেন্টাল সার্জন ও দন্তরোগ বিশেষজ্ঞ",
      specialtyEn: "Senior Dental Surgeon & General Dentist",
      experienceBn: "কলকাতা বিশ্ববিদ্যালয় (CAL) উত্তীর্ণ অভিজ্ঞ প্রবীণ ডেন্টাল সার্জন",
      daysBn: "প্রতিদিন সন্ধ্যা এবং শনি, রবি ও বুধবার সকালে (বৃহস্পতিবার বন্ধ)",
      timingBn: "প্রতিদিন সন্ধ্যা ৫:০০ - রাত ৮:০০ | শনি, রবি ও বুধ সকাল ৯:৩০ - ১১:৩০",
      visitingFeeBn: "বাই অ্যাপয়েন্টমেন্ট",
      roomNo: "চেম্বার ১",
      appointmentPhone: "8670833707",
      appointmentWhatsapp: "+918670833707",
      notesBn: "বৃহস্পতিবার চেম্বার বন্ধ থাকে"
    },
    {
      id: "brp-dental-doc-2",
      nameBn: "ডাঃ পার্থ সারথী সাহা",
      nameEn: "Dr. Partha Sarathi Saha",
      degrees: "BDS, MDS",
      specialtyKey: "oral_implantology",
      specialtyBn: "ওরাল ইমপ্লান্টোলজিস্ট ও ম্যাক্সিলোফ্যাসিয়াল ডেন্টাল বিশেষজ্ঞ",
      specialtyEn: "Oral Implantologist & Dental Specialist",
      experienceBn: "BDS, MDS ডিগ্রিসম্পন্ন বিশেষজ্ঞ ডেন্টাল ইমপ্লান্ট সার্জন",
      daysBn: "সোম, মঙ্গল, বুধ ও শুক্রবার",
      timingBn: "সকাল ৯:০০ টা - দুপুর ১২:০০ টা",
      visitingFeeBn: "বাই অ্যাপয়েন্টমেন্ট",
      roomNo: "চেম্বার ২",
      appointmentPhone: "8670833707",
      appointmentWhatsapp: "+918670833707",
      notesBn: "ওরাল ইমপ্লান্ট ও অ্যাডভান্সড ডেন্টাল প্রসিডিউরের জন্য স্পেশাল স্লট"
    }
  ]
};

const existingHealthIndex = healthFacilities.findIndex(h => h.slug === newDentalClinic.slug);
if (existingHealthIndex >= 0) {
  healthFacilities[existingHealthIndex] = newDentalClinic;
  console.log(`Updated existing healthcare facility: ${newDentalClinic.slug}`);
} else {
  healthFacilities.push(newDentalClinic);
  console.log(`Added new healthcare facility: ${newDentalClinic.slug}`);
}
fs.writeFileSync(HEALTH_FILE, JSON.stringify(healthFacilities, null, 2), 'utf-8');

console.log('✓ Successfully saved both entries with proper objects and faqs!');
