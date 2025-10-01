import { type RefObject, createContext, useContext } from "react";

export const CanvasContext = createContext<RefObject<HTMLCanvasElement> | null>(null);

export const useCanvas = () => {
  const context = useContext(CanvasContext);

  return context;
};
