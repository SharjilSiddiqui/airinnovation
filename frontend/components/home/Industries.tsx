"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const industries = [
  {
    id: "01",
    title: "Architecture",
    subtitle: "Design before construction.",
    image: "/images/industry-architecture.jpg",
  },
  {
    id: "02",
    title: "Real Estate",
    subtitle: "Sell experiences instead of drawings.",
    image: "/images/industry-realestate.jpg",
  },
  {
    id: "03",
    title: "Hospitality",
    subtitle: "Walk through every guest journey.",
    image: "/images/industry-hospitality.jpg",
  },
  {
    id: "04",
    title: "Retail",
    subtitle: "Create stores customers remember.",
    image: "/images/industry-retail.jpg",
  },
  {
    id: "05",
    title: "Museums",
    subtitle: "Interactive storytelling without limits.",
    image: "/images/industry-museum.jpg",
  },
  {
    id: "06",
    title: "Education",
    subtitle: "Learning through immersive environments.",
    image: "/images/industry-education.jpg",
  },
];

export default function Industries() {
  const sectionRef = useRef<HTMLElement>(null);

  // Dual buffer for images to perform smooth crossfades
  const [bgA, setBgA] = useState(industries[0].image);
  const [bgB, setBgB] = useState(industries[1].image);

  // Text content state for active hero display
  const [activeData, setActiveData] = useState(industries[0]);

  // DOM Refs for animation control
  const imgARef = useRef<HTMLImageElement>(null);
  const imgBRef = useRef<HTMLImageElement>(null);
  const counterRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // Tracks active image buffer: true -> A is active, false -> B is active
  const activeBufferRef = useRef(true);
  const lastIndexRef = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const stepCount = industries.length - 1;

      // Base states initialization
      gsap.set(imgARef.current, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px) brightness(100%)",
      });
      gsap.set(imgBRef.current, {
        opacity: 0,
        scale: 1.15,
        filter: "blur(8px) brightness(60%)",
      });
      gsap.set([counterRef.current, titleRef.current, subtitleRef.current], {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      });

      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          pinSpacing: true,
          start: "top top",
          end: () => `+=${window.innerHeight * stepCount * 1.25}`,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Loop through step transitions
      for (let i = 0; i < stepCount; i++) {
        const label = `step-${i}`;
        mainTl.addLabel(label);

        const nextIndex = i + 1;

        // Step transition trigger
        mainTl.to(
          {},
          {
            duration: 1,
            onStart: () => {
              if (lastIndexRef.current === nextIndex) return;

              const isA = activeBufferRef.current;
              const currentImgNode = isA ? imgARef.current : imgBRef.current;
              const nextImgNode = isA ? imgBRef.current : imgARef.current;

              // Pre-load image path on buffer
              if (isA) {
                setBgB(industries[nextIndex].image);
              } else {
                setBgA(industries[nextIndex].image);
              }

              // Text out phase
              gsap.to(
                [counterRef.current, titleRef.current, subtitleRef.current],
                {
                  opacity: 0,
                  y: -40,
                  filter: "blur(8px)",
                  duration: 0.35,
                  stagger: 0.03,
                  ease: "power2.in",
                  onComplete: () => {
                    setActiveData(industries[nextIndex]);
                    gsap.fromTo(
                      [
                        counterRef.current,
                        titleRef.current,
                        subtitleRef.current,
                      ],
                      { opacity: 0, y: 40, filter: "blur(8px)" },
                      {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 0.45,
                        stagger: 0.04,
                        ease: "power3.out",
                      },
                    );
                  },
                },
              );

              // Active image out phase
              gsap.to(currentImgNode, {
                opacity: 0,
                scale: 0.95,
                filter: "blur(8px) brightness(50%)",
                duration: 0.8,
                ease: "power2.inOut",
              });

              // Incoming image in phase
              gsap.fromTo(
                nextImgNode,
                {
                  opacity: 0,
                  scale: 1.15,
                  filter: "blur(8px) brightness(60%)",
                },
                {
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px) brightness(100%)",
                  duration: 0.8,
                  ease: "power2.out",
                },
              );

              activeBufferRef.current = !isA;
              lastIndexRef.current = nextIndex;
            },
            onReverseComplete: () => {
              if (lastIndexRef.current === i) return;

              const isA = activeBufferRef.current;
              const currentImgNode = isA ? imgARef.current : imgBRef.current;
              const prevImgNode = isA ? imgBRef.current : imgARef.current;

              if (isA) {
                setBgB(industries[i].image);
              } else {
                setBgA(industries[i].image);
              }

              // Text reverse phase
              gsap.to(
                [counterRef.current, titleRef.current, subtitleRef.current],
                {
                  opacity: 0,
                  y: 40,
                  filter: "blur(8px)",
                  duration: 0.35,
                  stagger: 0.03,
                  ease: "power2.in",
                  onComplete: () => {
                    setActiveData(industries[i]);
                    gsap.fromTo(
                      [
                        counterRef.current,
                        titleRef.current,
                        subtitleRef.current,
                      ],
                      { opacity: 0, y: -40, filter: "blur(8px)" },
                      {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration: 0.45,
                        stagger: 0.04,
                        ease: "power3.out",
                      },
                    );
                  },
                },
              );

              // Image reverse phase
              gsap.to(currentImgNode, {
                opacity: 0,
                scale: 1.15,
                filter: "blur(8px) brightness(60%)",
                duration: 0.8,
                ease: "power2.inOut",
              });

              gsap.fromTo(
                prevImgNode,
                {
                  opacity: 0,
                  scale: 0.95,
                  filter: "blur(8px) brightness(50%)",
                },
                {
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px) brightness(100%)",
                  duration: 0.8,
                  ease: "power2.out",
                },
              );

              activeBufferRef.current = !isA;
              lastIndexRef.current = i;
            },
          },
          label,
        );
      }

      // Final rest period before unpinning
      mainTl.to({}, { duration: 0.4 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full items-center justify-center bg-[#080808] text-white overflow-hidden select-none"
    >
      {/* SINGLE PINNED CANVAS */}
      <div className="relative h-[88vh] w-[92vw] max-w-[1800px] overflow-hidden rounded-[32px] sm:rounded-[40px] md:rounded-[48px] bg-black border border-white/10 shadow-2xl">
        {/* IMAGE BUFFER LAYER A */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            ref={imgARef}
            src={bgA}
            alt="Industry presentation layer A"
            fill
            priority
            sizes="92vw"
            className="object-cover transform-gpu will-change-transform"
          />
        </div>

        {/* IMAGE BUFFER LAYER B */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            ref={imgBRef}
            src={bgB}
            alt="Industry presentation layer B"
            fill
            priority
            sizes="92vw"
            className="object-cover transform-gpu will-change-transform"
          />
        </div>

        {/* CINEMATIC GRADIENT OVERLAYS */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

        {/* SINGLE HERO CONTENT LAYER */}
        <div className="relative z-10 flex h-full w-full items-center px-6 sm:px-12 md:px-20 lg:px-24">
          <div className="max-w-3xl">
            <p
              ref={counterRef}
              className="mb-4 sm:mb-6 font-mono text-xs sm:text-sm tracking-[0.5em] text-white/50 uppercase"
            >
              {activeData.id}
            </p>

            <h2
              ref={titleRef}
              className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light leading-[0.95] tracking-tight text-white/95"
            >
              {activeData.title}
            </h2>

            <div className="my-6 sm:my-8 md:my-10 h-px w-16 sm:w-24 md:w-32 bg-white/30" />

            <p
              ref={subtitleRef}
              className="max-w-xl font-light text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-white/70 tracking-wide"
            >
              {activeData.subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
