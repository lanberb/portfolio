import type { ThemeState } from "@/components/styles/theme";
import { getSurfaceColor } from "@/util/canvas";
import {
  BACKGROUND_GRID_GAP,
  BACKGROUND_GRID_STROKE_WIDTH,
  caluculateFirstLineStart,
  caluculateLineStartArray,
  drawImage,
  drawTextUnderMainLogo,
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
   * 背景グリッドの描画（バッチ処理で最適化）
   */
  canvasApi.beginPath();
  // 縦線
  for (let i = 0; i < rowLineCount; i++) {
    canvasApi.moveTo(rowLineStartXArray[i], 0);
    canvasApi.lineTo(rowLineStartXArray[i], el.clientHeight);
  }
  // 横線
  for (let i = 0; i < columnLineCount; i++) {
    canvasApi.moveTo(0, columnLineStartYArray[i]);
    canvasApi.lineTo(el.clientWidth, columnLineStartYArray[i]);
  }
  canvasApi.stroke();

  /**
   * ステッカーの描画（最適化: getCenterizePositionをインライン展開）
   */
  for (const image of images) {
    const centerX = (el.clientWidth - image.el.width) / 2;
    const centerY = (el.clientHeight - image.el.height) / 2;
    drawImage(
      canvasApi,
      image.el,
      centerX + image.x + position.x,
      centerY + image.y + position.y,
      1,
      1,
    );
  }

  /**
   * メインロゴ下部の描画
   */
  drawTextUnderMainLogo(canvasApi, el, position, 1, getSurfaceColor("primaryInversed", themeState));
};
