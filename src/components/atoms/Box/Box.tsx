import { base, type BaseProps } from "@/styles/mixins";
import styled from "styled-components";

interface Props extends BaseProps {
  as?: JSX.IntrinsicElements;
}

export const Box = styled.div<Props>`
  ${base}
`;
