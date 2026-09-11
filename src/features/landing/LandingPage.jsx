
import Hero from "./components/Hero";
import Products from "./components/Products";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Stats from "./components/Stats";
import CTA from "./components/CTA";

export default function LandingPage() {
  return (
    <>
      <main>
        <Hero />

        <Products />

        <Features />

        <HowItWorks />

        <Testimonials />

        <Contact />

        <Stats />

        <CTA />
      </main>

    </>
  );
}