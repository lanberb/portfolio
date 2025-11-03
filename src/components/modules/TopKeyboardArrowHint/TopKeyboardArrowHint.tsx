import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import type { FC } from "react";
import { Box } from "@/components/unit/Box";
import { Icon } from "@/components/unit/Icon";
import { Stack } from "@/components/unit/Stack";
import { Text } from "@/components/unit/Text";
import { useI18n } from "@/hooks/useI18n";

const ArrowMoveDistance = "20%";

const arrowTopKeyframes = keyframes`
  from {
    transform: translateY(0%);
  }
  to {
    transform: translateY(-${ArrowMoveDistance});
  }
`;
const arrowLeftKeyframes = keyframes`
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-${ArrowMoveDistance});
  }
`;
const arrowBottomKeyframes = keyframes`
  from {
    transform: translateY(0%);
  }
  to {
    transform: translateY(${ArrowMoveDistance});
  }
`;
const arrowRightKeyframes = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(${ArrowMoveDistance});
  }
`;

const _Grid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 8px;
  width: fit-content;

  & > div {
    width: 24px;
    height: 24px;

    &[data-key="top"] {
      grid-area: 1 / 2;
      animation: ${arrowTopKeyframes} 1s ease-in-out infinite alternate;
    }
    &[data-key="left"] {
      grid-area: 2 / 1;
      animation: ${arrowLeftKeyframes} 1s ease-in-out infinite alternate;
    }
    &[data-key="bottom"] {
      grid-area: 3 / 2;
      animation: ${arrowBottomKeyframes} 1s ease-in-out infinite alternate;
    }
    &[data-key="right"] {
      grid-area: 2 / 3;
      animation: ${arrowRightKeyframes} 1s ease-in-out infinite alternate;
    }
  }
`;

export const TopKeyboardArrowHint: FC = () => {
  const { t } = useI18n();

  return (
    <Stack direction="column" gap={24} alignItems="center">
      <Text fz={14} ws="nowrap">
        {t["top.keyboardArrowHint.label"]}
      </Text>

      <_Grid>
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
      </_Grid>
    </Stack>
  );
};
