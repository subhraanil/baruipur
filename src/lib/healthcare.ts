export type FacilityType = 'nursing_home' | 'polyclinic' | 'pharmacy_opd' | 'hospital';

export interface DoctorOPD {
  id: string;
  nameBn: string;
  nameEn: string;
  degrees: string;
  specialtyKey: string;
  specialtyBn: string;
  specialtyEn: string;
  experienceBn?: string;
  daysBn: string;
  timingBn: string;
  visitingFeeBn: string;
  roomNo?: string;
  appointmentPhone: string;
  appointmentWhatsapp?: string;
  notesBn?: string;
}

export interface HealthcareFacility {
  slug: string;
  nameBn: string;
  nameEn: string;
  type: FacilityType;
  typeBn: string;
  taglineBn: string;
  overviewBn: string;
  addressBn: string;
  addressEn: string;
  landmarkBn: string;
  phone: string;
  altPhone?: string;
  emergencyPhone?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  googleMapUrl: string;
  openingHoursBn: string;
  isOpen24Hours: boolean;
  hasEmergency: boolean;
  hasPharmacy: boolean;
  hasDiagnostic: boolean;
  hasAmbulance: boolean;
  swasthyaSathiAccepted?: boolean;
  insuranceAccepted?: boolean;
  keyServicesBn: string[];
  diagnosticFacilitiesBn?: string[];
  doctorsCount: number;
  doctors: DoctorOPD[];
  establishedYear?: string;
  bedCapacity?: string;
}

export interface SpecialtyOption {
  key: string;
  nameBn: string;
  nameEn: string;
  iconName?: string;
}

import healthcareDataRaw from '@/data/healthcare_data.json';

export const HEALTHCARE_FACILITIES: HealthcareFacility[] = healthcareDataRaw as HealthcareFacility[];

export const SPECIALTY_OPTIONS: SpecialtyOption[] = [
  { key: 'all', nameBn: 'সমস্ত বিশেষজ্ঞ', nameEn: 'All Specialties' },
  { key: 'general_medicine', nameBn: 'জেনারেল মেডিসিন', nameEn: 'General Medicine' },
  { key: 'pediatrics', nameBn: 'শিশু বিশেষজ্ঞ (Pediatrics)', nameEn: 'Pediatrics / Child Care' },
  { key: 'gynecology', nameBn: 'স্ত্রীরোগ ও প্রসূতি (Gynae & Obs)', nameEn: 'Gynecology & Obstetrics' },
  { key: 'cardiology', nameBn: 'হৃদরোগ বিশেষজ্ঞ (Cardiology)', nameEn: 'Cardiology' },
  { key: 'orthopedics', nameBn: 'হাড় ও অর্থোপেডিক (Orthopedics)', nameEn: 'Orthopedics' },
  { key: 'dermatology', nameBn: 'চর্মরোগ বিশেষজ্ঞ (Dermatology)', nameEn: 'Dermatology / Skin' },
  { key: 'neurology', nameBn: 'স্নায়ুরোগ (Neurology / Neuro Medicine)', nameEn: 'Neurology' },
  { key: 'ent', nameBn: 'নাক, কান ও গলা (ENT)', nameEn: 'ENT Specialist' },
  { key: 'gastroenterology', nameBn: 'গ্যাস্ট্রোএন্টারোলজি ও লিভার', nameEn: 'Gastroenterology' },
  { key: 'urology', nameBn: 'ইউরোলজি ও কিডনি', nameEn: 'Urology' },
  { key: 'ophthalmology', nameBn: 'চক্ষুরোগ বিশেষজ্ঞ (Eye Specialist)', nameEn: 'Ophthalmology / Eye' },
  { key: 'dentistry', nameBn: 'দন্ত বিশেষজ্ঞ (Dental / Dentist)', nameEn: 'Dentistry' },
  { key: 'pulmonology', nameBn: 'বক্ষব্যাধি (Chest & Respiratory)', nameEn: 'Pulmonology / Chest' },
  { key: 'psychiatry', nameBn: 'মানসিক রোগ (Psychiatry)', nameEn: 'Psychiatry' },
  { key: 'general_surgery', nameBn: 'সার্জারি (General & Laparoscopic)', nameEn: 'General Surgery' },
  { key: 'endocrinology', nameBn: 'এন্ডোক্রিনোলজি ও সুগার (Diabetes & Hormones)', nameEn: 'Endocrinology' },
  { key: 'nephrology', nameBn: 'নেফ্রোলজি ও কিডনি (Nephrology)', nameEn: 'Nephrology' },
  { key: 'neurosurgery', nameBn: 'নিউরোসার্জারি (Brain & Spine)', nameEn: 'Neurosurgery' },
  { key: 'oncology', nameBn: 'ক্যান্সার ও অনকোলজি (Oncology)', nameEn: 'Oncology' },
  { key: 'dietetics', nameBn: 'ডায়েট ও পুষ্টি বিশেষজ্ঞ (Dietitian)', nameEn: 'Clinical Nutrition & Dietetics' },
  { key: 'counselling', nameBn: 'কাউন্সেলিং ও মনস্তত্ত্ব (Psychologist)', nameEn: 'Psychology & Counselling' },
  { key: 'physiotherapy', nameBn: 'ফিজিওথেরাপি (Physiotherapy)', nameEn: 'Physiotherapy' }
];

export function getAllFacilities(): HealthcareFacility[] {
  return HEALTHCARE_FACILITIES;
}

export function getFacilityBySlug(slug: string): HealthcareFacility | undefined {
  return HEALTHCARE_FACILITIES.find(f => f.slug === slug);
}

export function getFacilitiesByType(type: FacilityType): HealthcareFacility[] {
  return HEALTHCARE_FACILITIES.filter(f => f.type === type);
}

export function getAllDoctors(): { facility: HealthcareFacility; doctor: DoctorOPD }[] {
  const result: { facility: HealthcareFacility; doctor: DoctorOPD }[] = [];
  for (const fac of HEALTHCARE_FACILITIES) {
    for (const doc of fac.doctors) {
      result.push({ facility: fac, doctor: doc });
    }
  }
  return result;
}

export function getDoctorsBySpecialty(specialtyKey: string): { facility: HealthcareFacility; doctor: DoctorOPD }[] {
  const all = getAllDoctors();
  if (!specialtyKey || specialtyKey === 'all') return all;
  return all.filter(item => item.doctor.specialtyKey === specialtyKey);
}
