import Navbar from "@/components/layout/Navbar";

import Hero from "@/components/home/Hero";
import WhyAirExists from "@/components/home/WhyAirExists";
import InteractiveExperiences from "@/components/home/InteractiveExperiences";
import Process from "@/components/home/Process";
import FeaturedProjects from "@/components/home/FeaturedProjects";
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
        {/* <About /> */}
      </main>
    </>
  );
}
