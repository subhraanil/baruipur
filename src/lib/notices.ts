import noticesData from '@/data/notices_data.json';

export interface NoticeDepartment {
  id: string;
  name: string;
  shortName: string;
  code: string;
}

export interface Notice {
  id: string;
  memoNo: string;
  title: string;
  titleEn: string;
  departmentId: string;
  departmentName: string;
  publishedDate: string; // YYYY-MM-DD
  publishedDateFormatted: string;
  category: string;
  isUrgent: boolean;
  summary: string;
  content: string;
  pdfUrl: string;
  pdfSize?: string;
  signatory: string;
  status: 'active' | 'archived';
}

export function getAllNotices(): Notice[] {
  return (noticesData.notices as Notice[]) || [];
}

export function getActiveNotices(): Notice[] {
  return getAllNotices()
    .filter(n => n.status === 'active')
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
}

export function getUrgentNotices(): Notice[] {
  return getActiveNotices().filter(n => n.isUrgent);
}

export function getNoticesByDepartment(departmentId: string): Notice[] {
  if (!departmentId || departmentId === 'all') return getActiveNotices();
  return getActiveNotices().filter(n => n.departmentId === departmentId);
}

export function getNoticeById(id: string): Notice | undefined {
  return getAllNotices().find(n => n.id === id);
}

export function getNoticeDepartments(): NoticeDepartment[] {
  return noticesData.departments as NoticeDepartment[];
}
