"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "@/lib/gsap";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.from(".hero-video", {
        scale: 1.12,
        duration: 2,
      });

      tl.from(
        ".hero-overlay",
        {
          opacity: 0,
          duration: 1,
        },
        0,
      );

      tl.from(
        ".hero-subtitle",
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
        },
        "-=1.3",
      );

      tl.from(
        ".hero-title span",
        {
          opacity: 0,
          yPercent: 120,
          stagger: 0.12,
          duration: 1,
        },
        "-=0.5",
      );

      tl.from(
        ".hero-text",
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
        },
        "-=0.5",
      );

      tl.from(
        ".hero-buttons",
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
        },
        "-=0.4",
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden">
      {/* Background Video */}

      <div className="hero-video absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlay */}

      <div className="hero-overlay absolute inset-0 bg-black/45" />

      <div className="hero-overlay absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70" />

      {/* Hero Content */}

      <div className="relative z-20 flex h-full items-center justify-center px-8">
        <div className="max-w-6xl text-center text-white">
          <p className="hero-subtitle mb-8 text-xs uppercase tracking-[0.55em] text-white/70">
            INTERACTIVE ARCHITECTURAL EXPERIENCES
          </p>

          <h1 className="hero-title font-serif text-6xl leading-[0.9] md:text-8xl xl:text-[9rem]">
            <span className="block overflow-hidden">Experience.</span>

            <span className="block overflow-hidden">Interact.</span>

            <span className="block overflow-hidden">Decide.</span>
          </h1>

          <p className="hero-text mx-auto mt-12 max-w-2xl text-lg leading-8 text-white/75 md:text-xl">
            We transform static architectural designs into immersive real-time
            environments where clients can explore, customize, and make
            confident decisions before construction begins.
          </p>

          <div className="hero-buttons mt-16 flex flex-wrap justify-center gap-5">
            <Link
              href="#contact"
              className="rounded-full bg-white px-9 py-4 text-sm font-medium text-black transition-all duration-500 hover:-translate-y-1"
            >
              Schedule a Demo
            </Link>

            <Link
              href="#projects"
              className="rounded-full border border-white/40 px-9 py-4 text-sm font-medium transition-all duration-500 hover:bg-white hover:text-black"
            >
              Explore Projects
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Gradient */}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/40 to-transparent" />
    </section>
  );
}
