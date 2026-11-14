'use client';

import React, { useState, useMemo } from 'react';
import { 
  Bell, 
  Search, 
  Calendar, 
  Building2, 
  FileText, 
  ExternalLink, 
  Download, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  X,
  Share2,
  Printer
} from 'lucide-react';
import { Notice, NoticeDepartment } from '@/lib/notices';

interface NoticesClientProps {
  initialNotices: Notice[];
  departments: NoticeDepartment[];
}

export default function NoticesClient({ initialNotices, departments }: NoticesClientProps) {
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeNoticeModal, setActiveNoticeModal] = useState<Notice | null>(null);
  const [expandedNoticeId, setExpandedNoticeId] = useState<string | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    initialNotices.forEach(n => {
      if (n.category) cats.add(n.category);
    });
    return Array.from(cats);
  }, [initialNotices]);

  // Filter notices
  const filteredNotices = useMemo(() => {
    return initialNotices.filter(notice => {
      const matchesDept = selectedDept === 'all' || notice.departmentId === selectedDept;
      const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        notice.title.toLowerCase().includes(query) ||
        notice.memoNo.toLowerCase().includes(query) ||
        notice.departmentName.toLowerCase().includes(query) ||
        notice.summary.toLowerCase().includes(query) ||
        notice.category.toLowerCase().includes(query);

      return matchesDept && matchesCategory && matchesSearch;
    });
  }, [initialNotices, selectedDept, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="নোটিসের বিষয়, মেমো নম্বর বা দপ্তর লিখে খুঁজুন (উদাঃ পানীয় জল, ভোটার, ডেঙ্গু, বিদ্যুৎ)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="all">সব ক্যাটাগরি</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Department Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
          <button
            onClick={() => setSelectedDept('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedDept === 'all'
                ? 'bg-slate-900 text-white shadow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🏛️ সকল দপ্তর ({initialNotices.length})
          </button>
          {departments.map(dept => {
            const count = initialNotices.filter(n => n.departmentId === dept.id).length;
            return (
              <button
                key={dept.id}
                onClick={() => setSelectedDept(dept.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedDept === dept.id
                    ? 'bg-amber-600 text-white shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {dept.shortName} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Notices Count & Subtitle */}
      <div className="flex items-center justify-between text-sm text-slate-600 px-1">
        <span>মোট <strong>{filteredNotices.length}</strong> টি জরুরি সরকারি বিজ্ঞপ্তি পাওয়া গেছে (তারিখভিত্তিক ক্রমানুসারে)</span>
        <span className="text-xs text-slate-500 hidden sm:inline">বারুইপুর মহকুমা প্রশাসন ও পৌর দপ্তর</span>
      </div>

      {/* Notices List */}
      {filteredNotices.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-700">কোনো নোটিস মেলেনি</h3>
          <p className="text-slate-500 text-sm mt-1">দয়া করে অন্য কি-ওয়ার্ড বা ফিল্টার নির্বাচন করুন।</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotices.map((notice) => {
            const isExpanded = expandedNoticeId === notice.id;

            return (
              <div 
                key={notice.id}
                className={`bg-white rounded-2xl border transition-all duration-200 p-5 sm:p-6 space-y-4 shadow-2xs hover:shadow-md ${
                  notice.isUrgent ? 'border-amber-300 bg-amber-50/15' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Notice Top Bar: Badges & Date */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-xs font-bold border border-slate-200">
                      <Building2 className="w-3.5 h-3.5 text-blue-600" />
                      <span>{notice.departmentName}</span>
                    </span>

                    <span className="bg-slate-50 text-slate-600 text-xs px-2.5 py-1 rounded-md border border-slate-200 font-mono">
                      {notice.memoNo}
                    </span>

                    {notice.isUrgent && (
                      <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-red-200">
                        <AlertTriangle className="w-3 h-3 text-red-600" />
                        <span>জরুরি নির্দেশিকা</span>
                      </span>
                    )}

                    <span className="bg-amber-100 text-amber-900 text-xs font-medium px-2.5 py-0.5 rounded-md">
                      {notice.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>প্রকাশ: <strong>{notice.publishedDateFormatted}</strong></span>
                  </div>
                </div>

                {/* Notice Title & Summary */}
                <div className="space-y-2">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug hover:text-amber-700 transition">
                    {notice.title}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {notice.summary}
                  </p>
                </div>

                {/* Expandable Verbatim Content */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-dashed border-slate-200 bg-slate-50/80 rounded-xl p-4 text-xs sm:text-sm text-slate-700 space-y-3 whitespace-pre-line leading-relaxed">
                    <div className="font-bold text-slate-900 flex items-center justify-between">
                      <span>অফিসিয়াল বিজ্ঞপ্তির মূল পাঠ (Official Verbatim):</span>
                      <span className="text-xs text-slate-500 font-normal">মেমো নং: {notice.memoNo}</span>
                    </div>
                    <div>{notice.content}</div>
                    <div className="pt-2 text-right text-xs font-bold text-slate-800 border-t border-slate-200">
                      — {notice.signatory}
                    </div>
                  </div>
                )}

                {/* Actions Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2.5">
                    {/* View Details On-Page Modal - PRIMARY HIGHLIGHTED BUTTON */}
                    <button
                      onClick={() => setActiveNoticeModal(notice)}
                      className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-xs hover:shadow transition transform hover:-translate-y-0.5"
                    >
                      <Eye className="w-4 h-4" />
                      <span>বিস্তারিত পড়ুন / পাঠ্য দেখুন</span>
                    </button>

                    {/* Quick Expand Toggle */}
                    <button
                      onClick={() => setExpandedNoticeId(isExpanded ? null : notice.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
                          <span>সংক্ষেপ করুন</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                          <span>ইন-লাইন পাঠ্য</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Original Source Link (Secondary, NOT highlighted) */}
                  <a
                    href={notice.sourceUrl || notice.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 text-xs font-medium px-3.5 py-2 rounded-xl transition"
                    title="অফিসিয়াল সরকারি পোর্টালে মূল নোটিস দেখুন"
                  >
                    <span>অফিসিয়াল সূত্র ({notice.sourcePortalName || 'মূল সার্কুলার'})</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for Reading Full Official Circular */}
      {activeNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-slate-100 text-slate-800 text-xs font-bold px-2.5 py-1 rounded-md">
                    {activeNoticeModal.departmentName}
                  </span>
                  <span className="text-xs font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                    {activeNoticeModal.memoNo}
                  </span>
                  {activeNoticeModal.isUrgent && (
                    <span className="bg-red-100 text-red-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                      জরুরি
                    </span>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {activeNoticeModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveNoticeModal(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Meta Bar */}
            <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-purple-600" />
                <span>প্রকাশের তারিখ: <strong>{activeNoticeModal.publishedDateFormatted}</strong></span>
              </span>
              <span>বিষয়: <strong>{activeNoticeModal.category}</strong></span>
            </div>

            {/* Modal Full Text */}
            <div className="space-y-3 text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line bg-white p-2">
              <div className="font-semibold text-slate-900 border-b border-slate-100 pb-2">
                বিজ্ঞপ্তির বিস্তারিত বিবরণ:
              </div>
              <div>{activeNoticeModal.content}</div>
              <div className="pt-4 text-right text-xs sm:text-sm font-bold text-slate-900 border-t border-slate-100">
                স্বাক্ষরিত: {activeNoticeModal.signatory}
              </div>
            </div>

            {/* Modal Footer Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>প্রিন্ট করুন</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={activeNoticeModal.sourceUrl || activeNoticeModal.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-xs"
                >
                  <span>সরকারি পোর্টালে মূল নোটিস দেখুন ({activeNoticeModal.sourcePortalName || 'অফিসিয়াল সোর্স'})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
