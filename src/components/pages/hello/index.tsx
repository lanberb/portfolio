import styled from "@emotion/styled";
import type { FC } from "react";
import { TopBackgroundCanvas } from "@/components/modules/TopBackgroundCanvas";
import { TopKeyboardArrowHint } from "@/components/modules/TopKeyboardArrowHint";
import { Box } from "@/components/unit/Box";
import { useGlobalStore } from "@/state/global";

const _HintItem = styled.div<{ show: boolean }>`
  opacity: ${({ show }) => (show ? 1 : 0)};
  position: absolute;
  width: fit-content;
  height: fit-content;
  inset: 50%;
  transform: translate(-50%, calc(-50% + 128px));
  pointer-events: none;
`;

export const HelloPage: FC = () => {
  const animationStore = useGlobalStore();

  return (
    <Box position="relative" width="100vw" height="100vh">
      <title>EE-BBB.</title>
    </Box>
  );
};
