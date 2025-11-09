import styled from "@emotion/styled";
import { type FC, useRef } from "react";
import { TopKeyboardArrowHint } from "@/components/modules/TopKeyboardArrowHint";
// import { TopKeyboardWasdHint } from "@/components/modules/TopKeyboardWasdHint";
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

export const TopPage: FC = () => {
  const globalStore = useGlobalStore();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Box position="relative" width="100vw" height="100vh" ref={ref}>
      <title>EE-BBB.©</title>

      <_HintItem show={globalStore.isEndedOpeningAnimation && globalStore.isPlayedOnce === false}>
        {/* <TopKeyboardWasdHint /> */}
        <TopKeyboardArrowHint />
      </_HintItem>
    </Box>
  );
};
