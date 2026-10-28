'use client';

import React, { useState } from 'react';
import { ListCollapse, ChevronDown, ChevronUp } from 'lucide-react';
import { slugifyHeading } from './MarkdownRenderer';

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!content) return null;

  const headings: HeadingItem[] = [];
  const lines = content.replace(/\r\n/g, '\n').split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ')) {
      const text = trimmed.slice(3).replace(/[#*`]/g, '').trim();
      headings.push({ id: slugifyHeading(text), text, level: 2 });
    } else if (trimmed.startsWith('### ')) {
      const text = trimmed.slice(4).replace(/[#*`]/g, '').trim();
      headings.push({ id: slugifyHeading(text), text, level: 3 });
    }
  }

  // Only show TOC if there are 2 or more sections
  if (headings.length < 2) return null;

  return (
    <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 my-6 shadow-xs">
      <div 
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-red-100/70 text-red-600">
            <ListCollapse className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-slate-900 text-sm sm:text-base">
            এই প্রতিবেদনে যা যা রয়েছে (সূচিপত্র)
          </span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200/70 text-slate-700">
            {headings.length}টি বিভাগ
          </span>
        </div>
        <button 
          type="button"
          aria-label={isOpen ? "সূচিপত্র বন্ধ করুন" : "সূচিপত্র খুলুন"}
          className="text-slate-500 hover:text-slate-800 p-1"
        >
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isOpen && (
        <nav className="mt-3.5 pt-3.5 border-t border-slate-200/80 space-y-1.5 text-xs sm:text-sm">
          {headings.map((h, idx) => (
            <a
              key={idx}
              href={`#${h.id}`}
              className={`block transition-colors py-1 hover:text-red-600 ${
                h.level === 3 ? 'pl-4 text-slate-600 text-xs' : 'font-semibold text-slate-800'
              }`}
            >
              <span className="text-red-500 mr-1.5">{h.level === 2 ? '•' : '–'}</span>
              <span>{h.text}</span>
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
