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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".experience-card");
      if (!cards.length) return;

      const transitionCount = cards.length - 1;

      // Initial setup: strict visibility and baseline zIndex management
      cards.forEach((card, i) => {
        const inner = card.querySelector(".card-inner");
        const img = card.querySelector(".experience-image");
        const num = card.querySelector(".card-number");
        const title = card.querySelector(".card-title");
        const divider = card.querySelector(".card-divider");
        const desc = card.querySelector(".card-description");

        if (i > 0) {
          gsap.set(card, { zIndex: 1, autoAlpha: 0 });
          gsap.set(inner, {
            yPercent: 100,
            scale: 0.96,
            opacity: 0,
            borderRadius: "48px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
          });
          gsap.set(img, { scale: 1.08, filter: "blur(0px)" });
          gsap.set([num, title, divider, desc], { y: 24, opacity: 0 });
        } else {
          gsap.set(card, { zIndex: 10, autoAlpha: 1 });
          gsap.set(inner, {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            borderRadius: "40px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          });
          gsap.set(img, { scale: 1, filter: "blur(0px)" });
          gsap.set([num, title, divider, desc], { y: 0, opacity: 1 });
        }
      });

      // Master pinned timeline synchronized with scroll
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: "top top",
          end: () => `+=${window.innerHeight * (transitionCount * 1.2 + 0.4)}`,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Sequence card transitions with dynamic zIndex promotion and autoAlpha safety
      cards.forEach((currentCard, i) => {
        if (i === transitionCount) return;

        const nextCard = cards[i + 1];

        // Elements of outgoing card
        const currInner = currentCard.querySelector(".card-inner");
        const currImg = currentCard.querySelector(".experience-image");
        const currNum = currentCard.querySelector(".card-number");
        const currTitle = currentCard.querySelector(".card-title");
        const currDivider = currentCard.querySelector(".card-divider");
        const currDesc = currentCard.querySelector(".card-description");

        // Elements of incoming card
        const nextInner = nextCard.querySelector(".card-inner");
        const nextImg = nextCard.querySelector(".experience-image");
        const nextNum = nextCard.querySelector(".card-number");
        const nextTitle = nextCard.querySelector(".card-title");
        const nextDivider = nextCard.querySelector(".card-divider");
        const nextDesc = nextCard.querySelector(".card-description");

        const label = `step-${i}`;
        mainTl.addLabel(label);

        // 1. PHASE 1: Quick Exit of Active Text
        mainTl.to(
          [currNum, currTitle, currDivider, currDesc],
          {
            y: -20,
            opacity: 0,
            stagger: 0.02,
            duration: 0.35,
            ease: "power2.in",
          },
          label,
        );

        // 2. PHASE 2: Outgoing Card Scale Down & Fade Out
        mainTl.to(
          currInner,
          {
            scale: 0.96,
            opacity: 0,
            borderRadius: "48px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.8)",
            duration: 0.85,
            ease: "power2.inOut",
          },
          `${label}+=0.1`,
        );

        mainTl.to(
          currImg,
          {
            scale: 1.08,
            filter: "blur(4px)",
            duration: 0.85,
            ease: "power2.inOut",
          },
          `${label}+=0.1`,
        );

        // Complete concealment of outgoing wrapper (Prevents lower cards bleeding through)
        mainTl.to(
          currentCard,
          {
            autoAlpha: 0,
            zIndex: 1,
            duration: 0.01,
          },
          `${label}+=0.95`,
        );

        // 3. PHASE 3: Promote Incoming Card zIndex & Enable Visibility right before reveal
        const enterStart = `${label}+=0.35`;

        mainTl.to(
          nextCard,
          {
            autoAlpha: 1,
            zIndex: 20 + i,
            duration: 0.01,
          },
          enterStart,
        );

        mainTl.to(
          nextInner,
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            borderRadius: "40px",
            boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
            duration: 0.85,
            ease: "power3.out",
          },
          enterStart,
        );

        mainTl.to(
          nextImg,
          {
            scale: 1,
            filter: "blur(0px)",
            duration: 0.85,
            ease: "power2.out",
          },
          enterStart,
        );

        // 4. PHASE 4: Delayed Reveal of New Text
        mainTl.to(
          [nextNum, nextTitle, nextDivider, nextDesc],
          {
            y: 0,
            opacity: 1,
            stagger: 0.04,
            duration: 0.55,
            ease: "power3.out",
          },
          `${enterStart}+=0.45`,
        );
      });

      // Resting luxury pause for card 04 before unpinning
      mainTl.to({}, { duration: 0.5 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full h-screen text-white overflow-hidden select-none"
    >
      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
      >
        {experiences.map((item, index) => {
          const zIndex = experiences.length - index;

          return (
            <div
              key={item.number}
              className="experience-card absolute inset-0 flex items-center justify-center p-4 sm:p-8 md:p-12 pointer-events-none"
              style={{ zIndex }}
            >
              <div className="card-inner pointer-events-auto relative h-[85vh] w-[92vw] max-w-7xl overflow-hidden rounded-[40px] bg-neutral-950 border border-white/10 shadow-2xl will-change-transform">
                {/* Background Image Container */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title.replace("\n", " ")}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    className="experience-image object-cover transform-gpu will-change-transform"
                  />
                  {/* Subtle luxury gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                </div>

                {/* Content Area */}
                <div className="relative z-10 flex h-full items-center px-8 sm:px-14 md:px-20 lg:px-24">
                  <div className="max-w-2xl">
                    <p className="card-number mb-4 md:mb-6 text-xs sm:text-sm font-mono tracking-[0.5em] text-white/50 uppercase">
                      {item.number}
                    </p>

                    <h2 className="card-title whitespace-pre-line font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight font-light text-white/95">
                      {item.title}
                    </h2>

                    <div className="card-divider mt-6 md:mt-8 h-px w-20 md:w-32 bg-white/30" />

                    <p className="card-description mt-6 md:mt-8 max-w-lg text-sm sm:text-base md:text-lg leading-relaxed text-white/70 font-light tracking-wide">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
