import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Article } from '@/lib/types';
import { getVideoEmbedUrl } from '@/lib/videoUtils';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || undefined;
  const search = searchParams.get('search') || undefined;
  const status = searchParams.get('status') || undefined;
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!, 10) : undefined;
  const featured = searchParams.get('featured') === 'true';

  const articles = db.getArticles({ category, search, status, limit, featured });
  return NextResponse.json({ success: true, count: articles.length, data: articles });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title || !body.content) {
      return NextResponse.json({ success: false, error: 'শিরোনাম ও বিষয়বস্তু আবশ্যক' }, { status: 400 });
    }

    const videoUrl = body.videoUrl || undefined;
    const videoEmbedUrl = body.videoEmbedUrl || (videoUrl ? getVideoEmbedUrl(videoUrl) : undefined);

    const article: Article = {
      id: body.id || 'art-' + Date.now(),
      title: body.title,
      slug: body.slug || 'baruipur-' + Date.now(),
      summary: body.summary || body.content.substring(0, 150) + '...',
      content: body.content,
      category: body.category || 'general',
      categoryNameBn: body.categoryNameBn || 'সাধারণ সংবাদ',
      sourceId: body.sourceId || 'manual',
      sourceName: body.sourceName || 'সম্পাদকীয় ডেস্ক',
      sourceType: body.sourceType || 'manual',
      sourceUrl: body.sourceUrl || '',
      originalPostUrl: body.originalPostUrl || '',
      imageUrl: body.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80',
      videoUrl: videoUrl,
      videoEmbedUrl: videoEmbedUrl,
      publishedAt: body.publishedAt || new Date().toISOString(),
      isBreaking: Boolean(body.isBreaking),
      isFeatured: Boolean(body.isFeatured),
      status: body.status || 'published',
      views: body.views || 0,
    };

    const saved = db.saveArticle(article);
    return NextResponse.json({ success: true, data: saved });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ success: false, error: 'Article ID is required' }, { status: 400 });
  }
  const ok = db.deleteArticle(id);
  return NextResponse.json({ success: ok });
}
