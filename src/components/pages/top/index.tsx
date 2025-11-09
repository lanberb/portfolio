import styled from "@emotion/styled";
import type { FC } from "react";
import { TopKeyboardArrowHint } from "@/components/modules/TopKeyboardArrowHint";
import { Box } from "@/components/unit/Box";
// import { TopKeyboardWasdHint } from "@/components/modules/TopKeyboardWasdHint";
import { useGlobalStore } from "@/state/global";

const Wrapper = styled.div`
  pointer-events: none;
`;

const _HintItem = styled(Box)`
  position: absolute;
  width: fit-content;
  height: fit-content;
  inset: 50%;
  transform: translate(-50%, calc(-50% + 128px));
  pointer-events: none;
`;

export const TopPage: FC = () => {
  const globalStore = useGlobalStore();

  return (
    <Wrapper>
      <title>EE-BBB.©</title>

      <_HintItem
        top={0}
        bottom={0}
        width="fit-content"
        height="fit-content"
        position="absolute"
        opacity={globalStore.isEndedOpeningAnimation && globalStore.isPlayedOnce === false ? 1 : 0}
      >
        {/* <TopKeyboardWasdHint /> */}
        <TopKeyboardArrowHint />
      </_HintItem>
    </Wrapper>
  );
};
