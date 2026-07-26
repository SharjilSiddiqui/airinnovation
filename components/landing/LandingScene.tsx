"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useNavbar } from "@/providers/NavbarProvider";

export default function LandingScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [showVideo, setShowVideo] = useState(false);

  const { setNavbarVisible } = useNavbar();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "bottom 85%",

      onLeave: () => {
        setNavbarVisible(true);
      },

      onEnterBack: () => {
        setNavbarVisible(false);
      },
    });

    const timer = setTimeout(() => {
      setShowVideo(true);

      videoRef.current?.play();

      gsap.fromTo(
        videoRef.current,
        {
          opacity: 0,
          scale: 1.05,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 2,
          ease: "power3.out",
        },
      );
    }, 3500);

    return () => {
      clearTimeout(timer);
      trigger.kill();
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
        className="absolute inset-0 h-full w-full object-cover opacity-0"
        src="/videos/intro.mp4"
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Soft Radial Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 20%, rgba(0,0,0,.45) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <Image
          src="/logos/air-white.png"
          alt="AIR Innovation"
          width={320}
          height={130}
          priority
          className="w-[220px] md:w-[320px]"
        />

        <p className="mt-8 max-w-xl text-xs uppercase tracking-[0.55em] text-white/70 md:text-sm">
          Immersive Architectural Experiences
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2">
        <div className="flex flex-col items-center">
          <span className="mb-4 text-[11px] uppercase tracking-[0.45em] text-white/50">
            Scroll
          </span>

          <div className="flex h-14 w-8 justify-center rounded-full border border-white/30">
            <div className="mt-2 h-2 w-2 animate-bounce rounded-full bg-white" />
          </div>
        </div>
      </div>
    </section>
  );
}
