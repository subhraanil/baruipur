import tendersData from '@/data/tenders_data.json';

export interface TenderAuthority {
  id: string;
  name: string;
  code: string;
}

export interface Tender {
  id: string;
  nitNumber: string;
  title: string;
  titleEn: string;
  authorityId: string;
  authorityName: string;
  department: string;
  location: string;
  category: string;
  estimatedValue: string;
  estimatedValueNum: number;
  emdAmount: string;
  tenderFee: string;
  publishDate: string;
  closingDate: string;
  bidOpeningDate: string;
  status: 'active' | 'evaluation' | 'closed';
  portalLink: string;
  tenderRef: string;
  eligibility: string;
}

export function getAllTenders(): Tender[] {
  return (tendersData.tenders as Tender[]) || [];
}

export function getActiveTenders(): Tender[] {
  return getAllTenders().filter(t => t.status === 'active');
}

export function getTendersByAuthority(authorityId: string): Tender[] {
  if (!authorityId || authorityId === 'all') return getAllTenders();
  return getAllTenders().filter(t => t.authorityId === authorityId);
}

export function getTenderById(id: string): Tender | undefined {
  return getAllTenders().find(t => t.id === id);
}

export function getTenderAuthorities(): TenderAuthority[] {
  return tendersData.authorities as TenderAuthority[];
}
