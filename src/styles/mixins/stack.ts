import { css, type CSSProperties, type RuleSet } from "styled-components";

export interface StackProps {
  direction?: CSSProperties["flexDirection"];
  wrap?: CSSProperties["flexWrap"];
  gap?: number;
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
}

export const stack = ({
  direction = "row",
  wrap = "nowrap",
  gap = 0,
  alignItems = "start",
  justifyContent = "start",
}: StackProps): RuleSet => css`
  display: flex;
  flex-direction: ${direction};
  flex-wrap: ${wrap};
  gap: ${gap}px;
  align-items: ${alignItems};
  justify-content: ${justifyContent};
`;

export interface StackItemProps {
  basis?: CSSProperties["flexBasis"];
  shrink?: CSSProperties["flexShrink"];
  grow?: CSSProperties["flexGrow"];
  alignSelf?: CSSProperties["alignSelf"];
  justifySelf?: CSSProperties["justifySelf"];
  order?: CSSProperties["order"];
}

export const stackItem = ({
  alignSelf = "inherit",
  basis = "auto",
  shrink = 1,
  grow = 0,
  justifySelf = "inherit",
  order,
}: StackItemProps): RuleSet => css`
  flex-basis: ${basis};
  flex-grow: ${grow};
  flex-shrink: ${shrink};
  align-self: ${alignSelf};
  justify-content: ${justifySelf};

  ${order ? `order: ${order};` : ""}
`;
