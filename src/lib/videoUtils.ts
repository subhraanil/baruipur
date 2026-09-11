export function getVideoEmbedUrl(url?: string): string | undefined {
  if (!url) return undefined;
  const clean = url.trim();

  // YouTube: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/shorts/ID, youtube.com/embed/ID
  const ytMatch = clean.match(/(?:youtube\.com\/(?:watch\?[^&]*v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }

  // Facebook already embedded
  if (clean.includes('facebook.com/plugins/video.php') || clean.includes('facebook.com/plugins/post.php')) {
    return clean;
  }

  // Facebook video
  if (clean.includes('facebook.com') || clean.includes('fb.watch')) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(clean)}&show_text=0`;
  }

  // Direct MP4 / WebM
  if (/\.(mp4|webm|ogg)($|\?)/i.test(clean)) {
    return clean;
  }

  return clean;
}

export function extractVideoFromText(text: string): { videoUrl?: string; videoEmbedUrl?: string } {
  if (!text) return {};

  const ytMatch = text.match(/(https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?[^\s]*v=|shorts\/)|youtu\.be\/)[a-zA-Z0-9_-]{11}[^\s]*)/i);
  if (ytMatch && ytMatch[1]) {
    const videoUrl = ytMatch[1];
    return {
      videoUrl,
      videoEmbedUrl: getVideoEmbedUrl(videoUrl)
    };
  }

  const fbMatch = text.match(/(https?:\/\/(?:www\.|m\.)?(?:facebook\.com\/[^\s]+\/videos\/[0-9]+|fb\.watch\/[a-zA-Z0-9_-]+)[^\s]*)/i);
  if (fbMatch && fbMatch[1]) {
    const videoUrl = fbMatch[1];
    return {
      videoUrl,
      videoEmbedUrl: getVideoEmbedUrl(videoUrl)
    };
  }

  const directMatch = text.match(/(https?:\/\/\S+\.(?:mp4|webm)[^\s]*)/i);
  if (directMatch && directMatch[1]) {
    const videoUrl = directMatch[1];
    return {
      videoUrl,
      videoEmbedUrl: videoUrl
    };
  }

  return {};
}

export function getSafeImageUrl(url?: string): string {
  if (!url) return 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=80';
  if (url.startsWith('/images/')) {
    return url;
  }
  if (
    url.includes('lookaside.fbsbx.com') || 
    url.includes('fbcdn.net') || 
    url.includes('fbsbx.com') ||
    url.includes('fb.watch') ||
    url.includes('scontent') ||
    (url.includes('facebook.com') && (url.includes('media') || url.includes('photo')))
  ) {
    if (!url.startsWith('/api/image-proxy')) {
      return `/api/image-proxy?url=${encodeURIComponent(url)}`;
    }
  }
  return url;
}

