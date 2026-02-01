import styled from "@emotion/styled";
import { type CSSProperties, type FC, useCallback, useEffect, useState } from "react";
import { MediaQuery } from "@/components/styles/media";
import type { IconName } from "@/components/unit/Icon";
import { useCanvasEngine } from "@/hooks/useCanvasEngine";
import { useTheme } from "@/hooks/useTheme";
import { getSurfaceColor } from "@/util/canvas";
import { IconButton } from "../IconButton";

const ITEM_SIZE = 64;

const Item = styled.li`
  position: relative;
  width: 0;
  height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  background-color: var(${({ theme }) => theme.surface.primaryInversed});
  border-radius: 100%;
  width: ${ITEM_SIZE}px;
  height: ${ITEM_SIZE}px;
  transition: translate 50ms, scale 300ms;
  translate: var(--positionX) var(--positionY);
  transform-origin: center center;
  scale: var(--scale);
  pointer-events: initial;

  @media ${MediaQuery.sp} {
    transition: translate 0ms, scale 300ms;
  }
`;

const List = styled.ul`
  position: fixed;
  inset: 0;
  list-style: none;
  pointer-events: none;
  border-style: solid;
  border-color: var(${({ theme }) => theme.surface.primaryInversed});
  filter: url("#filter");
`;

export const GlobalCanvasNavigator: FC = () => {
  const themeState = useTheme();
  const { animation, movement, el, resetPosition } = useCanvasEngine();

  const [isHomeButtonVisible, setIsHomeButtonVisible] = useState(false);

  const homeButtonPosition = (() => {
    if (el == null) return;
    const absX = el.clientWidth / 2 + movement.x - ITEM_SIZE / 2;
    const absY = el.clientHeight / 2 + movement.y - ITEM_SIZE / 2;
    const x = absX < 0 ? Math.max(-ITEM_SIZE / 2, absX) : Math.min(el.clientWidth - ITEM_SIZE, absX);
    const y = absY < 0 ? Math.max(-ITEM_SIZE / 2, absY) : Math.min(el.clientHeight - ITEM_SIZE, absY);
    return { x, y };
  })();

  const handleOnPointerMove = useCallback(() => {
    if (el == null) return;
    (() => {
      const isVisible = Math.abs(movement.x) > el.clientWidth || Math.abs(movement.y) > el.clientHeight;
      setIsHomeButtonVisible(isVisible);
    })();
  }, [el, movement]);

  const handleOnClickIconButton = useCallback(
    async (name: IconName) => {
      switch (name) {
        case "home": {
          if (themeState == null || animation == null) return;
          animation.onNavigatorClick(
            getSurfaceColor("backgroundGrid", themeState),
            getSurfaceColor("primaryInversed", themeState),
            movement.x,
            movement.y,
            0,
            0,
            () => {
              resetPosition();
              setIsHomeButtonVisible(false);
            },
          );
          break;
        }
        default:
          break;
      }
    },
    [themeState, animation, movement, resetPosition],
  );

  /**
   * マウスイベント登録
   */
  useEffect(() => {
    document.body.addEventListener("pointermove", handleOnPointerMove);
    return () => {
      document.body.removeEventListener("pointermove", handleOnPointerMove);
    };
  }, [handleOnPointerMove]);

  return (
    <List>
      <Item
        style={
          {
            "--scale": isHomeButtonVisible ? 1 : 0,
            "--positionX": `${homeButtonPosition?.x}px`,
            "--positionY": `${homeButtonPosition?.y}px`,
          } as CSSProperties
        }
      >
        <IconButton name="home" color="primaryInversed" onClick={() => handleOnClickIconButton("home")} />
      </Item>
    </List>
  );
};
