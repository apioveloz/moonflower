import { useReducedMotion } from 'motion/react';

interface HeroVideoProps {
  mp4?: string;
  webm?: string;
  portraitMp4?: string;
  poster: string;
  posterAlt: string;
}

export default function HeroVideo({ mp4, webm, portraitMp4, poster, posterAlt }: HeroVideoProps) {
  const prefersReducedMotion = useReducedMotion();

  const saveData =
    typeof navigator !== 'undefined' &&
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;

  const hasSource = !!(mp4 || webm);
  const showVideo = hasSource && !prefersReducedMotion && !saveData;

  return (
    <>
      <img
        src={poster}
        alt={posterAlt}
        width={1600}
        height={2000}
        // React 18 doesn't know the camelCase prop yet; pass the attribute directly.
        {...{ fetchpriority: 'high' }}
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      {showVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          {/* Portrait source first so matching devices pick it before landscape sources */}
          {portraitMp4 && (
            <source
              src={portraitMp4}
              type="video/mp4"
              media="(max-width: 640px) and (orientation: portrait)"
            />
          )}
          {webm && <source src={webm} type="video/webm" />}
          {mp4 && <source src={mp4} type="video/mp4" />}
        </video>
      )}
    </>
  );
}
