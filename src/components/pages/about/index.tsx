import { type FC, useCallback, useEffect } from "react";
import { useGlobalCanvas } from "@/hooks/useGlobalCanvas";
import { useTheme } from "@/hooks/useTheme";
import { useGlobalStore } from "@/state/global";
import { animation } from "./canvas/animation";

export const AboutPage: FC = () => {
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

  return <div />;
};
