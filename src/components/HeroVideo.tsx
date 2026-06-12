"use client";

import { useEffect, useRef, useState } from "react";

/** Full-bleed hero background video — muted, looping, desaturated to stay
 *  on-brand. Falls back to an animated glow if /hero.mp4 is missing.
 *  Pauses for users who prefer reduced motion. */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ref.current?.pause();
    }
  }, []);

  return (
    <div className="hero-bg" aria-hidden="true">
      {!failed && (
        <video
          ref={ref}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src="/hero.mp4"
          onError={() => setFailed(true)}
        />
      )}
      <div className="hero-veil" />
    </div>
  );
}
