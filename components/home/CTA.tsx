"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.from(".cta-eyebrow", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power3.out",
      })
        .from(
          ".cta-heading",
          {
            opacity: 0,
            y: 70,
            filter: "blur(10px)",
            duration: 1,
            ease: "power3.out",
          },
          "-=0.2",
        )
        .from(
          ".cta-text",
          {
            opacity: 0,
            y: 40,
            filter: "blur(8px)",
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .from(
          ".cta-button",
          {
            opacity: 0,
            y: 30,
            scale: 0.95,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.4",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-40 md:py-56"
    >
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-[180px]" />

      {/* Decorative Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
        <p className="cta-eyebrow mb-8 text-xs uppercase tracking-[0.55em] text-white/40">
          Let's Build The Future
        </p>

        <h2 className="cta-heading max-w-5xl font-serif text-5xl font-light leading-[0.95] text-white sm:text-6xl md:text-7xl xl:text-[6rem]">
          Ready to build
          <br />
          something unforgettable?
        </h2>

        <p className="cta-text mt-10 max-w-2xl text-lg leading-8 text-white/60 md:text-xl">
          From immersive architecture to interactive digital experiences, AIR
          helps visionary teams transform ambitious ideas into unforgettable
          realities.
        </p>

        <Link
          href="/contact"
          className="cta-button group mt-16 inline-flex items-center gap-4 rounded-full border border-white/20 px-9 py-5 text-sm uppercase tracking-[0.3em] text-white transition-all duration-500 hover:border-white hover:bg-white hover:text-black"
        >
          <span>Start Your Project</span>

          <svg
            className="transition-transform duration-500 group-hover:translate-x-2"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M13 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
