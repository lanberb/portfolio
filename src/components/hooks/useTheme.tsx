import { PrefersColorScheme } from "@/styles/media";
import { type ThemeMode, type ThemeState, themeKeyMap } from "@/styles/theme";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { type FC, type PropsWithChildren, createContext, useCallback, useContext, useEffect, useState } from "react";

const ThemeStateContext = createContext<ThemeState | null>(null);

export const ThemeStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  const change = useCallback((mode: ThemeMode) => {
    setThemeMode(mode);

    // Flash of Unstyled Content防止目的でGlobalStyleで定義されたbodyの背景色を切り替える
    document.body.style.backgroundColor = `var(--theme-${mode}-color-surface-primary)`;
    // bodyのスタイルを動的に切り替えられるようにdatasetに設定する
    document.body.dataset.themeMode = mode;
  }, []);

  const themeState: ThemeState = {
    theme: themeKeyMap[themeMode],
    mode: themeMode,
    change,
  };

  const handleOnChangeSystemThemeColorLight = useCallback(() => {
    setThemeMode("light");
  }, []);
  const handleOnChangeSystemThemeColorDark = useCallback(() => {
    setThemeMode("dark");
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // マウント時点のthemeを設定する
      if (window.matchMedia(PrefersColorScheme.light).matches) {
        setThemeMode("light");
        document.body.dataset.themeMode = "light";
      }
      if (window.matchMedia(PrefersColorScheme.dark).matches) {
        setThemeMode("dark");
        document.body.dataset.themeMode = "dark";
      }

      // デバイスのtheme切り替えを検知して同期する
      window.matchMedia(PrefersColorScheme.light).addEventListener("change", handleOnChangeSystemThemeColorLight);
      window.matchMedia(PrefersColorScheme.dark).addEventListener("change", handleOnChangeSystemThemeColorDark);
    }

    return () => {
      window.matchMedia(PrefersColorScheme.light).removeEventListener("change", handleOnChangeSystemThemeColorLight);
      window.matchMedia(PrefersColorScheme.dark).removeEventListener("change", handleOnChangeSystemThemeColorDark);
    };
  }, [handleOnChangeSystemThemeColorLight, handleOnChangeSystemThemeColorDark]);

  return (
    <ThemeStateContext.Provider value={themeState}>
      <EmotionThemeProvider theme={themeKeyMap[themeMode]}>{children}</EmotionThemeProvider>
    </ThemeStateContext.Provider>
  );
};

export const useTheme = (): ThemeState | null => {
  const state = useContext(ThemeStateContext);

  return state;
};
