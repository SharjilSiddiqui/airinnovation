"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    id: "01",
    title: "Luxury Villa",
    location: "Dubai, UAE",
    category: "Residential",
    description:
      "A fully interactive luxury residence allowing clients to experience every room before construction begins.",
    image: "/images/project-1.jpg",
  },
  {
    id: "02",
    title: "Corporate Headquarters",
    location: "London, UK",
    category: "Commercial",
    description:
      "Interactive office environments designed to communicate architecture, scale and atmosphere.",
    image: "/images/project-2.jpg",
  },
  {
    id: "03",
    title: "Sales Experience Centre",
    location: "Mumbai, India",
    category: "Interactive Experience",
    description:
      "Immersive digital experiences helping developers sell projects before they're built.",
    image: "/images/project-3.jpg",
  },
];

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);

  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  const [activeProject, setActiveProject] = useState(projects[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  const changeProject = (index: number) => {
    if (index === activeIndex) return;

    const project = projects[index];

    const tl = gsap.timeline();

    tl.to(imageRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.35,
      ease: "power2.inOut",
    });

    tl.to(
      [titleRef.current, descriptionRef.current, metaRef.current],
      {
        opacity: 0,
        y: 25,
        duration: 0.25,
        stagger: 0.04,
        ease: "power2.in",
      },
      "<",
    );

    tl.add(() => {
      setActiveProject(project);
      setActiveIndex(index);
    });

    tl.fromTo(
      imageRef.current,
      {
        opacity: 0,
        scale: 1.08,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
      },
    );

    tl.fromTo(
      [titleRef.current, descriptionRef.current, metaRef.current],
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.55,
        ease: "power3.out",
      },
      "-=0.45",
    );
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".projects-heading", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".projects-layout", {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-layout",
          start: "top 75%",
        },
      });

      gsap.from(".projects-cta", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-cta",
          start: "top 90%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (activeIndex + 1) % projects.length;
      changeProject(next);
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="bg-[#080808] py-40 text-white"
    >
      {/* Header */}

      <div className="projects-heading mx-auto mb-28 max-w-7xl px-8 lg:px-10">
        <p className="text-sm uppercase tracking-[0.45em] text-white/35">
          EXPERIENCES
        </p>

        <h2 className="mt-8 max-w-5xl font-serif text-6xl leading-[0.95] md:text-8xl">
          Every Experience reflects
          <br />
          what AIR stands for
        </h2>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-white/55">
          Explore a curated collection of interactive environments built to
          redefine how architecture is presented.
        </p>
      </div>

      <div className="projects-layout mx-auto grid max-w-7xl grid-cols-12 gap-10 px-8 lg:px-10">
        {/* LEFT SIDE */}

        <div className="col-span-12 lg:col-span-8">
          <div
            ref={imageRef}
            className="relative overflow-hidden rounded-[42px] bg-neutral-900 shadow-2xl"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={activeProject.image}
                alt={activeProject.title}
                fill
                priority
                className="object-cover"
              />

              {/* overlays */}

              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/20 to-transparent" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

              {/* content */}

              <div className="absolute bottom-0 left-0 right-0 p-10 md:p-14">
                <div
                  ref={metaRef}
                  className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/55"
                >
                  <span>{activeProject.category}</span>

                  <span className="h-px w-10 bg-white/25" />

                  <span>{activeProject.location}</span>
                </div>

                <h3
                  ref={titleRef}
                  className="max-w-3xl font-serif text-5xl leading-[0.95] md:text-7xl"
                >
                  {activeProject.title}
                </h3>

                <p
                  ref={descriptionRef}
                  className="mt-8 max-w-2xl text-lg leading-8 text-white/70"
                >
                  {activeProject.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}

        <div className="col-span-12 flex flex-col justify-between rounded-[42px] border border-white/10 bg-white/[0.02] backdrop-blur-xl lg:col-span-4">
          <div>
            {projects.map((project, index) => {
              const active = activeProject.id === project.id;

              return (
                <button
                  key={project.id}
                  onMouseEnter={() => changeProject(index)}
                  onClick={() => changeProject(index)}
                  className="
                    group
                    relative
                    flex
                    w-full
                    flex-col
                    border-b
                    border-white/10
                    px-8
                    py-8
                    text-left
                    transition-all
                    duration-500
                  "
                >
                  {/* active line */}

                  <span
                    className={`
                      absolute
                      left-0
                      top-0
                      h-full
                      w-[3px]
                      transition-all
                      duration-500

                      ${active ? "bg-white" : "bg-transparent"}
                    `}
                  />

                  <div className="flex items-start justify-between">
                    <span
                      className={`
                        text-xs
                        tracking-[0.45em]
                        transition-colors

                        ${active ? "text-white" : "text-white/30"}
                      `}
                    >
                      {project.id}
                    </span>

                    <svg
                      className={`
                        transition-all
                        duration-500

                        ${
                          active
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                        }
                      `}
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M5 12H19M13 6L19 12L13 18"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <h4
                    className={`
                      mt-4
                      font-serif
                      text-3xl
                      transition-all
                      duration-500

                      ${
                        active
                          ? "text-white"
                          : "text-white/55 group-hover:text-white"
                      }
                    `}
                  >
                    {project.title}
                  </h4>

                  <p
                    className={`
                      mt-4
                      text-sm
                      leading-7
                      transition-all
                      duration-500

                      ${active ? "text-white/70" : "text-white/35"}
                    `}
                  >
                    {project.location}
                  </p>
                </button>
              );
            })}
          </div>
          {/* CTA */}

          <div className="projects-cta p-8">
            <div className="mb-8 h-px w-full bg-white/10" />

            <p className="mb-6 text-xs uppercase tracking-[0.4em] text-white/35">
              Discover More
            </p>

            <Link
              href="/projects"
              className="
                group
                inline-flex
                w-full
                items-center
                justify-between
                rounded-full
                border
                border-white/15
                bg-white/[0.03]
                px-8
                py-5
                text-sm
                uppercase
                tracking-[0.25em]
                text-white
                transition-all
                duration-500
                hover:border-white
                hover:bg-white
                hover:text-black
              "
            >
              <span>Explore Experiences</span>

              <svg
                className="transition-transform duration-500 group-hover:translate-x-1"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 12H19M13 6L19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Background Decoration */}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[500px] overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-white/[0.03] blur-[180px]" />
      </div>
    </section>
  );
}
