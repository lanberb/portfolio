import { css, type RuleSet, type CSSProperties } from "styled-components";

export interface BaseProps {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  maxWidth?: CSSProperties["maxWidth"];
  maxHeight?: CSSProperties["maxHeight"];
  radius?: number;
}

export const base = ({
  width = "auto",
  height = "auto",
  maxWidth = "none",
  maxHeight = "none",
  radius = 0,
}: BaseProps): RuleSet => css`
  width: ${width};
  height: ${height};
  max-width: ${maxWidth};
  max-height: ${maxHeight};
  border-radius: ${radius}px;
`;
