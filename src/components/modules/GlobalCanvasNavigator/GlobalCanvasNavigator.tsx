import styled from "@emotion/styled";
import { type CSSProperties, type FC, type PropsWithChildren, useCallback, useEffect, useState } from "react";
import type { RenderableImage } from "@/components/canvas/common/common";
import { translateAnimation } from "@/components/canvas/top/animation";
import { useGlobalCanvas } from "@/components/hooks/useGlobalCanvas";
import { useTheme } from "@/components/hooks/useTheme";
import { MediaQuery } from "@/components/styles/media";
import type { IconName } from "@/components/unit/Icon";
import type { Position } from "@/util/canvas";
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
  scale: var(--scale);
  pointer-events: initial;
  
  @media ${MediaQuery.sp} {
    transition: translate 0ms, scale 300ms;
  }
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

  @media ${MediaQuery.sp} {
    border-width: ${({ hasBorder }) => (hasBorder ? "8px" : "0")};
  }
`;

interface Props {
  hasBorder: boolean;
  rowLineCount: number;
  columnLineCount: number;
  images: RenderableImage[];
}

export const GlobalCanvasNavigator: FC<PropsWithChildren<Props>> = ({
  children,
  hasBorder,
  rowLineCount,
  columnLineCount,
  images,
}) => {
  const { isDragging, position, canvasApi, el, isInertiaAnimating, update } = useGlobalCanvas();
  const themeState = useTheme();

  const [homeButtonPosition, setHomeButtonPosition] = useState<Position>({ x: 0, y: 0 });
  const [isHomeButtonVisible, setIsHomeButtonVisible] = useState(false);

  const handleOnPointerMove = useCallback(() => {
    if (isDragging === false || el == null) {
      return;
    }
    (() => {
      const isVisible = Math.abs(position.x) > el.clientWidth || Math.abs(position.y) > el.clientHeight;
      const absX = el.clientWidth / 2 + position.x - ITEM_SIZE / 2;
      const absY = el.clientHeight / 2 + position.y - ITEM_SIZE / 2;

      const x = absX < 0 ? Math.max(-ITEM_SIZE / 2, absX) : Math.min(el.clientWidth - ITEM_SIZE, absX);
      const y = absY < 0 ? Math.max(-ITEM_SIZE / 2, absY) : Math.min(el.clientHeight - ITEM_SIZE, absY);

      setIsHomeButtonVisible(isVisible);
      setHomeButtonPosition({ x, y });
    })();
  }, [isDragging, position, el]);

  const handleOnClickIconButton = useCallback(
    async (name: IconName) => {
      switch (name) {
        case "home": {
          const targetPosition = { x: 0, y: 0 };
          await translateAnimation(
            canvasApi,
            el,
            themeState,
            rowLineCount,
            columnLineCount,
            position,
            targetPosition,
            images,
          );
          update(targetPosition, 1);
          setIsHomeButtonVisible(false);
          break;
        }
        default:
          break;
      }
    },
    [position, el, canvasApi, themeState, rowLineCount, columnLineCount, images, update],
  );

  const handleOnMouseup = useCallback(() => {
    // 慣性アニメーション中は継続的に描画
    if (isInertiaAnimating === false) {
      return;
    }
    let frameId: number;
    const render = () => {
      handleOnPointerMove();
      frameId = requestAnimationFrame(render);
    };
    frameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frameId);
  }, []);

  /**
   * マウスイベント登録
   */
  useEffect(() => {
    document.body.addEventListener("pointerup", handleOnMouseup);
    document.body.addEventListener("pointermove", handleOnPointerMove);
    return () => {
      document.body.removeEventListener("pointermove", handleOnPointerMove);
      document.body.removeEventListener("pointerup", handleOnMouseup);
    };
  }, [handleOnPointerMove]);

  return (
    <>
      {children}

      <List hasBorder={hasBorder}>
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
    </>
  );
};
