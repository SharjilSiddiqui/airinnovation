"use client";

import Link from "next/link";
import { useNavbar } from "@/providers/NavbarProvider";

const navLinks = [
  {
    label: "Step In",
    href: "#hero",
  },
  {
    label: "Inside the Studio",
    href: "#about",
  },
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
  const { theme } = useNavbar();

  const isHero = theme === "hero";
  const isLight = theme === "light";
  const isDark = theme === "dark";

  return (
    <header className="fixed inset-x-0 top-0 z-[100] flex justify-center pt-5 transition-all duration-700 ease-out">
      <div
        className={`
          flex
          h-14
          w-[92%]
          max-w-7xl
          items-center
          justify-between
          rounded-[20px]
          px-8
          transition-all
          duration-700

          ${
            isHero
              ? `
                bg-transparent
              `
              : isLight
                ? `
                  border border-black/10
                  bg-white/75
                  backdrop-blur-3xl
                  shadow-[0_8px_40px_rgba(0,0,0,.08)]
                `
                : `
                  border border-white/10
                  bg-black/35
                  backdrop-blur-3xl
                  shadow-[0_8px_40px_rgba(0,0,0,.35)]
                `
          }
        `}
      >
        {/* Logo */}

        <Link href="/" className="group flex items-center gap-4">
          <h1
            className={`
              font-serif
              text-[32px]
              leading-none
              transition-colors
              duration-500
              ${isHero || isDark ? "text-white" : "text-neutral-900"}
            `}
          >
            AIR
          </h1>
        </Link>

        {/* Navigation */}

        <nav className="hidden items-center gap-12 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`
                group
                relative
                text-[13px]
                font-medium
                tracking-[0.18em]
                transition-colors
                duration-300
                ${
                  isHero || isDark
                    ? "text-white/80 hover:text-white"
                    : "text-neutral-700 hover:text-black"
                }
              `}
            >
              {item.label}

              <span
                className={`
                  absolute
                  -bottom-2
                  left-0
                  h-px
                  w-0
                  transition-all
                  duration-500
                  group-hover:w-full
                  ${isHero || isDark ? "bg-white" : "bg-black"}
                `}
              />
            </Link>
          ))}
        </nav>

        {/* CTA */}

        <Link
          href="#contact"
          className={`
            group
            hidden
            items-center
            gap-3
            rounded-full
            border
            px-6
            py-2.5
            text-[13px]
            tracking-[0.18em]
            transition-all
            duration-500
            lg:flex

            ${
              isHero
                ? `
                  border-white/15
                  text-white
                  hover:bg-white
                  hover:text-black
                `
                : isLight
                  ? `
                    border-black/15
                    text-black
                    hover:bg-black
                    hover:text-white
                  `
                  : `
                    border-white/15
                    bg-white
                    text-black
                    hover:bg-neutral-200
                  `
            }
          `}
        >
          <span>Let's Talk</span>

          <svg
            className="transition-transform duration-500 group-hover:translate-x-1"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 12H19M13 6L19 12L13 18"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        {/* Mobile */}

        <button
          className={`
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            transition-all
            lg:hidden

            ${
              isHero || isDark
                ? "border-white/15 text-white"
                : "border-black/15 text-black"
            }
          `}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 7H20M4 12H20M4 17H20" />
          </svg>
        </button>
      </div>
    </header>
  );
}
