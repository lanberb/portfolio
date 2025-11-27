import styled from "@emotion/styled";
import { type FC, useCallback, useEffect, useMemo, useState } from "react";
import EarthLogoStickerImage from "@/assets/images/sticker/earth_logo.png";
import ExpandChromStickerImage from "@/assets/images/sticker/expand_chrom.png";
import RotateTextStickerImage from "@/assets/images/sticker/rotate_text.png";
import StarLikeStickerImage from "@/assets/images/sticker/star_like.png";
import StreetPaintStickerImage from "@/assets/images/sticker/street_paint.png";
import { KeyboardKey } from "@/components/modules/KeyboardKey";
import { BottomSheet } from "@/components/unit/BottomSheet";
import { Box } from "@/components/unit/Box";
import { Grid, GridItem } from "@/components/unit/Grid";
import { Stack } from "@/components/unit/Stack";
import { Text } from "@/components/unit/Text";
import { useGlobalCanvas } from "@/hooks/useGlobalCanvas";
import { useI18n } from "@/hooks/useI18n";
import { useLoadImages } from "@/hooks/useLoadImages";
import { useTheme } from "@/hooks/useTheme";
import { useGlobalStore } from "@/state/global";
import { getMobileFullWidthWithMargin } from "@/util/canvas";
import { animation } from "./internals/canvas/animation";
import { BACKGROUND_GRID_GAP, type RenderableImage } from "./internals/canvas/common";
import { interaction } from "./internals/canvas/interaction";

const STICEKR_SETTING_LIST = [
  {
    url: ExpandChromStickerImage,
    width: getMobileFullWidthWithMargin(640, 32),
    x: 0,
    y: 0,
  },
  {
    url: EarthLogoStickerImage,
    width: 360,
    x: 240,
    y: -560,
  },
  {
    url: StarLikeStickerImage,
    width: 360,
    x: 600,
    y: 200,
  },
  {
    url: RotateTextStickerImage,
    width: 320,
    x: -240,
    y: 560,
  },
  {
    url: StreetPaintStickerImage,
    width: 480,
    x: -600,
    y: -200,
  },
];

/**
 * @summary 与えられた幅からグリッドの幅で割った値を偶数で返す
 */
const caluculateLineCount = (width: number) => {
  const lineCount = Math.floor(width / BACKGROUND_GRID_GAP);
  if (lineCount % 2 === 1) {
    return lineCount + 3; // +3することでグリッドの最大表示可能本数を返す
  }
  return lineCount + 2; // +2することでグリッドの最大表示可能本数を返す
};

/**
 * @summary 非同期にfetchされたimagesを元にAnimatableImagesのリストを返す
 */
const createRenderableImagesFromLoadedImages = (images: HTMLImageElement[]): RenderableImage[] => {
  return STICEKR_SETTING_LIST.reduce<RenderableImage[]>((acc, setting, index) => {
    const image = images?.[index];
    if (image == null) {
      return acc;
    }
    acc.push({
      el: image,
      ...setting,
    });
    return acc;
  }, []);
};

const Wrapper = styled.div`
  pointer-events: none;
`;

export const TopPage: FC = () => {
  const { t } = useI18n();
  const themeState = useTheme();

  const { el, canvasApi, isDragging, position } = useGlobalCanvas();

  const globalStore = useGlobalStore();

  const loadImages = useLoadImages({ images: STICEKR_SETTING_LIST });

  const [isMounted, setIsMounted] = useState(false);

  const rowLineCount = useMemo(() => caluculateLineCount(el?.clientWidth ?? 0), [el]);
  const columnLineCount = useMemo(() => caluculateLineCount(el?.clientHeight ?? 0), [el]);
  const images = useMemo(() => createRenderableImagesFromLoadedImages(loadImages.data ?? []), [loadImages.data]);

  const handleOnMouseMoveOrReRender = useCallback(() => {
    if (globalStore.isPlayedOnce === false) {
      globalStore.setIsPlayedOnce();
    }
    if (canvasApi == null || el == null || themeState == null) {
      return;
    }
    interaction(canvasApi, el, themeState, rowLineCount, columnLineCount, position, images);
  }, [
    canvasApi,
    el,
    themeState,
    rowLineCount,
    columnLineCount,
    position,
    images,
    globalStore.isPlayedOnce,
    globalStore.setIsPlayedOnce,
  ]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (["ArrowUp", "w", "ArrowDown", "s", "ArrowLeft", "a", "ArrowRight", "d"].includes(e.key)) {
        handleOnMouseMoveOrReRender();
      }
    },
    [handleOnMouseMoveOrReRender],
  );

  const handleOnOpeningAnimationComplete = useCallback(() => {
    setIsMounted(true);
    globalStore.setIsEndedOpeningAnimation();
  }, [globalStore.setIsEndedOpeningAnimation]);

  useEffect(() => {
    if (canvasApi == null || el == null || themeState == null || images.length === 0) {
      return;
    }
    animation(canvasApi, el, themeState, rowLineCount, columnLineCount, images, handleOnOpeningAnimationComplete);
  }, [canvasApi, el, themeState, rowLineCount, columnLineCount, images, handleOnOpeningAnimationComplete]);

  /**
   * マウスイベント登録
   */
  useEffect(() => {
    if (isMounted === false) {
      return;
    }
    if (isDragging) {
      document.body.addEventListener("pointermove", handleOnMouseMoveOrReRender);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.removeEventListener("pointermove", handleOnMouseMoveOrReRender);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleOnMouseMoveOrReRender, handleKeyDown, isDragging, isMounted]);

  return (
    <Wrapper>
      <title>EE-BBB.©</title>

      <BottomSheet open={globalStore.isEndedOpeningAnimation && globalStore.isPlayedOnce === false}>
        <Text ta="center" ff="Zen Old Mincho" fz={14}>
          <Box as="span" display={[{ key: "sp", value: "none" }]}>
            {t["page.top.hint.pc"]}
          </Box>
          <Box
            as="span"
            display={[
              { key: "pc", value: "none" },
              { key: "sp", value: "block" },
            ]}
          >
            {t["page.top.hint.sp"]}
          </Box>
        </Text>

        <Box display={[{ key: "sp", value: "none" }]} mt={24}>
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
        </Box>
      </BottomSheet>
    </Wrapper>
  );
};
