import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { site } from '../data/site';
import { services as page } from '../data/pages';
import { img } from '../lib/img';
import Reveal from '../components/Reveal';
import Seo from '../components/Seo';

// Field names must match the hidden "consultation" form in index.html,
// which is how Netlify Forms learns about this form.
interface ConsultationForm {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  timeline: string;
  message: string;
  website: string;
}

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const inputClass =
  'w-full px-4 py-3 bg-transparent border border-border focus:border-foreground outline-none transition-colors duration-200 text-sm placeholder:text-muted-foreground/60';
const selectClass =
  'w-full px-4 py-3 bg-background border border-border focus:border-foreground outline-none transition-colors duration-200 text-sm appearance-none';
const labelClass = 'block text-[13px] font-medium uppercase tracking-[0.12em] text-muted-foreground mb-1.5';

const failureMessage = site.email
  ? `We couldn't send that. Email us directly at ${site.email}.`
  : "We couldn't send that. Please try again in a moment.";

export default function Services() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConsultationForm>();

  const [sending, setSending] = useState(false);

  const onSubmit = async (data: ConsultationForm) => {
    if (data.website) {
      reset();
      return;
    }
    setSending(true);
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'consultation',
          ...data,
          page: window.location.href,
        }).toString(),
      });
      if (res.ok) {
        toast.success("Thank you. We'll be in touch within 48 hours to schedule your consultation.");
        reset();
      } else {
        toast.error(failureMessage);
      }
    } catch {
      toast.error(failureMessage);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Seo title="Services & Booking" description="Made-to-measure curtains, roman shades, and roller shades for Puerto Rico homes and businesses. Book a free in-home consultation." />
      {/* Page Header */}
      <section className="pt-16 md:pt-32 pb-3 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal as="h1" trigger="mount" delay={0.1} className="font-sans text-[clamp(2.75rem,8vw,7.5rem)] leading-[1.05] tracking-tight pb-4">
            {page.heading}
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="pt-6 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 md:gap-16">
            {page.services.map((svc, i) => (
              <Reveal
                key={svc.title}
                delay={Math.min(i * 0.08, 0.4)}
                className="group py-6 md:py-0"
              >
                <h3 className="font-sans text-xl mb-3">{svc.title}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">{svc.description}</p>
              </Reveal>
            ))}
          </div>
          <div className="flex justify-start mt-8">
            <a href="#book" className="btn btn-outline">
              Book now <ArrowRight size={13} />
            </a>
          </div>

          <Reveal delay={0.2} className="mt-12 hidden md:block aspect-[21/9] overflow-hidden bg-muted">
            <img
              src={img(page.bannerImage, 1600, 700)}
              alt={page.bannerImageAlt}
              width={1600}
              height={700}
              decoding="async"
              className="w-full h-full object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="py-10 md:py-14 px-6 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
            {page.steps.map((step, i) => (
              <Reveal
                key={step.title}
                delay={Math.min(i * 0.08, 0.4)}
                className="py-6 md:py-0"
              >
                <p className="text-xs font-mono text-accent mb-6 tracking-wider">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-sans text-lg mb-3">{step.title}</h3>
                <p className="text-[15px] text-muted-foreground leading-relaxed">{step.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="py-16 px-6" id="book">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-start">
          <Reveal>
            <h2 className="font-sans text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] mb-6">
              {page.bookingHeading}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              {page.bookingIntro}
            </p>
            {(site.phone || site.whatsapp) && (
              <p className="text-sm text-muted-foreground mb-5">
                Prefer to talk?{' '}
                {site.phone && (
                  <a href={site.phoneHref} className="underline underline-offset-2 hover:text-foreground transition-colors">{site.phone}</a>
                )}
                {site.phone && site.whatsapp && <>{' '}or{' '}</>}
                {site.whatsapp && (
                  <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground transition-colors">WhatsApp</a>
                )}
                . {site.hours}.
              </p>
            )}
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={img(page.bookingImage, 800, 600)}
                alt={page.bookingImageAlt}
                width={800}
                height={600}
                decoding="async"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>

          <motion.form
            name="consultation"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            {/* Honeypot */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
              <input
                {...register('website')}
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className={labelClass}>Name *</label>
                <input
                  id="name"
                  {...register('name', { required: 'Please add your name' })}
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={inputClass}
                  placeholder="Full name"
                />
                {errors.name && (
                  <p id="name-error" role="alert" className="text-xs text-destructive mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>Email *</label>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  {...register('email', {
                    required: 'Please add your email',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'That email looks incomplete',
                    },
                  })}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={inputClass}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p id="email-error" role="alert" className="text-xs text-destructive mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="phone" className={labelClass}>Phone</label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  {...register('phone')}
                  autoComplete="tel"
                  className={inputClass}
                  placeholder="(787) 000-0000"
                />
              </div>
              <div>
                <label htmlFor="projectType" className={labelClass}>Project Type *</label>
                <select
                  id="projectType"
                  {...register('projectType', { required: 'Please choose a project type' })}
                  aria-invalid={!!errors.projectType}
                  aria-describedby={errors.projectType ? 'projectType-error' : undefined}
                  className={selectClass}
                >
                  <option value="">Select type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="hospitality">Hospitality</option>
                  <option value="trade">Designer / Architect (trade)</option>
                </select>
                {errors.projectType && (
                  <p id="projectType-error" role="alert" className="text-xs text-destructive mt-1">{errors.projectType.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="location" className={labelClass}>Location *</label>
                <input
                  id="location"
                  {...register('location', { required: 'Where is the project?' })}
                  autoComplete="address-level2"
                  aria-invalid={!!errors.location}
                  aria-describedby={errors.location ? 'location-error' : undefined}
                  className={inputClass}
                  placeholder="San Juan, PR"
                />
                {errors.location && (
                  <p id="location-error" role="alert" className="text-xs text-destructive mt-1">{errors.location.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="timeline" className={labelClass}>Timeline</label>
                <select id="timeline" {...register('timeline')} className={selectClass}>
                  <option value="">Select timeline</option>
                  <option value="urgent">Urgent (within 1 month)</option>
                  <option value="soon">Soon (1–3 months)</option>
                  <option value="flexible">Flexible (3+ months)</option>
                  <option value="planning">Just planning</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>Tell us about your project</label>
              <textarea
                id="message"
                {...register('message')}
                rows={5}
                className={`${inputClass} resize-none`}
                placeholder="What type of window coverings are you interested in? How many windows? Any specific style preferences or requirements?"
              />
            </div>

            <p className="text-[13px] text-muted-foreground text-center">
              Free in-home consultation. We reply within 48 hours.
            </p>

            <button
              type="submit"
              disabled={sending}
              className={`btn btn-primary w-full py-4 ${sending ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {sending ? 'Sending…' : 'Request Consultation'}
            </button>

            <p className="text-xs text-muted-foreground text-center">
              By submitting this form, you agree to be contacted about your consultation request.
            </p>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
