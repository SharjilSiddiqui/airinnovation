"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Explicitly set initial states instead of relying on implicit .from() hooks
      gsap.set(".cta-eyebrow", { opacity: 0, y: 20 });
      gsap.set(".cta-heading", { opacity: 0, y: 50, filter: "blur(10px)" });
      gsap.set(".cta-text", { opacity: 0, y: 30, filter: "blur(8px)" });

      // Ensure button starts hidden BUT has clear props fallback
      gsap.set(".cta-button", {
        opacity: 0,
        y: 30,
        scale: 0.95,
        visibility: "visible", // Guarantees display context exists
      });

      // 2. Robust Master Animation Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.to(".cta-eyebrow", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .to(
          ".cta-heading",
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .to(
          ".cta-text",
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .to(
          ".cta-button",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            // CRITICAL FIX: Clear inline styles after animation finishes
            // so GSAP never permanently locks opacity: 0 or transforms on the link node
            clearProps: "opacity,transform,filter",
          },
          "-=0.4",
        );
    }, sectionRef);

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 0);

    return () => {
      //   clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full overflow-hidden bg-black py-40 md:py-56 text-white select-none"
    >
      {/* Background Radial Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] sm:h-[700px] sm:w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-[160px] sm:blur-[180px]"
      />

      {/* Grid Pattern Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* Main Content Container */}
      <div
        ref={containerRef}
        className="relative z-20 mx-auto flex max-w-7xl flex-col items-center px-6 text-center"
      >
        <p className="cta-eyebrow mb-6 sm:mb-8 text-xs uppercase tracking-[0.55em] text-white/40 font-mono">
          Let's Build The Future
        </p>

        <h2 className="cta-heading max-w-5xl font-serif text-4xl sm:text-6xl md:text-7xl xl:text-[6rem] font-light leading-[0.95] tracking-tight text-white">
          Ready to build
          <br />
          <span className="italic font-normal text-white/90">
            something unforgettable?
          </span>
        </h2>

        <p className="cta-text mt-8 sm:mt-10 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed sm:leading-8 text-white/60 font-light tracking-wide">
          From immersive architecture to interactive digital experiences, AIR
          helps visionary teams transform ambitious ideas into unforgettable
          realities.
        </p>

        {/* CTA Button Wrapper - Ensured Relative Z-Index Layering */}
        <div className="mt-12 sm:mt-16 relative z-30 flex items-center justify-center">
          <Link
            href="/contact"
            className="
              cta-button
              group
              relative
              inline-flex
              items-center
              gap-4
              rounded-full
              border
              border-white/20
              bg-white/5
              px-8
              sm:px-10
              py-4
              sm:py-5
              text-xs
              sm:text-sm
              font-medium
              uppercase
              tracking-[0.3em]
              text-white
              backdrop-blur-sm
              transition-all
              duration-500
              hover:border-white
              hover:bg-white
              hover:text-black
              hover:scale-105
              active:scale-95
              shadow-2xl
            "
          >
            <span>Start Your Project</span>

            <svg
              className="transition-transform duration-500 group-hover:translate-x-1.5"
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
      </div>
    </section>
  );
}
