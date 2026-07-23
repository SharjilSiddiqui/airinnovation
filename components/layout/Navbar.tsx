"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  {
    label: "Inside the Studio",
    href: "#about",
  },
  //   {
  //     label: "Services",
  //     href: "#services",
  //   },
  //   {
  //     label: "Process",
  //     href: "#process",
  //   },
  {
    label: "Experiences",
    href: "#projects",
  },
  {
    label: "Collaborate",
    href: "#contact",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "py-5" : "py-8"
      }`}
    >
      <div
        className={`mx-auto flex h-16 w-[92%] max-w-7xl items-center justify-between rounded-full px-8 transition-all duration-500 ${
          scrolled
            ? "border border-white/10 bg-white/70 shadow-xl backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        <Link href="/" className="font-serif text-2xl tracking-[0.15em]">
          AIR
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm tracking-[0.18em] uppercase transition-opacity duration-300 hover:opacity-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#contact"
          className="hidden rounded-full border border-black px-6 py-3 text-sm transition-all duration-300 hover:bg-black hover:text-white lg:block"
        >
          Schedule Call
        </Link>

        <button className="lg:hidden">
          <svg
            width="26"
            height="26"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 7h18M4 13h18M4 19h18" />
          </svg>
        </button>
      </div>
    </header>
  );
}
