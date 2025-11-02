import styled from "@emotion/styled";
import type { LabelHTMLAttributes } from "react";
import {
  type BaseProps,
  base,
  type MarginProps,
  margins,
  type PaddingProps,
  paddings,
  type TypographyProps,
  typography,
} from "@/styles/mixins";

interface Props extends TypographyProps, BaseProps, MarginProps, PaddingProps {
  as?: keyof JSX.IntrinsicElements;
  htmlFor?: LabelHTMLAttributes<HTMLLabelElement>["htmlFor"];
}

export const Text = styled.p<Props>`
  ${typography}
  ${({ color = "primary", ...resize }) => base({ color, ...resize })}
  ${margins}
  ${paddings}
`;
