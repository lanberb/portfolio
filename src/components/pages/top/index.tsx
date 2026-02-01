import { type FC, useCallback, useEffect } from "react";
import EarthLogoStickerImage from "@/assets/images/stickers/earth_logo.png";
import ExpandChromStickerImage from "@/assets/images/stickers/expand_chrom.png";
import RotateTextStickerImage from "@/assets/images/stickers/rotate_text.png";
import StarLikeStickerImage from "@/assets/images/stickers/star_like.png";
import StreetPaintStickerImage from "@/assets/images/stickers/street_paint.png";
import { PageLayout } from "@/components/modules/PageLayout";
import { useListImage } from "@/domain/useListImages";
import { useCanvasEngine } from "@/hooks/useCanvasEngine";
import { useTheme } from "@/hooks/useTheme";
import { useGlobalStore } from "@/state/global";
import { getMobileFullWidthWithMargin, getSurfaceColor, isMobile } from "@/util/canvas";

const STICKER_SETTING_LIST = [
  {
    imageUrl: ExpandChromStickerImage,
    width: getMobileFullWidthWithMargin(640, 16),
  },
  {
    imageUrl: EarthLogoStickerImage,
    width: 400,
  },
  {
    imageUrl: StarLikeStickerImage,
    width: 320,
  },
  {
    imageUrl: RotateTextStickerImage,
    width: 320,
  },
  {
    imageUrl: StreetPaintStickerImage,
    width: 480,
  },
];

export const Page: FC = () => {
  const themeState = useTheme();
  const globalStore = useGlobalStore();
  const { movement, animation, isDragging } = useCanvasEngine();

  const [
    expandChromStickerImage,
    earthLogoStickerImage,
    startLikeStickerImage,
    rotateTextStickerImage,
    streetPaintStickerImage,
  ] = useListImage(STICKER_SETTING_LIST);

  const handleOnOpeningAnimationComplete = useCallback(() => {
    globalStore.setIsGrabbable(true);
    globalStore.setIsEndedOpeningAnimation();
  }, [globalStore.setIsGrabbable, globalStore.setIsEndedOpeningAnimation]);

  const handleOnPointerMove = useCallback(() => {
    if (themeState == null || animation == null || isDragging === false) {
      return;
    }
    animation.pointermove(
      getSurfaceColor("backgroundGrid", themeState),
      getSurfaceColor("primaryInversed", themeState),
      movement.x,
      movement.y,
    );
  }, [animation, themeState, movement, isDragging]);

  useEffect(() => {
    window.addEventListener("pointermove", handleOnPointerMove);
    return () => {
      window.removeEventListener("pointermove", handleOnPointerMove);
    };
  }, [handleOnPointerMove]);

  useEffect(() => {
    if (
      themeState == null ||
      animation == null ||
      expandChromStickerImage.data == null ||
      earthLogoStickerImage.data == null ||
      startLikeStickerImage.data == null ||
      rotateTextStickerImage.data == null ||
      streetPaintStickerImage.data == null
    ) {
      return;
    }
    animation.addOpeningAnimationImage({
      image: expandChromStickerImage.data?.image,
      x: 0,
      y: isMobile() ? 0 : -20,
    });
    animation.addOpeningAnimationImage({
      image: earthLogoStickerImage.data?.image,
      x: 240,
      y: -560,
    });
    animation.addOpeningAnimationImage({
      image: startLikeStickerImage.data?.image,
      x: 600,
      y: 200,
    });
    animation.addOpeningAnimationImage({
      image: rotateTextStickerImage.data?.image,
      x: -240,
      y: 560,
    });
    animation.addOpeningAnimationImage({
      image: streetPaintStickerImage.data?.image,
      x: -600,
      y: -200,
    });
    animation.opening(
      getSurfaceColor("backgroundGrid", themeState),
      getSurfaceColor("primaryInversed", themeState),
      handleOnOpeningAnimationComplete,
    );
  }, [
    themeState,
    expandChromStickerImage.data,
    earthLogoStickerImage.data,
    streetPaintStickerImage.data,
    startLikeStickerImage.data,
    rotateTextStickerImage.data,
    animation,
    handleOnOpeningAnimationComplete,
  ]);

  return <PageLayout title="EE-BBB.©"></PageLayout>;
};
