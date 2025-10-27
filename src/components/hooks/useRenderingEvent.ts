import { useEffect, useRef } from "react";

export const useMount = (fn: () => void) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current === true) {
      return;
    }
    fn();
    isMounted.current = true;
  }, [fn]);
};

export const useUnmount = (fn: () => void) => {
  useEffect(() => {
    return () => {
      fn();
    };
  }, [fn]);
};
