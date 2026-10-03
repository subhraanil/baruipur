import organizationsData from '@/data/organizations_data.json';

export interface OrganizationOfficial {
  name: string;
  roleBn: string;
  roleEn?: string;
  phone?: string;
}

export interface OrganizationPhoto {
  url: string;
  captionBn: string;
  captionEn?: string;
}

export interface OrganizationItem {
  slug: string;
  nameBn: string;
  nameEn: string;
  taglineBn: string;
  category: 'club' | 'charity' | 'association' | 'business';
  categoryBn: string;
  registrationType?: string;
  regNo?: string;
  established: string;
  yearEstablished: number;
  keyPeople: OrganizationOfficial[];
  overview: string;
  history: string;
  keyActivities: string[];
  servicesOffered?: string[];
  address: string;
  landmark?: string;
  wardNo?: number;
  pincode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  contact: {
    phone?: string;
    helpline?: string;
    whatsapp?: string;
    email?: string;
    website?: string;
    facebookUrl?: string;
  };
  timings?: string;
  howToReach: string;
  coverImage: string;
  images: OrganizationPhoto[];
  gmbEmbedUrl?: string;
  gmbMapUrl?: string;
  videoUrl?: string;
  schemaType: 'SportsClub' | 'NGO' | 'LocalBusiness' | 'Organization';
  metaTitle: string;
  metaDescription: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const organizations: OrganizationItem[] = organizationsData as OrganizationItem[];

export function getAllOrganizations(): OrganizationItem[] {
  return organizations;
}

export function getOrganizationBySlug(slug: string): OrganizationItem | undefined {
  return organizations.find((item) => item.slug === slug);
}

export function getOrganizationsByCategory(category: string): OrganizationItem[] {
  if (!category || category === 'all') return organizations;
  return organizations.filter((item) => item.category === category);
}

export function getFeaturedOrganizations(limit: number = 6): OrganizationItem[] {
  return organizations.slice(0, limit);
}
