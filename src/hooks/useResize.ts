import { useCallback, useEffect, useRef } from "react";

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
