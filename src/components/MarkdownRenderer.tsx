'use client';

import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

// Inline formatting helper for links, bold, code, etc.
function formatInlineText(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // 1. Link: [label](url)
    const linkMatch = remaining.match(/^([^\n[]*?)\[([^\]]+)\]\(([^)]+)\)/);
    // 2. Bold: **text** - restricted to same line to avoid runaway bold across lines
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
          className="text-red-600 hover:text-red-700 underline font-medium transition-colors"
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

// Single block renderer
function renderBlock(blockText: string, keyPrefix: string | number): React.ReactNode {
  const trimmed = blockText.trim();
  if (!trimmed) return null;

  // 1. Horizontal Rule: --- or ***
  if (trimmed === '---' || trimmed === '***') {
    return <hr key={keyPrefix} className="my-8 border-t border-slate-200" />;
  }

  // 2. Heading 1: # Title (strictly single line; following lines rendered separately)
  if (trimmed.startsWith('# ')) {
    const lines = trimmed.split('\n');
    const headingText = lines[0].slice(2).trim();
    const remainingText = lines.slice(1).join('\n').trim();
    return (
      <React.Fragment key={keyPrefix}>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-8 mb-4 border-b border-slate-200 pb-2">
          {formatInlineText(headingText)}
        </h1>
        {remainingText && renderBlock(remainingText, `${keyPrefix}-rem`)}
      </React.Fragment>
    );
  }

  // 3. Heading 2: ## Subtitle (strictly single line)
  if (trimmed.startsWith('## ')) {
    const lines = trimmed.split('\n');
    const headingText = lines[0].slice(3).trim();
    const remainingText = lines.slice(1).join('\n').trim();
    return (
      <React.Fragment key={keyPrefix}>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-7 mb-3.5 border-b border-slate-100 pb-2 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0"></span>
          <span>{formatInlineText(headingText)}</span>
        </h2>
        {remainingText && renderBlock(remainingText, `${keyPrefix}-rem`)}
      </React.Fragment>
    );
  }

  // 4. Heading 3: ### Subheading (strictly single line)
  if (trimmed.startsWith('### ')) {
    const lines = trimmed.split('\n');
    const headingText = lines[0].slice(4).trim();
    const remainingText = lines.slice(1).join('\n').trim();
    return (
      <React.Fragment key={keyPrefix}>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-6 mb-2.5 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
          <span>{formatInlineText(headingText)}</span>
        </h3>
        {remainingText && renderBlock(remainingText, `${keyPrefix}-rem`)}
      </React.Fragment>
    );
  }

  // 5. Heading 4: #### Minor heading (strictly single line)
  if (trimmed.startsWith('#### ')) {
    const lines = trimmed.split('\n');
    const headingText = lines[0].slice(5).trim();
    const remainingText = lines.slice(1).join('\n').trim();
    return (
      <React.Fragment key={keyPrefix}>
        <h4 className="text-base font-bold text-slate-900 mt-4 mb-2">
          {formatInlineText(headingText)}
        </h4>
        {remainingText && renderBlock(remainingText, `${keyPrefix}-rem`)}
      </React.Fragment>
    );
  }

  // 6. Blockquote: lines starting with >
  if (trimmed.startsWith('> ') || trimmed.startsWith('>')) {
    const quoteLines = trimmed.split('\n').map(l => l.replace(/^>\s?/, ''));
    return (
      <blockquote key={keyPrefix} className="border-l-4 border-red-500 bg-red-50/50 p-4 rounded-r-xl my-4 text-slate-700 text-sm sm:text-base italic leading-relaxed">
        {quoteLines.map((ql, qidx) => (
          <p key={qidx} className="my-1">{formatInlineText(ql)}</p>
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
        return cells.slice(1, cells.length - 1).map(c => c.trim());
      };

      const headerCells = parseRow(lines[0]);
      const isSeparator = (line: string) => line.includes('---');
      const dataRows = lines.slice(1).filter(l => !isSeparator(l)).map(parseRow);

      return (
        <div key={keyPrefix} className="overflow-x-auto my-6 rounded-xl border border-slate-200 shadow-xs bg-white">
          <table className="min-w-full divide-y divide-slate-200 text-xs sm:text-sm">
            <thead className="bg-slate-100/90">
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
      <ul key={keyPrefix} className="space-y-1.5 my-3 pl-5 list-disc text-slate-700 text-sm sm:text-base font-normal">
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
      <ol key={keyPrefix} className="space-y-1.5 my-3 pl-5 list-decimal text-slate-700 text-sm sm:text-base font-normal">
        {listLines.map((l, lIdx) => (
          <li key={lIdx} className="leading-relaxed">
            {formatInlineText(l.replace(/^\s*\d+\.\s+/, ''))}
          </li>
        ))}
      </ol>
    );
  }

  // 10. Normal Paragraph with uniform font size (never big, never bold by default)
  return (
    <p key={keyPrefix} className="text-justify leading-relaxed text-slate-700 text-sm sm:text-base font-normal my-3">
      {trimmed.split('\n').map((line, lineIdx) => (
        <React.Fragment key={lineIdx}>
          {lineIdx > 0 && <br />}
          {formatInlineText(line)}
        </React.Fragment>
      ))}
    </p>
  );
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  // Normalize newlines and ensure headings have breathing space
  const normalized = content
    .replace(/\r\n/g, '\n')
    .replace(/^([^\n#\s][^\n]*)\n(#{1,4}\s+[^\n]+)/gm, '$1\n\n$2')
    .replace(/^(#{1,4}\s+[^\n]+)\n([^\n#\s])/gm, '$1\n\n$2');

  // Split by double newlines into blocks
  const rawBlocks = normalized.split(/\n\s*\n/);

  return (
    <div className="markdown-content text-slate-800 leading-relaxed space-y-4">
      {rawBlocks.map((block, idx) => renderBlock(block, idx))}
    </div>
  );
}
