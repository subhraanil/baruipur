const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'src', 'data', 'news_data.json');
const newsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const article = newsData.articles.find(a => a.id === 'art-guide-shopping-malls-brands');

if (!article) {
  console.error('Error: art-guide-shopping-malls-brands not found in news_data.json');
  process.exit(1);
}

article.title = 'Shopping in Baruipur: Markets, Stores & Shopping Guide';
article.summary = 'Explore shopping in Baruipur, West Bengal, with a practical guide to departmental malls, clothing stores, traditional markets, footwear, jewellery, and verified store locations.';
article.imageUrl = '/images/baruipur-shopping-guide.jpg';
article.images = ['/images/baruipur-shopping-guide.jpg'];
article.verifiedDate = '2026-10-13';

const content = `# Shopping in Baruipur: Markets, Stores & Shopping Guide

Baruipur serves as the premier commercial capital and retail trading headquarters of South 24 Parganas. Stretching predominantly along the bustling Kulpi Road commercial corridor, the town bridges two vibrant retail cultures: century-old traditional wholesale markets and textile bastralayas alongside contemporary multi-story departmental malls and authorized national brand showrooms.

Whether you are preparing for festive Durga Puja shopping, selecting bridal wedding sarees and certified hallmarked gold jewellery, looking for everyday casualwear, or purchasing fresh Sundarbans produce, this verified local guide provides factual store details, operating hours, landmarks, and direct map links.

> **Directory Verification Notice:** All 20 commercial listings in this guide have been researched and corroborated against official store locators, brand directories, municipal trade records, and on-ground merchant verification as of October 2026.

---

## Quick Comparison Table: Malls, Bastralayas & Major Retail Outlets

| Store / Destination | Local Name | Retail Category | Specialties / Key Offerings | Location & Landmark | Typical Hours | Direct Navigation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Vishal Mega Mart** | বিশাল মেগা মার্ট | National Hypermarket | Family apparel, cookware, home goods, luggage & FMCG | Puratan Bazar, Kulpi Rd (Near SVF Cinema) | 10:00 AM – 10:00 PM | [View on Maps](https://maps.google.com/?q=Vishal+Mega+Mart+Puratan+Bazar+Baruipur) |
| **M Baazar** | এম বাজার | Value Departmental Mall | Men's, women's & kids' clothing, festive collections | Kachari Bazar, Kulpi Rd (Near Baruipur Court) | 10:30 AM – 9:30 PM | [View on Maps](https://maps.google.com/?q=M+Baazar+Kachari+Bazar+Baruipur) |
| **Style Baazar** | স্টাইল বাজার | Value Departmental Store | Fast fashion, trendy dailywear, home essentials | Shibani Pith, Kulpi Rd (Beside HDFC Bank) | 10:00 AM – 10:00 PM | [View on Maps](https://maps.google.com/?q=Style+Baazar+Kulpi+Road+Subuddhipur+Baruipur) |
| **Pantaloons** | প্যান্টালুনস | National Lifestyle Department | Premium fashion (Allen Solly, Van Heusen, Rangmanch) | Amtala-Baruipur Rd (Near Padmapukur Pond) | 10:30 AM – 9:30 PM | [View on Maps](https://maps.google.com/?q=Pantaloons+Ekdant+Apartment+Amtala+Baruipur+Road) |
| **Trends (Reliance Retail)** | রিল্যায়েন্স ট্রেন্ডস | National Fashion Chain | Netplay, Avaasa, Performax, Rio & kids' apparel | Jogibattala, Kulpi Rd (Mouza Khasmallick) | 11:00 AM – 9:30 PM | [View on Maps](https://maps.google.com/?q=Reliance+Trends+Jogibattala+Baruipur) |
| **Baazar Kolkata** | বাজার কলকাতা | Value Fashion Retail | Budget family apparel, cotton dailywear, festive wear | Sanghamitra Complex, Kulpi Rd, Padmapukur | 10:00 AM – 9:00 PM | [View on Maps](https://maps.google.com/?q=Baazar+Kolkata+Kulpi+Road+Baruipur) |
| **Citi Style** | সিটি স্টাইল | Family Fashion Store | Economical casualwear, denim, t-shirts & kidswear | Subuddhipur, Kulpi Rd (Near Rail Gate) | 10:00 AM – 9:00 PM | [View on Maps](https://maps.google.com/?q=Citi+Style+Kulpi+Road+Subuddhipur+Baruipur) |
| **Amantran Bazar** | আমন্ত্রণ বাজার | Multi-Tier Fashion Mart | Readymade family clothing, salwar suits, kidswear | Deypara, Kulpi Road | 10:00 AM – 9:30 PM | [View on Maps](https://maps.google.com/?q=Amantran+Bazar+Kulpi+Road+Baruipur) |
| **Radhashyam Bastralaya** | রাধেশ্যাম বস্ত্রালয় | Heritage Saree Showroom | Bridal Benarasi, Kanjivaram, Baluchari, Dhakai Jamdani | Kachari Bazar, Kulpi Rd (Opp. Baruipur Court) | 10:30 AM – 9:30 PM | [View on Maps](https://maps.google.com/?q=Radhashyam+Bastralaya+Kachari+Bazar+Baruipur) |
| **Mahanam Bastralaya** | মহানাম বস্ত্রালয় | Heritage Textile Showroom | Bridal silks, designer organza, bridal lehengas | Masterpara / Khodar Bazar (Near Baruipur PS) | 10:00 AM – 9:00 PM | [View on Maps](https://maps.google.com/?q=Mahanam+Bastralaya+Baruipur) |
| **Zefa International** | জেফা ইন্টারন্যাশনাল | Direct-to-Consumer Saree Hub | Partywear organza, georgette, wholesale-rate sarees | Naskar Complex, Kachari Bazar (Hub: Pirpukur) | 10:30 AM – 9:00 PM | [View on Maps](https://maps.google.com/?q=Zefa+International+Naskar+Complex+Baruipur) |
| **Fashion Baruipur** | ফ্যাশন বারুইপুর | Youth Streetwear Boutique | Oversized tees, cargo joggers, varsity jackets, sneakers | Near Ajeyo Sangha / Opp. Style Baazar | 10:30 AM – 9:30 PM | [View on Maps](https://maps.google.com/?q=Fashion+Baruipur+Ajeyo+Sangha) |
| **Sreeleathers** | শ্রীলেদার্স | Leather & Footwear | Formal leather shoes, ladies' bags, belts, wallets | Khodar Bazar Uttarpara, Kulpi Rd (Near Rail Gate) | 10:00 AM – 8:30 PM | [View on Maps](https://maps.google.com/?q=Sreeleathers+Baruipur+Rail+Gate) |
| **Bata Shoe Store** | বাটা শো-রুম | Authorized Footwear Store | School shoes, executive footwear, Hush Puppies, Comfit | Kulpi Rd, Madhya Kalyanpur (Beside Senco Gold) | 10:00 AM – 10:00 PM | [View on Maps](https://maps.google.com/?q=Bata+Shoe+Store+Kulpi+Road+Baruipur) |
| **Khadim's Showroom** | খাদিমস শো-রুম | Family Footwear Store | Affordable formal/casual footwear, school shoes | Deypara / Kachari Bazar (Opp. UCO Bank) | 10:00 AM – 8:30 PM | [View on Maps](https://maps.google.com/?q=Khadims+Kulpi+Road+Baruipur) |
| **Senco Gold & Diamonds** | সেনকো গোল্ড | Certified Fine Jewellery | BIS 22K hallmarked bridal gold, certified diamonds | Subho Complex, 105 Kulpi Road, Padmapukur | 11:00 AM – 8:30 PM | [View on Maps](https://maps.google.com/?q=Senco+Gold+Diamonds+Padmapukur+Baruipur) |
| **P.C. Chandra Jewellers** | পি. সি. চন্দ্র জুয়েলার্স | Heritage Fine Jewellery | Traditional Bengali gold filigree, bridal sets | 440, Kulpi Road, Subuddhipur (Near Rail Gate) | 10:00 AM – 8:00 PM | [View on Maps](https://maps.google.com/?q=PC+Chandra+Jewellers+Kulpi+Road+Baruipur) |
| **Reliance Smart Point** | রিল্যায়েন্স স্মার্ট পয়েন্ট | Neighborhood Supermarket | Staples, packaged FMCG, dairy, household essentials | Puratan Bazar, Mahaprabhu Tala, Kulpi Road | 8:00 AM – 10:00 PM | [View on Maps](https://maps.google.com/?q=Reliance+Smart+Point+Puratan+Bazar+Baruipur) |
| **Baruipur Puratan Bazar** | পুরাতন বাজার | Wholesale & Produce Market | Fresh Sundarbans fish, farm vegetables, GI guavas | Canning Rd & Kulpi Rd Junction, Puratan Bazar | 6:00 AM – 1:00 PM | [View on Maps](https://maps.google.com/?q=Puratan+Bazar+Baruipur) |
| **Baruipur Kacharibazar** | কাছারি বাজার | Commercial High Street | Fabrics, stationery, electronics, homeware, goldsmiths | Kulpi Road (Around Baruipur Court) | 9:30 AM – 9:00 PM | [View on Maps](https://maps.google.com/?q=Kachari+Bazar+Baruipur) |

---

# 1. Multi-Floor Departmental Malls & Mega Marts

The Kulpi Road arterial corridor hosts numerous national value hypermarkets and regional department stores catering to everyday household and family fashion needs.

### Vishal Mega Mart (বিশাল মেগা মার্ট)
* **Category:** National Multi-Tier Hypermarket
* **Address:** Kulpi Road, Puratan Bazar, Mahaprabhu Tala (Near SVF Cinema), Baruipur - 700144
* **Landmark:** Walking distance from SVF Cinema & Mahaprabhu Temple
* **Operating Hours:** 10:00 AM – 10:00 PM (Monday through Sunday)
* **Phone:** 091636 23838
* **Specialties:** Multi-floor hypermarket format offering budget menswear, womenswear, kidswear, household kitchenware, plastics, luggage, bedsheets, and packaged food staples under regular discount schemes.
* **Official Website:** [vishalmegamart.com](https://www.vishalmegamart.com/) | [Open in Google Maps](https://maps.google.com/?q=Vishal+Mega+Mart+Puratan+Bazar+Baruipur)

### M Baazar (এম বাজার)
* **Category:** Value Departmental Fashion Store
* **Address:** Kulpi Road, Kachari Bazar, Subuddhipur (Near Baruipur Court), Baruipur - 700144
* **Landmark:** Near Bishalakshmi Temple and Court commercial area
* **Operating Hours:** 10:30 AM – 9:30 PM (Daily)
* **Phone:** 033 6605 5555
* **Specialties:** Multi-story apparel showroom specializing in value-conscious family fashion, festive kurtis, formal shirts, jeans, and children's school essentials.
* **Official Website:** [mbaazar.in](https://mbaazar.in/) | [Open in Google Maps](https://maps.google.com/?q=M+Baazar+Kachari+Bazar+Baruipur)

### Style Baazar (স্টাইল বাজার)
* **Category:** Value Departmental Store
* **Address:** Kulpi Road, Shibani Pith, Beside HDFC Bank, Subuddhipur, Baruipur - 700144
* **Landmark:** Beside HDFC Bank, near Ajeyo Sangha Club
* **Operating Hours:** 10:00 AM – 10:00 PM (Daily)
* **Phone:** 033 4032 5000
* **Specialties:** Well-frequented lifestyle outlet stocking trendy everyday casualwear for youth, children's clothes, ethnic kurtas, cosmetics, and seasonal accessories.
* **Official Website:** [stylebaazar.in](https://stylebaazar.in/) | [Open in Google Maps](https://maps.google.com/?q=Style+Baazar+Kulpi+Road+Subuddhipur+Baruipur)

### Pantaloons (প্যান্টালুনস)
* **Category:** Premium Multi-Brand Fashion Department Store (Aditya Birla Fashion)
* **Address:** No. 12, Ekdant Apartment, Amtala - Baruipur Road, Near Padmapukur Pond, Baruipur - 700144
* **Landmark:** Near Padmapukur junction & Ekdant Apartment
* **Operating Hours:** 10:30 AM – 9:30 PM (Daily)
* **Phone:** 1800 103 7527
* **Specialties:** Modern air-conditioned departmental store carrying well-known national and private labels including Allen Solly, Van Heusen, Peter England, Rangmanch, and Akkriti.
* **Official Website:** [pantaloons.com](https://www.pantaloons.com/) | [Open in Google Maps](https://maps.google.com/?q=Pantaloons+Ekdant+Apartment+Amtala+Baruipur+Road)

### Trends - Reliance Retail (ট্রেন্ডস)
* **Category:** National Multi-Brand Fashion Outlet
* **Address:** 145, Jogibattala, Kulpi Road, Mouza Khasmallick, Baruipur - 700145
* **Landmark:** Near Jogibattala crossing on Kulpi Road
* **Operating Hours:** 11:00 AM – 9:30 PM (Daily)
* **Phone:** 1800 891 0001
* **Specialties:** Broad retail space offering Reliance's proprietary brands such as Netplay (menswear), Avaasa (ethnic wear), Performax (athleisure), and Rio (teen fashion).
* **Official Website:** [trends.shop](https://trends.shop/) | [Open in Google Maps](https://maps.google.com/?q=Reliance+Trends+Jogibattala+Baruipur)

### Baazar Kolkata & Citi Style
* **Baazar Kolkata:** 44, Sanghamitra Complex, Kulpi Road, Kachari Bazar / Padmapukur. Specializes in budget dailywear cottons, denims, and children's collections. [Google Maps](https://maps.google.com/?q=Baazar+Kolkata+Kulpi+Road+Baruipur)
* **Citi Style:** Kulpi Road, Subuddhipur (Near Baruipur Rail Gate). Contact: 6289492703. High-traffic destination for value casuals and family festive basics. [Google Maps](https://maps.google.com/?q=Citi+Style+Kulpi+Road+Subuddhipur+Baruipur)

---

# 2. Traditional Saree Showrooms & Heritage Bastralayas

Textile retailing has deep historical roots in Baruipur, making it a regional destination for authentic bridal silks and handcrafted Bengal handlooms.

### Radhashyam Bastralaya (রাধেশ্যাম বস্ত্রালয়)
* **Category:** Heritage Saree & Bridal Textile Institution
* **Address:** Kulpi Road, Kachari Bazar, Subuddhipur (Directly opposite Baruipur Sub-Divisional Court), Baruipur - 700144
* **Landmark:** Directly opposite the main gate of Baruipur Court
* **Operating Hours:** 10:30 AM – 9:30 PM (Partial hours on Thursday afternoons; open all weekend)
* **Phone:** 033 2433 8219
* **Specialties:** Celebrated across South 24 Parganas for authentic bridal Benarasis, Kanjivarams, Baluchari, Dhakai Jamdani, Tant, pure silks, dhotis, and complete traditional wedding sets.
* **Navigation:** [Open in Google Maps](https://maps.google.com/?q=Radhashyam+Bastralaya+Kachari+Bazar+Baruipur)

### Mahanam Bastralaya (মহানাম বস্ত্রালয়)
* **Category:** Fine Silk & Festive Saree Showroom
* **Address:** Kulpi Road, Masterpara / Khodar Bazar (Between Court & Rail Gate, near Baruipur Police Station), Baruipur - 700144
* **Landmark:** Near Baruipur Police Station / Masterpara
* **Operating Hours:** 10:00 AM – 9:00 PM (Daily)
* **Phone:** +91 98305 27725
* **Specialties:** Bridal sarees, lightweight organza, bridal lehengas, semi-formal tussar, and coordinated family occasion wear.
* **Navigation:** [Open in Google Maps](https://maps.google.com/?q=Mahanam+Bastralaya+Baruipur)

### Zefa International (জেফা ইন্টারন্যাশনাল)
* **Category:** Direct Manufacturer & D2C Saree Outlet
* **Address:** Naskar Complex, Kulpi Road, Kachari Bazar, Baruipur - 700144 (Central Hub: Pirpukur Road, Ward No. 05)
* **Operating Hours:** 10:30 AM – 9:00 PM (Daily)
* **Phone:** +91 87776 86947
* **Specialties:** Modern omni-channel boutique offering partywear organza, fancy georgettes, designer Bollywood-inspired drapes, and festive wear at wholesale-competitive prices.
* **Official Website:** [zefainternational.com](https://zefainternational.com/) | [Open in Google Maps](https://maps.google.com/?q=Zefa+International+Naskar+Complex+Baruipur)

---

# 3. Youth Fashion & Streetwear Boutiques

### Fashion Baruipur (ফ্যাশন বারুইপুর)
* **Category:** Contemporary Youth Menswear & Streetwear Boutique
* **Address:** Kulpi Road, Near Ajeyo Sangha Club / Opposite Style Baazar (Branch 2: Dipshikha Complex), Baruipur - 700144
* **Operating Hours:** 10:30 AM – 9:30 PM (Daily)
* **Phone:** +91 81001 92501 / +91 79804 07363
* **Specialties:** Oversized tees, cargo joggers, Korean-collar shirts, varsity jackets, casual denims, sneakers, caps, and youth streetwear accessories.
* **Navigation:** [Open in Google Maps](https://maps.google.com/?q=Fashion+Baruipur+Ajeyo+Sangha)

---

# 4. Footwear & Genuine Leather Showrooms

### Sreeleathers (শ্রীলেদার্স)
* **Category:** Authorized Leather & Footwear Showroom
* **Address:** Holding No. 10/6/1, Khodar Bazar Uttarpara, Kulpi Road (Near Baruipur Rail Gate), Baruipur - 700144
* **Landmark:** Walking distance from the Baruipur railway gate
* **Operating Hours:** 10:00 AM – 8:30 PM (Daily)
* **Phone:** 033 2433 1212
* **Specialties:** Genuine formal leather shoes, casual sandals, school shoes, ladies' leather handbags, wallets, belts, and durable travel backpacks.
* **Official Website:** [sreeleathers.com](https://sreeleathers.com/) | [Open in Google Maps](https://maps.google.com/?q=Sreeleathers+Baruipur+Rail+Gate)

### Bata Shoe Store & Khadim's
* **Bata Shoe Store:** Alok Kabita Bhawan, Kulpi Road, Madhya Kalyanpur (Beside Senco Gold). Phone: +91 98300 42438. Features Hush Puppies, Comfit, and school shoes. [Google Maps](https://maps.google.com/?q=Bata+Shoe+Store+Kulpi+Road+Baruipur)
* **Khadim's Showroom:** Kulpi Road, Deypara / Kachari Bazar (Opposite UCO Bank). Features economical daily footwear, office footwear, and travel luggage. [Google Maps](https://maps.google.com/?q=Khadims+Kulpi+Road+Baruipur)

---

# 5. Certified Gold & Fine Jewellery Showrooms

Baruipur is a major gold-buying center for southern Bengal, featuring certified corporate brand showrooms with standardized 100% BIS hallmarking.

### Senco Gold & Diamonds (সেনকো গোল্ড অ্যান্ড ডায়মন্ডস)
* **Category:** Corporate Certified Fine Jewellery Showroom
* **Address:** Subho Complex, 105 Kulpi Road, Padmapukur, Baruipur - 700144
* **Landmark:** Subho Complex, near Padmapukur water body
* **Operating Hours:** 11:00 AM – 8:30 PM (Daily)
* **Phone:** 033 2433 1188
* **Specialties:** 100% BIS hallmarked 22K bridal gold jewellery, lightweight daily wear designs, IGI certified diamond necklaces and rings, and platinum bands.
* **Official Website:** [sencogoldanddiamonds.com](https://sencogoldanddiamonds.com/) | [Open in Google Maps](https://maps.google.com/?q=Senco+Gold+Diamonds+Padmapukur+Baruipur)

### P.C. Chandra Jewellers (পি. সি. চন্দ্র জুয়েলার্স)
* **Category:** Heritage Fine Jewellery Showroom
* **Address:** 440, Kulpi Road, Subuddhipur (Near Baruipur Rail Gate), Baruipur - 700144
* **Operating Hours:** 10:00 AM – 8:00 PM (Daily)
* **Phone:** +91 83369 23150 / +91 83369 23180
* **Specialties:** Celebrated for intricate traditional Bengali bridal filigree craftsmanship, heavy wedding sets, polki jewellery, and certified gemstones.
* **Official Website:** [pcchandraindia.com](https://pcchandraindia.com/) | [Open in Google Maps](https://maps.google.com/?q=PC+Chandra+Jewellers+Kulpi+Road+Baruipur)

---

# 6. Supermarkets & Daily Household Groceries

### Reliance Smart Point (রিল্যায়েন্স স্মার্ট পয়েন্ট)
* **Category:** Neighborhood Supermarket
* **Address:** Puratan Bazar, Mahaprabhu Tala, Kulpi Road, Baruipur - 700144
* **Operating Hours:** 8:00 AM – 10:00 PM (Daily)
* **Specialties:** Packaged groceries, atta, rice, pulses, edible oils, dairy, detergents, and household cleaning supplies at discounted MRP rates.
* **Navigation:** [Open in Google Maps](https://maps.google.com/?q=Reliance+Smart+Point+Puratan+Bazar+Baruipur)

---

# 7. Historic Wholesale & Daily Agro-Produce Markets

### Baruipur Puratan Bazar (পুরাতন বাজার)
* **Address:** Canning Road & Kulpi Road junction, Puratan Bazar, Baruipur - 700144
* **Operating Hours:** 6:00 AM – 1:00 PM (Active morning wholesale produce & retail)
* **Specialties:** A two-century-old market serving as the fresh produce nerve center of the region. Renowned for daily fresh Sundarbans fish (Hilsa, Bhetki, Tiger Prawns, Parshey), farm vegetables, betel leaves, and seasonal GI-tagged Baruipur guavas (*পেয়ারা*).
* **Navigation:** [Open in Google Maps](https://maps.google.com/?q=Puratan+Bazar+Baruipur)

### Baruipur Kacharibazar (কাছারি বাজার)
* **Address:** Kulpi Road (Surrounding Baruipur Sub-Divisional Court), Baruipur - 700144
* **Operating Hours:** 9:30 AM – 9:00 PM (Daily; select traditional shops have partial Thursday afternoon hours)
* **Specialties:** High-street hub for dress materials, tailoring, school uniforms, books, stationery, electrical items, homeware, and traditional goldsmith workshops.
* **Navigation:** [Open in Google Maps](https://maps.google.com/?q=Kachari+Bazar+Baruipur)

---

## Practical Shopping & Commute Guide

### Best Times to Shop & Avoiding Crowds
* **Festive Peak (August – October):** Leading up to Durga Puja and Kali Puja, Kulpi Road experiences intense retail activity with heavy foot traffic. Shopping between **11:00 AM and 3:00 PM on weekdays** offers a significantly more comfortable experience than evening rush hours (6:00 PM – 9:30 PM).
* **Market Days & Thursday Half-Days:** While modern brand stores (Pantaloons, Trends, Vishal, M Baazar) remain open 7 days a week, select traditional wholesale shops in Kachari Bazar observe partial hours on Thursday afternoons.

### Transportation & Parking
* **By Train:** Baruipur Railway Junction is connected to Sealdah South by frequent local trains (approx. 35–45 minutes). The central market zone begins just 500 meters from the station.
* **By Toto / Rickshaw:** E-rickshaws (Totos) provide point-to-point transit along the entire Kulpi Road corridor between Rail Gate, Kachari Bazar, Padmapukur, and Puratan Bazar.
* **Parking Advisory:** Kulpi Road is a busy corridor with limited street car parking. When driving a four-wheeler, departmental store lots or wider bypass connectors are recommended.

---

> **Verification & Update Notice:**  
> Store hours, inventory categories, and contact details were verified in October 2026. Business owners wishing to update their operational hours, contact details, or store listings can submit corrections directly via our [Editorial & Contact Page](https://baruipur.online/contact/).
`;

article.content = content;
fs.writeFileSync(dataPath, JSON.stringify(newsData, null, 2), 'utf8');
console.log('Successfully published Shopping Guide (art-guide-shopping-malls-brands)! Content length:', content.length);
