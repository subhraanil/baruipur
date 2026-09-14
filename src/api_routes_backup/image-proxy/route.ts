import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  // Ensure storage folder exists
  const cacheDir = path.join(process.cwd(), 'public', 'images', 'crawled');
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  const hash = crypto.createHash('md5').update(targetUrl).digest('hex');
  const filePath = path.join(cacheDir, `${hash}.jpg`);

  // If already downloaded and cached, serve immediately
  if (fs.existsSync(filePath)) {
    try {
      const cachedBuffer = fs.readFileSync(filePath);
      return new NextResponse(cachedBuffer, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400'
        }
      });
    } catch (e) {
      // Fall through to fetch if read fails
    }
  }

  const cleanUrl = targetUrl.replace(/&amp;/g, '&');

  try {
    let res = await axios.get(cleanUrl, {
      headers: {
        'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      },
      responseType: 'arraybuffer',
      timeout: 10000,
      validateStatus: () => true
    });

    if (res.status !== 200 || !res.data || res.data.length < 200) {
      // Fallback with desktop browser headers and Facebook referer
      res = await axios.get(cleanUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Referer': 'https://www.facebook.com/',
          'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
        },
        responseType: 'arraybuffer',
        timeout: 10000,
        validateStatus: () => true
      });
    }

    if (res.status === 200 && res.data && res.data.length > 200) {
      try {
        fs.writeFileSync(filePath, res.data);
      } catch (e) {}
      const rawType = String(res.headers['content-type'] || '');
      const contentType = rawType.startsWith('image/') ? rawType : 'image/jpeg';

      return new NextResponse(res.data, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400'
        }
      });
    }

    return new NextResponse('Failed to fetch image', { status: 502 });
  } catch (err: any) {
    return new NextResponse(`Error fetching image: ${err.message}`, { status: 500 });
  }
}
