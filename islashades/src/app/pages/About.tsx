import { Link } from 'react-router';
import { BOOK_PATH } from '../components/Navigation';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import Seo from '../components/Seo';
import { about } from '../data/pages';
import { img } from '../lib/img';

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const initials = (name: string) =>
  name.split(/\s+/).map((part) => part.charAt(0)).join('').slice(0, 2);

export default function About() {
  return (
    <div className="min-h-screen">
      <Seo title="About" description={`Learn about Isla Shades and ${about.founderName}, the founder bringing European craftsmanship to Puerto Rico's window covering atelier.`} />
      {/* Page Header */}
      <section className="pt-16 md:pt-32 pb-3 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal as="h1" trigger="mount" delay={0.1} className="font-sans text-[clamp(2.75rem,8vw,7.5rem)] leading-[1.05] tracking-tight pb-4">
            {about.heading}
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="pt-6 pb-10 md:pb-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1fr] gap-10 md:gap-20 items-start">
          <Reveal className="space-y-4 text-muted-foreground leading-relaxed md:pt-20">
            <p className="text-lg text-foreground">{about.storyLead}</p>
            {about.storyParagraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.95, ease }}
          >
            <div className="aspect-[3/4] overflow-hidden bg-muted">
              <img
                src={img(about.storyImage, 900, 1200)}
                alt={about.storyImageAlt}
                width={900}
                height={1200}
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 w-20 h-20 border border-accent/50 pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Pull Quote */}
      <section className="py-10 px-6 bg-secondary/50">
        <div className="max-w-4xl mx-auto">
          <motion.blockquote
            className="font-sans font-light text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-foreground"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
          >
            "{about.quote}"
          </motion.blockquote>
        </div>
      </section>

      {/* Founder */}
      <section className="py-10 px-6 bg-accent/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
            <motion.div
              className="aspect-[4/5] overflow-hidden bg-muted"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.95, ease }}
            >
              {about.founderPhoto ? (
                <img
                  src={img(about.founderPhoto, 900, 1125)}
                  alt={`${about.founderName}, ${about.founderTitle} of Isla Shades`}
                  decoding="async"
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                // Shown until a portrait is uploaded in the CMS (Pages → About → Founder photo).
                <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
                  <span className="font-sans font-light text-[clamp(4rem,10vw,8rem)] tracking-tight text-accent/30">
                    {initials(about.founderName)}
                  </span>
                </div>
              )}
            </motion.div>

            <motion.div
              className="space-y-5"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.95, delay: 0.1, ease }}
            >
              <div>
                <h2 className="font-sans text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.0] mb-2">
                  {about.founderName}
                </h2>
                <p className="text-[13px] font-medium uppercase tracking-[0.15em] text-accent">
                  {about.founderTitle}
                </p>
              </div>
              <p className="text-muted-foreground leading-relaxed">{about.founderBio}</p>
              {about.founderBioSecondary && (
                <p className="text-sm text-muted-foreground leading-relaxed">{about.founderBioSecondary}</p>
              )}
              <Link
                to={BOOK_PATH}
                className="btn btn-accent"
              >
                Book a Consultation <ArrowRight size={13} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-10 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-3 md:gap-16">
            {about.values.map((v, i) => (
              <Reveal
                key={v.label}
                delay={Math.min(i * 0.08, 0.4)}
                className="py-3 md:py-0"
              >
                <p className="text-[13px] font-medium uppercase tracking-[0.15em] text-accent mb-2 md:mb-6">{v.label}</p>
                <p className="text-[15px] text-muted-foreground leading-relaxed">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
