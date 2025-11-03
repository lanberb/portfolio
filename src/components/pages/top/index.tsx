import styled from "@emotion/styled";
import type { FC } from "react";
import { TopBackgroundCanvas } from "@/components/modules/TopBackgroundCanvas";
import { TopKeyboardArrowHint } from "@/components/modules/TopKeyboardArrowHint";
import { TopKeyboardWasdHint } from "@/components/modules/TopKeyboardWasdHint";
import { Box } from "@/components/unit/Box";
import { useAnimationStore } from "@/state/animation";
import { type TransitionProps, transition } from "@/components/styles/mixins";

const _FixedTransitionItem = styled(Box)<{ show: boolean } & TransitionProps>`
  opacity: ${({ show }) => (show ? 1 : 0)};
  ${transition};
`;

export const TopPage: FC = () => {
  const animationStore = useAnimationStore();

  return (
    <Box position="relative" width="100vw" height="100vh">
      <TopBackgroundCanvas />

      <_FixedTransitionItem position="absolute" bottom={64} left={96} show={animationStore.isEndedOpeningAnimation}>
        <TopKeyboardWasdHint />
      </_FixedTransitionItem>

      <_FixedTransitionItem position="absolute" bottom={64} right={64} show={animationStore.isEndedOpeningAnimation}>
        <TopKeyboardArrowHint />
      </_FixedTransitionItem>
    </Box>
  );
};
