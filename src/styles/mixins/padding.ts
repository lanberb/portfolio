import { css, type RuleSet, type CSSProperties } from "styled-components";

export interface PaddingProps {
  p?: CSSProperties["padding"];
  pt?: CSSProperties["paddingTop"];
  pl?: CSSProperties["paddingLeft"];
  pr?: CSSProperties["paddingRight"];
  pb?: CSSProperties["paddingBottom"];
}

export const paddings = ({
  p = 0,
  pb = 0,
  pl = 0,
  pr = 0,
  pt = 0,
}: PaddingProps): RuleSet => css`
  padding: ${p};
  padding-top: ${pt};
  padding-left: ${pl};
  padding-right: ${pr};
  padding-bottom: ${pb};
`;
