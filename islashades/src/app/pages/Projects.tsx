import { Link, useSearchParams } from 'react-router';
import { BOOK_PATH } from '../components/Navigation';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { projects as allProjects } from '../data/projects';
import { img } from '../lib/img';
import Reveal from '../components/Reveal';
import Seo from '../components/Seo';

type Category = 'all' | 'residential' | 'commercial' | 'hospitality';

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'hospitality', label: 'Hospitality' },
];

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawType = searchParams.get('type') ?? '';
  const active: Category = (['residential', 'commercial', 'hospitality'] as Category[]).includes(rawType as Category)
    ? (rawType as Category)
    : 'all';
  const setActive = (val: Category) => setSearchParams(val === 'all' ? {} : { type: val }, { replace: true });

  const filtered = active === 'all' ? allProjects : allProjects.filter((p) => p.category === active);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen">
      <Seo title="Portfolio" description="Browse Isla Shades' portfolio of custom window coverings — residential, commercial, and hospitality projects across Puerto Rico." />
      {/* Page Header */}
      <section className="pt-16 md:pt-32 pb-3 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal as="h1" trigger="mount" delay={0.1} className="font-sans text-[clamp(2.75rem,8vw,7.5rem)] leading-[1.05] tracking-tight pb-4">
            Portfolio
          </Reveal>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat.value}
              role="tab"
              aria-selected={active === cat.value}
              onClick={() => setActive(cat.value)}
              className={active === cat.value ? 'btn btn-primary' : 'btn btn-outline'}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid / Carousel */}
      <section className="py-12">
        {/* Mobile single-column stack */}
        <div className="md:hidden px-6 space-y-8">
          {filtered.map((project, i) => (
            <Reveal
              key={project.id}
              delay={Math.min(i * 0.08, 0.4)}
              className="group"
            >
              <Link to={`/projects/${project.id}`} className="block">
                <div className="relative aspect-[3/4] overflow-hidden bg-muted w-full">
                  <img
                    src={img(project.heroImage, 900, 1200)}
                    alt={project.title}
                    width={900}
                    height={1200}
                    decoding="async"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-foreground/0 active:bg-foreground/15 transition-colors duration-300" />
                </div>
                <div className="flex justify-between items-center bg-secondary px-4 py-3">
                  <div>
                    <h3 className="font-sans text-base text-foreground leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-[15px] text-muted-foreground mt-0.5">{project.location}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 border border-foreground/25 rounded-full text-[10px] uppercase tracking-[0.1em] px-3 py-1 text-foreground/60 group-hover:border-foreground group-hover:text-foreground transition-colors shrink-0 ml-3 whitespace-nowrap">
                    View <ArrowRight size={9} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="hidden md:block max-w-7xl mx-auto px-6">
          <div key={active} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project, i) => (
              <Reveal
                key={project.id}
                delay={Math.min(i * 0.08, 0.4)}
                className="group"
              >
                <Link to={`/projects/${project.id}`} className="block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                    <motion.img
                      src={img(project.heroImage, 900, 1200)}
                      alt={project.title}
                      width={900}
                      height={1200}
                      decoding="async"
                      loading="lazy"
                      className="w-full h-full object-cover"
                      whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                      transition={{ duration: 0.7, ease }}
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />
                  </div>
                  <div className="flex justify-between items-center bg-secondary px-4 py-3">
                    <div>
                      <h3 className="font-sans text-base text-foreground leading-snug group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-[15px] text-muted-foreground mt-0.5">{project.location}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 border border-foreground/25 rounded-full text-[10px] uppercase tracking-[0.1em] px-3 py-1 text-foreground/60 group-hover:border-foreground group-hover:text-foreground transition-colors shrink-0 ml-3 whitespace-nowrap">
                      View <ArrowRight size={9} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-6">
        <Reveal className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="font-sans text-[clamp(1.5rem,3.5vw,2.5rem)] leading-tight">
            Interested in working together?
          </p>
          <Link
            to={BOOK_PATH}
            className="btn btn-outline px-8 py-4"
          >
            Book a Consultation <ArrowRight size={13} />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
