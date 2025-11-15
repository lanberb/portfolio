import styled from "@emotion/styled";
import type { FC } from "react";
import { KeyboardKey } from "@/components/modules/KeyboardKey";
import { BottomSheet } from "@/components/unit/BottomSheet";
import { Grid, GridItem } from "@/components/unit/Grid";
import { Stack } from "@/components/unit/Stack";
import { Text } from "@/components/unit/Text";
import { useI18n } from "@/hooks/useI18n";
import { useGlobalStore } from "@/state/global";

const Wrapper = styled.div`
  pointer-events: none;
`;

export const TopPage: FC = () => {
  const globalStore = useGlobalStore();
  const { t } = useI18n();

  return (
    <Wrapper>
      <title>EE-BBB.©</title>

      <BottomSheet open={globalStore.isEndedOpeningAnimation && globalStore.isPlayedOnce === false}>
        <Text ta="center" ff="Zen Old Mincho" fz={14} mb={24}>
          {t["top.keyboardArrowHint.label"]}
        </Text>
        <Stack gap={8} justifyContent="space-around">
          <Grid gap={4} templateRows={2} templateColumns={2}>
            <GridItem row={1} column={2}>
              <KeyboardKey label="W" />
            </GridItem>
            <GridItem row={2} column={1}>
              <KeyboardKey label="A" />
            </GridItem>
            <GridItem row={2} column={2}>
              <KeyboardKey label="S" />
            </GridItem>
            <GridItem row={2} column={3}>
              <KeyboardKey label="D" />
            </GridItem>
          </Grid>

          <Grid gap={4} templateRows={2} templateColumns={2}>
            <GridItem row={1} column={2}>
              <KeyboardKey label="⬆︎" />
            </GridItem>
            <GridItem row={2} column={1}>
              <KeyboardKey label="⬅︎" />
            </GridItem>
            <GridItem row={2} column={2}>
              <KeyboardKey label="⬇︎" />
            </GridItem>
            <GridItem row={2} column={3}>
              <KeyboardKey label="➡︎" />
            </GridItem>
          </Grid>
        </Stack>
      </BottomSheet>
    </Wrapper>
  );
};
