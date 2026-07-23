"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  href = "#",
  children,
  className,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-black px-8 py-4 text-sm font-medium transition-all duration-300 hover:bg-black hover:text-white",
        className,
      )}
    >
      {children}
    </Link>
  );
}
