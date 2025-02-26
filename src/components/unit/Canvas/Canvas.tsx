import { base, type BaseProps } from "@/styles/mixins";
import styled from "@emotion/styled";
import {
  forwardRef,
  useEffect,
  useRef
} from "react";

type Props = BaseProps;

const Element = styled.canvas<BaseProps>`
  ${base}
`;

export const Canvas = forwardRef<HTMLCanvasElement, Props>((props, ref) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current === true) {
      throw new Error("Re:rendered Canvas Element.");
    }

    isMounted.current = true;
  }, []);

  return <Element {...props} ref={ref} />;
});
