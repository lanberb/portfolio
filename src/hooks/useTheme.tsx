import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { createContext, type FC, type PropsWithChildren, useCallback, useContext, useEffect } from "react";
import { PrefersColorScheme } from "@/components/styles/media";
import { type ThemeMode, type ThemeState, themeKeyMap } from "@/components/styles/theme";
import { useThemeStore } from "@/state/theme";
import { getIsBrowser } from "@/util/app";

const ThemeStateContext = createContext<ThemeState | null>(null);

const getSystemThemeMode = () => {
  if (window.matchMedia(PrefersColorScheme.light).matches) {
    return "light";
  }
  return "dark";
};

export const ThemeStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const { themeMode: persistedThemeMode, setThemeMode } = useThemeStore();

  const systemThemeMode = getSystemThemeMode();
  const themeMode = persistedThemeMode ?? systemThemeMode;

  const change = useCallback(
    (mode: ThemeMode) => {
      setThemeMode(mode);

      // Flash of Unstyled Content防止目的でGlobalStyleで定義されたbodyの背景色を切り替える
      document.body.style.backgroundColor = `var(--theme-${mode}-color-surface-primary)`;
      // bodyのスタイルを動的に切り替えられるようにdatasetに設定する
      document.body.dataset.themeMode = mode;
    },
    [setThemeMode],
  );

  const themeState: ThemeState = {
    theme: themeKeyMap[themeMode],
    mode: themeMode,
    change,
  };

  const handleOnChangeSystemThemeColorLight = useCallback(() => {
    change("light");
  }, [change]);
  const handleOnChangeSystemThemeColorDark = useCallback(() => {
    change("dark");
  }, [change]);

  useEffect(() => {
    if (getIsBrowser()) {
      document.body.dataset.themeMode = themeMode;

      // デバイスのtheme切り替えを検知して同期する
      window.matchMedia(PrefersColorScheme.light).addEventListener("change", handleOnChangeSystemThemeColorLight);
      window.matchMedia(PrefersColorScheme.dark).addEventListener("change", handleOnChangeSystemThemeColorDark);
    }

    return () => {
      window.matchMedia(PrefersColorScheme.light).removeEventListener("change", handleOnChangeSystemThemeColorLight);
      window.matchMedia(PrefersColorScheme.dark).removeEventListener("change", handleOnChangeSystemThemeColorDark);
    };
  }, [themeMode, handleOnChangeSystemThemeColorLight, handleOnChangeSystemThemeColorDark]);

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
