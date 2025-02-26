import { useEffect } from "react";

interface Props {
  fn: () => void;
  delay: number;
}

export const useInterval = ({ fn, delay }: Props) => {
  useEffect(() => {
    const intervalId = setInterval(fn, delay);

    return () => {
      clearInterval(intervalId);
    };
  }, [fn, delay]);
};
