"use client";

import { FormEvent, useRef } from "react";
import Link from "next/link";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import useSectionTheme from "@/hooks/useSectionTheme";

export default function ContactPage() {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionTheme(sectionRef, "dark");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Connect this to your backend/email service later.
    console.log("Contact form submitted");
  };

  return (
    <main className="bg-black text-white">
      <Navbar />

      <section
        ref={sectionRef}
        className="min-h-screen bg-black px-6 pb-24 pt-36 sm:px-8 lg:px-12 lg:pt-44"
      >
        <div className="mx-auto max-w-7xl">
          {/* HEADER */}
          <div className="max-w-6xl">
            <p className="mb-8 text-xs uppercase tracking-[0.45em] text-white/35">
              Let's Talk
            </p>

            <h1 className="font-serif text-6xl font-light leading-[0.9] tracking-tight sm:text-7xl md:text-8xl lg:text-[9rem]">
              Let's build
              <br />
              something
              <br />
              <span className="text-white/40">certain.</span>
            </h1>

            <p className="mt-12 max-w-2xl text-base leading-8 text-white/50 sm:text-lg">
              Have a project in mind? Tell us what you're building, what you're
              imagining, or simply where you're stuck. We'll take it from there.
            </p>
          </div>

          {/* CONTACT AREA */}
          <div className="mt-24 grid gap-20 border-t border-white/10 pt-16 lg:grid-cols-[0.7fr_1.3fr] lg:mt-32">
            {/* CONTACT DETAILS */}
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-white/35">
                Start a Conversation
              </p>

              <div className="mt-10 space-y-10">
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/30">
                    Email
                  </p>

                  <a
                    href="mailto:hello@airinnovation.com"
                    className="text-lg text-white/75 transition-colors hover:text-white"
                  >
                    hello@airinnovation.com
                  </a>
                </div>

                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/30">
                    Availability
                  </p>

                  <p className="max-w-xs text-base leading-7 text-white/55">
                    Available for architectural visualization, interactive
                    experiences and digital environments.
                  </p>
                </div>

                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/30">
                    Explore
                  </p>

                  <Link
                    href="/projects"
                    className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-white/70 transition-colors hover:text-white"
                  >
                    View our work
                    <svg
                      className="transition-transform duration-500 group-hover:translate-x-1"
                      width="17"
                      height="17"
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

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid gap-10 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-4 block text-xs uppercase tracking-[0.3em] text-white/35"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full border-b border-white/15 bg-transparent pb-4 text-base text-white outline-none placeholder:text-white/25 transition-colors focus:border-white/60"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-4 block text-xs uppercase tracking-[0.3em] text-white/35"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full border-b border-white/15 bg-transparent pb-4 text-base text-white outline-none placeholder:text-white/25 transition-colors focus:border-white/60"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="mb-4 block text-xs uppercase tracking-[0.3em] text-white/35"
                >
                  Company / Studio
                </label>

                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Your company"
                  className="w-full border-b border-white/15 bg-transparent pb-4 text-base text-white outline-none placeholder:text-white/25 transition-colors focus:border-white/60"
                />
              </div>

              <div>
                <label
                  htmlFor="project"
                  className="mb-4 block text-xs uppercase tracking-[0.3em] text-white/35"
                >
                  Tell us about the project
                </label>

                <textarea
                  id="project"
                  name="project"
                  rows={5}
                  required
                  placeholder="What are you building?"
                  className="w-full resize-none border-b border-white/15 bg-transparent pb-4 text-base leading-8 text-white outline-none placeholder:text-white/25 transition-colors focus:border-white/60"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="group flex items-center gap-5 rounded-full bg-white px-8 py-4 text-xs uppercase tracking-[0.3em] text-black transition-all duration-500 hover:bg-white/85"
                >
                  <span>Send Inquiry</span>

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
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FINAL STATEMENT */}
      <section className="border-t border-white/10 bg-black px-6 py-32 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs uppercase tracking-[0.45em] text-white/30">
            AIR
          </p>

          <h2 className="mt-8 max-w-5xl font-serif text-5xl font-light leading-tight text-white/90 sm:text-6xl md:text-7xl">
            Before a decision is made,
            <br />
            experience it.
          </h2>
        </div>
      </section>

      <Footer />
    </main>
  );
}
