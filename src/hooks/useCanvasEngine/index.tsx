import { createContext, type FC, type PropsWithChildren, useContext } from "react";
import { useAnimation } from "./internals/useAnimation";
import { useCanvas } from "./internals/useCanvas";
import { usePointer } from "./internals/usePointer";

type State = {
  el: ReturnType<typeof useCanvas>["el"];
  context2d: ReturnType<typeof useCanvas>["context2d"];
  canvasRef: ReturnType<typeof useCanvas>["canvasRef"];

  isDragging: ReturnType<typeof usePointer>["isDragging"];
  movement: ReturnType<typeof usePointer>["movement"];
  resetPosition: ReturnType<typeof usePointer>["resetPosition"];

  animation: ReturnType<typeof useAnimation>;
};

const CanvasEngineContext = createContext<State | null>(null);

export const CanvasEngineProvider: FC<PropsWithChildren> = ({ children }) => {
  const canvas = useCanvas();
  const animation = useAnimation(canvas.context2d);
  const pointer = usePointer(canvas.el);

  return (
    <CanvasEngineContext.Provider
      value={{
        ...canvas,
        ...pointer,
        animation,
      }}
    >
      {children}
    </CanvasEngineContext.Provider>
  );
};

export const useCanvasEngine = () => {
  const context = useContext(CanvasEngineContext);
  if (context == null) {
    throw new Error("CanvasEngineContext is not found");
  }

  return context;
};
