import { useCallback, useState } from "react";
import { getIsBrowser } from "@/util/app";

const DEVICE_PIXEL_RATIO = getIsBrowser() ? window.devicePixelRatio || 1 : 1;

interface Return {
  el: HTMLCanvasElement | null;
  canvasApi: CanvasRenderingContext2D | null;
  canvasRef: (element: HTMLCanvasElement | null) => void;
}

export const useCanvas = (): Return => {
  const [canvasApi, setCanvasApi] = useState<CanvasRenderingContext2D | null>(null);
  const [el, setEl] = useState<HTMLCanvasElement | null>(null);

  const canvasRef = useCallback((element: HTMLCanvasElement | null) => {
    if (element == null) {
      return;
    }
    element.width = element.clientWidth * DEVICE_PIXEL_RATIO;
    element.height = element.clientHeight * DEVICE_PIXEL_RATIO;

    const ctx = element.getContext("2d");
    ctx?.scale(DEVICE_PIXEL_RATIO, DEVICE_PIXEL_RATIO); // I ~hate~ Retina Display... :<

    setCanvasApi(ctx);
    setEl(element);
  }, []);

  return {
    el,
    canvasApi,
    canvasRef,
  };
};
