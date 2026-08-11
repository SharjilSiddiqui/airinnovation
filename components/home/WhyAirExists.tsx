"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useSectionTheme from "@/hooks/useSectionTheme";

export default function WhyAirExists() {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionTheme(sectionRef, "dark");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".story-block").forEach((block) => {
        gsap.from(block, {
          opacity: 0,
          y: 120,
          duration: 1.2,
          ease: "power4.out",

          scrollTrigger: {
            trigger: block,
            start: "top 75%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="bg-black text-white">
      {/* Block 1 */}

      <div className="story-block flex min-h-screen items-center justify-center px-8">
        <div className="max-w-6xl">
          <p className="mb-10 text-xs uppercase tracking-[0.45em] text-neutral-500">
            AIR EXISTS
          </p>

          <h2 className="font-serif text-6xl leading-[1] md:text-8xl">
            Because certainty Solves Confusion
          </h2>
        </div>
      </div>
      {/* Block 2 */}

      <div className="story-block flex min-h-screen items-center justify-center px-8">
        <div className="max-w-5xl">
          <h2 className="font-serif text-5xl leading-tight md:text-7xl">
            People don't struggle because they lack imagination.
            <br />
            <br />
            They struggle because static visuals leave too much to imagine.
          </h2>
        </div>
      </div>
      {/* Block 3 */}

      <div className="story-block flex min-h-screen items-center justify-center px-8">
        <div className="grid max-w-7xl gap-24 lg:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.45em] text-neutral-400">
              THE PROBLEM
            </p>

            <h3 className="mt-10 font-serif text-5xl">
              For years, presentations relied on static images.
            </h3>
          </div>

          <div className="space-y-8 text-xl leading-9 text-neutral-600">
            <p>Clients were expected to imagine the final result.</p>

            <p>That often led to confusion, delays and endless revisions.</p>

            <p>We believed there had to be a better way.</p>
          </div>
        </div>
      </div>
      {/* Block 4 */}

      <div className="story-block flex min-h-screen items-center justify-center px-8">
        <div className="max-w-6xl text-center">
          <h2 className="font-serif text-7xl leading-none md:text-9xl">
            Experience
            <br />
            replaces
            <br />
            imagination.
          </h2>

          <p className="mx-auto mt-16 max-w-3xl text-xl leading-9 text-white/60">
            AIR transforms concepts into interactive environments where ideas
            can be explored, modified and understood instantly.
          </p>

          {/* Know More */}

          <div className="mt-14 flex justify-center">
            <Link
              href="/about"
              className="
          group
          inline-flex
          items-center
          gap-4
          rounded-full
          border
          border-white/20
          px-8
          py-4
          text-xs
          uppercase
          tracking-[0.3em]
          text-white
          transition-all
          duration-500
          hover:-translate-y-1
          hover:border-white
          hover:bg-white
          hover:text-black
        "
            >
              <span>Know More</span>

              <svg
                className="transition-transform duration-500 group-hover:translate-x-1"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12H19" />
                <path d="M13 6L19 12L13 18" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
