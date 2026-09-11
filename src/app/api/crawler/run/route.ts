import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { crawlSource, crawlAllActiveSources } from '@/lib/crawler';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { sourceId, all } = body;

    if (sourceId) {
      const source = db.getSourceById(sourceId);
      if (!source) {
        return NextResponse.json({ success: false, error: 'Source not found' }, { status: 404 });
      }

      const result = await crawlSource(source);
      return NextResponse.json({
        success: true,
        message: `উৎস '${source.name}' সফলভাবে ক্রল করা হয়েছে।`,
        data: result
      });
    }

    // Otherwise crawl all active sources
    const batchResult = await crawlAllActiveSources();
    return NextResponse.json({
      success: true,
      message: `মোট ${batchResult.sourcesCount} টি উৎস ক্রল সম্পন্ন। ${batchResult.totalPublished} টি নতুন সংবাদ প্রকাশিত হয়েছে।`,
      data: batchResult
    });
  } catch (err: any) {
    console.error('Crawler API error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
