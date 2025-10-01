import { type BaseProps, type MarginProps, type PaddingProps, type TypographyProps, base, margins, paddings, typography } from "@/styles/mixins";
import styled from "@emotion/styled";
import type { ElementType, LabelHTMLAttributes } from "react";

interface Props extends TypographyProps, BaseProps, MarginProps, PaddingProps {
  as?: ElementType;
  htmlFor?: LabelHTMLAttributes<HTMLLabelElement>["htmlFor"];
}

export const Text = styled.p<Props>`
  ${typography}
  ${({ color = "primary", ...resize }) => base({ color, ...resize })}
  ${margins}
  ${paddings}
`;
