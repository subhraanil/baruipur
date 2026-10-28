'use client';

import React from 'react';
import { Info, AlertTriangle, CheckCircle, Lightbulb, ShieldAlert, Link as LinkIcon } from 'lucide-react';

interface MarkdownRendererProps {
  content?: string | null;
}

// Inline formatting helper for links, bold, code, etc.
function formatInlineText(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // 1. Link: [label](url)
    const linkMatch = remaining.match(/^([^\n[]*?)\[([^\]]+)\]\(([^)]+)\)/);
    // 2. Bold: **text** - strictly restricted to same line
    const boldMatch = remaining.match(/^([^\n*]*?)\*\*([^*\n]+)\*\*/);
    // 3. Inline Code: `code`
    const codeMatch = remaining.match(/^([^\n`]*?)`([^`\n]+)`/);

    // Pick earliest match
    const candidates = [
      { type: 'link', match: linkMatch, index: linkMatch ? linkMatch[1].length : Infinity },
      { type: 'bold', match: boldMatch, index: boldMatch ? boldMatch[1].length : Infinity },
      { type: 'code', match: codeMatch, index: codeMatch ? codeMatch[1].length : Infinity }
    ].sort((a, b) => a.index - b.index);

    const winner = candidates[0];

    if (!winner.match || winner.index === Infinity) {
      parts.push(remaining);
      break;
    }

    const beforeText = winner.match[1];
    if (beforeText) {
      parts.push(beforeText);
    }

    if (winner.type === 'link') {
      const label = winner.match[2];
      const url = winner.match[3];
      const isExternal = url.startsWith('http');
      parts.push(
        <a
          key={key++}
          href={url}
          className="text-red-600 hover:text-red-700 underline font-semibold transition-colors"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {label}
        </a>
      );
      remaining = remaining.slice(beforeText.length + winner.match[0].length - beforeText.length);
    } else if (winner.type === 'bold') {
      const boldText = winner.match[2];
      parts.push(
        <strong key={key++} className="font-bold text-slate-900">
          {boldText}
        </strong>
      );
      remaining = remaining.slice(beforeText.length + winner.match[0].length - beforeText.length);
    } else if (winner.type === 'code') {
      const codeText = winner.match[2];
      parts.push(
        <code key={key++} className="bg-slate-100 text-red-700 px-1.5 py-0.5 rounded text-xs font-mono font-semibold">
          {codeText}
        </code>
      );
      remaining = remaining.slice(beforeText.length + winner.match[0].length - beforeText.length);
    }
  }

  return parts;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\u0980-\u09FFa-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

type MarkdownToken =
  | { type: 'hr' }
  | { type: 'h1'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'h4'; text: string }
  | { type: 'blockquote'; lines: string[] }
  | { type: 'table'; lines: string[] }
  | { type: 'bulletList'; items: string[] }
  | { type: 'numberedList'; items: string[] }
  | { type: 'paragraph'; lines: string[] };

function tokenizeMarkdown(content: string): MarkdownToken[] {
  if (!content) return [];
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const tokens: MarkdownToken[] = [];
  let currentGroup: MarkdownToken | null = null;

  const flush = () => {
    if (currentGroup) {
      tokens.push(currentGroup);
      currentGroup = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Blank line terminates active grouping
    if (!trimmed) {
      flush();
      continue;
    }

    // 1. Horizontal Rule: --- or ***
    if (trimmed === '---' || trimmed === '***') {
      flush();
      tokens.push({ type: 'hr' });
      continue;
    }

    // 2. Heading 1: # Title (isolated strictly to one line)
    if (trimmed.startsWith('# ')) {
      flush();
      tokens.push({ type: 'h1', text: trimmed.slice(2).trim() });
      continue;
    }

    // 3. Heading 2: ## Subtitle (isolated strictly to one line)
    if (trimmed.startsWith('## ')) {
      flush();
      tokens.push({ type: 'h2', text: trimmed.slice(3).trim() });
      continue;
    }

    // 4. Heading 3: ### Subheading (isolated strictly to one line)
    if (trimmed.startsWith('### ')) {
      flush();
      tokens.push({ type: 'h3', text: trimmed.slice(4).trim() });
      continue;
    }

    // 5. Heading 4: #### Minor heading (isolated strictly to one line)
    if (trimmed.startsWith('#### ')) {
      flush();
      tokens.push({ type: 'h4', text: trimmed.slice(5).trim() });
      continue;
    }

    // 6. Blockquote
    if (trimmed.startsWith('> ') || trimmed === '>') {
      const quoteText = trimmed.replace(/^>\s?/, '');
      if (currentGroup && currentGroup.type === 'blockquote') {
        currentGroup.lines.push(quoteText);
      } else {
        flush();
        currentGroup = { type: 'blockquote', lines: [quoteText] };
      }
      continue;
    }

    // 7. Markdown Table line
    if (trimmed.startsWith('|')) {
      if (currentGroup && currentGroup.type === 'table') {
        currentGroup.lines.push(trimmed);
      } else {
        flush();
        currentGroup = { type: 'table', lines: [trimmed] };
      }
      continue;
    }

    // 8. Bullet list item
    if (/^\s*[-*]\s+/.test(rawLine)) {
      const itemText = rawLine.replace(/^\s*[-*]\s+/, '');
      if (currentGroup && currentGroup.type === 'bulletList') {
        currentGroup.items.push(itemText);
      } else {
        flush();
        currentGroup = { type: 'bulletList', items: [itemText] };
      }
      continue;
    }

    // 9. Numbered list item
    if (/^\s*\d+\.\s+/.test(rawLine)) {
      const itemText = rawLine.replace(/^\s*\d+\.\s+/, '');
      if (currentGroup && currentGroup.type === 'numberedList') {
        currentGroup.items.push(itemText);
      } else {
        flush();
        currentGroup = { type: 'numberedList', items: [itemText] };
      }
      continue;
    }

    // 10. Regular paragraph text
    if (currentGroup && currentGroup.type === 'paragraph') {
      currentGroup.lines.push(rawLine);
    } else {
      flush();
      currentGroup = { type: 'paragraph', lines: [rawLine] };
    }
  }

  flush();
  return tokens;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  const tokens = tokenizeMarkdown(content);

  return (
    <div className="markdown-content text-slate-800 leading-relaxed space-y-4 text-base font-normal">
      {tokens.map((token, idx) => {
        switch (token.type) {
          case 'hr':
            return <hr key={idx} className="my-8 border-t border-slate-200" />;

          case 'h1':
          case 'h2': {
            const headingId = slugifyHeading(token.text);
            return (
              <h2 
                key={idx} 
                id={headingId} 
                className="group scroll-mt-24 text-xl sm:text-2xl font-black text-slate-900 mt-8 mb-4 border-b border-slate-200/80 pb-2.5 flex items-center justify-between"
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-2.5 h-6 rounded bg-gradient-to-b from-red-600 to-red-700 shrink-0 shadow-xs"></span>
                  <span>{formatInlineText(token.text)}</span>
                </span>
                <a 
                  href={`#${headingId}`} 
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-600 p-1"
                  aria-label="Direct section link"
                >
                  <LinkIcon className="w-4 h-4" />
                </a>
              </h2>
            );
          }

          case 'h3': {
            const headingId = slugifyHeading(token.text);
            return (
              <h3 
                key={idx} 
                id={headingId} 
                className="group scroll-mt-24 text-lg sm:text-xl font-bold text-slate-900 mt-6 mb-3 flex items-center justify-between"
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                  <span>{formatInlineText(token.text)}</span>
                </span>
                <a 
                  href={`#${headingId}`} 
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-600 p-1"
                  aria-label="Direct section link"
                >
                  <LinkIcon className="w-3.5 h-3.5" />
                </a>
              </h3>
            );
          }

          case 'h4':
            return (
              <h4 key={idx} className="text-base font-bold text-slate-900 mt-5 mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></span>
                <span>{formatInlineText(token.text)}</span>
              </h4>
            );

          case 'blockquote': {
            const firstLine = token.lines[0] || '';
            const isNote = firstLine.includes('[!NOTE]') || firstLine.includes('তথ্যসূত্র') || firstLine.includes('দ্রষ্টব্য');
            const isWarning = firstLine.includes('[!WARNING]') || firstLine.includes('[!CAUTION]') || firstLine.includes('সতর্কতা');
            const isTip = firstLine.includes('[!TIP]') || firstLine.includes('পরামর্শ') || firstLine.includes('নির্দেশিকা');

            let borderColor = 'border-red-500 bg-red-50/50 text-slate-800';
            let icon = null;

            if (isNote) {
              borderColor = 'border-blue-500 bg-blue-50/60 text-slate-800';
              icon = <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />;
            } else if (isWarning) {
              borderColor = 'border-amber-500 bg-amber-50/60 text-slate-800';
              icon = <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />;
            } else if (isTip) {
              borderColor = 'border-emerald-500 bg-emerald-50/60 text-slate-800';
              icon = <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />;
            }

            const cleanLines = token.lines.map(l => 
              l.replace(/\[!(?:NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]\s*/i, '')
            );

            return (
              <blockquote 
                key={idx} 
                className={`border-l-4 ${borderColor} p-4 sm:p-5 rounded-r-2xl my-5 shadow-xs text-base leading-relaxed`}
              >
                <div className="flex items-start gap-2.5">
                  {icon}
                  <div className="flex-1 space-y-1.5">
                    {cleanLines.map((ql, qidx) => (
                      <p key={qidx} className="my-0.5">{formatInlineText(ql)}</p>
                    ))}
                  </div>
                </div>
              </blockquote>
            );
          }

          case 'table': {
            const tableLines = token.lines.filter(l => l.startsWith('|'));
            if (tableLines.length < 2) return null;

            const parseRow = (line: string) => {
              const cells = line.split('|');
              return cells.slice(1, cells.length - 1).map(c => c.trim());
            };

            const headerCells = parseRow(tableLines[0]);
            const isSeparator = (line: string) => line.includes('---');
            const dataRows = tableLines.slice(1).filter(l => !isSeparator(l)).map(parseRow);

            return (
              <div key={idx} className="w-full overflow-x-auto my-6 rounded-2xl border border-slate-200 shadow-sm bg-white">
                <table className="w-full divide-y divide-slate-200 text-xs sm:text-sm">
                  <thead className="bg-slate-100/90">
                    <tr>
                      {headerCells.map((header, hIdx) => (
                        <th
                          key={hIdx}
                          scope="col"
                          className="px-3.5 py-3 text-left font-black text-slate-900 tracking-tight whitespace-nowrap"
                        >
                          {formatInlineText(header)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150 bg-white">
                    {dataRows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50/80 transition-colors odd:bg-slate-50/30">
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="px-3.5 py-3 text-slate-700 whitespace-normal leading-relaxed break-words font-medium">
                            {formatInlineText(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }

          case 'bulletList':
            return (
              <ul key={idx} className="space-y-2.5 my-4 pl-2 text-slate-800 text-base font-normal">
                {token.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-red-600 shrink-0 mt-2"></span>
                    <span className="flex-1">{formatInlineText(item)}</span>
                  </li>
                ))}
              </ul>
            );

          case 'numberedList':
            return (
              <ol key={idx} className="space-y-2.5 my-4 pl-1 text-slate-800 text-base font-normal">
                {token.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-3 leading-relaxed">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-900 text-white text-xs font-bold shrink-0 mt-0.5">
                      {itemIdx + 1}
                    </span>
                    <span className="flex-1">{formatInlineText(item)}</span>
                  </li>
                ))}
              </ol>
            );

          case 'paragraph':
            return (
              <p key={idx} className="text-justify leading-relaxed text-slate-800 text-base sm:text-[17px] font-normal my-4">
                {token.lines.map((line, lineIdx) => (
                  <React.Fragment key={lineIdx}>
                    {lineIdx > 0 && <br />}
                    {formatInlineText(line)}
                  </React.Fragment>
                ))}
              </p>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
