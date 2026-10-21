import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { SITE_URL } from '../data/site';

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  noindex?: boolean;
}

const DEFAULT_TITLE = 'Isla Shades — Made-to-measure window coverings, San Juan';
const DEFAULT_DESC = 'Isla Shades crafts made-to-measure curtains, roman shades, and roller shades for homes and businesses in Puerto Rico. Book a free in-home consultation.';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function Seo({ title, description, image, noindex = false }: SeoProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} — Isla Shades` : DEFAULT_TITLE;
    const desc = description ?? DEFAULT_DESC;
    const url = `${SITE_URL}${pathname}`;
    const ogImage = image ? new URL(image, SITE_URL).toString() : DEFAULT_IMAGE;

    document.title = fullTitle;
    setMeta('name', 'description', desc);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', ogImage);
    setCanonical(url);
  }, [title, description, image, noindex, pathname]);

  return null;
}
