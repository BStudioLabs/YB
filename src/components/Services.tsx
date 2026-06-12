import Reveal from "@/components/Reveal";
import { getServices } from "@/lib/db";

export default async function Services() {
  const services = await getServices();
  return (
    <section id="services">
      <div className="wrap">
        <Reveal>
          <div className="lab">01 — What we do</div>
          <h2 className="h2">
            Capabilities<span className="dot">.</span>
          </h2>
        </Reveal>
        <div className="sgrid">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.1}>
              <div className="scard">
                <i className="num">/{String(i + 1).padStart(2, "0")}</i>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={s.icon} />
                </svg>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <span className="more">
                  Learn more <i>→</i>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
