import type { ThemeState } from "@/components/styles/theme";
import { getSurfaceColor, isMobile } from "@/util/canvas";

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

export const drawTextUnderMainLogo = (
  canvasApi: CanvasRenderingContext2D,
  el: HTMLCanvasElement,
  y: number,
  position: { x: number; y: number },
  themeState: ThemeState,
) => {
  /**
   * メインロゴ下の線の描画
   */
  const underMainLogoLineWidth = 80;
  canvasApi.save();
  canvasApi.strokeStyle = getSurfaceColor("primaryInversed", themeState);
  drawLine(
    canvasApi,
    [el.clientWidth / 2 - underMainLogoLineWidth / 2 + position.x, y],
    [el.clientWidth / 2 + underMainLogoLineWidth / 2 + position.x, y],
  );
  canvasApi.restore();

  /**
   * メインロゴ下のテキストの描画
   */
  const text01 = '"Extend Expression, Bit by Bit."';
  const text02 = "Nao Sasaki / Lanberb";
  const text03 = "A Creative Developer based in Tokyo.";
  canvasApi.save();
  canvasApi.font = `${isMobile() ? 16 : 20}px 'Rock Salt'`;
  canvasApi.fillStyle = getSurfaceColor("primaryInversed", themeState);
  canvasApi.fillText(text01, el.clientWidth / 2 - canvasApi.measureText(text01).width / 2 + position.x, y + 40);
  canvasApi.font = `${isMobile() ? 12 : 14}px 'Rock Salt'`;
  canvasApi.fillText(text02, el.clientWidth / 2 - canvasApi.measureText(text02).width / 2 + position.x, y + 80);
  canvasApi.fillText(text03, el.clientWidth / 2 - canvasApi.measureText(text03).width / 2 + position.x, y + 100);
  canvasApi.restore();
};
