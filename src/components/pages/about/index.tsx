import { type FC, useCallback, useEffect } from "react";
import { useGlobalCanvas } from "@/hooks/useGlobalCanvas";
import { useGlobalStore } from "@/state/global";
import { animation } from "./canvas/animation";

export const AboutPage: FC = () => {
  const globalStore = useGlobalStore();
  const { el, canvasApi } = useGlobalCanvas();

  const handleOnAnimationComplete = useCallback(() => {
    globalStore.setIsEndedOpeningAnimation();
  }, [globalStore.setIsEndedOpeningAnimation]);

  useEffect(() => {
    if (canvasApi == null || el == null) {
      return;
    }
    console.log("Running about animation...");
    animation(canvasApi, el, handleOnAnimationComplete);
  }, [canvasApi, el, handleOnAnimationComplete]);

  return <div />;
};
