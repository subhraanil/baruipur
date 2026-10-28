'use client';

import React, { useState } from 'react';
import { Share2, MessageCircle, Twitter, Facebook, Copy, Check } from 'lucide-react';

interface SocialShareBarProps {
  url: string;
  title: string;
}

export default function SocialShareBar({ url, title }: SocialShareBarProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `${title} | বারুইপুর অনলাইন`;
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(shareText);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 text-white rounded-2xl p-4 sm:p-5 my-6 shadow-sm border border-slate-800">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <Share2 className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white">খবরটি অন্যদের সঙ্গে শেয়ার করুন</h4>
            <p className="text-xs text-slate-300">বারুইপুরের সত্য ও যাচাইকৃত খবর বন্ধুদের মাঝে ছড়িয়ে দিন</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
          {/* WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-sm"
            title="হোয়াটসঅ্যাপে শেয়ার করুন"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-sm"
            title="ফেসবুকে শেয়ার করুন"
          >
            <Facebook className="w-4 h-4" />
            <span>Facebook</span>
          </a>

          {/* X / Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition border border-slate-700"
            title="X (Twitter)-এ শেয়ার করুন"
          >
            <Twitter className="w-4 h-4" />
            <span>Twitter</span>
          </a>

          {/* Copy Link */}
          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition border ${
              copied
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
            }`}
            title="লিংক কপি করুন"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'কপি হয়েছে!' : 'লিংক কপি'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
