import type { ThemeState } from "@/components/styles/theme";
import { getCenterizePosition, getSurfaceColor } from "@/util/canvas";
import {
  BACKGROUND_GRID_GAP,
  BACKGROUND_GRID_STROKE_WIDTH,
  caluculateFirstLineStart,
  caluculateLineStartArray,
  drawImage,
  drawLine,
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
    const centerizePosition = getCenterizePosition(
      { width: el.clientWidth, height: el.clientHeight },
      { width: image.el.width, height: image.el.height },
    );
    drawImage(
      canvasApi,
      image.el,
      centerizePosition.x + image.x + position.x,
      centerizePosition.y + image.y + position.y,
      1,
      1,
    );
  }

  /**
   * メインロゴ下部の描画
   */
  const underMainLogoLineY = el.clientHeight / 2 + images[0]?.el.height / 2 + position.y;
  drawTextUnderMainLogo(canvasApi, el, underMainLogoLineY, position, themeState);
};
