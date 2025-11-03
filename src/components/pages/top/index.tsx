import styled from "@emotion/styled";
import type { FC } from "react";
import { TopBackgroundCanvas } from "@/components/modules/TopBackgroundCanvas";
import { TopKeyboardArrowHint } from "@/components/modules/TopKeyboardArrowHint";
// import { TopKeyboardWasdHint } from "@/components/modules/TopKeyboardWasdHint";
import { Box } from "@/components/unit/Box";
import { useAnimationStore } from "@/state/animation";

const _HintItem = styled.div<{ show: boolean }>`
  opacity: ${({ show }) => (show ? 1 : 0)};
  position: absolute;
  width: fit-content;
  height: fit-content;
  inset: 50%;
  transform: translate(-50%, calc(-50% + 128px));
  pointer-events: none;
`;

export const TopPage: FC = () => {
  const animationStore = useAnimationStore();

  return (
    <Box position="relative" width="100vw" height="100vh">
      <TopBackgroundCanvas />

      <_HintItem show={animationStore.isEndedOpeningAnimation && animationStore.isPlayedOnce === false}>
        {/* <TopKeyboardWasdHint /> */}
        <TopKeyboardArrowHint />
      </_HintItem>
    </Box>
  );
};
