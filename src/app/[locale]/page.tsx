import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Businesses } from "@/components/sections/businesses";
import { WorkCarousel } from "@/components/sections/work-carousel";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Businesses />
      <About />
      <WorkCarousel />
      <Contact />
    </main>
  );
}
