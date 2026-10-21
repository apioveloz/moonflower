import { useParams, Link } from 'react-router';
import NotFound from './NotFound';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Users, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects, type GalleryItem } from '../data/projects';
import { img } from '../lib/img';
import Reveal from '../components/Reveal';
import { BOOK_PATH } from '../components/Navigation';
import Seo from '../components/Seo';

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function GalleryTile({ item, aspect, width, onOpen, zoom }: {
  item: GalleryItem;
  aspect: string;
  width: number;
  onOpen: () => void;
  zoom: boolean;
}) {
  return (
    <button onClick={onOpen} className={`${aspect} overflow-hidden bg-muted cursor-zoom-in block w-full`}>
      <img
        src={img(item.src, width)}
        alt={item.alt}
        decoding="async"
        loading="lazy"
        className={`w-full h-full object-cover transition-transform duration-700${zoom ? ' hover:scale-[1.04]' : ''}`}
      />
    </button>
  );
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const index = projects.findIndex((p) => p.id === id);
  const project = projects[index];

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const showPrev = useCallback(() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const showNext = useCallback(() => setLightboxIndex((i) => (i !== null && i < (project?.gallery.length ?? 1) - 1 ? i + 1 : i)), [project]);

  // Sync showModal / close with lightboxIndex
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (lightboxIndex !== null) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [lightboxIndex]);

  // Intercept the native cancel event (Escape) so React state stays in sync
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onCancel = (e: Event) => { e.preventDefault(); closeLightbox(); };
    dialog.addEventListener('cancel', onCancel);
    return () => dialog.removeEventListener('cancel', onCancel);
  }, [closeLightbox]);

  // Arrow-key navigation; Escape is handled by the dialog itself
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, showPrev, showNext]);

  if (!project) return <NotFound />;

  const prev = projects[index - 1] ?? null;
  const next = projects[index + 1] ?? null;

  const [img1, img2, img3, img4, img5] = project.gallery;
  const zoom = !prefersReducedMotion;

  return (
    <div className="min-h-screen">
      <Seo
        title={project.title}
        description={project.description.slice(0, 155)}
        image={img(project.heroImage, 1200, 630)}
      />
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden bg-muted">
        <motion.img
          src={img(project.heroImage, 1600, 1000)}
          alt={project.title}
          width={1600}
          height={1000}
          decoding="async"
          className="w-full h-full object-cover"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        {/* Back link */}
        <Reveal trigger="mount" delay={0.3} className="absolute top-24 md:top-8 left-6 lg:left-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.12em] text-white/85 hover:text-white transition-colors"
          >
            <ArrowLeft size={13} /> All Projects
          </Link>
        </Reveal>

        {/* Hero title — desktop only */}
        <div className="hidden md:block absolute bottom-0 left-0 right-0 px-6 lg:px-8 pb-14 max-w-7xl mx-auto">
          <Reveal as="h1" trigger="mount" delay={0.1} className="font-sans text-[clamp(2.5rem,7vw,6rem)] leading-[1.0] tracking-tight text-white pb-2">
            {project.title}
          </Reveal>
        </div>
      </section>

      {/* Phone-only title block */}
      <div className="md:hidden px-6 pt-8 pb-4">
        <h1 className="font-sans text-[clamp(2.5rem,10vw,4rem)] leading-[1.0] tracking-tight">{project.title}</h1>
      </div>

      {/* Project Info Bar */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal trigger="mount" delay={0.6}>
            <dl className={`grid grid-cols-2 gap-x-8 gap-y-8 ${project.collaborations?.length ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
              <div>
                <dt className="text-[13px] font-medium uppercase tracking-[0.15em] text-muted-foreground mb-2 flex items-center gap-1.5">
                  <MapPin size={10} /> Location
                </dt>
                <dd className="text-sm text-foreground">{project.location}</dd>
              </div>
              <div>
                <dt className="text-[13px] font-medium uppercase tracking-[0.15em] text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Calendar size={10} /> Completed
                </dt>
                <dd className="text-sm text-foreground">{project.date}</dd>
              </div>
              <div>
                <dt className="text-[13px] font-medium uppercase tracking-[0.15em] text-muted-foreground mb-2">
                  Category
                </dt>
                <dd className="text-sm text-foreground capitalize">{project.category}</dd>
              </div>
              {project.collaborations?.length ? (
                <div>
                  <dt className="text-[13px] font-medium uppercase tracking-[0.15em] text-muted-foreground mb-2 flex items-center gap-1.5">
                    <Users size={10} /> Collaborators
                  </dt>
                  <dd className="text-sm text-foreground">{project.collaborations.join(' / ')}</dd>
                </div>
              ) : null}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Description */}
      <section className="py-10 md:py-14 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Reveal as="p" className="text-lg text-muted-foreground leading-relaxed">
            {project.description}
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-16">
        {/* Mobile: full-width vertical stack */}
        <div className="md:hidden space-y-2">
          {project.gallery.map((item, i) => (
            <motion.button
              key={i}
              onClick={() => setLightboxIndex(i)}
              className="block w-full cursor-zoom-in"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: Math.min(i * 0.08, 0.4), ease }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted w-full">
                <img src={img(item.src, 900)} alt={item.alt} decoding="async" loading="lazy" className="w-full h-full object-cover" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Desktop: asymmetric grid */}
        <div className="hidden md:block max-w-7xl mx-auto px-6 lg:px-8 space-y-4">
          {img1 && img2 && (
            <Reveal delay={0} className="grid grid-cols-[2fr_1fr] gap-4">
              <GalleryTile item={img1} aspect="aspect-[4/3]" width={1200} zoom={zoom} onOpen={() => setLightboxIndex(0)} />
              <GalleryTile item={img2} aspect="aspect-[3/4]" width={900} zoom={zoom} onOpen={() => setLightboxIndex(1)} />
            </Reveal>
          )}
          {img3 && img4 && (
            <Reveal delay={0.1} className={`grid gap-4 ${img5 ? 'grid-cols-3' : 'grid-cols-2'}`}>
              <GalleryTile item={img3} aspect="aspect-[4/3]" width={900} zoom={zoom} onOpen={() => setLightboxIndex(2)} />
              <GalleryTile item={img4} aspect="aspect-[4/3]" width={900} zoom={zoom} onOpen={() => setLightboxIndex(3)} />
              {img5 && (
                <GalleryTile item={img5} aspect="aspect-[4/3]" width={900} zoom={zoom} onOpen={() => setLightboxIndex(4)} />
              )}
            </Reveal>
          )}
          {project.gallery.length > 5 && (
            <Reveal delay={0.1} className="grid grid-cols-3 gap-4">
              {project.gallery.slice(5).map((item, i) => (
                <GalleryTile key={i} item={item} aspect="aspect-[4/3]" width={900} zoom={zoom} onOpen={() => setLightboxIndex(i + 5)} />
              ))}
            </Reveal>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-sans text-[clamp(1.4rem,3vw,2rem)] text-foreground">
              Interested in a similar installation?
            </p>
          </div>
          <Link
            to={BOOK_PATH}
            className="btn btn-primary px-8 py-4"
          >
            Book a Consultation <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 gap-16">
          <div>
            {prev ? (
              <Link to={`/projects/${prev.id}`} className="group block space-y-2">
                <p className="text-[13px] font-medium uppercase tracking-[0.15em] text-muted-foreground flex items-center gap-1.5">
                  <ArrowLeft size={10} /> Previous
                </p>
                <p className="font-sans text-base text-foreground group-hover:text-accent transition-colors">
                  {prev.title}
                </p>
                <p className="text-xs text-muted-foreground">{prev.location}</p>
              </Link>
            ) : null}
          </div>
          <div className="text-right">
            {next ? (
              <Link to={`/projects/${next.id}`} className="group block space-y-2">
                <p className="text-[13px] font-medium uppercase tracking-[0.15em] text-muted-foreground flex items-center gap-1.5 justify-end">
                  Next <ArrowRight size={10} />
                </p>
                <p className="font-sans text-base text-foreground group-hover:text-accent transition-colors">
                  {next.title}
                </p>
                <p className="text-xs text-muted-foreground">{next.location}</p>
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {/* Lightbox — native <dialog> for built-in focus trap and Escape handling */}
      <style>{`
        .isla-lightbox { padding: 0; border: none; background: transparent; max-width: 100vw; max-height: 100vh; width: 100vw; height: 100vh; margin: 0; }
        .isla-lightbox::backdrop { background: rgba(0,0,0,0.92); }
      `}</style>
      <dialog
        ref={dialogRef}
        className="isla-lightbox"
        aria-label="Image lightbox"
        onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
      >
        {lightboxIndex !== null && (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors p-2"
              aria-label="Close lightbox"
            >
              <X size={22} />
            </button>

            {/* Counter */}
            <p className="absolute top-7 left-1/2 -translate-x-1/2 text-[13px] font-medium uppercase tracking-[0.15em] text-white/40">
              {lightboxIndex + 1} / {project.gallery.length}
            </p>

            {/* Prev arrow */}
            {lightboxIndex > 0 && (
              <button
                onClick={showPrev}
                className="absolute left-4 lg:left-8 text-white/50 hover:text-white transition-colors p-3"
                aria-label="Previous image"
              >
                <ChevronLeft size={32} />
              </button>
            )}

            {/* Image */}
            <motion.img
              key={lightboxIndex}
              src={img(project.gallery[lightboxIndex].src, 2400)}
              alt={project.gallery[lightboxIndex].alt}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease }}
            />

            {/* Next arrow */}
            {lightboxIndex < project.gallery.length - 1 && (
              <button
                onClick={showNext}
                className="absolute right-4 lg:right-8 text-white/50 hover:text-white transition-colors p-3"
                aria-label="Next image"
              >
                <ChevronRight size={32} />
              </button>
            )}

            {/* Caption */}
            <p className="absolute bottom-7 left-1/2 -translate-x-1/2 text-[11px] text-white/40 tracking-wide whitespace-nowrap">
              {project.gallery[lightboxIndex].alt}
            </p>
          </div>
        )}
      </dialog>
    </div>
  );
}
