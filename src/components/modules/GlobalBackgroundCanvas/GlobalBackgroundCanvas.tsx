import type { FC } from "react";
import { Canvas } from "@/components/unit/Canvas";
import { useGlobalCanvas } from "@/hooks/useGlobalCanvas";

export const GlobalBackgroundCanvas: FC = () => {
  const { canvasRef } = useGlobalCanvas();

  return <Canvas ref={canvasRef} grabbable position="fixed" inset={0} width="100%" minHeight="100%" />;
};
