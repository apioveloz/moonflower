import { motion, useReducedMotion } from 'motion/react';

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

type Tag = 'div' | 'p' | 'h1' | 'h2';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  trigger?: 'mount' | 'view';
  as?: Tag;
}

const MotionEl = {
  div: motion.div,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
} as const;

export default function Reveal({
  children,
  className,
  delay = 0,
  trigger = 'view',
  as: tag = 'div',
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    const Tag = tag;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = MotionEl[tag];
  const shared = {
    className,
    initial: { opacity: 0, y: 18 },
    transition: { duration: 0.7, delay, ease },
  };

  if (trigger === 'mount') {
    return (
      <MotionTag {...shared} animate={{ opacity: 1, y: 0 }}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      {...shared}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
    >
      {children}
    </MotionTag>
  );
}
