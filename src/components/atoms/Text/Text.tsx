import {
  base,
  margins,
  paddings,
  typography,
  type BaseProps,
  type MarginProps,
  type PaddingProps,
  type TypographyProps,
} from "@/styles/mixins";
import styled from "styled-components";

interface Props extends TypographyProps, BaseProps, MarginProps, PaddingProps {
  as?: JSX.IntrinsicElements;
}

export const Text = styled.p<Props>`
  ${typography}
  ${base}
  ${margins}
  ${paddings}
`;
