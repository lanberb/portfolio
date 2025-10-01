import {
  type BaseProps,
  type MarginProps,
  type PaddingProps,
  base,
  margins,
  paddings,
} from "@/styles/mixins";
import styled from "@emotion/styled";

interface Props extends BaseProps, MarginProps, PaddingProps {
  as?: keyof JSX.IntrinsicElements;
}

export const Box = styled.div<Props>`
  ${base}
  ${margins}
  ${paddings}
`;
