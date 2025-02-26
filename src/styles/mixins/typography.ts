import { type SerializedStyles, css } from "@emotion/react";
import type { CSSProperties } from "react";
import type { FontFamily, LineHeight } from "../theme";

export interface TypographyProps {
  fz?: CSSProperties["fontSize"];
  fw?: CSSProperties["fontWeight"];
  ff?: FontFamily;
  ta?: CSSProperties["textAlign"];
  va?: CSSProperties["verticalAlign"];
  ws?: CSSProperties["whiteSpace"];
  lh?: LineHeight;
  ls?: CSSProperties["letterSpacing"];
}

export const typography = ({
  fz,
  fw,
  ff,
  ta,
  va,
  ws,
  lh = "100%",
  ls,
}: TypographyProps): SerializedStyles => css`
  ${fz && `font-size: ${fz}`};
  ${fw && `font-weight: ${fw}`};
  ${ff && `font-family: ${ff}`};
  ${ta && `text-align: ${ta}`};
  ${va && `vertical-align: ${va}`};
  ${ws && `white-space: ${ws}`}
  ${lh && `line-height: ${lh}`};
  ${ls && `letter-spacing: ${ls}`};
`;
