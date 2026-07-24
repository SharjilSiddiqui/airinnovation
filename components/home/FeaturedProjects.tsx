"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import gsap from "@/lib/gsap";

const projects = [
  {
    title: "Luxury Villa",
    location: "Dubai, UAE",
    category: "Residential",
    image: "/images/project-1.jpg",
  },
  {
    title: "Corporate Headquarters",
    location: "London, UK",
    category: "Commercial",
    image: "/images/project-2.jpg",
  },
  {
    title: "Sales Experience Centre",
    location: "Mumbai, India",
    category: "Interactive Experience",
    image: "/images/project-3.jpg",
  },
];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
        const image = card.querySelector(".project-image");
        const content = card.querySelector(".project-content");

        gsap.from(image, {
          scale: 1.15,
          opacity: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
          },
        });

        gsap.from(content, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 70%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={sectionRef}
      id="projects"
      className="bg-[#0a0a0a] py-40 text-white"
    >
      <div className="mx-auto mb-32 max-w-7xl px-10">
        <p className="text-sm uppercase tracking-[0.45em] text-white/40">
          FEATURED EXPERIENCES
        </p>

        <h2 className="mt-8 max-w-5xl font-serif text-6xl leading-tight md:text-8xl">
          Every project tells a story.
        </h2>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-white/60">
          We transform concepts into immersive environments that allow clients
          to explore, understand and decide with confidence.
        </p>
      </div>{" "}
      <div className="space-y-40">
        {projects.map((project, index) => (
          <article
            key={project.title}
            className="project-card mx-auto max-w-7xl px-10"
          >
            <div className="relative overflow-hidden rounded-[40px]">
              <div className="project-image relative aspect-[16/9]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700"
                />
              </div>
            </div>

            <div className="project-content mt-10 flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <span className="text-sm text-white/40">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-4 font-serif text-5xl md:text-6xl">
                  {project.title}
                </h3>
              </div>

              <div className="text-right text-white/60">
                <p>{project.location}</p>
                <p>{project.category}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
