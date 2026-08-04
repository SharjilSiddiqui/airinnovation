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
  const { theme, navbarVisible } = useNavbar();

  const isHero = theme === "hero";
  const isLight = theme === "light";
  const isDark = theme === "dark";

  return (
    <header
      className={`
        fixed
        inset-x-0
        top-0
        z-[100]
        transition-all
        duration-700

        ${
          navbarVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-8 opacity-0 pointer-events-none"
        }
      `}
    >
      <div
        className={`
          mx-auto
          flex
          h-24
          w-full
          max-w-[1600px]
          items-center
          justify-between
          px-12
          transition-all
          duration-700

          ${
            isHero
              ? `
                bg-transparent
                border-b
                border-white/15
              `
              : isLight
                ? `
                  bg-white/90
                  border-b
                  border-black/10
                  backdrop-blur-xl
                `
                : `
                  bg-black/65
                  border-b
                  border-white/10
                  backdrop-blur-xl
                `
          }
        `}
      >
        {/* Logo */}

        <Link href="/" className="group">
          <h1
            className={`
              font-serif
              text-[46px]
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

        <nav className="hidden items-center gap-16 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`
                relative
                text-[13px]
                uppercase
                tracking-[0.28em]
                transition-colors
                duration-300

                ${
                  isHero || isDark
                    ? "text-white/75 hover:text-white"
                    : "text-neutral-700 hover:text-black"
                }
              `}
            >
              {item.label}

              <span
                className={`
                  absolute
                  -bottom-3
                  left-0
                  h-px
                  w-0
                  transition-all
                  duration-500
                  hover:w-full

                  ${isHero || isDark ? "bg-white" : "bg-black"}
                `}
              />

              <span
                className={`
                  absolute
                  -bottom-3
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
            gap-4
            rounded-full
            border
            px-8
            py-3
            text-[13px]
            uppercase
            tracking-[0.2em]
            transition-all
            duration-500
            lg:flex

            ${
              isHero
                ? `
                  border-white/20
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
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            transition-all
            lg:hidden

            ${
              isHero || isDark
                ? "border-white/20 text-white"
                : "border-black/20 text-black"
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
