"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";

export type NavbarTheme = "hero" | "light" | "dark";

interface NavbarContextType {
  theme: NavbarTheme;
  setTheme: (theme: NavbarTheme) => void;
}

const NavbarContext = createContext<NavbarContextType | null>(null);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<NavbarTheme>("hero");

  const value = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return (
    <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>
  );
}

export function useNavbar() {
  const ctx = useContext(NavbarContext);

  if (!ctx) {
    throw new Error("useNavbar must be used inside NavbarProvider");
  }

  return ctx;
}
