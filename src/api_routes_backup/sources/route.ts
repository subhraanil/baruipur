import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Source } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  const sources = db.getSources();
  return NextResponse.json({ success: true, data: sources });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.url) {
      return NextResponse.json({ success: false, error: 'নাম ও লিংক আবশ্যক' }, { status: 400 });
    }

    const source: Source = {
      id: body.id || 'src-' + Date.now(),
      name: body.name,
      type: body.type || 'telegram',
      url: body.url,
      handle: body.handle || '',
      defaultCategory: body.defaultCategory || 'general',
      isActive: body.isActive !== undefined ? body.isActive : true,
      autoPublish: body.autoPublish !== undefined ? body.autoPublish : true,
      postsCount: body.postsCount || 0,
      description: body.description || '',
    };

    const saved = db.saveSource(source);
    return NextResponse.json({ success: true, data: saved });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ success: false, error: 'Source ID is required' }, { status: 400 });
  }
  const ok = db.deleteSource(id);
  return NextResponse.json({ success: ok });
}
