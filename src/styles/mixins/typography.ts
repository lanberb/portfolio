import { css, type CSSProperties, type RuleSet } from "styled-components";

export interface TypographyProps {
  color?: CSSProperties["color"];
  fz?: number;
  fw?: CSSProperties["fontWeight"];
  ff?: CSSProperties["fontFamily"];
  ta?: CSSProperties["textAlign"];
  va?: CSSProperties["verticalAlign"];
  ws?: CSSProperties["whiteSpace"];
  lh?: `${number}%`;
  ls?: number;
}

export const typography = ({
  color = "inherit",
  fz,
  fw,
  ff,
  ta,
  va,
  ws,
  lh,
  ls,
}: TypographyProps): RuleSet => css`
  color: ${color};
  ${fz && `font-size: ${fz}`};
  ${fw && `font-weight: ${fw}`};
  ${ff && `font-family: ${ff}`};
  ${ta && `text-align: ${ta}`};
  ${va && `vertical-align: ${va}`};
  ${ws && `white-space: ${ws}`}
  ${lh && `line-height: ${lh}`};
  ${ls && `letter-spacing: ${ls}`};
`;
