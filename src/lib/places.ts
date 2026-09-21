import placesData from '@/data/places_data.json';

export interface WardItem {
  wardNo: number;
  nameBn: string;
  nameEn: string;
  phone?: string;
  designationBn?: string;
  designationEn?: string;
}

export interface PlacePhoto {
  url: string;
  captionBn: string;
  captionEn?: string;
}

export interface PlaceItem {
  slug: string;
  nameBn: string;
  nameEn: string;
  taglineBn: string;
  category: string;
  schemaType: string;
  established: string;
  wardsCount?: number;
  wards?: WardItem[];
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
  coverImage?: string;
  images?: PlacePhoto[];
  videoUrl?: string;
  videoEmbedUrl?: string;
  videoTitleBn?: string;
  gmbEmbedUrl?: string;
  gmbMapUrl?: string;
  entryFee?: string;
  bestTimeToVisit?: string;
  highlights?: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export const getAllPlaces = (): PlaceItem[] => {
  return placesData as PlaceItem[];
};

const ALIASES: Record<string, string> = {
  'baruipur-hospital': 'baruipur-subdivisional-hospital',
  'baruipur-junction': 'baruipur-junction-railway-station',
  'baruipur-bdo': 'baruipur-bdo-office',
  'baruipur-sdo': 'baruipur-sdo-office',
  'baruipur-mahaprabhu-tala': 'baruipur-mahaprabhu-tala-sadabrata-ghat'
};

export const getPlaceBySlug = (slug: string): PlaceItem | undefined => {
  const decoded = decodeURIComponent(slug).toLowerCase();
  const target = ALIASES[decoded] || decoded;
  return (placesData as PlaceItem[]).find(
    p => p.slug.toLowerCase() === target
  );
};
