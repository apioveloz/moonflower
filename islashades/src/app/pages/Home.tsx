import { BOOK_PATH } from '../components/Navigation';
import { Link } from 'react-router';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import Seo from '../components/Seo';
import HeroVideo from '../components/HeroVideo';
import { site } from '../data/site';
import { home } from '../data/pages';
import { projects } from '../data/projects';
import { img } from '../lib/img';

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const featuredWork = home.featuredProjects
  .map((id) => projects.find((p) => p.id === id))
  .filter((p) => p !== undefined);

export default function Home() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen">
      <Seo />
      {/* Hero */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden bg-stone-900 text-white">
        <HeroVideo
          mp4={home.heroVideo || undefined}
          poster={img(home.heroImage, 1600, 2000)}
          posterAlt={home.heroImageAlt}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-900/35 to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pb-8 sm:pb-12 pt-16 md:pt-28">
          <Reveal as="h1" trigger="mount" delay={0.2} className="font-sans text-[clamp(3.5rem,11vw,11rem)] leading-[0.95] tracking-tight text-white pb-4">
            {home.heroTitle}
          </Reveal>

          <div className="mt-12 flex flex-col sm:flex-row items-start gap-8 sm:items-end">
            <Reveal as="p" trigger="mount" delay={0.6} className="text-white/85 text-[15px] sm:text-base leading-relaxed max-w-sm">
              {home.heroTagline}
            </Reveal>

            <Reveal trigger="mount" delay={0.7} className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:ml-auto w-full sm:w-auto">
              <Link
                to={BOOK_PATH}
                className="btn btn-light py-4 sm:py-3 w-full sm:w-auto"
              >
                Book Consultation <ArrowRight size={13} />
              </Link>
              <Link
                to="/projects"
                className="btn btn-outline-light py-4 sm:py-3 w-full sm:w-auto"
              >
                View Work
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-10 md:py-20 px-6">
        <Reveal className="max-w-5xl mx-auto">
          <h2 className="font-sans text-[clamp(2rem,5vw,4rem)] leading-[1.05] tracking-tight">
            {home.manifestoHeading}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-muted-foreground leading-relaxed mt-6">
            {home.manifestoParagraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Featured Work */}
      {featuredWork.length > 0 && (
        <section className="py-12 px-6 bg-secondary/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-end mb-6 md:mb-10">
              <Link
                to="/projects"
                className="text-[13px] font-medium uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                All projects <ArrowRight size={12} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredWork.map((project, i) => (
                <Reveal
                  key={project.id}
                  delay={Math.min(i * 0.08, 0.4)}
                  className="group relative overflow-hidden bg-muted"
                >
                  <Link to={`/projects/${project.id}`} className="block">
                    <div className="aspect-[3/4] overflow-hidden">
                      <motion.img
                        src={img(project.heroImage, 800, 1100)}
                        alt={project.title}
                        width={800}
                        height={1100}
                        decoding="async"
                        loading="lazy"
                        className="w-full h-full object-cover"
                        whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                        transition={{ duration: 0.7, ease }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <p className="font-sans text-lg text-white leading-tight">{project.title}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-white/65">
                          {capitalize(project.category)} · {project.location.split(',')[0]}
                        </p>
                        <span className="inline-flex items-center gap-1 border border-white/40 rounded-full text-[10px] uppercase tracking-[0.1em] px-3 py-1 text-white/70">
                          View <ArrowRight size={9} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pillars */}
      <section className="py-10 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 md:gap-16">
            {home.pillars.map((pillar, i) => (
              <Reveal
                key={pillar.title}
                delay={Math.min(i * 0.08, 0.4)}
                className="py-6 md:py-0"
              >
                <h3 className="font-sans text-xl mb-4">{pillar.title}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">{pillar.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Island-specific section */}
      <section className="py-16 sm:py-20 px-6 bg-secondary/50">
        <Reveal className="max-w-7xl mx-auto">
          <h2 className="font-sans text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight mb-8 md:mb-14">
            {home.islandHeading}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            {home.islandItems.map((item) => (
              <div key={item.title}>
                <h3 className="font-sans text-lg mb-3">{item.title}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="text-[15px] text-muted-foreground mt-8 md:mt-12">
            Consultation within 48 hours. Installation in {site.leadTimeWeeks}.
          </p>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-foreground text-primary-foreground">
        <Reveal className="max-w-5xl mx-auto text-center">
          <h2 className="font-sans text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] mb-6 md:mb-10">
            {home.ctaHeading}
          </h2>
          <Link
            to={BOOK_PATH}
            className="btn btn-light px-8 py-4"
          >
            Book a Consultation <ArrowRight size={13} />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
