const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'data', 'news_data.json');
const newsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// 1. Filter out any stray spam/reels like Bakkhali Main Beach if present
newsData.articles = newsData.articles.filter(a => 
  a.id !== 'art-1790761961566-ilcp' && 
  a.slug !== 'bakkhali-main-beach-part-2' &&
  a.id !== 'art-1790707494722-nzr1' &&
  !a.slug.includes('eta-kon-beach')
);

// 2. Locate school guide article
const article = newsData.articles.find(a => a.id === 'art-guide-top-schools');

if (!article) {
  console.error('Error: art-guide-top-schools not found');
  process.exit(1);
}

article.title = 'Schools in Baruipur: Complete Guide to English & Bengali Medium Schools (CBSE, ICSE/ISC, WBBSE/WBCHSE)';
article.summary = 'A comprehensive, verified guide to the top schools in and around Baruipur. Explore private and government institutions across CBSE, CISCE (ICSE/ISC), and West Bengal State Board (WBBSE/WBCHSE) categorized strictly by English and Bengali mediums, with complete contact info, class spans, addresses, and admission tips.';

const content = `# Schools in Baruipur: Complete Guide to English & Bengali Medium Schools (CBSE, ICSE/ISC, WBBSE/WBCHSE)

Baruipur stands as the undisputed educational capital of the South 24 Parganas district. Blending a 168-year-old academic tradition with contemporary educational infrastructure, the region offers two distinct school ecosystems:

1. **Centuries-Old Government & Government-Sponsored Schools:** Steeped in history and affiliated with the West Bengal Board of Secondary Education (**WBBSE**) and West Bengal Council of Higher Secondary Education (**WBCHSE**), these institutions teach primarily in **Bengali medium**, maintaining rigorous academic standards, vast campus grounds, and exceptionally affordable education.
2. **Modern Private English Medium Institutions:** Spurred by rapid urban connectivity, the EM Bypass extension, and the Baruipur–Kulpi road corridor, leading private educational trusts have built sprawling campuses affiliated with the Central Board of Secondary Education (**CBSE**) and the Council for the Indian School Certificate Examinations (**CISCE / ICSE-ISC**).

This guide is structured strictly the way parents navigate admissions: **First by Medium** (English Medium, then Bengali Medium), then by **Management Level** (Private, followed by Government), and finally categorized by **Affiliation Board**.

---

## School Comparison at a Glance

| School Name | Medium | Management | Board | Classes Offered | Area / Location | Contact / Website |
|---|---|---|---|---|---|---|
| **St. Montfort's Senior Secondary School** | English | Private | CBSE | Nursery – XII | Balarampur, Madarat | (033) 2433 0333 / montfortkolkata.in |
| **HP Ghosh Memorial School (HPGMS)** | English | Private | CBSE | Nursery – VIII (Expanding) | Khash Mallick, Gobindapur | +91 70444 47761 / hpgmemorial.org |
| **SGS International School** | English | Private | CBSE | Pre-Nursery – X | Ramnagar, Canning Road | +91 70038 85338 / sgsinternational.org |
| **Swarnim International School** | English | Private | CBSE | Pre-Nursery – XII | 180 NSC Bose Rd, Kodalia | +91 89101 15328 / swarniminternational.in |
| **The Summit School** | English | Private | CBSE | Play Group – XII | Kadamtola, Subhashgram | +91 98304 90812 / thesummitschool.in |
| **Vivekananda Mission School (VMS Baruipur)** | English | Private | CBSE / National | Nursery – Secondary | Khasmallick, Baruipur | +91 82405 20804 / vms.edu.in |
| **Holy Cross School** | English | Private | CISCE (ICSE/ISC) | Nursery – XII | Khasmallick, Baruipur | (033) 2437 9530 / holycrossschoolbaruipur.com |
| **Welkin National School** | English | Private | CISCE (ICSE/ISC) | Nursery – XII | Rashmath, Maha Prabhu Tala | +91 89611 93500 / welkinnationalschool.com |
| **Lions Calcutta (Greater) Vidya Mandir** | English | Private | CISCE (ICSE/ISC) | Nursery – XII | Chowhati, Rajpur-Sonarpur | (033) 2477 9251 / lionsvidyamandir.org |
| **Baruipur High School (Boys)** | Bengali | Government-Sponsored | WBBSE / WBCHSE | Class V – XII | Puratan Bazar, Baruipur | (033) 2433 8243 / baruipurhighschool.com |
| **Baruipur Girls' High School** | Bengali | Government-Sponsored | WBBSE / WBCHSE | Class V – XII | Sadabrata Ghat, Ward 7 | (033) 2433 6165 |
| **Rashmoni Balika Vidyalaya (H.S.)** | Bengali | Government-Sponsored | WBBSE / WBCHSE | Class V – XII | Near Baruipur Station | Local Municipal Area |
| **Madarat Popular Academy** | Bengali | Government-Sponsored | WBBSE / WBCHSE | Class V – XII | Natunpara, Madarat | (033) 2433 8406 |

---

# Part 1: English Medium Schools

English medium education in Baruipur is anchored by established Christian missionary institutions, prominent Kolkata-based school networks, and philanthropic foundations.

## 1.1 Private English Medium Schools

### A. CBSE-Affiliated Private English Medium Schools

#### 1. St. Montfort's Senior Secondary School, Madarat
* **Affiliation & Board:** Central Board of Secondary Education (CBSE), New Delhi. Affiliation Number: **2430233** (Senior Secondary Level). School Code: **15729**.
* **Management & History:** Established in April 2011, the school is administered by the worldwide religious order of the **Brothers of St. Gabriel Education Society**, internationally renowned for premier educational standards and holistic character formation.
* **Classes & Streams:** Co-educational, offering classes from **Nursery up to Class XII**. For Higher Secondary (Classes XI–XII), the school provides three distinct streams:
  * **Science (PCM & PCB):** Physics, Chemistry, Mathematics, Biology, Computer Science / Informatics Practices.
  * **Commerce:** Accountancy, Business Studies, Economics, Applied Mathematics / Entrepreneurship.
  * **Humanities / Arts:** History, Political Science, Geography, Economics, Psychology.
* **Campus & Infrastructure:** Sprawled across a lush, noise-free **19,870 sq. meters (approx. 5 acres)** campus in the Madarat rural-suburban fringe. Includes 44+ well-ventilated smart classrooms, dedicated physics, chemistry, biology, mathematics, and computer laboratories, a spacious central library, multipurpose auditorium, and extensive outdoor sports fields for football, cricket, and basketball.
* **Transport & Security:** Operates GPS-tracked school buses covering Baruipur town, station area, Padmapukur, Subhashgram, and Canning Road. Comprehensive CCTV surveillance and security guards stationed across campus.
* **Address:** Village Balarampur, P.O. Madarat, P.S. Baruipur, South 24 Parganas, PIN: **743610**.
* **Contact Details:** Phone: (033) 2433 0333 / +91 84205 13033 | Email: \`stmontfortschoolkolkata@gmail.com\` | Official Website: [montfortkolkata.in](https://montfortkolkata.in)

---

#### 2. HP Ghosh Memorial School (HPGMS), Khasmallick
* **Affiliation & Board:** Follows the **CBSE Curriculum**, progressively advancing towards Senior Secondary affiliation.
* **Management & Background:** Managed under the aegis of the **Bandhan Education Programme (Bandhan-Konnagar)**, leveraging substantial social development expertise to provide value-based, experiential learning to children in South 24 Parganas.
* **Classes Offered:** Currently offers **Nursery up to Class VIII** (with one class being added every academic session towards Class X & XII).
* **Campus & Facilities:** Modern architectural complex located directly on the Baruipur–EM Bypass road link. Features air-conditioned interactive smart classrooms, composite science laboratories, high-speed computer labs, STEM discovery rooms, creative arts studio, specialized sick bay/infirmary with resident medical attendant, and hygienic dining zones.
* **Safety & Commute:** Comprehensive school transport fleet equipped with female attendants, speed governors, and GPS live-tracking.
* **Address:** Khash Mallick, P.O. Dakshin Gobindapur, Baruipur, South 24 Parganas, PIN: **700145** (Near Baruipur Bypass junction).
* **Contact Details:** Phone: +91 70444 47761 | Email: \`info.baruipur@hpgmemorial.org\` | Official Website: [hpgmemorial.org](https://hpgmemorial.org)

---

#### 3. SGS International School, Ramnagar
* **Affiliation & Board:** CBSE Affiliated (Affiliation Number: **2430380**, School Code: **16196**). Secondary school level.
* **Management:** Founded as a flagship initiative of the **Bengal Education Foundation**, focusing on world-class pedagogical methods for suburban learners.
* **Classes Offered:** **Pre-Nursery to Class X**.
* **Campus Highlights & Facilities:** 
  * Interactive digital touch-screen smart boards in every classroom.
  * In-house **swimming pool** with trained lifeguards and swimming coaches.
  * Well-equipped Physics, Chemistry, Biology, and Computer Science laboratories.
  * Outdoor sports ground, basketball court, and indoor games arena (table tennis, chess, carrom).
  * Robust CCTV coverage across academic blocks, corridors, and transport vehicles.
* **Address:** Baruipur–Canning Road, Near Ramnagar Bazar, South Ramnagar, South 24 Parganas, PIN: **743387**.
* **Contact Details:** Phone: +91 70038 85338 / +91 98305 88877 | Email: \`info@sgsinternational.org\` | Official Website: [sgsinternational.org](https://sgsinternational.org)

---

#### 4. Swarnim International School, Kodalia Belt
* **Affiliation & Board:** CBSE Affiliated. Affiliation Number: **2430378**, School Code: **16194**. Senior Secondary level.
* **Management & Accreditations:** Established in 2016, recipient of the prestigious **British Council International Dimension in Schools (IDS)** accreditation. Known for green schooling practices and experiential pedagogy.
* **Classes & Streams:** **Pre-Nursery (Toddlers) to Class XII**. Offers full Senior Secondary streams in:
  * **Science:** PCM / PCB with Computer Science, Physical Education, and Biotechnology.
  * **Commerce:** Accountancy, Business Studies, Economics, Mathematics.
  * **Humanities:** Political Science, Sociology, History, Psychology, Geography.
* **Campus & Infrastructure:** Beautiful eco-friendly campus covering **9,874 sq. meters**. Facilities include zero-radiation classroom concepts, high-tech robotics and STEM discovery laboratories, mathematics lab, performing arts theater, indoor sports complex, cricket practice pitches, and a dedicated library with international reading resources.
* **Commute Coverage:** Dedicated bus routes operating throughout Baruipur, Subhashgram, Kodalia, Rajpur, Sonarpur, Garia, and Narendrapur.
* **Address:** 180, N.S.C. Bose Road, Kodalia, Kolkata, PIN: **700146** (Just north of Subhashgram station).
* **Contact Details:** Admissions Desk: +91 89101 15328 / +91 98316 62627 | Email: \`info@siskol.edu.in\` | Official Website: [swarniminternational.in](https://swarniminternational.in)

---

#### 5. The Summit School, Subhashgram / Kodalia
* **Affiliation & Board:** CBSE Affiliated. Affiliation Number: **2430281**, School Code: **15694**. Co-educational, Senior Secondary Level.
* **Management:** Operated under the patronship of the **Swami Vivekananda Institute of Science & Technology (SVIST Trust)**, providing strong academic continuity from school into higher engineering and management education.
* **Classes & Senior Streams:** **Play Group to Class XII**. Senior secondary curriculum includes:
  * **Science Stream:** Physics, Chemistry, Mathematics, Biology, Informatics Practices.
  * **Commerce Stream:** Accountancy, Business Administration, Economics, Commercial Arts.
  * **Humanities Stream:** History, Political Science, Geography, Bengali, English.
* **Facilities:** Digitally enabled audio-visual classrooms, advanced computer centers, composite science laboratories, indoor activities arena, library with vast academic titles, and structured yoga and physical conditioning routines.
* **Address:** R. N. Bhattacharjee Road, Kodalia Kadamtola, Subhashgram, South 24 Parganas, PIN: **700146**.
* **Contact Details:** Phone: +91 98304 90812 / +91 98304 90813 | Email: \`info@thesummitschool.in\` | Official Website: [thesummitschool.in](https://thesummitschool.in)

---

#### 6. Vivekananda Mission School (VMS), Baruipur Campus
* **Background & Heritage:** Part of the illustrious **Vivekananda Mission School** network established in 1978, grounded in the man-making educational philosophy of Swami Vivekananda.
* **Baruipur Campus Overview:** Set up to cater to the growing demand for values-based English-medium education in the southern suburbs. Features an organized school routine (typically 8:30 AM to 1:30 PM), smart interactive learning modules, well-stocked library, and value education sessions.
* **Curriculum & Board Status:** While the parent flagship institution in Joka follows the CISCE (ICSE/ISC) board, the Baruipur campus curriculum is aligned with national CBSE frameworks. *Parent Note: As affiliation processing numbers are updated periodically on national school registers, parents are advised to verify the exact board affiliation code with the admissions office.*
* **Campus & Amenities:** Modern multi-storey building, secure closed-circuit cameras across all wings, dedicated infirmary, and GPS-tracked bus transit network linking Baruipur town and adjoining rural panchayat hubs.
* **Address:** Khasmallick, Near Parimal Kunja, P.O. Dakshin Gobindapur / Baruipur, Kolkata, PIN: **700145**.
* **Contact Details:** Phone: +91 82405 20804 / (033) 2423 0804 | Email: \`info-baruipur@vms.edu.in\` | Official Portal: [vms.edu.in](https://vms.edu.in)

---

### B. CISCE (ICSE / ISC)-Affiliated Private English Medium Schools

#### 7. Holy Cross School, Khasmallick
* **Affiliation & Board:** Affiliated with the **Council for the Indian School Certificate Examinations (CISCE)**, New Delhi. School Code: **WB 207**.
* **Management & Legacy:** Established in **1994**, Holy Cross School is a premier Christian Minority Co-educational institution administered by the **Sisters of the Cross of Chavanod**. It has earned a stellar regional reputation for impeccable English communication, strict discipline, and outstanding board examination results.
* **Classes & Senior Academic Streams:** **Nursery to Class XII (ISC)**.
  * **Science Stream:** English, Physics, Chemistry, Mathematics / Biology / Computer Science.
  * **Commerce Stream:** English, Commerce, Accounts, Economics, Business Studies / Maths.
  * **Arts / Humanities Stream:** English, History, Political Science, Geography, Sociology, Bengali / Hindi.
* **Campus & Learning Infrastructure:** A spacious, leafy campus located in Khasmallick featuring large play areas, specialized laboratories for Physics, Chemistry, Biology, and Computer Science, an exhaustive library, prayer room, and indoor games facilities.
* **Address:** Khasmallick, P.O. Gobindapur, Baruipur, South 24 Parganas, Kolkata, PIN: **700145**.
* **Contact Details:** Phone: (033) 2437 9530 / (033) 2437 0782 | Email: \`holycrossk@gmail.com\` | Official Website: [holycrossschoolbaruipur.com](https://holycrossschoolbaruipur.com)

---

#### 8. Welkin National School, Rashmath
* **Affiliation & Board:** Affiliated with the **Council for the Indian School Certificate Examinations (CISCE)**, New Delhi. School Code: **WB 304**.
* **Management & History:** Founded in **2004**, Welkin National School was established to offer high-quality ICSE/ISC English education right inside the municipal heart of Baruipur.
* **Classes & Streams:** **Nursery to Class XII**. Complete Higher Secondary streams in Science (PCM/PCB), Commerce, and Arts.
* **Location Advantage & Facilities:** Situated right near the historic **Rashmath** and Maha Prabhu Tala, within walking distance from Baruipur Railway Junction and auto stands. Equipped with digital smart classrooms, state-of-the-art computer and science labs, performing arts auditorium, music and dance rooms, CCTV security, and dedicated transport vans.
* **Address:** Baruipur–Canning Road, Near Rashmath, Maha Prabhu Tala, Baruipur, South 24 Parganas, PIN: **700144**.
* **Contact Details:** Phone: +91 89611 93500 / +91 89102 55149 / (033) 2433 3231 | Email: \`welkin304@yahoo.com\` | Official Website: [welkinnationalschool.com](http://welkinnationalschool.com)

---

#### 9. Lions Calcutta (Greater) Vidya Mandir, Chowhati
* **Affiliation & Board:** Affiliated with **CISCE (ICSE / ISC)**, New Delhi. School Code: **WB 260**.
* **Management & History:** Established in **2002** by the **Lions Calcutta Greater Educational Trust**, the institution has grown into a landmark campus educating over 2,900 students.
* **Classes & Streams:** **Nursery to Class XII**. Comprehensive subject offerings in Science, Commerce, and Humanities.
* **Specialized Infrastructure:** Eco-conscious green campus equipped with rooftop solar power systems, smart interactive boards in all class sections, high-end laboratories for physics, chemistry, biology, mathematics, geography, and home science, a massive central library, and fleet of GPS-tracked school buses covering the entire Chowhati–Rajpur–Baruipur corridor.
* **Address:** Vidyasagar Block, Chowhati, Battola Bazar, Rajpur–Sonarpur, Kolkata, PIN: **700149** (Connecting easily to Baruipur via EM Bypass link).
* **Contact Details:** Phone: (033) 2477 9251 / 2477 9252 / +91 98300 37190 | Email: \`lcgvm@yahoo.co.in\` | Official Website: [lionsvidyamandir.org](https://lionsvidyamandir.org)

---

## 1.2 Government English Medium Schools

In West Bengal, the vast majority of government and government-sponsored secondary and higher secondary schools operate in the **Bengali medium**, in accordance with state education policy. 

* **State Policy & Language Structure:** In government schools, English is taught as a compulsory First or Second Language from primary levels up to Class XII, but the primary medium of classroom instruction, textbooks, and board examinations (WBBSE & WBCHSE) remains Bengali.
* **English Medium Government Sections:** The Government of West Bengal has initiated dedicated English-medium sections in select state model schools (such as Eklavya Model Residential Schools or designated District Model Schools). However, within Baruipur municipality and immediate town limits, there are currently no standalone full-fledged government English-medium higher secondary schools. 
* **Parent Guidance:** Families seeking pure English-medium schooling under government administration generally look towards Central Government institutions (Kendriya Vidyalaya) in neighboring zones (such as KV Ballygunge, KV Command Hospital, or KV Fort William) or choose one of Baruipur's reputable private CBSE/ICSE institutions detailed above.

---

# Part 2: Bengali Medium Schools

Bengali medium education represents the cultural bedrock and academic powerhouse of Baruipur. The town's government-sponsored institutions have produced generations of judicial luminaries, scientists, doctors, civil servants, and university professors.

## 2.1 Private Bengali Medium Schools

Almost all independent private educational trusts in Baruipur operate under English-medium boards (CBSE or CISCE) due to commercial demand. At the private level, Bengali medium schooling is confined primarily to:
* **Shishu Shiksha Niketans & Kindergarten Centers:** Unaffiliated or trust-run primary schools catering to children between ages 3 and 9 (Nursery to Class IV), which prepare students for admission into prestigious government-sponsored secondary schools like Baruipur High School or Baruipur Girls' High School.
* **Neighborhood Coaching Foundations:** Private evening academic centers supporting students enrolled in state-board Bengali medium institutions.

---

## 2.2 Government and Government-Sponsored Schools (WBBSE / WBCHSE)

Government-sponsored schools in Baruipur are aided by the School Education Department, Government of West Bengal. Students appear for the **Madhyamik Pariksha** (Class X) conducted by the West Bengal Board of Secondary Education (**WBBSE**) and the **Higher Secondary (HS) Examination** (Class XII) conducted by the West Bengal Council of Higher Secondary Education (**WBCHSE**).

#### 10. Baruipur High School (Boys) — Founded 1858
* **Legacy & Heritage:** Established in **1858** during the British Raj era, Baruipur High School is one of the oldest, most revered educational institutions in Bengal. Over its **168 years of continuous academic excellence**, the school has stood as the premier seat of learning in South 24 Parganas.
* **Board Codes:** WBBSE Madhyamik Index Number: **C1-027** | WBCHSE Higher Secondary Code: **102021** | UDISE Code: **19183000508**.
* **Student Body & Classes:** Government-sponsored Boys' High School catering to over **2,350 enrolled students** across **Class V to Class XII**.
* **Higher Secondary (Classes XI–XII) Streams:**
  * **Science Stream:** Pure Science (Physics, Chemistry, Mathematics) and Bio-Science (Biological Sciences, Computer Science / Nutrition).
  * **Commerce Stream:** Accountancy, Business Studies, Commercial Law & Preliminaries of Auditing (CLPA), Economics, Costing & Taxation.
  * **Humanities / Arts Stream:** Bengali (First Language), English (Second Language), History, Geography, Political Science, Philosophy, Sanskrit, Computer Application.
* **Campus & Amenities:** Historic colonial administrative edifice complemented by modern multistoried academic annexes. Contains an expansive school playground, modernized science laboratories, ICT@Schools computer center, smart digital classrooms, extensive library of rare books and reference materials, hygienic Mid-Day Meal kitchen, and active NCC and scouts corps.
* **Welfare Initiatives:** Dedicated nodal facilitation desk for government welfare schemes including **Kanyashree Prakalpa (for eligible categories), Sabooj Sathi (bi-cycles for Class IX–XII), Shikshashree, Oasis, and Aikyashree Scholarships**.
* **Distinguished Alumni:** Former Chief Justice of the Calcutta High Court **Hon'ble Justice Jyotirmay Bhattacharya**, alongside numerous celebrated academics, medical practitioners, and administrative officers.
* **Address:** Puratan Bazar, Maha Prabhu Tala, Baruipur Municipality, South 24 Parganas, PIN: **700144** (Walking distance from station and market).
* **Contact Details:** Phone: (033) 2433 8243 | Official Web Portal: [baruipurhighschool.com](https://baruipurhighschool.com)

---

#### 11. Baruipur Girls' High School — Founded 1951
* **History & Mission:** Established in **1951**, Baruipur Girls' High School was founded shortly after Independence to champion female literacy and women's empowerment across the South 24 Parganas suburban-rural belt. It remains the top government-sponsored institution for girls in the subdivision.
* **Affiliation:** Fully recognized and affiliated with **WBBSE** (Class V–X) and **WBCHSE** (Class XI–XII).
* **Classes & Streams:** Higher Secondary girls' school offering **Class V to Class XII**. Senior academic streams include:
  * **Science Stream:** Physics, Chemistry, Biology, Mathematics, Computer Application.
  * **Arts / Humanities Stream:** Bengali, English, History, Geography, Political Science, Education, Philosophy, Sanskrit.
  * **Commerce Stream:** Fundamental commercial disciplines and economics.
* **Campus Environment & Welfare Schemes:** Secure walled campus located at Sadabrata Ghat. Equipped with upgraded science laboratories, computer training units, safe drinking water plants, student common room, and dedicated healthcare checkups. Celebrated for exemplary implementation of **Kanyashree Prakalpa (K1 & K2 scholarships)**, self-defense workshops (Kanyaashree club), and consistent merit rankings in Madhyamik and HS examinations.
* **Address:** Sadabrata Ghat Road / Baruipur Road, Ward No. 7, Baruipur Municipality, South 24 Parganas, PIN: **700144**.
* **Contact Details:** Phone: (033) 2433 6165 / (033) 2433 5461

---

#### 12. Rashmoni Balika Vidyalaya (H.S.)
* **Institutional Background:** Named after the legendary philanthropist Rani Rashmoni, this higher secondary school serves as a crucial education center for girls residing in both urban Baruipur and adjoining commuter railway villages. *(Note: Distinguish this institution from the nearby Rashmoni Girls' Primary School F.P., which operates under separate primary council management).*
* **Affiliation & Board:** Operates under the state curriculum affiliated with **WBBSE** and **WBCHSE**.
* **Grades & Courses:** Class V to Class XII for girl students. Offers strong Higher Secondary tracks in **Humanities (Arts) and Science**, emphasizing core language proficiency in Bengali and English.
* **Strategic Location:** Situated near the **Baruipur Railway Junction**, offering unmatched commuting convenience for students traveling on local trains along the Sealdah South lines (Diamond Harbour, Lakshmikantapur, Namkhana, and Canning branches).
* **Facilities:** Functional science demonstration labs, central library, mid-day meal hall for secondary students, active participation in district-level athletics, drama, and sit-and-draw competitions.
* **Address:** Near Baruipur Railway Junction / Station Road area, Ward No. 10/11, Baruipur Municipality, PIN: **700144**.

---

#### 13. Madarat Popular Academy — Founded 1909
* **Heritage & Rural Roots:** Founded in **1909**, Madarat Popular Academy boasts over **117 years of educational legacy**. Established by community visionaries to serve the farming and artisan communities of Madarat, it has grown into a premier higher secondary academic hub.
* **Board & Recognition:** Fully authorized and recognized by **WBBSE** for Madhyamik and **WBCHSE** for Higher Secondary.
* **Classes & Academic Streams:** Co-educational higher secondary institution offering **Class V to Class XII**.
  * **Higher Secondary Streams:** Arts / Humanities, Pure & Applied Sciences, and Government-Sponsored Vocational Training Courses designed to enhance student employability.
* **Campus & Student Life:** Expansive rural-suburban campus featuring a lush sports playground, separate physics, chemistry, biology, and vocational lab rooms, library, open stage for cultural gatherings, active NCC (National Cadet Corps) platoon, and vibrant annual sports tournaments.
* **Address:** Natunpara / Madarat Main Road, P.O. Madarat, P.S. Baruipur, South 24 Parganas, PIN: **743610** (Accessible via Baruipur–Madarat auto route).
* **Contact Details:** Phone: (033) 2433 8406

---

# Part 3: Parent's Guide to School Selection & Commute Strategy

Selecting the right school in Baruipur requires balancing academic board philosophies, the child's long-term competitive exam aspirations, and daily travel times.

### 1. Medium Selection: English vs. Bengali Medium
* **Choose English Medium (CBSE / CISCE) if:** The family targets national competitive examinations such as **JEE (Main/Advanced), NEET-UG, CUET, CLAT, or NDA**, where the standardized syllabus and NCERT textbooks provide direct alignment. It is also ideal for families with transferable jobs across India.
* **Choose Bengali Medium (WBBSE / WBCHSE) if:** You prioritize a deep, foundational mastery of Bengali literature, culture, and state board excellence, targeting West Bengal state civil services (**WBCS**), state university admissions, or teaching professions. Furthermore, government schools provide unmatched financial affordability (negligible tuition fees, free textbooks, uniform grants, and state welfare scholarships).

### 2. Board Differences: CBSE vs. CISCE vs. State Board
* **CBSE (St. Montfort's, HPGMS, SGS, Swarnim, Summit):** Highly structured, objective exam patterns strictly aligned with NCERT textbooks. Renowned for science and mathematics rigor, optimal for medical and engineering aspirants.
* **CISCE / ICSE-ISC (Holy Cross, Welkin, Lions Vidya Mandir):** Famed for its comprehensive language curriculum, literature depth, and extensive internal project work. Ideal for students aspiring towards humanities, management, law, design, or overseas higher education.
* **WBBSE / WBCHSE (Baruipur High, Baruipur Girls', Rashmoni, Madarat):** Rich syllabus with emphasis on comprehensive descriptive writing, strong regional language literature, and deep state-level academic roots.

### 3. Class Span Caution (Check K–10 vs. K–12)
Parents must verify whether their shortlisted school offers higher secondary (Classes XI–XII):
* **Full K–12 Schools:** St. Montfort's, Holy Cross, Welkin, Swarnim, The Summit School, Lions Vidya Mandir, Baruipur High, and Baruipur Girls' High all run up to Class XII. Students can complete their entire schooling uninterrupted.
* **K–8 & K–10 Schools:** **HP Ghosh Memorial School** currently operates up to Class VIII (expanding progressively), and **SGS International School** offers classes up to Class X. Parents enrolling here must plan for school transition for Class XI.

### 4. Commute & Geographic Belts
The Baruipur educational cluster is spread across five distinct geographical belts. Testing the commute during peak morning school hours (7:30 AM – 8:30 AM) is essential:
1. **Baruipur Municipal Central Belt (Puratan Bazar, Rashmath, Station):** Home to *Baruipur High School, Baruipur Girls' High School, Welkin National School, and Rashmoni Balika Vidyalaya*. Extremely accessible via auto, rickshaw, and local train.
2. **Khasmallick / Gobindapur Corridor (Baruipur–EM Bypass road):** Home to *Holy Cross School, HP Ghosh Memorial School, and VMS Baruipur*. Highly convenient for families residing along the bypass extension and Rajpur.
3. **Madarat Belt:** Home to *St. Montfort's Senior Secondary School and Madarat Popular Academy*. Quiet, green surroundings, accessible via auto-rickshaws from Baruipur Kulpi road or Puratan Bazar.
4. **Ramnagar & Canning Road Belt:** Home to *SGS International School*. Caters to families living towards Canning, Champahati, and eastern Baruipur.
5. **Subhashgram / Kodalia Belt:** Home to *Swarnim International School and The Summit School*. Positioned near Netaji Subhas Chandra Bose's ancestral home, bridging Baruipur and Sonarpur.

---

# Part 4: Admission Guidelines, Essential Documents & Official Verification

### Typical Admission Calendar
* **Private Schools (CBSE / CISCE):** Admission notification forms for Nursery, LKG, and Class XI are typically released between **September and November** for the subsequent academic session starting in April. Interactive sessions and student assessments occur between November and January.
* **Government Schools (WBBSE / WBCHSE):** Admissions for Class V (primary to secondary transition) and Class XI (post-Madhyamik) occur between **December and January** through the centralized Banglar Shiksha lottery/merit guidelines.

### Mandatory Documents Checklist
Parents should keep multiple certified photocopies and digital scans ready:
1. **Birth Certificate:** Issued by the Municipal Corporation / Gram Panchayat / Health Dept (Digital QR-coded certificate mandatory).
2. **Aadhaar Cards:** Both of the student and the parents/legal guardian.
3. **Passport Size Photographs:** 4 to 6 recent color photographs of the child and 2 each of father and mother.
4. **Transfer Certificate (TC):** Countersigned by the competent district education officer (mandatory for Class II and above).
5. **Previous Year's Report Card / Marksheet:** Authenticated grade record from the previous school.
6. **Address Proof:** Electricity bill, voter ID card, passport, or registered rent agreement.
7. **Caste / Category Certificate:** If applying under SC/ST/OBC/EWS quotas.
8. **Blood Group & Vaccination Record:** Medical fitness certificate signed by a registered MBBS practitioner.

### How Parents Can Verify School Affiliation Directly
Never rely solely on prospectus claims. Verify official school affiliations independently:
* **For CBSE Schools:** Visit the **CBSE SARAS Portal** at [saras.cbse.gov.in](https://saras.cbse.gov.in) and search by affiliation number or school name.
* **For CISCE Schools:** Access the **CISCE Official School Locator** at [cisce.org](https://cisce.org) and filter by State (West Bengal) and District (South 24 Parganas).
* **For State Board Schools (WBBSE / WBCHSE):** Visit the **Banglar Shiksha Portal** at [school.banglarshiksha.gov.in](https://school.banglarshiksha.gov.in) to verify UDISE codes and teacher-student ratios.
* **UDISE+ National Repository:** Search any school's 11-digit national code at [src.udiseplus.gov.in](https://src.udiseplus.gov.in).

---

# Frequently Asked Questions (FAQ)

### 1. Which are the top CBSE schools in and around Baruipur?
The leading CBSE schools in the Baruipur region include **St. Montfort's Senior Secondary School** (Madarat), **HP Ghosh Memorial School** (Khasmallick), **SGS International School** (Ramnagar), and nearby institutions in the Kodalia/Subhashgram belt such as **Swarnim International School** and **The Summit School**.

### 2. Which are the premier ICSE / ISC schools in Baruipur?
Baruipur boasts two prominent CISCE-affiliated institutions: **Holy Cross School** (Khasmallick, established 1994) and **Welkin National School** (Rashmath, established 2004). In addition, **Lions Calcutta (Greater) Vidya Mandir** at Chowhati provides extensive ISC education along the northern connector.

### 3. What is the oldest and most prestigious government school in Baruipur?
**Baruipur High School**, founded in **1858**, is the oldest school in Baruipur. Spanning over 168 years of academic excellence, it is a government-sponsored boys' higher secondary institution with a historic legacy and illustrious alumni.

### 4. Are there dedicated government higher secondary schools for girls in Baruipur?
Yes. **Baruipur Girls' High School** (established 1951, located at Sadabrata Ghat) and **Rashmoni Balika Vidyalaya (H.S.)** (situated near Baruipur Railway Station) are the two premier government-sponsored secondary and higher secondary institutions dedicated exclusively to female education.

### 5. Are there any government-run English medium schools in Baruipur?
No full-fledged standalone government English-medium higher secondary schools currently operate within Baruipur municipality. State-run schools operate in the Bengali medium with English as a compulsory language. Parents seeking English-medium schooling in Baruipur choose reputed private CBSE or CISCE institutions.

### 6. Which schools in Baruipur offer classes up to Class XII with Science, Commerce, and Arts streams?
Higher secondary education across all three streams is offered by:
* **Private CBSE:** St. Montfort's Senior Secondary School, Swarnim International School, and The Summit School.
* **Private CISCE (ISC):** Holy Cross School, Welkin National School, and Lions Calcutta (Greater) Vidya Mandir.
* **Government (WBCHSE):** Baruipur High School, Baruipur Girls' High School, Madarat Popular Academy, and Rashmoni Balika Vidyalaya.

### 7. Do schools in Baruipur offer bus and transport facilities?
Yes. Leading private schools including Holy Cross, St. Montfort's, Welkin, HP Ghosh Memorial, SGS International, and Swarnim International operate extensive fleets of school buses and vans covering Baruipur, Subhashgram, Sonarpur, Rajpur, Joynagar, and Canning routes.

---
*Disclaimer: Academic affiliations, fee structures, and admission seats are updated periodically by respective school management boards. Parents are strongly advised to contact the admissions office directly or consult official board portals (CBSE SARAS, CISCE, and Banglar Shiksha) before finalizing admission.*
`;

article.content = content;
fs.writeFileSync(dataPath, JSON.stringify(newsData, null, 2), 'utf8');
console.log('Successfully updated art-guide-top-schools! Content length:', content.length);
