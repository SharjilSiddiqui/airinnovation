"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "@/lib/gsap";

export default function IntroLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // if (sessionStorage.getItem("air_intro_played")) {
    //   setVisible(false);
    //   return;
    // }

    // sessionStorage.setItem("air_intro_played", "true");

    requestAnimationFrame(() => {
      if (!loaderRef.current || !logoRef.current || !subtitleRef.current) {
        return;
      }

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
        onComplete: () => {
          gsap.to(loaderRef.current, {
            opacity: 0,
            duration: 0.8,
            onComplete: () => setVisible(false),
          });
        },
      });

      tl.fromTo(
        logoRef.current,
        {
          opacity: 0,
          scale: 0.92,
          y: 20,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
        },
      );

      tl.fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.5",
      );

      tl.to(
        [logoRef.current, subtitleRef.current],
        {
          opacity: 0,
          scale: 1.05,
          duration: 0.8,
        },
        "+=0.6",
      );
    });
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black"
    >
      <div className="flex flex-col items-center">
        <div ref={logoRef}>
          <Image
            src="/logos/Logo.png" // <-- replace with your AIR logo
            alt="AIR Innovation"
            width={180}
            height={80}
            priority
          />
        </div>

        <p
          ref={subtitleRef}
          className="mt-8 text-xs uppercase tracking-[0.5em] text-white/60"
        >
          Interactive Experiences
        </p>
      </div>
    </div>
  );
}
