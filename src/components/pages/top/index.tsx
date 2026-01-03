import { type FC, useCallback, useEffect, useMemo } from "react";
import EarthLogoStickerImage from "@/assets/images/stickers/earth_logo.png";
import ExpandChromStickerImage from "@/assets/images/stickers/expand_chrom.png";
import RotateTextStickerImage from "@/assets/images/stickers/rotate_text.png";
import StarLikeStickerImage from "@/assets/images/stickers/star_like.png";
import StreetPaintStickerImage from "@/assets/images/stickers/street_paint.png";
import { useGlobalCanvas } from "@/components/hooks/useGlobalCanvas";
import { useLoadImages } from "@/components/hooks/useLoadImages";
import { useTheme } from "@/components/hooks/useTheme";
import { GlobalCanvasNavigator } from "@/components/modules/GlobalCanvasNavigator";
import { PageLayout } from "@/components/modules/PageLayout";
import { useGlobalStore } from "@/state/global";
import { getMobileFullWidthWithMargin, isMobile } from "@/util/canvas";
import { BACKGROUND_GRID_GAP, type RenderableImage } from "../../canvas/common/common";
import { openingAnimation } from "../../canvas/top/animation";
import { interaction } from "../../canvas/top/interaction";

const STICEKR_SETTING_LIST = [
  {
    url: ExpandChromStickerImage,
    width: getMobileFullWidthWithMargin(560, 32),
    x: 0,
    y: isMobile() ? 0 : -20,
  },
  {
    url: EarthLogoStickerImage,
    width: 400,
    x: 240,
    y: -560,
  },
  {
    url: StarLikeStickerImage,
    width: 320,
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

// const _CONTENTS_SETTING_LIST = [
//   {
//     url: "",
//     width: 400,
//     height: 320,
//     x: -240,
//     y: 560,
//   },
//   {
//     url: "",
//     width: 400,
//     x: -800,
//     y: 560,
//   },
// ];

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

export const Page: FC = () => {
  const themeState = useTheme();
  const globalStore = useGlobalStore();
  const loadImages = useLoadImages({ images: STICEKR_SETTING_LIST });
  const { el, canvasApi, isDragging, isInertiaAnimating, position } = useGlobalCanvas();

  const rowLineCount = useMemo(() => caluculateLineCount(el?.clientWidth ?? 0), [el]);
  const columnLineCount = useMemo(() => caluculateLineCount(el?.clientHeight ?? 0), [el]);
  const images = useMemo(() => createRenderableImagesFromLoadedImages(loadImages.data ?? []), [loadImages.data]);

  const handleOnMouseMoveOrReRender = useCallback(() => {
    if (globalStore.isPlayedOnce === false) {
      globalStore.setIsPlayedOnce();
    }
    if (isDragging === false) {
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
    isDragging,
  ]);

  const handleOnOpeningAnimationComplete = useCallback(() => {
    globalStore.setIsEndedOpeningAnimation();
    globalStore.setIsGrabbable(true);
  }, [globalStore.setIsEndedOpeningAnimation, globalStore.setIsGrabbable]);

  useEffect(() => {
    if (images.length === 0) {
      return;
    }
    openingAnimation(
      canvasApi,
      el,
      themeState,
      rowLineCount,
      columnLineCount,
      images,
      handleOnOpeningAnimationComplete,
    );
  }, [canvasApi, el, themeState, rowLineCount, columnLineCount, images, handleOnOpeningAnimationComplete]);

  /**
   * 慣性アニメーション中は継続的に描画
   */
  useEffect(() => {
    if (isInertiaAnimating === false) {
      return;
    }
    let frameId: number;
    const render = () => {
      interaction(canvasApi, el, themeState, rowLineCount, columnLineCount, position, images);
      frameId = window.requestAnimationFrame(render);
    };
    render();
    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [isInertiaAnimating, canvasApi, el, themeState, rowLineCount, columnLineCount, position, images]);

  /**
   * マウスイベント登録
   */
  useEffect(() => {
    document.body.addEventListener("pointermove", handleOnMouseMoveOrReRender);
    return () => {
      document.body.removeEventListener("pointermove", handleOnMouseMoveOrReRender);
    };
  }, [handleOnMouseMoveOrReRender]);

  return (
    <PageLayout title="EE-BBB.©">
      <GlobalCanvasNavigator
        hasBorder={globalStore.isEndedOpeningAnimation}
        rowLineCount={rowLineCount}
        columnLineCount={columnLineCount}
        images={images}
      />
    </PageLayout>
  );
};
