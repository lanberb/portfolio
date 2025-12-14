import { type FC, useCallback, useEffect } from "react";
import { PageLayout } from "@/components/modules/PageLayout";
import { useGlobalCanvas } from "@/components/hooks/useGlobalCanvas";
import { useTheme } from "@/components/hooks/useTheme";
import { useGlobalStore } from "@/state/global";
import { animation } from "../../canvas/about/canvas/animation";

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
    console.log("Running about animation...");
    animation(canvasApi, el, themeState, handleOnAnimationComplete);
  }, [canvasApi, el, themeState, handleOnAnimationComplete]);

  return (
    <PageLayout title="About | EE-BBB.©">
    </PageLayout>
  );
};
