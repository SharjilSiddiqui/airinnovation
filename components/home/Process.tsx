"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    number: "01",
    title: "Start with an Idea",
    description:
      "Every project begins with a vision. Whether it's a sketch, BIM model or CAD drawing, we transform it into an immersive digital experience.",
    image: "/images/process-1.png",
  },
  {
    number: "02",
    title: "Build the Experience",
    description:
      "We recreate your project inside a real-time engine where every detail can be explored interactively.",
    image: "/images/process-2.png",
  },
  {
    number: "03",
    title: "Interact in Real Time",
    description:
      "Change materials, lighting, furniture and finishes instantly while walking through the project.",
    image: "/images/process-3.png",
  },
  {
    number: "04",
    title: "Make Better Decisions",
    description:
      "Clients experience the final result before construction begins, reducing revisions and increasing confidence.",
    image: "/images/process-4.png",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".process-panel");

      panels.forEach((panel) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          pin: true,
          pinSpacing: false,
        });
      });

      gsap.from(".process-content", {
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
    <section ref={sectionRef} id="process" className="bg-black">
      {steps.map((step) => (
        <div
          key={step.number}
          className="process-panel relative flex h-screen items-center overflow-hidden"
        >
          <Image
            src={step.image}
            alt={step.title}
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/55" />

          <div className="process-content relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-10 text-white">
            <div className="max-w-xl">
              <p className="mb-6 text-sm tracking-[0.45em] text-white/60">
                {step.number}
              </p>

              <h2 className="font-serif text-6xl leading-none md:text-8xl">
                {step.title}
              </h2>

              <p className="mt-10 text-lg leading-9 text-white/75">
                {step.description}
              </p>
            </div>

            {/* <div className="hidden lg:block">
              <div className="rounded-full border border-white/20 bg-white/10 px-8 py-4 backdrop-blur-xl">
                AIR Workflow
              </div>
            </div> */}
          </div>
        </div>
      ))}
    </section>
  );
}
