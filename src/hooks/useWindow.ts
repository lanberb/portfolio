import { useCallback, useEffect, useState } from "react";
import { useResize } from "./useResize";

interface Return {
  innerWidth: number;
  innerHeight: number;
}

export const useWindow = (): Return => {
  const [innerWidth, setInnerWidth] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);
  const { setResizeFn } = useResize();

  const handleOnResize = useCallback(() => {
    if (typeof window !== "undefined") {
      setInnerWidth(window.innerWidth);
      setInnerHeight(window.innerHeight);
    }
  }, []);

  useEffect(() => {
    handleOnResize();
    setResizeFn(handleOnResize);
  }, [handleOnResize, setResizeFn]);

  return {
    innerWidth,
    innerHeight,
  };
};
