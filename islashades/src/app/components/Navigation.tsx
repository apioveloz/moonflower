import { Link, useLocation } from 'react-router';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import IslaLogo from './IslaLogo';

export const BOOK_PATH = '/services#book';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); // initialise on mount so a reload mid-page starts solid
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const isActive = (path: string) => location.pathname === path;
  const onHero = location.pathname === '/';
  const solid = !onHero || scrolled || isOpen;

  const navLinks = [
    { path: '/', label: 'Home', desktopLabel: 'Home' },
    { path: '/about', label: 'About', desktopLabel: 'About' },
    { path: '/projects', label: 'Projects', desktopLabel: 'Projects' },
    { path: '/services', label: 'Services', desktopLabel: 'Services & Booking' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        solid
          ? 'bg-background text-foreground'
          : 'bg-transparent text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-10 md:h-16">
          <Link to="/" className="flex items-center" aria-label="Isla Shades home">
            <IslaLogo className={`h-5 md:h-6 w-auto ${solid ? 'text-accent' : 'text-white'}`} />
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm transition-colors ${
                  isActive(link.path)
                    ? solid ? 'text-accent' : 'text-white'
                    : solid ? 'text-muted-foreground hover:text-accent' : 'text-white/75 hover:text-white'
                }`}
              >
                {link.desktopLabel}
              </Link>
            ))}
            <Link
              to={BOOK_PATH}
              className={`btn ${solid ? 'btn-outline' : 'btn-outline-light'}`}
            >
              Book Consultation <ArrowRight size={13} />
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 -mr-2"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isOpen && (
          <div id="mobile-menu" className="md:hidden pt-4 pb-8 border-t border-border bg-background text-foreground">
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block py-3 text-2xl font-light tracking-tight ${
                    isActive(link.path) ? 'text-accent' : 'text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6">
              <Link to={BOOK_PATH} className="btn btn-primary w-full">
                Book Consultation <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
