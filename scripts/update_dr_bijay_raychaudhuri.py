# -*- coding: utf-8 -*-
"""
Script to update Mahendra Clinic with full details of Dr. Bijay Roy Chaudhuri
(MBBS Cal, D.Derm London, MRCGP London - Consultant at Ruby Hospital & Desun Hospital)
"""
import json
import os

HEALTH_FILE = os.path.join(os.path.dirname(__file__), '..', 'src', 'data', 'healthcare_data.json')

with open(HEALTH_FILE, 'r', encoding='utf-8') as f:
    health = json.load(f)

for h in health:
    if h.get('slug') == 'mahendra-clinic-baruipur':
        h['taglineBn'] = 'মহেন্দ্র ক্লিনিক বারুইপুর: প্রখ্যাত চর্মরোগ বিশেষজ্ঞ ডাঃ বিজয় রায়চৌধুরী (Dr. Bijay Roy Chaudhuri - রুবি ও দেশুন হাসপাতাল) এবং ডাঃ এইচ এম দাও চেম্বার'
        h['overviewBn'] = """মহেন্দ্র ক্লিনিক (Mahendra Clinic Baruipur) বারুইপুর কুলপী রোডের রেলগেটের বিপরীতে (১৬৫ কুলপী রোড, সুবুদ্ধিপুর) অবস্থিত দক্ষিণ ২৪ পরগনার অন্যতম বিখ্যাত ও অগ্রণী ডক্টরস ক্লিনিক। এই ক্লিনিকের প্রধান বিশেষত্ব হলো কলকাতার স্বনামধন্য ও প্রবীণ চর্মরোগ বিশেষজ্ঞ **ডাঃ বিজয় রায়চৌধুরী (Dr. Bijay Roy Chaudhuri / Dr. Bijoy Roy Choudhury - MBBS Cal, D.Derm London, MRCGP London)**-এর নিয়মিত ওপিডি চেম্বার। ৫০ বছরেরও বেশি ক্লিনিক্যাল অভিজ্ঞতাসম্পন্ন ডাঃ বিজয় রায়চৌধুরী কলকাতার বিখ্যাত রুবি জেনারেল হাসপাতাল (Ruby General Hospital) এবং দেশুন হাসপাতালের (Desun Hospital) সিনিয়র কনসালট্যান্ট ডার্মাটোলজিস্ট হিসেবে যুক্ত।

বারুইপুর, জয়নগর, ক্যানিং ও সমগ্র সুন্দরবন অঞ্চল থেকে হাজার হাজার রোগী জটিল ও দীর্ঘস্থায়ী চর্মরোগ, সোরাইসিস (Psoriasis), একজিমা (Eczema), অ্যালার্জি, শ্বেতী (Vitiligo), একনে/ব্রণ এবং চুল পড়া (Alopecia / Hairloss)-র উন্নত চিকিৎসার জন্য ডাঃ বিজয় রায়চৌধুরীর পরামর্শ নিতে মহেন্দ্র ক্লিনিকে আসেন। 

এছাড়া ক্লিনিকে নিয়মিত রোগী দেখেন প্রখ্যাত কনসালট্যান্ট ফিজিশিয়ান **ডাঃ এইচ এম দাও (Dr. H. M. Dao, MBBS, MD)**। ক্লিনিকে ফোনের মাধ্যমে সহজে অগ্রিম সিরিয়াল ও বুকিং নেওয়ার ব্যবস্থা রয়েছে (হেল্পলাইন নম্বর: **9831771336 / 033-2433-8444**)।"""

        h['keyServicesBn'] = [
            '৫০+ বছরের অভিজ্ঞতাসম্পন্ন প্রখ্যাত চর্মরোগ বিশেষজ্ঞ ডাঃ বিজয় রায়চৌধুরীর (D.Derm London, রুবি ও দেশুন হাসপাতাল) স্পেশাল ওপিডি চেম্বার',
            'চুল পড়া (Hair Loss / Alopecia Areata) ও স্ক্যাল্প ইনফেকশনের বিশেষায়িত চিকিৎসা',
            'জটিল ও ক্রনিক সোরাইসিস (Psoriasis) এবং এটোপিক একজিমার (Eczema) উন্নত সমাধান',
            'ব্রণ (Acne Problems), মেচেতা, পিগমেন্টেশন ও স্কিন অ্যালার্জির আন্তর্জাতিক মানের কেয়ার',
            'দাদ (Ringworm), খোসপাঁচড়া, শিংগলস (Herpes Zoster) ও ফাঙ্গাল ইনফেকশনের নির্ভরযোগ্য চিকিৎসা',
            'প্রখ্যাত ফিজিশিয়ান ডাঃ এইচ এম দাও (Dr. H. M. Dao)-এর ওপিডি মেডিসিন কনসালটেশন',
            'ফোনে সহজ অগ্রিম সিরিয়াল ও বুকিং ব্যবস্থা (হেল্পলাইন: 9831771336 / 033-2433-8444)'
        ]

        h['diagnosticFacilitiesBn'] = [
            'ক্লিনিক্যাল ডার্মাটোলজি ও স্কিন ওপিডি কনসালটেশন',
            'চর্ম ও চুলের সমস্যা নির্ণয় ও প্রেসক্রিপশন কেয়ার'
        ]

        h['doctors'] = [
            {
                "id": "mahendra-doc-2",
                "nameBn": "ডাঃ বিজয় রায়চৌধুরী (Dr. Bijay Roy Chaudhuri)",
                "nameEn": "Dr. Bijay Roy Chaudhuri (Dr. Bijoy Roy Choudhury)",
                "degrees": "MBBS (Cal), D.Derm (London), MRCGP (Dermatology, London)",
                "specialtyKey": "dermatology",
                "specialtyBn": "প্রখ্যাত সিনিয়র চর্ম, নখ ও চুল বিশেষজ্ঞ (৫০+ বছরের অভিজ্ঞতা)",
                "specialtyEn": "Senior Consultant Dermatologist (Ruby & Desun Hospital)",
                "daysBn": "প্রতি শুক্রবার ও রবিবার",
                "timingBn": "সকাল ১১:০০ - দুপুর ২:০০",
                "visitingFeeBn": "₹ ৭০০ - ₹ ৮০০",
                "appointmentPhone": "9831771336",
                "appointmentWhatsapp": "+919831771336",
                "notesBn": "রুবি ও দেশুন হাসপাতালের সিনিয়র কনসালট্যান্ট; সোরাইসিস, একজিমা, চুল পড়া (Alopecia), শ্বেতী, অ্যালার্জি ও স্কিন ইনফেকশন কেয়ার"
            },
            {
                "id": "mahendra-doc-1",
                "nameBn": "ডাঃ এইচ এম দাও (Dr. H. M. Dao)",
                "nameEn": "Dr. H. M. Dao",
                "degrees": "M.B.B.S., M.D. (Medicine) - Senior Consultant Physician",
                "specialtyKey": "medicine",
                "specialtyBn": "জেনারেল মেডিসিন ও কনসালট্যান্ট ফিজিশিয়ান",
                "specialtyEn": "General Medicine & Consultant Physician",
                "daysBn": "প্রতি বুধবার ও শনিবার",
                "timingBn": "বিকেল ৫:০০ - রাত ৮:০০",
                "visitingFeeBn": "₹ ৬০০",
                "appointmentPhone": "9831771336",
                "appointmentWhatsapp": "+919831771336",
                "notesBn": "ডায়াবেটিস, থাইরয়েড, উচ্চ রক্তচাপ ও ক্রনিক রোগের বিশেষজ্ঞ চিকিৎসা"
            }
        ]
        h['doctorsCount'] = 2
        print("Successfully updated Mahendra Clinic with full Dr. Bijay Roy Chaudhuri profile!")

with open(HEALTH_FILE, 'w', encoding='utf-8') as f:
    json.dump(health, f, ensure_ascii=False, indent=2)

print("Healthcare data saved successfully!")
