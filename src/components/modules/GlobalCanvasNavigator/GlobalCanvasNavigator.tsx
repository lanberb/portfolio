import styled from "@emotion/styled";
import { type FC, useCallback } from "react";
import { useGlobalCanvas } from "@/hooks/useGlobalCanvas";
import { useTheme } from "@/hooks/useTheme";
import { getSurfaceColor } from "@/util/canvas";
import { GlobalCanvasNavigatorItem } from "./GlobalCanvasNavigatorItem";

const List = styled.ul`
  position: fixed;
  width: 100%;
  height: 100%;
  inset: 0;
  list-style: none;
  pointer-events: none;
  filter: url("#filter");

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    border-style: solid;
    border-color: var(${({ theme }) => theme.surface.primaryInversed});
    border-width: 6px;
    box-sizing: border-box;
  }
`;

export const GlobalCanvasNavigator: FC = () => {
  const themeState = useTheme();
  const { engine, movement, update } = useGlobalCanvas();

  const handleOnClickHomeButton = useCallback(() => {
    if (themeState == null || engine == null) return;
    engine.render.onNavigatorClick(
      getSurfaceColor("backgroundGrid", themeState),
      getSurfaceColor("primaryInversed", themeState),
      movement.x,
      movement.y,
      0,
      0,
      () => {
        update(0, 0);
      },
    );
  }, [themeState, engine, movement, update]);

  const handleOnClickBlogButton = useCallback(() => {
    if (themeState == null || engine == null) return;
    engine.render.onNavigatorClick(
      getSurfaceColor("backgroundGrid", themeState),
      getSurfaceColor("primaryInversed", themeState),
      movement.x,
      movement.y,
      -1200,
      -200,
      () => {
        update(-1200, -200);
      },
    );
  }, [themeState, engine, movement, update]);

  return (
    <List>
      <GlobalCanvasNavigatorItem
        name="modeDark"
        invisibleArea={{ startX: 1200, startY: 200 }}
        onClick={handleOnClickBlogButton}
      />
      <GlobalCanvasNavigatorItem
        name="home"
        invisibleArea={{ startX: 0, startY: 0 }}
        onClick={handleOnClickHomeButton}
      />
    </List>
  );
};
