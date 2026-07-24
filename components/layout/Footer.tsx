"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import Container from "@/components/common/Container";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const explore = [
  { label: "Step In", href: "/" },
  { label: "Inside the Studio", href: "/about" },
  { label: "Experiences", href: "/projects" },
  { label: "Collaborate", href: "/contact" },
];

const socials = [
  // {
  //   label: "LinkedIn",
  //   href: "https://linkedin.com",
  // },
  {
    label: "Instagram",
    href: "https://www.instagram.com/airinovation",
  },
  // {
  //   label: "Behance",
  //   href: "https://behance.net",
  // },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.from(".footer-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1,
        ease: "power3.out",
      });

      tl.from(
        ".footer-fade",
        {
          y: 80,
          opacity: 0,
          stagger: 0.12,
          duration: 1,
          ease: "power3.out",
        },
        "-=.5",
      );

      tl.from(
        ".footer-watermark",
        {
          opacity: 0,
          y: 120,
          duration: 1.8,
          ease: "power4.out",
        },
        "-=.8",
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-black text-white"
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,.06),transparent_65%)]" />

      {/* Watermark */}
      <div className="footer-watermark pointer-events-none absolute bottom-[-8vw] left-1/2 -translate-x-1/2 select-none font-serif text-[22vw] font-light leading-none text-white/[0.03]">
        AIR
      </div>

      <Container className="relative flex min-h-screen flex-col justify-between py-28">
        {/* Top */}
        <div>
          <div className="footer-line h-px w-full bg-white/10" />

          <div className="mt-20 grid gap-20 lg:grid-cols-12">
            {/* Left */}
            <div className="footer-fade lg:col-span-6">
              <p className="mb-8 text-xs uppercase tracking-[0.45em] text-white/40">
                AIR Innovation
              </p>

              <h2 className="max-w-3xl font-serif text-5xl font-light leading-[0.95] md:text-7xl">
                Designing
                <br />
                experiences
                <br />
                people remember.
              </h2>

              <p className="mt-10 max-w-lg text-lg leading-8 text-white/55">
                We create immersive architectural experiences through
                storytelling, interaction, and technology—helping visionary
                brands present spaces before they're built.
              </p>
            </div>

            {/* Right */}
            <div className="grid gap-14 sm:grid-cols-2 lg:col-span-6">
              <div className="footer-fade">
                <p className="mb-8 text-xs uppercase tracking-[0.4em] text-white/35">
                  Explore
                </p>

                <div className="space-y-5">
                  {explore.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="group flex items-center gap-3 text-lg text-white/70 transition-all duration-500 hover:text-white"
                    >
                      <span className="-translate-x-3 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                        →
                      </span>

                      <span className="transition-transform duration-500 group-hover:translate-x-1">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="footer-fade">
                <p className="mb-8 text-xs uppercase tracking-[0.4em] text-white/35">
                  Contact
                </p>

                <div className="space-y-5">
                  <a
                    href="mailto:hello@airinnovation.com"
                    className="block text-lg text-white/70 transition hover:text-white"
                  >
                    hello@airinnovation.com
                  </a>

                  <p className="text-white/50">
                    Nashik
                    <br />
                    India
                  </p>

                  <div className="flex flex-col gap-4 pt-4">
                    {socials.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-3 text-white/60 transition hover:text-white"
                      >
                        <span className="-translate-x-3 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                          →
                        </span>

                        <span className="transition-transform duration-500 group-hover:translate-x-1">
                          {item.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-fade">
          <div className="mb-10 h-px w-full bg-white/10" />

          <div className="flex flex-col gap-4 text-sm text-white/35 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} AIR Innovation.</p>

            <p>Crafted with precision, motion & imagination.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
