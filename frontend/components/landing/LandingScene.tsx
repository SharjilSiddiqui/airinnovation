"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useNavbar } from "@/providers/NavbarProvider";

export default function LandingScene() {
  const sectionRef = useRef<HTMLElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const { setNavbarVisible } = useNavbar();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "bottom 85%",

      onLeave: () => setNavbarVisible(true),
      onEnterBack: () => setNavbarVisible(false),
    });

    // Initial states
    gsap.set(videoRef.current, {
      opacity: 0,
      scale: 1.05,
    });

    gsap.set(logoRef.current, {
      opacity: 0,
      y: 35,
      scale: 0.92,
      filter: "blur(10px)",
    });

    gsap.set(subtitleRef.current, {
      opacity: 0,
      y: 18,
    });

    // Intro animation
    const tl = gsap.timeline();

    tl.to(logoRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.8,
      ease: "power4.out",
    });

    tl.to(
      subtitleRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
      },
      "-=0.9",
    );

    // Reveal background video after delay
    const timer = setTimeout(() => {
      videoRef.current?.play();

      gsap
        .timeline()
        .to(videoRef.current, {
          opacity: 1,
          scale: 1,
          duration: 2.2,
          ease: "power3.out",
        })
        .to(
          logoRef.current,
          {
            filter: "drop-shadow(0 0 24px rgba(255,255,255,.18))",
            duration: 2,
            ease: "power2.out",
          },
          "<",
        );
    }, 3500);

    return () => {
      clearTimeout(timer);
      trigger.kill();
      tl.kill();
    };
  }, [setNavbarVisible]);

  return (
    <section
      ref={sectionRef}
      id="landing"
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/intro.mp4"
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Cinematic Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 20%, rgba(0,0,0,.55) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div ref={logoRef}>
          <Image
            src="/logos/air-white.png"
            alt="AIR Innovation"
            width={340}
            height={140}
            priority
            className="w-[220px] md:w-[340px]"
          />
        </div>

        <p
          ref={subtitleRef}
          className="mt-8 max-w-xl text-xs uppercase tracking-[0.55em] text-white/70 md:text-sm"
        >
          Immersive Architectural Experiences
        </p>
      </div>

      {/* Explore Button */}
      <div className="absolute bottom-14 left-1/2 z-20 -translate-x-1/2">
        <button
          onClick={() => {
            document
              .getElementById("hero")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="
group
inline-flex
items-center
gap-4
rounded-full
border
border-white/30
bg-black/20
px-8
py-4
text-white
backdrop-blur-xl
transition-all
duration-500
hover:-translate-y-1
hover:border-white
hover:bg-white
hover:text-black
"
        >
          <span className="text-xs font-medium uppercase tracking-[0.35em]">
            Explore
          </span>

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
        </button>
      </div>
    </section>
  );
}
