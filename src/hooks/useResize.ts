import { useCallback, useEffect, useRef } from "react";
import { getIsBrowser } from "@/util/app";

type Fn = () => void;

interface Return {
  setResizeFn: (fn: Fn) => void;
}

export const useResize = (): Return => {
  const fn = useRef<Fn | null>(null);

  const handleOnSetFn = useCallback((resizeFn: Fn) => {
    window.addEventListener("resize", resizeFn);
    fn.current = resizeFn;
  }, []);

  useEffect(() => {
    if (getIsBrowser() === false) {
      return;
    }
    return () => {
      if (fn.current == null) {
        return;
      }
      window.removeEventListener("resize", fn.current);
    };
  }, []);

  return {
    setResizeFn: handleOnSetFn,
  };
};
