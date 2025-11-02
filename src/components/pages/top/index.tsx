import styled from "@emotion/styled";
import type { FC } from "react";
import { TopBackgroundCanvas } from "@/components/modules/TopBackgroundCanvas";
import { Box } from "@/components/unit/Box";
import { type TransitionProps, transition } from "@/styles/mixins";

const _FixedTransitionItem = styled(Box)<{ show: boolean } & TransitionProps>`
  opacity: ${({ show }) => (show ? 1 : 0)};
  ${transition};
`;

export const TopPage: FC = () => {
  return (
    <div>
      <TopBackgroundCanvas />
      
      <_FixedTransitionItem position="absolute" bottom={64} left={64} show={true}>
      </_FixedTransitionItem>

      <_FixedTransitionItem position="absolute" bottom={64} right={64} show={true}>
      </_FixedTransitionItem>
    </div>
  );
};
