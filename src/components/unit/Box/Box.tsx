import {
  type BaseProps,
  type BorderProps,
  type MarginProps,
  type PaddingProps,
  base,
  borders,
  margins,
  paddings,
} from "@/styles/mixins";
import styled from "@emotion/styled";
import type { JSX } from "react";

interface Props extends BaseProps, MarginProps, PaddingProps, BorderProps {
  as?: keyof JSX.IntrinsicElements;
}

export const Box = styled.div<Props>`
  ${base}
  ${margins}
  ${paddings}
  ${borders};
`;
