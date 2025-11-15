import styled from "@emotion/styled";
import {
  type BaseProps,
  type BorderProps,
  base,
  borders,
  type GridItemProps,
  type GridProps,
  grid,
  gridItem,
  type MarginProps,
  margins,
  type PaddingProps,
  paddings,
} from "@/components/styles/mixins";

interface GridComponentProps extends BaseProps, MarginProps, PaddingProps, BorderProps, GridProps {}

export const Grid = styled.div<GridComponentProps>`
  display: block;
  ${base}
  ${grid}
  ${margins}
  ${paddings}
  ${borders}
`;

interface GridItemComponentProps extends GridItemProps {}

export const GridItem = styled.div<GridItemComponentProps>`
  ${gridItem}
`;
