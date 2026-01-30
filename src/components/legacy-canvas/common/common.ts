import { isMobile } from "@/util/canvas";

export const BACKGROUND_GRID_GAP = 40;
export const BACKGROUND_GRID_STROKE_WIDTH = 1;

/**
 * テキスト幅測定のキャッシュ
 * キー: "text-font" の形式
 */
const textMetricsCache = new Map<string, number>();

/**
 * テキスト幅を取得（キャッシュあり）
 * 初回のみ測定し、2回目以降はキャッシュから取得することでパフォーマンスを向上
 */
const getOrCacheTextWidth = (
  canvasApi: CanvasRenderingContext2D,
  text: string,
  font: string,
): number => {
  const key = `${text}-${font}`;
  if (!textMetricsCache.has(key)) {
    const originalFont = canvasApi.font;
    canvasApi.font = font;
    textMetricsCache.set(key, canvasApi.measureText(text).width);
    canvasApi.font = originalFont;
  }
  return textMetricsCache.get(key)!;
};

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
  canvasApi.moveTo(startPosition[0], startPosition[1]);
  canvasApi.lineTo(endPosition[0], endPosition[1]);
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
  if (opacity !== 1) {
    canvasApi.globalAlpha = opacity;
  }
  canvasApi.drawImage(image, x, y, image.width * scale, image.height * scale);
  if (opacity !== 1) {
    canvasApi.globalAlpha = 1;
  }
};

const text01 = '"Extend Expression, Bit by Bit."';
const text02 = "Nao Sasaki / Lanberb";
const text03 = "A Creative Developer based in Tokyo.";
const text04 = "© 2026 Nao Sasaki / Lanberb";
export const drawTextUnderMainLogo = (
  canvasApi: CanvasRenderingContext2D,
  el: HTMLCanvasElement,
  position: { x: number; y: number },
  progress: number, // 0..1
  fillColor: string,
) => {
  const underMainLogoLineY = el.clientHeight / 2 + position.y + 60;

  /**
   * メインロゴ下の線の描画
   */
  const underMainLogoLineWidth = 80 * progress;
  canvasApi.save();
  canvasApi.strokeStyle = fillColor;
  drawLine(
    canvasApi,
    [el.clientWidth / 2 - underMainLogoLineWidth / 2 + position.x, underMainLogoLineY],
    [el.clientWidth / 2 + underMainLogoLineWidth / 2 + position.x, underMainLogoLineY],
  );
  canvasApi.restore();

  /**
   * メインロゴ下のテキストの描画
   */
  canvasApi.save();
  canvasApi.globalAlpha = progress;
  canvasApi.fillStyle = fillColor;
  // メインテキスト
  const font01 = `${isMobile() ? 16 : 20}px 'Rock Salt'`;
  const text01Width = getOrCacheTextWidth(canvasApi, text01, font01);
  canvasApi.font = font01;
  canvasApi.fillText(
    text01,
    el.clientWidth / 2 - text01Width / 2 + position.x,
    underMainLogoLineY + 40,
  );
  // サブテキスト
  const font02 = `${isMobile() ? 12 : 14}px 'Rock Salt'`;
  const text02Width = getOrCacheTextWidth(canvasApi, text02, font02);
  const text03Width = getOrCacheTextWidth(canvasApi, text03, font02);
  canvasApi.font = font02;
  canvasApi.fillText(
    text02,
    el.clientWidth / 2 - text02Width / 2 + position.x,
    underMainLogoLineY + 80,
  );
  canvasApi.fillText(
    text03,
    el.clientWidth / 2 - text03Width / 2 + position.x,
    underMainLogoLineY + 100,
  );
  // コピーライト
  const font04 = "9px 'Rock Salt'";
  const text04Width = getOrCacheTextWidth(canvasApi, text04, font04);
  canvasApi.font = font04;
  canvasApi.fillText(
    text04,
    el.clientWidth / 2 - text04Width / 2 + position.x,
    underMainLogoLineY + 132,
  );
  canvasApi.restore();
};
