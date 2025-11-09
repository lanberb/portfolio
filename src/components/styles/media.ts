import type { ThemeMode } from "./theme";

export const PrefersColorScheme: Record<ThemeMode, string> = {
  light: "(prefers-color-scheme: light)",
  dark: "(prefers-color-scheme: dark)",
};

export const PrefersReducedMotion = "(prefers-reduced-motion: reduce)";

export const MediaQuery = {
  pc: "(min-width: 769px)",
  sp: "(max-width: 768px)",
} as const;
