"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const experiences = [
  {
    number: "01",
    title: "Interactive\nEnvironments",
    description:
      "Step inside your project before it's built. Explore every room, every angle and every detail in real time.",
    image: "/images/experience-1.png",
  },
  {
    number: "02",
    title: "Real-Time\nConfiguration",
    description:
      "Change materials, lighting, furniture and finishes instantly. No waiting. No guesswork.",
    image: "/images/experience-2.png",
  },
  {
    number: "03",
    title: "Client\nExperience",
    description:
      "Turn presentations into conversations where clients interact, explore and decide with confidence.",
    image: "/images/experience-3.png",
  },
  {
    number: "04",
    title: "Immersive\nTechnology",
    description:
      "Desktop, mobile or VR. Experience architecture through powerful real-time technology.",
    image: "/images/experience-4.png",
  },
];

export default function InteractiveExperiences() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slider = sliderRef.current;

      if (!slider) return;

      const panels = gsap.utils.toArray(".experience-panel");

      const scrollLength = window.innerWidth * (panels.length - 1);

      gsap.to(slider, {
        x: -scrollLength,
        ease: "none",

        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: `+=${scrollLength}`,
          invalidateOnRefresh: true,
        },
      });

      gsap.from(".experience-content", {
        opacity: 0,
        y: 80,
        stagger: 0.25,

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative bg-black text-white"
    >
      <div
        ref={sliderRef}
        className="flex h-screen"
        style={{
          width: `${experiences.length * 100}vw`,
        }}
      >
        {experiences.map((item) => (
          <div
            key={item.number}
            className="experience-panel relative flex h-screen w-screen shrink-0 items-center overflow-hidden"
          >
            {/* Background */}

            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/50" />

            {/* Content */}

            <div className="experience-content relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-10">
              <div className="max-w-xl">
                <p className="mb-8 text-sm tracking-[0.4em] text-white/60">
                  {item.number}
                </p>

                <h2 className="whitespace-pre-line font-serif text-6xl leading-none md:text-8xl">
                  {item.title}
                </h2>

                <p className="mt-10 text-lg leading-9 text-white/75">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
