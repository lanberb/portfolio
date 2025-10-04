import { useTheme } from "@/components/hooks/useTheme";
import type { Theme } from "@/styles/theme";
import { useCallback } from "react";

type Return = {
  getSurfaceColor: (key: keyof Theme["surface"]) => string;
};

export const useCanvasColor = (): Return => {
  const themeState = useTheme();
  if (themeState == null) {
    throw new Error("useTheme must be used within a ThemeStateProvider");
  }

  const getSurfaceColor = useCallback(
    (key: keyof Theme["surface"]) => {
      const color = window.getComputedStyle(document.documentElement).getPropertyValue(themeState.theme.surface[key]).trim();
      return color;
    },
    [themeState],
  );

  return {
    getSurfaceColor,
  };
};
