import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center px-6">
      <Seo title="Page not found" noindex />
      <div className="max-w-7xl mx-auto w-full">
        <div className="overflow-hidden pb-4">
          <motion.h1
            className="font-sans text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05] tracking-tight mb-6"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            This window isn't here.
          </motion.h1>
        </div>
        <motion.p
          className="text-muted-foreground leading-normal max-w-md mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          The page you were looking for has moved or never existed. The work and the booking form are a click away.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <Link
            to="/projects"
            className="btn btn-primary"
          >
            View projects <ArrowRight size={13} />
          </Link>
          <Link
            to="/services#book"
            className="btn btn-outline"
          >
            Book a consultation
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
