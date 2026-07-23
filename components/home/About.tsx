import Image from "next/image";

import Container from "@/components/common/Container";
import Section from "@/components/common/Section";

export default function About() {
  return (
    <Section id="about" className="bg-[#F7F6F3]">
      <Container>
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-6 text-xs uppercase tracking-[0.45em] text-neutral-500">
            ABOUT AIR
          </p>

          <h2 className="font-serif text-5xl leading-tight md:text-7xl">
            We transform architectural ideas into immersive digital experiences.
          </h2>
        </div>

        <div className="relative mt-24 overflow-hidden rounded-3xl">
          <Image
            src="/images/about.jpg"
            alt="AIR Innovation"
            width={1800}
            height={1100}
            className="h-[700px] w-full object-cover"
          />
        </div>

        <div className="mt-20 grid gap-16 md:grid-cols-2">
          <div>
            <p className="text-3xl font-serif">
              Interactive architecture isn't just about visualization.
            </p>
          </div>

          <div>
            <p className="text-lg leading-9 text-neutral-600">
              AIR Innovation creates immersive experiences that help architects,
              developers, and clients explore projects before they are built.
              Through interactive environments, virtual walkthroughs, and
              real-time visualization, we bridge the gap between imagination and
              reality.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
