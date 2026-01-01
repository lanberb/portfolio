import type { ThemeState } from "@/components/styles/theme";
import { getSurfaceColor } from "@/util/canvas";
import {
  BACKGROUND_GRID_GAP,
  BACKGROUND_GRID_STROKE_WIDTH,
  caluculateFirstLineStart,
  caluculateLineStartArray,
  drawImage,
  drawLine,
  type RenderableImage,
} from "../common/common";

export const interaction = (
  canvasApi: CanvasRenderingContext2D | null,
  el: HTMLCanvasElement | null,
  themeState: ThemeState | null,
  rowLineCount: number,
  columnLineCount: number,
  position: { x: number; y: number },
  images: RenderableImage[],
) => {
  if (canvasApi == null || el == null || themeState == null) {
    return;
  }
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

  /**
   * 背景グリッドの描画
   */
  for (let i = 0; i < rowLineCount; i++) {
    drawLine(canvasApi, [rowLineStartXArray[i], 0], [rowLineStartXArray[i], el.clientHeight]);
  }
  for (let i = 0; i < columnLineCount; i++) {
    drawLine(canvasApi, [0, columnLineStartYArray[i]], [el.clientWidth, columnLineStartYArray[i]]);
  }

  /**
   * ステッカーの描画
   */
  for (const image of images) {
    drawImage(canvasApi, el, image.el, { x: image.x + position.x, y: image.y + position.y }, 1, 1);
  }

  /**
   * メインロゴ下の線の描画
   */
  const underMainLogoLineWidth = 80;
  const underMainLogoLineY = el.clientHeight / 2 + images[0]?.el.height / 2 + position.y + 24;
  canvasApi.save();
  canvasApi.strokeStyle = getSurfaceColor("primaryInversed", themeState);
  drawLine(
    canvasApi,
    [el.clientWidth / 2 - underMainLogoLineWidth / 2 + position.x, underMainLogoLineY],
    [el.clientWidth / 2 + underMainLogoLineWidth / 2 + position.x, underMainLogoLineY],
  );
  canvasApi.restore();

  /**
   * メインロゴ下のテキストの描画
   */
  const text01 = '"Extend Expression, Bit by Bit."';
  const text02 = "Nao Sasaki / Lanberb";
  const text03 = "A Creative Developer based in Tokyo.";
  canvasApi.save();
  canvasApi.font = "20px 'Rock Salt'";
  canvasApi.fillStyle = getSurfaceColor("primaryInversed", themeState);
  canvasApi.fillText(
    text01,
    el.clientWidth / 2 - canvasApi.measureText(text01).width / 2 + position.x,
    underMainLogoLineY + 40,
  );
  canvasApi.font = "14px 'Rock Salt'";
  canvasApi.fillText(
    text02,
    el.clientWidth / 2 - canvasApi.measureText(text02).width / 2 + position.x,
    underMainLogoLineY + 80,
  );
  canvasApi.fillText(
    text03,
    el.clientWidth / 2 - canvasApi.measureText(text03).width / 2 + position.x,
    underMainLogoLineY + 100,
  );
  canvasApi.restore();
};
