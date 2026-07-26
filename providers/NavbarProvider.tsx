"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";

export type NavbarTheme = "hero" | "light" | "dark";

type NavbarContextType = {
  theme: NavbarTheme;
  setTheme: (theme: NavbarTheme) => void;

  navbarVisible: boolean;
  setNavbarVisible: (visible: boolean) => void;
};

const NavbarContext = createContext<NavbarContextType | null>(null);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<NavbarTheme>("hero");

  // Navbar starts hidden because LandingScene is shown first.
  const [navbarVisible, setNavbarVisible] = useState(false);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      navbarVisible,
      setNavbarVisible,
    }),
    [theme, navbarVisible],
  );

  return (
    <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);

  if (!context) {
    throw new Error("useNavbar must be used inside NavbarProvider");
  }

  return context;
}
