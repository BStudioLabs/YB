"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import HeroVideo from "@/components/HeroVideo";
import { site } from "@/data/site";

const CHARS = "█▓▒░<>/\\|#&@01";
const FRAMES = 26;

/** Decode-style text scramble. Returns the animated string + done flag. */
function useScramble(finalText: string, delay: number) {
  const [state, setState] = useState({ text: "", settled: 0 });
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(() => {
        setState({ text: finalText, settled: finalText.length });
        setDone(true);
      }, 0);
      return () => clearTimeout(t);
    }
    let frame = 0;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        frame++;
        const settled = Math.floor((finalText.length * frame) / FRAMES);
        let out = finalText.slice(0, settled);
        for (let i = settled; i < finalText.length; i++) {
          out +=
            finalText[i] === " "
              ? " "
              : CHARS[(Math.random() * CHARS.length) | 0];
        }
        setState({ text: out, settled });
        if (frame >= FRAMES) {
          clearInterval(interval);
          setState({ text: finalText, settled: finalText.length });
          setDone(true);
        }
      }, 42);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [finalText, delay]);

  return { text: state.text, settled: state.settled, done };
}

/**
 * Renders the scramble so each glitch glyph occupies exactly the width of
 * its final letter: the real letter reserves the space (invisible) and the
 * glitch character is overlaid on top, so the line never reflows.
 */
function ScrambleText({
  finalText,
  text,
  settled,
}: {
  finalText: string;
  text: string;
  settled: number;
}) {
  if (!text) {
    return <span style={{ visibility: "hidden" }}>{finalText}</span>;
  }
  return (
    <>
      {finalText.split("").map((ch, i) =>
        i < settled || ch === " " ? (
          ch
        ) : (
          <span className="glitch-ch" key={i}>
            <span className="glitch-ch-w">{ch}</span>
            <span className="glitch-ch-g">{text[i]}</span>
          </span>
        )
      )}
    </>
  );
}

export default function Hero() {
  const l1 = useScramble("WE BUILD THE WEB.", 300);
  const l2 = useScramble("WE SECURE IT.", 1100);

  return (
    <section className="hero" id="top">
      <HeroVideo />
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="status"
        >
          <i /> All systems operational — {site.location}
        </motion.div>
        <h1 className="hero-h" aria-label="We build the web. We secure it.">
          <span aria-hidden="true">{l1.text || " "}</span>
          <br />
          <span className="l2" aria-hidden="true">
            {l2.done ? (
              <>
                WE SECURE IT<b>.</b>
              </>
            ) : (
              l2.text || " "
            )}
          </span>
        </h1>
        <motion.p
          className="tag"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Y/B is the studio of <strong>{site.owner}</strong> — websites, secure
          systems and digital products engineered with the paranoia of a
          security firm and the taste of a design studio.
        </motion.p>
        <motion.div
          className="cta"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <Link className="btn solid" href="/#work">
            View Projects <i>→</i>
          </Link>
          <Link className="btn" href="/#contact">
            Start a Project
          </Link>
        </motion.div>
      </div>
      <div className="scroll-hint" aria-hidden="true">
        SCROLL ↓
      </div>
    </section>
  );
}
