import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { About, Contact, Education, Experience, FeaturedWork, Footer } from "@/components/sections";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <FeaturedWork />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
