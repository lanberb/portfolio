import {
  type BaseProps,
  type BorderProps,
  type MarginProps,
  type PaddingProps,
  type StackProps,
  base,
  borders,
  margins,
  paddings,
  stack,
} from "@/styles/mixins";
import styled from "@emotion/styled";
import { type JSX } from "react";

interface Props
  extends BaseProps,
    MarginProps,
    PaddingProps,
    BorderProps,
    StackProps {
  as?: keyof JSX.IntrinsicElements;
}

export const Stack = styled.div<Props>`
  ${base}
  ${stack}
  ${margins}
  ${paddings}
  ${borders}
`;
