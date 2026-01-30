import { type FC, useCallback, useEffect } from "react";
import { animation } from "@/components/legacy-canvas/about/animation";
import { useGlobalCanvas } from "@/hooks/useGlobalCanvas";
import { useTheme } from "@/hooks/useTheme";
import { PageLayout } from "@/components/modules/PageLayout";
import { useGlobalStore } from "@/state/global";

export const Page: FC = () => {
  const themeState = useTheme();
  const globalStore = useGlobalStore();
  const { el, canvasApi } = useGlobalCanvas();

  const handleOnAnimationComplete = useCallback(() => {
    globalStore.setIsEndedOpeningAnimation();
  }, [globalStore.setIsEndedOpeningAnimation]);

  useEffect(() => {
    if (canvasApi == null || el == null || themeState == null) {
      return;
    }
    animation(canvasApi, el, themeState, handleOnAnimationComplete);
  }, [canvasApi, el, themeState, handleOnAnimationComplete]);

  return <PageLayout title="About | EE-BBB.©" />;
};
