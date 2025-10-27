import EarthLogoStickerImage from "@/assets/images/sticker/earth_logo.png";
import ExpandChromStickerImage from "@/assets/images/sticker/expand_chrom.png";
import { useCanvas } from "@/components/hooks/useCanvas";
import { useLoadImages } from "@/components/hooks/useLoadImages";
import { usePointerEvent } from "@/components/hooks/usePointerEvent";
import { useTheme } from "@/components/hooks/useTheme";
import { Canvas } from "@/components/unit/Canvas";
import styled from "@emotion/styled";
import { type FC, useCallback, useEffect, useMemo, useState } from "react";
import { animation } from "./internals/animation";
import { BACKGROUND_GRID_GAP, draw } from "./internals/draw";

const _Canvas = styled(Canvas)`
  cursor: grab;

  &[data-dragging="true"] {
    cursor: grabbing;
  }
`;

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

const STICEKR_SETTING_LIST = [
  {
    url: ExpandChromStickerImage,
    width: 480,
  },
  {
    url: EarthLogoStickerImage,
    width: 360,
  },
  {
    url: ExpandChromStickerImage,
    width: 240,
  },
];

export const GlobalCanvas: FC = () => {
  const { el, canvasApi, canvasRef } = useCanvas();
  const { position, isDragging } = usePointerEvent({ el });
  const themeState = useTheme();
  const loadImages = useLoadImages(STICEKR_SETTING_LIST);

  const [isMounted, setIsMounted] = useState(false);

  const rowLineCount = useMemo(() => caluculateLineCount(el?.width ?? 0), [el]);
  const columnLineCount = useMemo(() => caluculateLineCount(el?.height ?? 0), [el]);

  const handleOnMouseMoveOrReRender = useCallback(() => {
    if (canvasApi == null || el == null || themeState == null) {
      return;
    }
    draw(canvasApi, el, themeState, rowLineCount, columnLineCount, position, loadImages.data ?? []);
  }, [canvasApi, el, themeState, rowLineCount, columnLineCount, position, loadImages.data]);

  const handleOnOpeningAnimationComplete = useCallback(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (
      canvasApi == null ||
      el == null ||
      themeState == null ||
      loadImages.data == null ||
      loadImages.data?.length === 0
    ) {
      return;
    }
    animation(
      canvasApi,
      el,
      themeState,
      rowLineCount,
      columnLineCount,
      loadImages.data,
      handleOnOpeningAnimationComplete,
    );
  }, [canvasApi, el, themeState, rowLineCount, columnLineCount, loadImages.data, handleOnOpeningAnimationComplete]);

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
    return () => {
      document.body.removeEventListener("pointermove", handleOnMouseMoveOrReRender);
    };
  }, [handleOnMouseMoveOrReRender, isDragging, isMounted]);

  return (
    <_Canvas
      ref={canvasRef}
      position="fixed"
      inset={0}
      zIndex={-1}
      width="100%"
      height="100%"
      data-dragging={isDragging}
    />
  );
};
