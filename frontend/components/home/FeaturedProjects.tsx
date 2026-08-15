"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const project = {
  // id: "01",
  title: "Luxury Villa",
  location: "Dubai, UAE",
  category: "Residential",
  description:
    "A fully interactive luxury residence allowing clients to experience every room before construction begins.",
  image: "/images/project-1.jpg",
};

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);

  const headingRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Image animation
      gsap.from(imageRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.97,
        duration: 1.2,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      // Details animation
      gsap.from(detailsRef.current, {
        opacity: 0,
        x: 50,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      // CTA animation
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden bg-[#080808] text-white"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-white/[0.025] blur-[180px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24 md:px-8 lg:px-10 lg:py-28">
        {/* ========================================================= */}
        {/* TOP WRITEUP */}
        {/* ========================================================= */}

        <div ref={headingRef} className="mb-12 lg:mb-14">
          <p className="text-xs uppercase tracking-[0.45em] text-white/35">
            EXPERIENCES
          </p>

          <h2 className="mt-7 max-w-5xl font-serif text-5xl font-light leading-[0.95] md:text-7xl lg:text-8xl">
            Every experience reflects
            <br />
            what AIR stands for
          </h2>

          <p className="mt-7 max-w-2xl text-base leading-7 text-white/50 md:text-lg md:leading-8">
            Explore a curated collection of interactive environments built to
            redefine how architecture is presented.
          </p>
        </div>

        {/* ========================================================= */}
        {/* PROJECT CONTENT */}
        {/* ========================================================= */}

        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          {/* ======================================================= */}
          {/* LEFT — IMAGE */}
          {/* ======================================================= */}

          <div
            ref={imageRef}
            className="col-span-12 overflow-hidden rounded-[32px] bg-neutral-900 shadow-2xl lg:col-span-8 lg:rounded-[42px]"
          >
            <div className="relative aspect-[16/10] h-full w-full">
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover transition-transform duration-1000 hover:scale-[1.02]"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />

              {/* Image Corner Label */}
              <div className="absolute left-6 top-6 md:left-8 md:top-8">
                <div className="rounded-full border border-white/15 bg-black/20 px-4 py-2 backdrop-blur-md">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-white/70">
                    Featured Experience
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================= */}
          {/* RIGHT — DETAILS */}
          {/* ======================================================= */}

          <div
            ref={detailsRef}
            className="
              col-span-12
              flex
              flex-col
              rounded-[32px]
              border
              border-white/10
              bg-white/[0.02]
              backdrop-blur-xl
              lg:col-span-4
              lg:rounded-[42px]
            "
          >
            {/* Project Details */}
            <div className="flex-1 p-7 md:p-9 lg:p-10">
              {/* Number */}
              <div className="flex items-start justify-between">
                {/* <span className="text-xs tracking-[0.45em] text-white/35">
                  {project.id}
                </span> */}

                <span className="text-xs uppercase tracking-[0.3em] text-white/30">
                  Featured
                </span>
              </div>

              {/* Category */}
              <p className="mt-14 text-[10px] uppercase tracking-[0.4em] text-white/35">
                {project.category}
              </p>

              {/* Title */}
              <h3 className="mt-5 font-serif text-4xl font-light leading-[0.95] md:text-5xl">
                {project.title}
              </h3>

              {/* Location */}
              <div className="mt-6 flex items-center gap-3">
                <span className="h-px w-8 bg-white/25" />

                <p className="text-sm tracking-[0.12em] text-white/50">
                  {project.location}
                </p>
              </div>

              {/* Divider */}
              <div className="my-10 h-px w-full bg-white/10" />

              {/* Description */}
              <p className="text-base leading-7 text-white/55">
                {project.description}
              </p>

              {/* Small project statement */}
              <p className="mt-8 text-sm leading-6 text-white/30">
                Interactive architectural visualization designed to help clients
                understand the space, atmosphere, and experience before
                construction begins.
              </p>
            </div>

            {/* ===================================================== */}
            {/* DISCOVER MORE — PINNED TO BOTTOM */}
            {/* ===================================================== */}

            <div
              ref={ctaRef}
              className="mt-auto border-t border-white/10 p-7 md:p-9 lg:p-10"
            >
              <p className="mb-5 text-[10px] uppercase tracking-[0.4em] text-white/30">
                Discover More
              </p>

              <Link
                href="/projects"
                className="
                  group
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-full
                  border
                  border-white/15
                  bg-white/[0.03]
                  px-6
                  py-4
                  transition-all
                  duration-500
                  hover:border-white
                  hover:bg-white
                  hover:text-black
                  md:px-7
                  md:py-5
                "
              >
                <span className="text-xs uppercase tracking-[0.25em]">
                  Explore Experiences
                </span>

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
      </div>
    </section>
  );
}
