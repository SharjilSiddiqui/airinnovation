"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import useSectionTheme from "@/hooks/useSectionTheme";

export default function ProjectsPage() {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionTheme(sectionRef, "dark");

  return (
    <main className="bg-black text-white">
      <Navbar />

      <section ref={sectionRef} className="min-h-screen bg-black pt-32">
        {/* INTRO */}
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-6xl">
            <p className="mb-8 text-xs uppercase tracking-[0.45em] text-white/40">
              Selected Experience
            </p>

            <h1 className="font-serif text-6xl font-light leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-[9rem]">
              Architecture,
              <br />
              experienced.
            </h1>

            <p className="mt-12 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
              We transform architectural concepts into immersive digital
              environments where spaces can be explored, understood and
              experienced before they are built.
            </p>
          </div>
        </div>

        {/* PROJECT */}
        <div className="mx-auto mt-24 max-w-7xl px-6 sm:px-8 lg:px-12">
          {/* IMAGE */}
          <div className="relative overflow-hidden rounded-[32px] border border-white/10">
            <div className="relative aspect-[16/10] w-full">
              <Image
                src="/images/experience-1.png"
                alt="Interactive architectural environment"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

              <div className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12">
                <p className="mb-4 text-xs uppercase tracking-[0.45em] text-white/50">
                  01 / Featured Experience
                </p>

                <h2 className="font-serif text-4xl font-light sm:text-6xl md:text-7xl">
                  Interactive
                  <br />
                  Environments
                </h2>
              </div>
            </div>
          </div>

          {/* DETAILS */}
          <div className="grid gap-16 py-24 md:grid-cols-[1.2fr_0.8fr] lg:py-32">
            {/* LEFT */}
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-white/35">
                The Experience
              </p>

              <h3 className="mt-8 max-w-3xl font-serif text-4xl font-light leading-tight sm:text-5xl md:text-6xl">
                See the space before the space exists.
              </h3>

              <div className="mt-10 max-w-2xl space-y-6 text-base leading-8 text-white/55 sm:text-lg">
                <p>
                  Architectural drawings communicate intent. Renderings show
                  possibility. AIR takes the next step.
                </p>

                <p>
                  We create interactive environments that allow clients to step
                  inside a project before construction begins. Rooms, materials,
                  lighting and spatial relationships become something they can
                  experience rather than simply imagine.
                </p>

                <p>
                  The result is a clearer conversation between architects,
                  developers and clients — fewer assumptions, fewer revisions
                  and greater confidence in every decision.
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="md:pt-2">
              <div className="border-t border-white/10">
                <div className="flex items-center justify-between border-b border-white/10 py-6">
                  <span className="text-xs uppercase tracking-[0.3em] text-white/35">
                    Experience
                  </span>

                  <span className="text-sm text-white/70">
                    Interactive Environment
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 py-6">
                  <span className="text-xs uppercase tracking-[0.3em] text-white/35">
                    Platform
                  </span>

                  <span className="text-sm text-white/70">
                    Desktop / Web / VR
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 py-6">
                  <span className="text-xs uppercase tracking-[0.3em] text-white/35">
                    Focus
                  </span>

                  <span className="text-sm text-white/70">Visualization</span>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 py-6">
                  <span className="text-xs uppercase tracking-[0.3em] text-white/35">
                    Outcome
                  </span>

                  <span className="text-sm text-white/70">
                    Confident Decisions
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* DISCOVER MORE */}
          <div className="border-t border-white/10 py-20 sm:py-28">
            <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
              <div>
                <p className="mb-6 text-xs uppercase tracking-[0.45em] text-white/35">
                  Discover More
                </p>

                <h3 className="max-w-3xl font-serif text-4xl font-light leading-tight sm:text-5xl md:text-6xl">
                  See how AIR turns architecture into experience.
                </h3>
              </div>

              <Link
                href="/about"
                className="group flex shrink-0 items-center gap-5 rounded-full border border-white/20 px-7 py-4 text-xs uppercase tracking-[0.3em] transition-all duration-500 hover:bg-white hover:text-black"
              >
                <span>Know More</span>

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
      </section>

      <Footer />
    </main>
  );
}
