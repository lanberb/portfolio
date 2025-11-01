import type { ThemeState } from "@/styles/theme";
import {
  BACKGROUND_GRID_GAP,
  BACKGROUND_GRID_STROKE_WIDTH,
  caluculateFirstLineStart,
  caluculateLineStartArray,
  drawImage,
  drawLine,
  getSurfaceColor,
} from "./common";

export const interaction = (
  canvasApi: CanvasRenderingContext2D,
  el: HTMLCanvasElement,
  themeState: ThemeState,
  rowLineCount: number,
  columnLineCount: number,
  position: { x: number; y: number },
  images: HTMLImageElement[],
) => {
  canvasApi.clearRect(0, 0, canvasApi.canvas.width, canvasApi.canvas.height);
  canvasApi.strokeStyle = getSurfaceColor("backgroundGrid", themeState);
  canvasApi.lineWidth = BACKGROUND_GRID_STROKE_WIDTH;

  const rowFirstLineStartX = caluculateFirstLineStart(
    el?.width ?? 0,
    rowLineCount,
    position.x % BACKGROUND_GRID_GAP, // pointermoveによって生まれるズレ量
  );
  const rowLineStartXArray = caluculateLineStartArray(rowFirstLineStartX, rowLineCount);
  const columnFirstLineStartY = caluculateFirstLineStart(
    el?.height ?? 0,
    columnLineCount,
    position.y % BACKGROUND_GRID_GAP, // pointermoveによって生まれるズレ量
  );
  const columnLineStartYArray = caluculateLineStartArray(columnFirstLineStartY, columnLineCount);

  for (let i = 0; i < rowLineCount; i++) {
    drawLine(canvasApi, [rowLineStartXArray[i], 0], [rowLineStartXArray[i], el.height]);
  }
  for (let i = 0; i < columnLineCount; i++) {
    drawLine(canvasApi, [0, columnLineStartYArray[i]], [el.width, columnLineStartYArray[i]]);
  }
  for (const image of images) {
    drawImage(canvasApi, image, position, 1, 1);
  }
};
