export type Theme = {
  surface: {
    primary: string;
    primaryDisabled: string;
  };
  text: {
    primary: string;
    primaryDisabled: string;
    primaryOnHover: string;
  };
};
export type ThemeMode = "light" | "dark";
export type ThemeState = {
  theme: Theme;
  mode: ThemeMode;
  onChange: (e: ThemeMode) => void;
};

export const themeKeyMap: Record<ThemeMode, Theme> = {
  light: {
    surface: {
      primary: "--theme-light-color-surface-primary",
      primaryDisabled: "--theme-dark-color-surface-primary-disabled",
    },
    text: {
      primary: "--theme-light-color-text-primary",
      primaryDisabled: "--theme-light-color-text-primary-disabled",
      primaryOnHover: "--theme-light-color-surface-primary-disabled",
    },
  },
  dark: {
    surface: {
      primary: "--theme-dark-color-surface-primary",
      primaryDisabled: "--theme-dark-color-surface-primary-disabled",
    },
    text: {
      primary: "--theme-dark-color-text-primary",
      primaryDisabled: "--theme-dark-color-text-primary-disabled",
      primaryOnHover: "--theme-dark-color-surface-primary-disabled",
    },
  },
};

export type Color = keyof Theme["text"];
export type BackgroundColor = keyof Theme["surface"];
export type FontFamily = "Roboto" | "Zen Old Mincho";
export type LineHeight = "100%" | "140%" | "180%";
