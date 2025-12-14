import styled from "@emotion/styled";
import { type FC, type PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useGlobalCanvas } from "@/components/hooks/useGlobalCanvas";
import { useGlobalStore } from "@/state/global";
import type { Position } from "@/util/canvas";
import { IconButton } from "../IconButton";

const ITEM_SIZE = 64;

const Item = styled.li`
  position: relative;
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  width: 0;
  height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition-duration: 50ms;
  background-color: var(${({ theme }) => theme.surface.primaryInversed});
  border-radius: 100%;
  width: ${ITEM_SIZE}px;
  height: ${ITEM_SIZE}px;
`;

const List = styled.ul<{ hasBorder: boolean }>`
  position: fixed;
  inset: 0;
  list-style: none;
  pointer-events: none;
  border-style: solid;
  border-width: ${({ hasBorder }) => (hasBorder ? "16px" : "0")};
  border-color: var(${({ theme }) => theme.surface.primaryInversed});
  filter: url("#filter");
`;

interface Props {
  hasBorder: boolean;
}

export const GlobalCanvasNavigator: FC<PropsWithChildren<Props>> = ({ children, hasBorder }) => {
  const { isDragging, position } = useGlobalCanvas();
  const globalStore = useGlobalStore();

  const [homeButtonPosition, setHomeButtonPosition] = useState<Position | null>(null);

  const handleOnPointerMove = useCallback(() => {
    if (isDragging === false) {
      return;
    }

    const homeButtonPosition = (() => {
      if (Math.abs(position.x) < window.innerWidth && Math.abs(position.y) < window.innerHeight) {
        return null;
      }

      const absX = window.innerWidth / 2 + position.x - ITEM_SIZE / 2;
      const absY = window.innerHeight / 2 + position.y - ITEM_SIZE / 2;

      const x = absX < 0 ? Math.max(-ITEM_SIZE / 2, absX) : Math.min(window.innerWidth - ITEM_SIZE, absX);
      const y = absY < 0 ? Math.max(-ITEM_SIZE / 2, absY) : Math.min(window.innerHeight - ITEM_SIZE, absY);
      console.log(x, y);
      return {
        x,
        y,
      };
    })();

    setHomeButtonPosition(homeButtonPosition);
  }, [isDragging, position]);

  /**
   * マウスイベント登録
   */
  useEffect(() => {
    document.body.addEventListener("pointermove", handleOnPointerMove);
    return () => {
      document.body.removeEventListener("pointermove", handleOnPointerMove);
    };
  }, [handleOnPointerMove]);

  useEffect(() => {
    if (globalStore.isEndedOpeningAnimation === false) {
      return;
    }
    handleOnPointerMove();
  }, [globalStore.isEndedOpeningAnimation, handleOnPointerMove]);

  return (
    <>
      {children}

      <List hasBorder={hasBorder}>
        {homeButtonPosition != null && (
          <Item
            style={{
              transform: `translate(${homeButtonPosition.x}px, ${homeButtonPosition.y}px)`,
            }}
          >
            <IconButton
              name="modeLight"
              color="primaryInversed"
              onClick={(): void => {
                throw new Error("Function not implemented.");
              }}
            />
          </Item>
        )}
      </List>
    </>
  );
};
