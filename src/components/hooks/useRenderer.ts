import { useCallback, useEffect, useState, type RefObject } from "react";
import { WebGLRenderer } from "three";

interface Props {
  ref: RefObject<HTMLCanvasElement> | null;
  options?: {
    alpha?: true;
  };
}
interface Return {
  renderer: WebGLRenderer | null;
}

export const useRenderer = ({ ref, options }: Props): Return => {
  const canvasEl = ref?.current;

  if (canvasEl == null) {
    return {
      renderer: null,
    };
  }

  const renderer = new WebGLRenderer({
    canvas: canvasEl,
    antialias: true,
    alpha: options?.alpha ?? false,
  });

  if (options?.alpha) {
    renderer.setClearColor(0x000000, 0);
  }

  return {
    renderer,
  };
};
