import type { ThemeState } from "@/styles/theme";
import { getCenterizePosition } from "@/util/canvas";
import type { Theme } from "@emotion/react";

export const BACKGROUND_GRID_GAP = 40;
export const BACKGROUND_GRID_STROKE_WIDTH = 1;

/**
 * @summary keyをもとにglobalStyleに登録されているRGBAを返す
 */
export const getSurfaceColor = (key: keyof Theme["surface"], themeState: ThemeState) => {
  const color = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(themeState.theme.surface[key])
    .trim();
  return color;
};

/**
 * @summary (与えられた幅)から(行数 - 1) * グリッドの幅)を引いた値を2で割る
 * @param width 描画する領域幅
 * @param lineCount グリッドの本数
 * @param dist ドラッグなどによる描画位置のズレ量
 */
export const caluculateFirstLineStart = (width: number, lineCount: number, dist: number) => {
  return (width - (lineCount - 1) * BACKGROUND_GRID_GAP) / 2 + dist;
};

/**
 * @summary グリッド線の開始位置を配列で返す
 */
export const caluculateLineStartArray = (startPosition: number, lineCount: number) => {
  return Array.from({ length: lineCount }, (_, i) => {
    return startPosition + i * BACKGROUND_GRID_GAP;
  });
};

export const drawLine = (
  canvasApi: CanvasRenderingContext2D,
  startPosition: [number, number],
  endPosition: [number, number],
) => {
  canvasApi.beginPath();
  canvasApi.moveTo(startPosition[0], startPosition[1]);
  canvasApi.lineTo(endPosition[0], endPosition[1]);
  canvasApi.stroke();
};

export const drawImage = (
  canvasApi: CanvasRenderingContext2D,
  image: HTMLImageElement,
  position: { x: number; y: number },
  scale: number,
  opacity: number,
) => {
  const centerizePosition = getCenterizePosition(
    { width: canvasApi.canvas.width, height: canvasApi.canvas.height },
    { width: image.width * scale, height: image.height * scale },
  );
  canvasApi.save();
  canvasApi.globalAlpha = opacity;
  canvasApi.drawImage(
    image,
    centerizePosition.x + position.x,
    centerizePosition.y + position.y,
    image.width * scale,
    image.height * scale,
  );
  canvasApi.restore();
};

export const draw = (
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
