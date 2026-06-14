import Reveal from "@/components/Reveal";
import Stats from "@/components/Stats";
import { site, skills } from "@/data/site";

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <Reveal>
          <div className="lab">03 — The team</div>
          <h2 className="h2">
            Why Y/B exists<span className="dot">.</span>
          </h2>
        </Reveal>
        <div className="about-g">
          <Reveal>
            <div className="photo">
              <b>Y/B</b>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="story">
              <p>
                <strong>{site.owner}</strong> — developer and security-minded
                builder from Morocco. Y/B started from a simple irritation: the
                web is full of beautiful sites that leak data, and bulletproof
                systems nobody wants to use.
              </p>
              <p>
                So the studio does both jobs at once. Every project is{" "}
                <strong>built like a product and audited like a target</strong>{" "}
                — performance budgets, threat models, and typography all get
                the same obsession.
              </p>
              <p>
                The name is just the initials. The lime dot is the promise:{" "}
                <strong>nothing ships unfinished.</strong>
              </p>
              <Stats />
              <div className="skills">
                {skills.map((s) => (
                  <em key={s}>{s}</em>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
