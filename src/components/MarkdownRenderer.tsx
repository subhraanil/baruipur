'use client';

import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

// Inline formatting helper
function formatInlineText(text: string): React.ReactNode[] {
  // Regex to match bold, links, codes, italics
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // 1. Link: [label](url)
    const linkMatch = remaining.match(/^([\s\S]*?)\[([^\]]+)\]\(([^\)]+)\)/);
    // 2. Bold: **text**
    const boldMatch = remaining.match(/^([\s\S]*?)\*\*([^\*]+)\*\*/);
    // 3. Inline Code: `code`
    const codeMatch = remaining.match(/^([\s\S]*?)`([^`]+)`/);

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
          className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors"
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
        <code key={key++} className="bg-slate-100 text-pink-700 px-1.5 py-0.5 rounded text-xs font-mono font-semibold">
          {codeText}
        </code>
      );
      remaining = remaining.slice(beforeText.length + winner.match[0].length - beforeText.length);
    }
  }

  return parts;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  // Split by double newlines into blocks
  const rawBlocks = content.split(/\n\s*\n/);

  return (
    <div className="markdown-content text-slate-800 leading-relaxed space-y-4">
      {rawBlocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // 1. Horizontal Rule: ---
        if (trimmed === '---' || trimmed === '***') {
          return <hr key={idx} className="my-8 border-t border-slate-200" />;
        }

        // 2. Heading 1: # Title
        if (trimmed.startsWith('# ')) {
          return (
            <h1 key={idx} className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-8 mb-4 border-b border-slate-200 pb-2">
              {formatInlineText(trimmed.slice(2))}
            </h1>
          );
        }

        // 3. Heading 2: ## Subtitle
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={idx} className="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
              <span>{formatInlineText(trimmed.slice(3))}</span>
            </h2>
          );
        }

        // 4. Heading 3: ### Subheading
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="text-lg sm:text-xl font-bold text-slate-900 mt-6 mb-2.5 text-blue-950 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
              <span>{formatInlineText(trimmed.slice(4))}</span>
            </h3>
          );
        }

        // 5. Heading 4: #### Minor heading
        if (trimmed.startsWith('#### ')) {
          return (
            <h4 key={idx} className="text-base font-bold text-slate-900 mt-4 mb-2">
              {formatInlineText(trimmed.slice(5))}
            </h4>
          );
        }

        // 6. Blockquote: > Note
        if (trimmed.startsWith('> ')) {
          const quoteLines = trimmed.split('\n').map(l => l.replace(/^>\s?/, ''));
          return (
            <blockquote key={idx} className="border-l-4 border-blue-500 bg-blue-50/70 p-4 rounded-r-xl my-4 text-slate-700 text-sm sm:text-base italic">
              {quoteLines.map((ql, qidx) => (
                <p key={qidx}>{formatInlineText(ql)}</p>
              ))}
            </blockquote>
          );
        }

        // 7. Markdown Table: starts and ends with |
        if (trimmed.startsWith('|') && trimmed.includes('\n|')) {
          const lines = trimmed.split('\n').map(l => l.trim()).filter(l => l.startsWith('|'));
          if (lines.length >= 2) {
            const parseRow = (line: string) => {
              const cells = line.split('|');
              // remove first and last empty elements from split
              return cells.slice(1, cells.length - 1).map(c => c.trim());
            };

            const headerCells = parseRow(lines[0]);
            const isSeparator = (line: string) => line.includes('---');
            const dataRows = lines.slice(1).filter(l => !isSeparator(l)).map(parseRow);

            return (
              <div key={idx} className="overflow-x-auto my-6 rounded-xl border border-slate-200 shadow-xs bg-white">
                <table className="min-w-full divide-y divide-slate-200 text-xs sm:text-sm">
                  <thead className="bg-slate-100/80">
                    <tr>
                      {headerCells.map((header, hIdx) => (
                        <th
                          key={hIdx}
                          scope="col"
                          className="px-4 py-3 text-left font-bold text-slate-900 uppercase tracking-wider"
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
                          <td key={cIdx} className="px-4 py-3 text-slate-700 whitespace-normal leading-relaxed">
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
        }

        // 8. Unordered List: lines starting with * or -
        const listLines = trimmed.split('\n');
        const isBulletList = listLines.every(l => /^\s*[-*]\s+/.test(l));
        if (isBulletList) {
          return (
            <ul key={idx} className="space-y-2 my-4 pl-5 list-disc text-slate-700 text-sm sm:text-base">
              {listLines.map((l, lIdx) => (
                <li key={lIdx} className="leading-relaxed">
                  {formatInlineText(l.replace(/^\s*[-*]\s+/, ''))}
                </li>
              ))}
            </ul>
          );
        }

        // 9. Ordered List: lines starting with 1. 2. etc.
        const isNumberedList = listLines.every(l => /^\s*\d+\.\s+/.test(l));
        if (isNumberedList) {
          return (
            <ol key={idx} className="space-y-2 my-4 pl-5 list-decimal text-slate-700 text-sm sm:text-base font-medium">
              {listLines.map((l, lIdx) => (
                <li key={lIdx} className="leading-relaxed text-slate-800">
                  {formatInlineText(l.replace(/^\s*\d+\.\s+/, ''))}
                </li>
              ))}
            </ol>
          );
        }

        // 10. Normal Paragraph with linebreaks within it
        return (
          <p key={idx} className="text-justify leading-relaxed text-slate-800 text-sm sm:text-base my-3">
            {trimmed.split('\n').map((line, lineIdx) => (
              <React.Fragment key={lineIdx}>
                {lineIdx > 0 && <br />}
                {formatInlineText(line)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
