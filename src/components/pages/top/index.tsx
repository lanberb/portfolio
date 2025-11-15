import styled from "@emotion/styled";
import { type FC } from "react";
import { TopKeyboardArrowHint } from "@/components/modules/TopKeyboardArrowHint";
// import { TopKeyboardWasdHint } from "@/components/modules/TopKeyboardWasdHint";
import { Box } from "@/components/unit/Box";
import { BottomSheet } from "@/components/unit/BottomSheet";
import { useGlobalStore } from "@/state/global";

const Wrapper = styled.div`
  pointer-events: none;
`;

export const TopPage: FC = () => {
  const globalStore = useGlobalStore();

  return (
    <Wrapper>
      <title>EE-BBB.©</title>

      <BottomSheet open={globalStore.isEndedOpeningAnimation && globalStore.isPlayedOnce === false}>
        <TopKeyboardArrowHint />
        {/* <TopKeyboardWasdHint /> */}
      </BottomSheet>
    </Wrapper>
  );
};
