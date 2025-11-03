import styled from "@emotion/styled";
import type { FC } from "react";
import { Box } from "@/components/unit/Box";
import { Icon } from "@/components/unit/Icon";

const _Container = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 8px;

  & > div {
    &[data-key="top"] {
      grid-area: 1 / 2;
    }
    &[data-key="left"] {
      grid-area: 2 / 1;
    }
    &[data-key="bottom"] {
      grid-area: 3 / 2;
    }
    &[data-key="right"] {
      grid-area: 2 / 3;
    }
  }
`;

export const TopKeyboardArrowHint: FC = () => {
  return (
    <_Container>
      <Box data-key="top">
        <Icon name="arrowTop" size={24} />
      </Box>
      <Box data-key="left">
        <Icon name="arrowLeft" size={24} />
      </Box>
      <Box data-key="bottom">
        <Icon name="arrowBottom" size={24} />
      </Box>
      <Box data-key="right">
        <Icon name="arrowRight" size={24} />
      </Box>
    </_Container>
  );
};
