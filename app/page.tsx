import Navbar from "@/components/layout/Navbar";

import Hero from "@/components/home/Hero";
import WhyAirExists from "@/components/home/WhyAirExists";
import InteractiveExperiences from "@/components/home/InteractiveExperiences";
import Process from "@/components/home/Process";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Industries from "@/components/home/Industries";
import CTA from "@/components/home/CTA";
import Footer from "@/components/layout/Footer";
// import About from "@/components/home/About";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <WhyAirExists />
        <InteractiveExperiences />
        <Process />
        <FeaturedProjects />
        <Industries />
        <CTA />
        <Footer />
        {/* <About /> */}
      </main>
    </>
  );
}
