// Re-fetch DB-backed sections (services, projects) at most once per hour.
export const revalidate = 3600;

import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Work />
      <About />
      <Contact />
    </>
  );
}
