import type { FC } from "react";
import { useGlobalStore } from "@/state/global";
import { GlobalCanvasNavigator } from "./GlobalCanvasNavigator";

export const ConnectedGlobalCanvasNavigator: FC = () => {
  const globalStore = useGlobalStore();

  if (globalStore.isEndedOpeningAnimation === false) {
    return null;
  }
  return <GlobalCanvasNavigator />;
};
