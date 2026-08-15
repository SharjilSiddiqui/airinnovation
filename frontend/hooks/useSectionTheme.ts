"use client";

import { useEffect, RefObject } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import gsap from "@/lib/gsap";
import { NavbarTheme, useNavbar } from "@/providers/NavbarProvider";

gsap.registerPlugin(ScrollTrigger);

export default function useSectionTheme(
  ref: RefObject<HTMLElement | null>,
  theme: NavbarTheme,
) {
  const { setTheme } = useNavbar();

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,

      start: "top center",

      end: "bottom center",

      onEnter: () => setTheme(theme),

      onEnterBack: () => setTheme(theme),
    });

    return () => {
      trigger.kill();
    };
  }, [theme, ref, setTheme]);
}
