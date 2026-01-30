import { createTimeline } from "animejs";
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

export const openingAnimation = (
  canvasApi: CanvasRenderingContext2D | null,
  el: HTMLCanvasElement | null,
  themeState: ThemeState | null,
  rowLineCount: number,
  columnLineCount: number,
  images: RenderableImage[],
  onComplete: () => void,
) => {
  if (canvasApi == null || el == null || themeState == null) {
    return;
  }

  canvasApi.clearRect(0, 0, el.clientWidth, el.clientHeight);
  canvasApi.strokeStyle = getSurfaceColor("backgroundGrid", themeState);
  canvasApi.lineWidth = BACKGROUND_GRID_STROKE_WIDTH;

  const rowFirstLineStartX = caluculateFirstLineStart(el.clientWidth, rowLineCount, 0);
  const rowLineStartXArray = caluculateLineStartArray(rowFirstLineStartX, rowLineCount);
  const columnFirstLineStartY = caluculateFirstLineStart(el.clientHeight, columnLineCount, 0);
  const columnLineStartYArray = caluculateLineStartArray(columnFirstLineStartY, columnLineCount);

  return new Promise<void>((resolve) => {
    const animationProperties = {
      lines: {
        x: 0,
        y: 0,
      },
      images: images.map(({ x, y }) => {
        return {
          scale: 1.2,
          opacity: 0,
          x,
          y,
        };
      }),
      progress: 0,
    };

    const handleUpdate = () => {
      canvasApi.clearRect(0, 0, el.clientWidth, el.clientHeight);
      /**
       * 背景グリッドの描画（バッチ処理で最適化）
       */
      canvasApi.beginPath();
      // 縦線
      for (let i = 0; i < rowLineCount; i++) {
        const startPositionY = i % 2 === 0 ? 0 : el.clientHeight;
        const endPositionY = i % 2 === 0 ? animationProperties.lines.y : el.clientHeight - animationProperties.lines.y;
        canvasApi.moveTo(rowLineStartXArray[i], startPositionY);
        canvasApi.lineTo(rowLineStartXArray[i], endPositionY);
      }
      // 横線
      for (let i = 0; i < columnLineCount; i++) {
        const startPositionX = i % 2 === 0 ? 0 : el.clientWidth;
        const endPositionX = i % 2 === 0 ? animationProperties.lines.x : el.clientWidth - animationProperties.lines.x;
        canvasApi.moveTo(startPositionX, columnLineStartYArray[i]);
        canvasApi.lineTo(endPositionX, columnLineStartYArray[i]);
      }
      canvasApi.stroke();

      /**
       * ステッカーの描画（最適化: 配列アクセスを最小化）
       */
      canvasApi.save();
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const animImg = animationProperties.images[i];
        const imgWidth = img.el.width * animImg.scale;
        const imgHeight = img.el.height * animImg.scale;
        const centerX = (el.clientWidth - imgWidth) / 2;
        const centerY = (el.clientHeight - imgHeight) / 2;
        drawImage(
          canvasApi,
          img.el,
          centerX + animImg.x,
          centerY + animImg.y,
          animImg.scale,
          animImg.opacity,
        );
      }
      canvasApi.restore();

      /**
       * メインロゴ下部の描画
       */
      drawTextUnderMainLogo(
        canvasApi,
        el,
        { x: 0, y: 0 },
        animationProperties.progress,
        getSurfaceColor("primaryInversed", themeState),
      );
    };

    const handleOnComplete = () => {
      onComplete();
      resolve();
    };

    const timeline = createTimeline({
      onUpdate: handleUpdate,
      onComplete: handleOnComplete,
    });

    timeline
      .set(animationProperties.images, {
        x: 0,
        y: 0,
      })
      .add(animationProperties.lines, {
        x: el.clientWidth,
        y: el.clientHeight,
        duration: 800,
        ease: "inOut(1.6)",
      })
      .add(
        animationProperties.images,
        {
          scale: 1,
          opacity: 1,
          duration: 320,
          delay: (_, index: number) => (800 / images.length) * index,
          ease: "inOut(1.6)",
        },
        200,
      )
      .add(animationProperties.images, {
        scale: 0.96,
        duration: 160,
        ease: "inBack(0.6)",
      })
      .add(animationProperties.images, {
        x: (_: unknown, index: number) => animationProperties.images[index].x,
        y: (_: unknown, index: number) => animationProperties.images[index].y,
        scale: 1,
        duration: 640,
        ease: "outBack(0.68)",
      })
      .add(animationProperties, {
        progress: 1,
        duration: 440,
        ease: "outBack(0.68)",
      });
  });
};

export const translateAnimation = (
  canvasApi: CanvasRenderingContext2D | null,
  el: HTMLCanvasElement | null,
  themeState: ThemeState | null,
  rowLineCount: number,
  columnLineCount: number,
  basePosition: { x: number; y: number }, // 遷移元の座標
  targetPosition: { x: number; y: number }, // 遷移先の座標
  images: RenderableImage[],
) => {
  if (canvasApi == null || el == null || themeState == null) {
    return;
  }
  canvasApi.strokeStyle = getSurfaceColor("backgroundGrid", themeState);
  canvasApi.lineWidth = BACKGROUND_GRID_STROKE_WIDTH;

  const rowFirstLineStartX = caluculateFirstLineStart(
    el.clientWidth,
    rowLineCount,
    basePosition.x % BACKGROUND_GRID_GAP,
  );
  const rowLineStartXArray = caluculateLineStartArray(rowFirstLineStartX, rowLineCount);
  const columnFirstLineStartY = caluculateFirstLineStart(
    el.clientHeight,
    columnLineCount,
    basePosition.y % BACKGROUND_GRID_GAP,
  );
  const columnLineStartYArray = caluculateLineStartArray(columnFirstLineStartY, columnLineCount);

  return new Promise<void>((resolve) => {
    const animationProperties = {
      x: basePosition.x,
      y: basePosition.y,
      scale: 1,
    };

    const handleUpdate = () => {
      canvasApi.save();
      canvasApi.clearRect(0, 0, el.clientWidth, el.clientHeight);

      const centerX = el.clientWidth / 2;
      const centerY = el.clientHeight / 2;
      canvasApi.translate(centerX, centerY);
      canvasApi.translate(-centerX, -centerY);

      /**
       * 背景グリッドの描画（バッチ処理で最適化）
       */
      canvasApi.beginPath();
      // 縦線
      for (let i = 0; i < rowLineCount; i++) {
        canvasApi.moveTo(rowLineStartXArray[i] + animationProperties.x, 0);
        canvasApi.lineTo(rowLineStartXArray[i] + animationProperties.x, el.clientHeight);
      }
      // 横線
      for (let i = 0; i < columnLineCount; i++) {
        canvasApi.moveTo(0, columnLineStartYArray[i] + animationProperties.y);
        canvasApi.lineTo(el.clientWidth, columnLineStartYArray[i] + animationProperties.y);
      }
      canvasApi.stroke();

      /**
       * ステッカーの描画（最適化: 配列アクセスを最小化）
       */
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        const centerX = (el.clientWidth - img.el.width) / 2;
        const centerY = (el.clientHeight - img.el.height) / 2;
        drawImage(
          canvasApi,
          img.el,
          centerX + img.x + animationProperties.x,
          centerY + img.y + animationProperties.y,
          1,
          1,
        );
      }

      /**
       * メインロゴ下部の描画
       */
      drawTextUnderMainLogo(
        canvasApi,
        el,
        { x: animationProperties.x, y: animationProperties.y },
        1,
        getSurfaceColor("primaryInversed", themeState),
      );
      canvasApi.restore();
    };

    const handleOnComplete = () => {
      resolve();
    };

    const timeline = createTimeline({
      onUpdate: handleUpdate,
      onComplete: handleOnComplete,
    });

    timeline
      .add(animationProperties, {
        x: targetPosition.x,
        y: targetPosition.y,
        duration: 800,
        ease: "inOut(1.6)",
      })
      .add(animationProperties, {
        scale: 0.96,
        duration: 160,
        ease: "inBack(0.6)",
      });
  });
};
