import { css } from "@emotion/react";
import { Roboto, Zen_Old_Mincho } from "next/font/google";
import { PrefersColorScheme, PrefersReducedMotion } from "./media";
import { GLOBAL_TRANSITION_DURATION } from "./mixins/transition";
import { type Theme, themeKeyMap } from "./theme";

const roboto = Roboto({
  weight: "100",
  subsets: ["latin"],
});

const zenOldMincho = Zen_Old_Mincho({
  weight: "400",
  subsets: ["latin"],
});

export const createGlobalStyles = (_: Theme) => {
  return css`
    :root {
      ${themeKeyMap.light.surface.primary}: #BDBEC1;
      ${themeKeyMap.light.surface.primaryDisabled}: #969696;
      ${themeKeyMap.light.text.primary}: #0A0A0A;
      ${themeKeyMap.light.text.primaryDisabled}: #969696;
      ${themeKeyMap.dark.text.primaryOnHover}: #545454;

      ${themeKeyMap.dark.surface.primary}: #0A0A0A;
      ${themeKeyMap.dark.surface.primaryDisabled}: #323232;
      ${themeKeyMap.dark.text.primary}: #FFFFFF;
      ${themeKeyMap.dark.text.primaryDisabled}: #323232;
      ${themeKeyMap.dark.text.primaryOnHover}: #7B7B7B;
    }

    /**
     * デバイスのシステムカラーにのみ依存する(emotionのthemeStateに依存しない)色を使いたい場合
     * emotionのthemeはuseEffectでsetされるため、初期マウント時のFOUCを防止するためにCSS側でもthemeを定義する
     */
    @media (${PrefersColorScheme.light}) {
      :root {
        --color-surcface-primary: var(${themeKeyMap.light.surface.primary});
      }
    }
    @media (${PrefersColorScheme.dark}) {
      :root {
        --color-surcface-primary: var(${themeKeyMap.dark.surface.primary});
      }
    }

    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      transition: ${GLOBAL_TRANSITION_DURATION}ms;
    }
    @media (${PrefersReducedMotion}) {
      *, ::before, ::after {
        transition-duration: 0ms !important;
        animation-duration: 0ms !important;
        animation-iteration-count: 1 !important;
        scroll-behavior: auto !important;
      }
    }

    html, body {
      font-family: ${roboto.style.fontFamily}, sans-serif;
      font-weight: 400;
      font-size: 16px;
      font-style: normal;
      letter-spacing: 0.08rem;
      -webkit-font-smoothing: antialiased;
    }

    body {
      background-color: var(--color-surcface-primary);
    }

    a {
      color: inherit;
      text-decoration: none;
      height: fit-content;
    }
`;
};
