// Returns a URL for `src` resized to the requested width (and height, cropped).
// Unsplash URLs are resized by Unsplash; images uploaded through the CMS
// (/uploads/...) go through Netlify's Image CDN in production.
export function img(src: string, w: number, h?: number): string {
  if (!src) return src;

  if (src.startsWith('https://images.unsplash.com/')) {
    const url = new URL(src);
    url.searchParams.set('w', String(w));
    if (h) {
      url.searchParams.set('h', String(h));
      url.searchParams.set('fit', 'crop');
    } else {
      url.searchParams.delete('h');
    }
    url.searchParams.set('auto', 'format');
    url.searchParams.set('q', '80');
    return url.toString();
  }

  if (src.startsWith('/') && import.meta.env.PROD) {
    const params = new URLSearchParams({ url: src, w: String(w) });
    if (h) {
      params.set('h', String(h));
      params.set('fit', 'cover');
    }
    return `/.netlify/images?${params}`;
  }

  return src;
}
