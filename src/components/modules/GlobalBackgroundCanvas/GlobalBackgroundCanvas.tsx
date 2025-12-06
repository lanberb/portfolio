import type { FC } from "react";
import { Canvas } from "@/components/unit/Canvas";
import { useGlobalCanvas } from "@/hooks/useGlobalCanvas";
import { useGlobalStore } from "@/state/global";

export const GlobalBackgroundCanvas: FC = () => {
  const { canvasRef } = useGlobalCanvas();
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
