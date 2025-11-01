import { type BaseProps, base } from "@/styles/mixins";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

type Props = BaseProps & {
  grabbable?: boolean;
};

export const Canvas = styled.canvas<Props>`
  ${base}

  ${({ grabbable = false }) =>
    grabbable &&
    css`
    cursor: grab;
    &:active {
      cursor: grabbing;
    }
  `}
`;
