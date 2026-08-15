"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const reveals = gsap.utils.toArray<HTMLElement>(".about-reveal");

      reveals.forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 70,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".about-image").forEach((image) => {
        gsap.fromTo(
          image,
          {
            scale: 1.08,
          },
          {
            scale: 1,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: image,
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="min-h-screen overflow-hidden bg-black text-white"
    >
      {/* =========================================================
          NAVBAR
      ========================================================= */}

      <Navbar />

      <main>
        {/* =========================================================
            HERO
        ========================================================= */}

        <section className="relative flex min-h-screen items-end overflow-hidden bg-black px-6 pb-24 pt-40 sm:px-10 md:px-16 lg:px-24">
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="/images/about.jpg"
              alt="AIR Innovation architectural environment"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-45"
            />

            <div className="absolute inset-0 bg-black/55" />

            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.7) 100%)",
              }}
            />
          </div>

          {/* Hero content */}
          <div className="relative z-10 mx-auto w-full max-w-7xl">
            <div className="about-reveal max-w-6xl">
              <p className="mb-8 text-xs uppercase tracking-[0.5em] text-white/45">
                About AIR
              </p>

              <h1 className="max-w-5xl font-serif text-6xl font-light leading-[0.92] tracking-tight sm:text-7xl md:text-8xl lg:text-[9rem]">
                Architecture
                <br />
                you can
                <br />
                experience.
              </h1>
            </div>

            <div className="about-reveal mt-12 flex max-w-7xl flex-col gap-8 border-t border-white/15 pt-8 md:flex-row md:items-end md:justify-between">
              <p className="max-w-xl text-base leading-8 text-white/60 md:text-lg">
                AIR Innovation transforms architectural ideas into immersive,
                interactive environments that allow people to experience,
                understand and make decisions before construction begins.
              </p>

              <span className="text-xs uppercase tracking-[0.4em] text-white/35">
                Architecture × Technology
              </span>
            </div>
          </div>
        </section>

        {/* =========================================================
            INTRO STATEMENT
        ========================================================= */}

        <section className="bg-black px-6 py-32 sm:px-10 md:px-16 md:py-48 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <div className="about-reveal max-w-6xl">
              <p className="mb-10 text-xs uppercase tracking-[0.5em] text-white/35">
                Why AIR exists
              </p>

              <h2 className="font-serif text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                Because certainty
                <br />
                solves confusion.
              </h2>
            </div>

            <div className="mt-24 grid gap-12 border-t border-white/10 pt-12 md:grid-cols-2 md:gap-24">
              <div className="about-reveal">
                <p className="font-serif text-3xl font-light leading-tight text-white/90 md:text-4xl">
                  Static visuals show people what a space might look like.
                </p>
              </div>

              <div className="about-reveal space-y-6 text-base leading-8 text-white/45 md:text-lg">
                <p>
                  But architecture is more than an image. It is scale, movement,
                  material, atmosphere, light and the relationship between every
                  element in a space.
                </p>

                <p>
                  AIR was created to make those qualities tangible before the
                  first brick is laid.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            IMAGE FEATURE
        ========================================================= */}

        <section className="bg-black px-6 pb-32 sm:px-10 md:px-16 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <div className="about-image relative h-[60vh] min-h-[500px] overflow-hidden rounded-[32px] border border-white/10 md:h-[75vh]">
              <Image
                src="/images/experience-1.png"
                alt="Interactive architectural environment"
                fill
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="about-image object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12">
                <div className="about-reveal flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="mb-4 text-xs uppercase tracking-[0.45em] text-white/50">
                      The AIR approach
                    </p>

                    <h3 className="max-w-3xl font-serif text-4xl font-light leading-tight md:text-6xl">
                      Don't just show the space.
                      <br />
                      Let people step inside it.
                    </h3>
                  </div>

                  <span className="text-xs uppercase tracking-[0.4em] text-white/40">
                    01 — Experience
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            WHAT WE DO
        ========================================================= */}

        <section className="bg-white px-6 py-32 text-black sm:px-10 md:px-16 md:py-48 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <div className="about-reveal grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-black/40">
                  What we do
                </p>
              </div>

              <div>
                <h2 className="font-serif text-5xl font-light leading-[1.02] tracking-tight md:text-7xl">
                  We turn ideas
                  <br />
                  into experiences.
                </h2>
              </div>
            </div>

            <div className="mt-24 grid border-t border-black/10 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  number: "01",
                  title: "Interactive Environments",
                  text: "Explore architectural spaces before they are built, from complete environments to individual details.",
                },
                {
                  number: "02",
                  title: "Real-Time Configuration",
                  text: "Change materials, finishes, lighting and furniture instantly and understand how every decision affects the space.",
                },
                {
                  number: "03",
                  title: "Client Experiences",
                  text: "Turn presentations into interactive conversations where clients can explore, question and decide.",
                },
                {
                  number: "04",
                  title: "Immersive Technology",
                  text: "Bring architectural experiences to desktop, mobile and immersive platforms through real-time technology.",
                },
              ].map((item) => (
                <div
                  key={item.number}
                  className="about-reveal border-b border-black/10 px-0 py-10 md:px-8 md:first:pl-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
                >
                  <p className="mb-12 text-xs tracking-[0.4em] text-black/35">
                    {item.number}
                  </p>

                  <h3 className="max-w-xs font-serif text-3xl font-light leading-tight">
                    {item.title}
                  </h3>

                  <p className="mt-8 max-w-sm text-sm leading-7 text-black/55">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            PHILOSOPHY
        ========================================================= */}

        <section className="bg-black px-6 py-32 sm:px-10 md:px-16 md:py-48 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <div className="about-reveal grid gap-20 lg:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.5em] text-white/35">
                  Our philosophy
                </p>
              </div>

              <div>
                <h2 className="font-serif text-5xl font-light leading-[1.05] md:text-7xl">
                  Experience replaces imagination.
                </h2>

                <div className="mt-12 space-y-6 text-base leading-8 text-white/45 md:text-lg">
                  <p>
                    Architecture has always been about creating places people
                    can inhabit, interact with and remember.
                  </p>

                  <p>
                    We believe the process of designing those places should feel
                    just as immersive.
                  </p>

                  <p>
                    AIR connects architectural thinking with real-time
                    technology to create a more intuitive way of understanding
                    space.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            PROCESS
        ========================================================= */}

        <section className="bg-[#111111] px-6 py-32 sm:px-10 md:px-16 md:py-48 lg:px-24">
          <div className="mx-auto max-w-7xl">
            <div className="about-reveal mb-24">
              <p className="mb-8 text-xs uppercase tracking-[0.5em] text-white/35">
                How we work
              </p>

              <h2 className="max-w-5xl font-serif text-5xl font-light leading-[1.02] md:text-7xl">
                From concept
                <br />
                to confidence.
              </h2>
            </div>

            <div className="border-t border-white/10">
              {[
                {
                  number: "01",
                  title: "Understand",
                  text: "We begin with the architectural idea, the intended experience and the decisions that matter most.",
                },
                {
                  number: "02",
                  title: "Build",
                  text: "We translate the design into a real-time environment where space, material and atmosphere can be explored.",
                },
                {
                  number: "03",
                  title: "Experience",
                  text: "Clients and stakeholders step inside the project and interact with it as if it already exists.",
                },
                {
                  number: "04",
                  title: "Decide",
                  text: "With greater clarity comes better decisions, fewer uncertainties and a stronger final result.",
                },
              ].map((item) => (
                <div
                  key={item.number}
                  className="about-reveal grid gap-6 border-b border-white/10 py-10 md:grid-cols-[100px_0.7fr_1fr] md:items-center md:gap-12"
                >
                  <span className="text-xs tracking-[0.4em] text-white/30">
                    {item.number}
                  </span>

                  <h3 className="font-serif text-4xl font-light md:text-5xl">
                    {item.title}
                  </h3>

                  <p className="max-w-lg text-sm leading-7 text-white/40 md:text-base">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            FINAL CTA
        ========================================================= */}

        <section className="relative overflow-hidden bg-black px-6 py-40 sm:px-10 md:px-16 md:py-56 lg:px-24">
          <div className="absolute inset-0">
            <Image
              src="/images/about.jpg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-15"
            />

            <div className="absolute inset-0 bg-black/75" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="about-reveal max-w-5xl">
              <p className="mb-8 text-xs uppercase tracking-[0.5em] text-white/35">
                Start a conversation
              </p>

              <h2 className="font-serif text-6xl font-light leading-[0.95] tracking-tight md:text-8xl">
                Let's build
                <br />
                something
                <br />
                worth experiencing.
              </h2>

              <div className="mt-14">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-5 rounded-full border border-white/20 px-8 py-4 text-xs uppercase tracking-[0.3em] transition-all duration-500 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-black"
                >
                  <span>Let's Talk</span>

                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-500 group-hover:translate-x-1"
                  >
                    <path d="M5 12H19" />
                    <path d="M13 6L19 12L13 18" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================
          FOOTER
      ========================================================= */}

      <Footer />
    </div>
  );
}
