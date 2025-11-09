import { css, type SerializedStyles } from "@emotion/react";
import type { CSSProperties } from "react";
import { px } from "../helpers";
import type { Color, FontFamily, LineHeight, Theme } from "../theme";

export interface TypographyProps {
  theme?: Theme;
  color?: Color;
  fz?: CSSProperties["fontSize"];
  fw?: CSSProperties["fontWeight"];
  ff?: FontFamily;
  ta?: CSSProperties["textAlign"];
  tt?: CSSProperties["textTransform"];
  va?: CSSProperties["verticalAlign"];
  ws?: CSSProperties["whiteSpace"];
  lh?: LineHeight;
  ls?: CSSProperties["letterSpacing"];
}

export const typography = ({
  theme,
  color = "primary",
  fz,
  fw,
  ff,
  ta,
  tt,
  va,
  ws,
  lh = "100%",
  ls = "0.08rem",
}: TypographyProps): SerializedStyles => css`
  ${color && `color: var(${theme?.text?.[color]});`}
  ${fz && `font-size: ${px(fz)}`};
  ${fw && `font-weight: ${fw}`};
  ${ff && `font-family: ${ff}`};
  ${ta && `text-align: ${ta}`};
  ${tt && `text-transform: ${tt}`};
  ${va && `vertical-align: ${va}`};
  ${ws && `white-space: ${ws}`};
  ${lh && `line-height: ${lh}`};
  ${ls && `letter-spacing: ${px(ls)}`};
`;
