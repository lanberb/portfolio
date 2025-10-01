import {
  type BaseProps,
  type MarginProps,
  type PaddingProps,
  base,
  margins,
  paddings,
} from "@/styles/mixins";
import styled from "@emotion/styled";
import type { ElementType } from "react";

interface Props extends BaseProps, MarginProps, PaddingProps {
  as?: ElementType;
}

export const Box = styled.div<Props>`
  ${base}
  ${margins}
  ${paddings}
`;
