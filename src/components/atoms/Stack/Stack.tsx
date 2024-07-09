import {
  type BaseProps,
  type MarginProps,
  type PaddingProps,
  type StackProps,
  base,
  margins,
  paddings,
  stack,
} from "@/styles/mixins";
import styled from "styled-components";

interface Props extends BaseProps, MarginProps, PaddingProps, StackProps {
  as?: JSX.IntrinsicElements;
}

export const Stack = styled.div<Props>`
  ${base}
  ${stack}
  ${margins}
  ${paddings}
`;
