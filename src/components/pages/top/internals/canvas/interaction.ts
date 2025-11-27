import type { ThemeState } from "@/components/styles/theme";
import {
  BACKGROUND_GRID_GAP,
  BACKGROUND_GRID_STROKE_WIDTH,
  caluculateFirstLineStart,
  caluculateLineStartArray,
  drawImage,
  drawLine,
  type RenderableImage,
} from "./common";
import { getSurfaceColor } from "@/util/canvas";

export const interaction = (
  canvasApi: CanvasRenderingContext2D,
  el: HTMLCanvasElement,
  themeState: ThemeState,
  rowLineCount: number,
  columnLineCount: number,
  position: { x: number; y: number },
  images: RenderableImage[],
) => {
  canvasApi.clearRect(0, 0, el.clientWidth, el.clientHeight);
  canvasApi.strokeStyle = getSurfaceColor("backgroundGrid", themeState);
  canvasApi.lineWidth = BACKGROUND_GRID_STROKE_WIDTH;

  const rowFirstLineStartX = caluculateFirstLineStart(
    el?.clientWidth ?? 0,
    rowLineCount,
    position.x % BACKGROUND_GRID_GAP, // pointermoveによって生まれるズレ量
  );
  const rowLineStartXArray = caluculateLineStartArray(rowFirstLineStartX, rowLineCount);
  const columnFirstLineStartY = caluculateFirstLineStart(
    el?.clientHeight ?? 0,
    columnLineCount,
    position.y % BACKGROUND_GRID_GAP, // pointermoveによって生まれるズレ量
  );
  const columnLineStartYArray = caluculateLineStartArray(columnFirstLineStartY, columnLineCount);

  for (let i = 0; i < rowLineCount; i++) {
    drawLine(canvasApi, [rowLineStartXArray[i], 0], [rowLineStartXArray[i], el.clientHeight]);
  }
  for (let i = 0; i < columnLineCount; i++) {
    drawLine(canvasApi, [0, columnLineStartYArray[i]], [el.clientWidth, columnLineStartYArray[i]]);
  }
  for (const image of images) {
    drawImage(canvasApi, el, image.el, { x: image.x + position.x, y: image.y + position.y }, 1, 1);
  }
};
