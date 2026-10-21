import { Link } from 'react-router';
import { BOOK_PATH } from './Navigation';
import { Mail, Phone, MapPin, Instagram, MessageCircle, Clock } from 'lucide-react';
import { site } from '../data/site';
import IslaLogo from './IslaLogo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-10">
        <div className="grid md:grid-cols-4 gap-12 pb-16 border-b border-primary-foreground/10">
          <div className="md:col-span-2 space-y-6">
            <IslaLogo className="h-6 w-auto text-primary-foreground opacity-90" />
            <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-sm">
              {site.tagline} Based in San Juan, Puerto Rico.
            </p>
            <p className="text-xs text-primary-foreground/60">
              {site.establishedYear ? `Est. ${site.establishedYear} · ${site.address}` : site.address}
            </p>
          </div>

          <div className="space-y-5">
            <p className="text-xs text-primary-foreground/60">Navigate</p>
            <div className="space-y-3">
              {[
                ['/', 'Home'],
                ['/about', 'About'],
                ['/projects', 'Projects'],
                ['/services', 'Services'],
                [BOOK_PATH, 'Book a consultation'],
              ].map(([path, label]) => (
                <Link
                  key={path}
                  to={path}
                  className="block text-sm text-primary-foreground/75 hover:text-primary-foreground transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <p className="text-xs text-primary-foreground/60">Contact</p>
            <div className="space-y-3 text-sm text-primary-foreground/75">
              {site.email && (
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 hover:text-primary-foreground transition-colors"
                >
                  <Mail size={13} />
                  {site.email}
                </a>
              )}
              {site.phone && (
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-3 hover:text-primary-foreground transition-colors"
                >
                  <Phone size={13} />
                  {site.phone}
                </a>
              )}
              {site.whatsapp && (
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-primary-foreground transition-colors"
                >
                  <MessageCircle size={13} />
                  WhatsApp
                </a>
              )}
              <div className="flex items-center gap-3">
                <Clock size={13} />
                {site.hours}
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={13} />
                {site.address}
              </div>
              {site.instagramUrl && (
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-primary-foreground transition-colors"
                >
                  <Instagram size={13} />
                  {site.instagram}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/60">
            &copy; {year} Isla Shades. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/60">
            Made to measure. Made with care.
          </p>
        </div>
      </div>
    </footer>
  );
}
