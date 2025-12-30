import type { FC, PropsWithChildren } from "react";
// import { useGlobalCanvas } from "@/components/hooks/useGlobalCanvas";
import { Text } from "@/components/unit/Text";

export const CanvasText: FC<PropsWithChildren> = ({ children }) => {
  // const {} = useGlobalCanvas();

  // useEffect(() => {
  //   if (el == null) {
  //     return;
  //   }
  //   setTextWidth(el.clientWidth);
  // }, [el]);

  return (
    <Text position="absolute" top="60%" left="50%" style={{ transform: "translateX(-50%)" }} fz={14} fw={300}>
      {children}
    </Text>
  );
};
