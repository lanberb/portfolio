import type { FC } from "react";
import { Canvas } from "@/components/unit/Canvas";
import { useCanvasEngine } from "@/hooks/useCanvasEngine";
import { useGlobalStore } from "@/state/global";

export const GlobalCanvas: FC = () => {
  const { canvasRef } = useCanvasEngine();
  const globalStore = useGlobalStore();

  return (
    <Canvas
      ref={canvasRef}
      grabbable={globalStore.isGrabbable}
      position="fixed"
      inset={0}
      width="100%"
      minHeight="100%"
    />
  );
};
