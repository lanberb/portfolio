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
import styled from "@emotion/styled";
import type { ElementType } from "react";

interface Props extends BaseProps, MarginProps, PaddingProps, StackProps {
  as?: ElementType;
}

export const Stack = styled.div<Props>`
  ${base}
  ${stack}
  ${margins}
  ${paddings}
`;
