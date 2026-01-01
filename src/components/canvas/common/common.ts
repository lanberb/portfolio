export const BACKGROUND_GRID_GAP = 40;
export const BACKGROUND_GRID_STROKE_WIDTH = 1;

/**
 * @summary (与えられた幅 - (行数 - 1) * グリッドの幅)を引いた値を2で割る
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

export type RenderableImage = {
  el: HTMLImageElement;
  x: number;
  y: number;
};

export const drawImage = (
  canvasApi: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  scale: number,
  opacity: number,
) => {
  canvasApi.save();
  canvasApi.globalAlpha = opacity;
  canvasApi.drawImage(image, x, y, image.width * scale, image.height * scale);
  canvasApi.restore();
};
