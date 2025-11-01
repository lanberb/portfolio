import EarthLogoStickerImage from "@/assets/images/sticker/earth_logo.png";
import ExpandChromStickerImage from "@/assets/images/sticker/expand_chrom.png";
import { useCanvas } from "@/components/hooks/useCanvas";
import { useLoadImages } from "@/components/hooks/useLoadImages";
import { useTheme } from "@/components/hooks/useTheme";
import { usePointerEvent } from "@/components/modules/GlobalCanvas/internals/hooks/usePointerEvent";
import { Canvas } from "@/components/unit/Canvas";
import { type FC, useCallback, useEffect, useMemo, useState } from "react";
import { type AnimatableImage, animation } from "./internals/animation";
import { BACKGROUND_GRID_GAP } from "./internals/common";
import { interaction } from "./internals/interaction";

const STICEKR_SETTING_LIST = [
  {
    url: ExpandChromStickerImage,
    width: 480,
    x: 0,
    y: 0,
    scale: 1,
    opacity: 0,
  },
  {
    url: EarthLogoStickerImage,
    width: 360,
    x: 0,
    y: 0,
    scale: 1,
    opacity: 0,
  },
  {
    url: ExpandChromStickerImage,
    width: 240,
    x: 0,
    y: 0,
    scale: 1,
    opacity: 0,
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
const createAnimatableImagesFromLoadedImages = (images: HTMLImageElement[]): AnimatableImage[] => {
  return STICEKR_SETTING_LIST.reduce<AnimatableImage[]>((acc, setting, index) => {
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
    interaction(canvasApi, el, themeState, rowLineCount, columnLineCount, position, loadImages.data ?? []);
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
    const images = createAnimatableImagesFromLoadedImages(loadImages.data);
    animation(canvasApi, el, themeState, rowLineCount, columnLineCount, images, handleOnOpeningAnimationComplete);
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
    <Canvas
      ref={canvasRef}
      grabbable
      position="fixed"
      inset={0}
      zIndex={-1}
      width="100%"
      height="100%"
      data-dragging={isDragging}
    />
  );
};
