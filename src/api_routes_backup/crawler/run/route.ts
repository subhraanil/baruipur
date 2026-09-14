import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { crawlSource, crawlAllActiveSources } from '@/lib/crawler';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { sourceId, all, daysBack } = body;
    const days = typeof daysBack === 'number' ? daysBack : 7;

    if (sourceId) {
      const source = db.getSourceById(sourceId);
      if (!source) {
        return NextResponse.json({ success: false, error: 'Source not found' }, { status: 404 });
      }

      const result = await crawlSource(source, days);
      return NextResponse.json({
        success: true,
        message: `উৎস '${source.name}' সফলভাবে ক্রল করা হয়েছে।`,
        data: result
      });
    }

    // Otherwise crawl all active sources with cross-source synthesis
    const batchResult = await crawlAllActiveSources(days);
    return NextResponse.json({
      success: true,
      message: batchResult.message,
      data: batchResult
    });
  } catch (err: any) {
    console.error('Crawler API error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
