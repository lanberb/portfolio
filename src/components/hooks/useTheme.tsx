import { PrefersColorScheme } from "@/styles/media";
import { type ThemeMode, type ThemeState, themeKeyMap } from "@/styles/theme";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import {
  type FC,
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeStateContext = createContext<ThemeState | null>(null);

export const ThemeStateProvider: FC<PropsWithChildren> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  const onChange = useCallback((mode: ThemeMode) => {
    setThemeMode(mode);

    // FOUC防止目的でGlobalStyleで定義されたbodyの背景色を切り替える
    document.body.style.backgroundColor = `var(--theme-${mode}-color-surface-primary)`;
  }, []);

  const onChangeSystemThemeColor = useCallback(
    (e: MediaQueryListEvent, mode: ThemeMode) => {
      if (e.matches) {
        onChange(mode);
      }
    },
    [onChange],
  );

  const themeState: ThemeState = {
    theme: themeKeyMap[themeMode],
    mode: themeMode,
    onChange,
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // マウント時点のthemeを設定する
      if (window.matchMedia(PrefersColorScheme.light).matches) {
        setThemeMode("light");
      }
      if (window.matchMedia(PrefersColorScheme.dark).matches) {
        setThemeMode("dark");
      }

      // デバイスのtheme切り替えを検知して同期する
      window
        .matchMedia(PrefersColorScheme.light)
        .addEventListener("change", (e) =>
          onChangeSystemThemeColor(e, "light"),
        );
      window
        .matchMedia(PrefersColorScheme.dark)
        .addEventListener("change", (e) => onChangeSystemThemeColor(e, "dark"));
    }

    return () => {
      window
        .matchMedia(PrefersColorScheme.light)
        .removeEventListener("change", (e) =>
          onChangeSystemThemeColor(e, "light"),
        );
      window
        .matchMedia(PrefersColorScheme.dark)
        .removeEventListener("change", (e) =>
          onChangeSystemThemeColor(e, "dark"),
        );
    };
  }, [onChangeSystemThemeColor]);

  return (
    <ThemeStateContext.Provider value={themeState}>
      <EmotionThemeProvider theme={themeKeyMap[themeMode]}>
        {children}
      </EmotionThemeProvider>
    </ThemeStateContext.Provider>
  );
};

export const useTheme = (): ThemeState | null => {
  const state = useContext(ThemeStateContext);

  return state;
};
