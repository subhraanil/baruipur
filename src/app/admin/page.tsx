'use client';

import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Plus, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Sliders, 
  FileText, 
  ExternalLink,
  Edit,
  Flame,
  Globe,
  Send,
  Youtube,
  Rss,
  Play,
  Clock,
  Sparkles,
  Search,
  X,
  Eye,
  Check
} from 'lucide-react';
import { Article, Source, CrawlLog, ArticleCategory } from '@/lib/types';
import { CATEGORIES } from '@/lib/constants';
import { formatBengaliDate, formatTimeAgoBengali } from '@/lib/dateUtils';
import { getVideoEmbedUrl } from '@/lib/videoUtils';

export default function AdminPage() {
  const [sources, setSources] = useState<Source[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [logs, setLogs] = useState<CrawlLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [crawling, setCrawling] = useState(false);
  const [crawlMessage, setCrawlMessage] = useState<string | null>(null);

  // New source form state
  const [showAddSource, setShowAddSource] = useState(false);
  const [sourceName, setSourceName] = useState('');
  const [sourceType, setSourceType] = useState<'facebook' | 'telegram' | 'youtube' | 'rss'>('telegram');
  const [sourceUrl, setSourceUrl] = useState('');
  const [sourceHandle, setSourceHandle] = useState('');
  const [defaultCategory, setDefaultCategory] = useState<ArticleCategory>('general');
  const [autoPublish, setAutoPublish] = useState(true);

  // Article Management Modal state (Add / Edit)
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [artTitle, setArtTitle] = useState('');
  const [artCategory, setArtCategory] = useState<ArticleCategory>('general');
  const [artSourceName, setArtSourceName] = useState('');
  const [artImageUrl, setArtImageUrl] = useState('');
  const [artVideoUrl, setArtVideoUrl] = useState('');
  const [artSummary, setArtSummary] = useState('');
  const [artContent, setArtContent] = useState('');
  const [artIsBreaking, setArtIsBreaking] = useState(false);
  const [artIsFeatured, setArtIsFeatured] = useState(false);
  const [artStatus, setArtStatus] = useState<'published' | 'draft' | 'archived'>('published');

  // Article Search & Filter state
  const [articleSearch, setArticleSearch] = useState('');
  const [articleCategoryFilter, setArticleCategoryFilter] = useState('all');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'sources' | 'articles' | 'logs'>('sources');

  const fetchData = async () => {
    try {
      const [sourcesRes, articlesRes, logsRes] = await Promise.all([
        fetch('/api/sources'),
        fetch('/api/articles?status=all'),
        fetch('/api/crawler/logs')
      ]);

      const sourcesData = await sourcesRes.json();
      const articlesData = await articlesRes.json();
      const logsData = await logsRes.json();

      if (sourcesData.data) setSources(sourcesData.data);
      if (articlesData.data) setArticles(articlesData.data);
      if (logsData.data) setLogs(logsData.data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCrawlAll = async () => {
    setCrawling(true);
    setCrawlMessage('সমস্ত সোশ্যাল মিডিয়া উৎস ক্রল করা হচ্ছে...');
    try {
      const res = await fetch('/api/crawler/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ all: true })
      });
      const data = await res.json();
      if (data.success) {
        setCrawlMessage(data.message || 'ক্রলিং সম্পন্ন হয়েছে!');
        fetchData();
      } else {
        setCrawlMessage('ক্রলিং ব্যর্থ: ' + data.error);
      }
    } catch (err: any) {
      setCrawlMessage('ত্রুটি: ' + err.message);
    } finally {
      setCrawling(false);
    }
  };

  const handleCrawlSingle = async (sourceId: string) => {
    setCrawling(true);
    setCrawlMessage('নির্বাচিত উৎস থেকে ক্রলিং শুরু হচ্ছে...');
    try {
      const res = await fetch('/api/crawler/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceId })
      });
      const data = await res.json();
      if (data.success) {
        setCrawlMessage(data.message);
        fetchData();
      } else {
        setCrawlMessage('ত্রুটি: ' + data.error);
      }
    } catch (err: any) {
      setCrawlMessage('ত্রুটি: ' + err.message);
    } finally {
      setCrawling(false);
    }
  };

  const handleAddSource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceName.trim() || !sourceUrl.trim()) return;

    const newSource: Source = {
      id: 'src-' + Date.now(),
      name: sourceName.trim(),
      type: sourceType,
      url: sourceUrl.trim(),
      handle: sourceHandle.trim(),
      defaultCategory,
      autoPublish,
      isActive: true,
      postsCount: 0
    };

    // Optimistic UI update: instantly appears in the table!
    setSources(prev => [newSource, ...prev]);
    const addedName = sourceName;
    setSourceName('');
    setSourceUrl('');
    setSourceHandle('');
    setShowAddSource(false);
    setCrawlMessage(`'${addedName}' সফলভাবে নতুন সোশ্যাল মিডিয়া উৎস হিসেবে যোগ করা হয়েছে!`);

    try {
      const res = await fetch('/api/sources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSource)
      });
      const data = await res.json();
      if (data.data) {
        setSources(prev => prev.map(s => s.id === newSource.id ? data.data : s));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Safe source deletion: strictly removes source metadata only, NEVER deletes past crawled articles!
  const handleDeleteSource = async (id: string) => {
    // Optimistic delete: instantly disappears from table without blocking dialog!
    setSources(prev => prev.filter(s => s.id !== id));
    setCrawlMessage('উৎসটি তালিকা থেকে মুছে ফেলা হয়েছে (পূর্বে সংগৃহীত সমস্ত খবর ওয়েবসাইটে সুরক্ষিত আছে)।');

    try {
      await fetch(`/api/sources?id=${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    // Optimistic delete: instantly disappears from table!
    setArticles(prev => prev.filter(a => a.id !== id));
    setCrawlMessage('সংবাদটি সফলভাবে মুছে ফেলা হয়েছে।');

    try {
      await fetch(`/api/articles?id=${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleAutoPublish = async (source: Source) => {
    const updated = { ...source, autoPublish: !source.autoPublish };
    setSources(prev => prev.map(s => s.id === source.id ? updated : s));
    try {
      await fetch('/api/sources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Open Add Article Modal
  const openAddArticleModal = () => {
    setModalMode('add');
    setEditingArticleId(null);
    setArtTitle('');
    setArtCategory('general');
    setArtSourceName('বারুইপুর বার্তা ডেস্ক');
    setArtImageUrl('https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80');
    setArtVideoUrl('');
    setArtSummary('');
    setArtContent('');
    setArtIsBreaking(false);
    setArtIsFeatured(false);
    setArtStatus('published');
    setShowArticleModal(true);
  };

  // Open Edit Article Modal
  const openEditArticleModal = (article: Article) => {
    setModalMode('edit');
    setEditingArticleId(article.id);
    setArtTitle(article.title);
    setArtCategory(article.category);
    setArtSourceName(article.sourceName || 'বারুইপুর বার্তা ডেস্ক');
    setArtImageUrl(article.imageUrl || '');
    setArtVideoUrl(article.videoUrl || article.videoEmbedUrl || '');
    setArtSummary(article.summary || '');
    setArtContent(article.content || '');
    setArtIsBreaking(Boolean(article.isBreaking));
    setArtIsFeatured(Boolean(article.isFeatured));
    setArtStatus(article.status || 'published');
    setShowArticleModal(true);
  };

  // Save Article (Create or Edit)
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artTitle.trim() || !artContent.trim()) {
      alert('অনুগ্রহ করে শিরোনাম ও পূর্ণ বিবরণ প্রদান করুন।');
      return;
    }

    const catObj = CATEGORIES.find(c => c.id === artCategory) || CATEGORIES[0];
    const trimmedVideo = artVideoUrl.trim();
    const videoEmbed = trimmedVideo ? getVideoEmbedUrl(trimmedVideo) : undefined;

    const newArt: Article = {
      id: modalMode === 'edit' && editingArticleId ? editingArticleId : 'art-' + Date.now(),
      title: artTitle.trim(),
      slug: 'baruipur-' + Date.now(),
      category: artCategory,
      categoryNameBn: catObj.nameBn,
      sourceName: artSourceName.trim() || 'বারুইপুর বার্তা ডেস্ক',
      sourceType: 'manual',
      sourceId: 'manual',
      imageUrl: artImageUrl.trim() || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80',
      videoUrl: trimmedVideo || undefined,
      videoEmbedUrl: videoEmbed,
      summary: artSummary.trim() || artContent.substring(0, 160) + '...',
      content: artContent.trim(),
      publishedAt: new Date().toISOString(),
      isBreaking: artIsBreaking,
      isFeatured: artIsFeatured,
      status: artStatus,
      views: 0
    };

    if (modalMode === 'edit') {
      setArticles(prev => prev.map(a => a.id === editingArticleId ? { ...a, ...newArt } : a));
    } else {
      setArticles(prev => [newArt, ...prev]);
    }
    setShowArticleModal(false);
    setCrawlMessage(modalMode === 'add' ? 'নতুন সংবাদ সফলভাবে প্রকাশিত হয়েছে!' : 'সংবাদ সফলভাবে আপডেট হয়েছে!');

    try {
      await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArt)
      });
    } catch (err: any) {
      console.error(err);
    }
  };

  // Filtered articles
  const filteredArticles = articles.filter(art => {
    const matchesSearch = !articleSearch || 
      art.title.toLowerCase().includes(articleSearch.toLowerCase()) ||
      art.content.toLowerCase().includes(articleSearch.toLowerCase());
    const matchesCat = articleCategoryFilter === 'all' || art.category === articleCategoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">কন্ট্রোল প্যানেল</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              সোশ্যাল মিডিয়া ক্রলার ও সংবাদ ড্যাশবোর্ড
            </h1>
          </div>
          <p className="text-slate-600 text-sm mt-1">
            ফেসবুক, টেলিগ্রাম ও চ্যানেল থেকে খবর সংগ্রহ এবং সম্পূর্ণ সংবাদ সম্পাদনা ও নিয়ন্ত্রণ
          </p>
        </div>

        {/* Big Action Button: Crawl All Now */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCrawlAll}
            disabled={crawling}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition ${
              crawling 
                ? 'bg-amber-500 text-white cursor-wait' 
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${crawling ? 'animate-spin' : ''}`} />
            <span>{crawling ? 'ক্রলিং চলছে...' : 'এখনই সমস্ত উৎস ক্রল করুন'}</span>
          </button>
        </div>
      </div>

      {/* Crawl Status Alert */}
      {crawlMessage && (
        <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-blue-900 font-medium">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>{crawlMessage}</span>
          </div>
          <button 
            onClick={() => setCrawlMessage(null)}
            className="text-xs text-blue-600 hover:underline font-bold"
          >
            বন্ধ করুন
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold">সক্রিয় সোশ্যাল মিডিয়া উৎস</div>
          <div className="text-3xl font-black text-slate-900 mt-1">
            {sources.filter(s => s.isActive).length}
          </div>
          <p className="text-xs text-emerald-600 mt-1 font-medium">উৎস মুছে ফেললেও সমস্ত পোস্ট অক্ষত থাকে</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold">মোট সংবাদ সংখ্যা</div>
          <div className="text-3xl font-black text-red-600 mt-1">
            {articles.length}
          </div>
          <p className="text-xs text-slate-500 mt-1">সরাসরি সম্পাদনা, সংযোজন ও ডিলিট সুবিধাযুক্ত</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold">স্বয়ংক্রিয় প্রকাশ মোড (Auto-Publish)</div>
          <div className="text-xl font-bold text-emerald-600 mt-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            সক্রিয় (চালু রয়েছে)
          </div>
          <p className="text-[11px] text-slate-500 mt-1">নতুন খবর ক্রল হলেই তৎক্ষণাৎ লাইভ হয়</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 mt-8 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('sources')}
          className={`px-4 py-2.5 text-sm font-bold border-b-2 transition ${
            activeTab === 'sources'
              ? 'border-red-600 text-red-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          সোশ্যাল মিডিয়া উৎসসমূহ ({sources.length})
        </button>
        <button
          onClick={() => setActiveTab('articles')}
          className={`px-4 py-2.5 text-sm font-bold border-b-2 transition ${
            activeTab === 'articles'
              ? 'border-red-600 text-red-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          সংবাদ পরিচালনা (Edit / Add / Delete) ({articles.length})
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2.5 text-sm font-bold border-b-2 transition ${
            activeTab === 'logs'
              ? 'border-red-600 text-red-600'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          ক্রলার লগ ও হিস্ট্রি
        </button>
      </div>

      {/* TAB 1: Sources Manager */}
      {activeTab === 'sources' && (
        <div className="mt-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-red-50/70 p-4 rounded-xl border border-red-150">
            <div>
              <h3 className="font-bold text-slate-900 text-base">সোশ্যাল মিডিয়া সোর্স পলিসি ও ডেটা সুরক্ষা</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                কোনো ফেসবুক বা টেলিগ্রাম পেজ রিমুভ করলেও <strong>পূর্বের কোনো খবর মুছে যাবে না</strong>। সংবাদগুলো আজীবন ডাটাবেসে সুরক্ষিত থাকবে।
              </p>
            </div>
            <button
              onClick={() => setShowAddSource(!showAddSource)}
              className="flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              নতুন পেজ / চ্যানেল যোগ করুন
            </button>
          </div>

          {/* Add Source Form Modal/Card */}
          {showAddSource && (
            <form onSubmit={handleAddSource} className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-inner space-y-4">
              <h4 className="font-bold text-slate-900 text-sm">নতুন ক্রলার সোর্স কনফিগার করুন</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">উৎস বা পেজের নাম</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: বারুইপুর সিটি নিউজ ২৪"
                    value={sourceName}
                    onChange={(e) => setSourceName(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">প্ল্যাটফর্ম টাইপ</label>
                  <select
                    value={sourceType}
                    onChange={(e: any) => setSourceType(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
                  >
                    <option value="facebook">Facebook Page / Group</option>
                    <option value="telegram">Telegram Channel (Public)</option>
                    <option value="youtube">YouTube News Channel</option>
                    <option value="rss">RSS / Atom Feed</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">পেজ বা ফিডের সম্পূর্ণ URL</label>
                  <input
                    type="url"
                    required
                    placeholder="যেমন: https://t.me/s/baruipur_update অথবা ফেসবুক লিংক"
                    value={sourceUrl}
                    onChange={(e) => setSourceUrl(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">হ্যান্ডেল বা ইউজারনেম (ঐচ্ছিক)</label>
                  <input
                    type="text"
                    placeholder="যেমন: baruipur_news"
                    value={sourceHandle}
                    onChange={(e) => setSourceHandle(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ডিফল্ট ক্যাটাগরি</label>
                  <select
                    value={defaultCategory}
                    onChange={(e: any) => setDefaultCategory(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.nameBn}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center mt-5">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={autoPublish}
                      onChange={(e) => setAutoPublish(e.target.checked)}
                      className="w-4 h-4 text-red-600 rounded"
                    />
                    <span>স্বয়ংক্রিয় প্রকাশ (Auto-Publish) চালু রাখুন</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddSource(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-200 rounded-lg"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg shadow"
                >
                  উৎস সংরক্ষণ করুন
                </button>
              </div>
            </form>
          )}

          {/* Source List Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">প্ল্যাটফর্ম ও নাম</th>
                    <th className="py-3 px-4">লিংক / হ্যান্ডেল</th>
                    <th className="py-3 px-4">স্বয়ংক্রিয় প্রকাশ</th>
                    <th className="py-3 px-4">সংগৃহীত পোস্ট</th>
                    <th className="py-3 px-4">শেষ ক্রল</th>
                    <th className="py-3 px-4 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150">
                  {sources.map((src) => (
                    <tr key={src.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="p-1.5 rounded bg-slate-100 text-slate-700">
                            {src.type === 'facebook' && <Globe className="w-3.5 h-3.5 text-blue-600" />}
                            {src.type === 'telegram' && <Send className="w-3.5 h-3.5 text-sky-500" />}
                            {src.type === 'youtube' && <Youtube className="w-3.5 h-3.5 text-red-600" />}
                            {src.type === 'rss' && <Rss className="w-3.5 h-3.5 text-amber-500" />}
                          </span>
                          <div>
                            <p className="font-bold text-slate-900">{src.name}</p>
                            <p className="text-[11px] text-slate-400 capitalize">{src.type}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <a 
                          href={src.url} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-blue-600 hover:underline max-w-[180px] truncate block"
                        >
                          {src.handle || src.url}
                        </a>
                      </td>

                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleAutoPublish(src)}
                          className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                            src.autoPublish
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {src.autoPublish ? 'সক্রিয় (Auto)' : 'ড্রাফট (Manual)'}
                        </button>
                      </td>

                      <td className="py-3 px-4 font-semibold">
                        {src.postsCount} টি
                      </td>

                      <td className="py-3 px-4 text-slate-500">
                        {src.lastCrawledAt ? formatTimeAgoBengali(src.lastCrawledAt) : 'এখনো ক্রল হয়নি'}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleCrawlSingle(src.id)}
                            disabled={crawling}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-2.5 py-1 rounded font-semibold text-[11px] flex items-center gap-1"
                            title="এই পেজ থেকে ক্রল করুন"
                          >
                            <Play className="w-3 h-3 text-red-600 fill-red-600" />
                            <span>ক্রল</span>
                          </button>
                          <button
                            onClick={() => handleDeleteSource(src.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                            title="উৎস মুছুন (পোস্টগুলো অক্ষত থাকবে)"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Full Post Management (Add / Edit / Delete) */}
      {activeTab === 'articles' && (
        <div className="mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">সংবাদ পরিচালনা কেন্দ্র ({filteredArticles.length} টি)</h3>
              <p className="text-xs text-slate-500">যেকোনো সংবাদ সরাসরি সম্পাদন (Edit), নতুন সংবাদ সংযোজন (Add) অথবা ডিলিট (Delete) করুন</p>
            </div>

            <button
              onClick={openAddArticleModal}
              className="flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition"
            >
              <Plus className="w-4 h-4" />
              <span>নতুন সংবাদ যোগ করুন</span>
            </button>
          </div>

          {/* Search and Category Filter Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 bg-white p-3 rounded-xl border border-slate-200">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="সংবাদের শিরোনাম বা বিষয়বস্তু খুঁজুন..."
                value={articleSearch}
                onChange={(e) => setArticleSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 pl-3 pr-8 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
            </div>

            <select
              value={articleCategoryFilter}
              onChange={(e) => setArticleCategoryFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.nameBn}</option>
              ))}
            </select>
          </div>

          {/* Articles Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">সংবাদ শিরোনাম</th>
                    <th className="py-3 px-4">ক্যাটাগরি</th>
                    <th className="py-3 px-4">উৎস</th>
                    <th className="py-3 px-4">স্ট্যাটাস</th>
                    <th className="py-3 px-4">প্রকাশকাল</th>
                    <th className="py-3 px-4 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150">
                  {filteredArticles.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-500">
                        কোনো সংবাদ পাওয়া যায়নি।
                      </td>
                    </tr>
                  ) : (
                    filteredArticles.map((art) => (
                      <tr key={art.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3 px-4 max-w-sm">
                          <div className="flex items-center gap-2">
                            {art.isBreaking && (
                              <span className="bg-red-600 text-white text-[9px] font-bold px-1 rounded uppercase">তাজা</span>
                            )}
                            {(art.videoUrl || art.videoEmbedUrl) && (
                              <span className="bg-purple-600 text-white text-[9px] font-bold px-1 py-0.5 rounded flex items-center gap-0.5 shadow">
                                <Play className="w-2.5 h-2.5 fill-current" />
                                ভিডিও
                              </span>
                            )}
                            <a 
                              href={`/${art.slug || art.id}`} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="font-bold text-slate-900 hover:text-red-600 line-clamp-1"
                            >
                              {art.title}
                            </a>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold text-[11px]">
                            {art.categoryNameBn}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-slate-600 truncate max-w-[140px]">
                          {art.sourceName}
                        </td>

                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            art.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {art.status === 'published' ? 'লাইভ' : 'ড্রাফট'}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                          {formatTimeAgoBengali(art.publishedAt)}
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <a 
                              href={`/${art.slug || art.id}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1 text-slate-500 hover:text-blue-600 rounded"
                              title="ওয়েবসাইটে দেখুন"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </a>
                            <button
                              onClick={() => openEditArticleModal(art)}
                              className="p-1 text-slate-500 hover:text-amber-600 rounded bg-slate-100 hover:bg-amber-50"
                              title="সম্পাদনা করুন (Edit)"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteArticle(art.id)}
                              className="p-1 text-slate-500 hover:text-red-600 rounded bg-slate-100 hover:bg-red-50"
                              title="মুছে ফেলুন (Delete)"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Crawl Logs */}
      {activeTab === 'logs' && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-lg">ক্রলিং এক্সিকিউশন হিস্ট্রি</h3>
            <button
              onClick={fetchData}
              className="text-xs text-red-600 font-bold hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              রিফ্রেশ
            </button>
          </div>

          <div className="bg-slate-950 text-slate-200 font-mono text-xs rounded-xl p-4 shadow-inner space-y-2 max-h-[500px] overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-slate-500">কোনো লগ রেকর্ড পাওয়া যায়নি।</p>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="border-b border-slate-800/80 pb-2">
                  <div className="flex items-center justify-between text-slate-400 text-[11px] mb-1">
                    <span className="text-emerald-400">[{formatBengaliDate(log.timestamp)}]</span>
                    <span className="text-slate-500 font-sans">{log.sourceName}</span>
                  </div>
                  <p className="text-slate-100 font-sans">
                    {log.message}
                  </p>
                  <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-3 font-sans">
                    <span>সংগৃহীত: {log.itemsFetched} টি</span>
                    <span>স্বয়ংক্রিয় প্রকাশিত: {log.itemsPublished} টি</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Article Add / Edit Modal */}
      {showArticleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between border-b border-slate-150 pb-3 mb-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Edit className="w-5 h-5 text-red-600" />
                <span>{modalMode === 'add' ? 'নতুন সংবাদ তৈরি করুন' : 'সংবাদ সম্পাদনা করুন'}</span>
              </h3>
              <button 
                onClick={() => setShowArticleModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4 text-xs">
              {/* Title */}
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  সংবাদের পূর্ণ শিরোনাম *
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: বারুইপুর জংশনে নতুন প্যাসেঞ্জার বিশ্রামাগার উদ্বোধন..."
                  value={artTitle}
                  onChange={(e) => setArtTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              {/* Category & Source Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    সংবাদ বিভাগ (Category)
                  </label>
                  <select
                    value={artCategory}
                    onChange={(e: any) => setArtCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                  >
                    {CATEGORIES.slice(1).map(c => (
                      <option key={c.id} value={c.id}>{c.nameBn}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    সংবাদ সূত্র / প্রতিবেদক
                  </label>
                  <input
                    type="text"
                    placeholder="যেমন: বারুইপুর বার্তা নিজস্ব প্রতিনিধি"
                    value={artSourceName}
                    onChange={(e) => setArtSourceName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Image URL & Video URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    ফিচার্ড ছবির URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={artImageUrl}
                    onChange={(e) => setArtImageUrl(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1 flex items-center gap-1">
                    <Play className="w-3.5 h-3.5 text-purple-600 fill-purple-600" />
                    <span>ভিডিও লিংক (YouTube / FB / MP4 - ঐচ্ছিক)</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://youtube.com/watch?v=... (ঐচ্ছিক)"
                    value={artVideoUrl}
                    onChange={(e) => setArtVideoUrl(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  সংক্ষিপ্ত সারসংক্ষেপ (Summary)
                </label>
                <textarea
                  rows={2}
                  placeholder="সংবাদের মূল আকর্ষণ বা সংক্ষেপ..."
                  value={artSummary}
                  onChange={(e) => setArtSummary(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              {/* Full Content */}
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  সম্পূর্ণ সংবাদ বিবরণ (Full Content) *
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="এখানে সম্পূর্ণ সংবাদ প্রতিবেদনটি লিখুন বা পেস্ট করুন..."
                  value={artContent}
                  onChange={(e) => setArtContent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs leading-relaxed focus:bg-white focus:ring-2 focus:ring-red-500 focus:outline-none font-sans"
                />
              </div>

              {/* Checkboxes & Status */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-150">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={artIsBreaking}
                      onChange={(e) => setArtIsBreaking(e.target.checked)}
                      className="w-4 h-4 text-red-600 rounded"
                    />
                    <span>তাজা খবর (Breaking News)</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={artIsFeatured}
                      onChange={(e) => setArtIsFeatured(e.target.checked)}
                      className="w-4 h-4 text-red-600 rounded"
                    />
                    <span>আলোচিত খবর (Featured)</span>
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700">স্ট্যাটাস:</span>
                  <select
                    value={artStatus}
                    onChange={(e: any) => setArtStatus(e.target.value)}
                    className="bg-slate-100 border border-slate-300 rounded px-2 py-1 font-bold text-xs"
                  >
                    <option value="published">সরাসরি প্রকাশ (Live)</option>
                    <option value="draft">ড্রাফট (খসড়া)</option>
                  </select>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-150">
                <button
                  type="button"
                  onClick={() => setShowArticleModal(false)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-lg font-bold"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg shadow flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{modalMode === 'add' ? 'সংবাদ প্রকাশ করুন' : 'পরিবর্তন সংরক্ষণ করুন'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
