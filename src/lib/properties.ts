import propertiesData from '@/data/properties_data.json';

export interface PropertyCategory {
  id: string;
  name: string;
}

export interface Property {
  id: string;
  title: string;
  titleEn: string;
  category: 'new_flat' | 'land_plot' | 'resale_house' | 'bank_auction' | 'commercial';
  categoryNameBn: string;
  location: string;
  locationArea: string;
  price: string;
  priceNum: number;
  priceUnit: string;
  configuration: string;
  areaSqFt: string;
  facing: string;
  floorInfo: string;
  possessionStatus: string;
  reraStatus: string;
  approvalStatus: string;
  bankLoanApproved: string;
  amenities: string[];
  description: string;
  imageUrl: string;
  images: string[];
  featured: boolean;
  contactPerson: string;
  contactPhone: string;
  contactWhatsapp: string;
  publishedAt: string;
}

export function getAllProperties(): Property[] {
  return (propertiesData.properties as Property[]) || [];
}

export function getFeaturedProperties(): Property[] {
  return getAllProperties().filter(p => p.featured);
}

export function getPropertiesByCategory(category: string): Property[] {
  if (!category || category === 'all') return getAllProperties();
  return getAllProperties().filter(p => p.category === category);
}

export function getPropertyById(id: string): Property | undefined {
  return getAllProperties().find(p => p.id === id);
}

export function getPropertyCategories(): PropertyCategory[] {
  return propertiesData.categories as PropertyCategory[];
}

export function getPropertyLocations(): string[] {
  return (propertiesData.locations as string[]) || [];
}
