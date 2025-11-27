import { useGlobalCanvas } from "@/hooks/useGlobalCanvas";
import { useCallback, useEffect, type FC } from "react";
import { animation } from "./canvas/animation";
import { useTheme } from "@/hooks/useTheme";
import { useGlobalStore } from "@/state/global";

export const AboutPage: FC = () => {
  const globalStore = useGlobalStore();
  const themeState = useTheme();
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

  return <div />;
};
