import placesData from '@/data/places_data.json';

export interface PlaceItem {
  slug: string;
  nameBn: string;
  nameEn: string;
  taglineBn: string;
  category: string;
  schemaType: string;
  established: string;
  wardsCount?: number;
  overview: string;
  history: string;
  administrativeDetails: Record<string, string>;
  keyServices: string[];
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  contact: Record<string, string>;
  timings: string;
  howToReach: string;
  faqs: Array<{ question: string; answer: string }>;
}

export const getAllPlaces = (): PlaceItem[] => {
  return placesData as PlaceItem[];
};

export const getPlaceBySlug = (slug: string): PlaceItem | undefined => {
  const decoded = decodeURIComponent(slug).toLowerCase();
  return (placesData as PlaceItem[]).find(
    p => p.slug.toLowerCase() === decoded
  );
};
