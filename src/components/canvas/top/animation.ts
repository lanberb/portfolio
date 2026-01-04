import { createTimeline } from "animejs";
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
       * 背景グリッドの描画
       */
      for (let i = 0; i < rowLineCount; i++) {
        // const startPositionY = i % 2 === 0 ? 0 : el.clientHeight;
        // const endPositionY = i % 2 === 0 ? animationProperties.lines.y : el.clientHeight - animationProperties.lines.y;
        // drawLine(canvasApi, [rowLineStartXArray[i], startPositionY], [rowLineStartXArray[i], endPositionY]);
        drawLine(canvasApi, [rowLineStartXArray[i], 0], [rowLineStartXArray[i], el.clientHeight]);
      }
      for (let i = 0; i < columnLineCount; i++) {
        // const startPositionX = i % 2 === 0 ? 0 : el.clientWidth;
        // const endPositionX = i % 2 === 0 ? animationProperties.lines.x : el.clientWidth - animationProperties.lines.x;
        // drawLine(canvasApi, [startPositionX, columnLineStartYArray[i]], [endPositionX, columnLineStartYArray[i]]);
        drawLine(canvasApi, [0, columnLineStartYArray[i]], [el.clientWidth, columnLineStartYArray[i]]);
      }

      /**
       * ステッカーの描画
       */
      for (let i = 0; i < images.length; i++) {
        const centerizePosition = getCenterizePosition(
          { width: el.clientWidth, height: el.clientHeight },
          {
            width: images[i].el.width * animationProperties.images[i]?.scale,
            height: images[i].el.height * animationProperties.images[i]?.scale,
          },
        );
        drawImage(
          canvasApi,
          images[i].el,
          centerizePosition.x + animationProperties.images[i]?.x,
          centerizePosition.y + animationProperties.images[i]?.y,
          animationProperties.images[i]?.scale,
          animationProperties.images[i]?.opacity,
        );
      }

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

      // 縦軸
      for (let i = 0; i < rowLineCount; i++) {
        drawLine(
          canvasApi,
          [rowLineStartXArray[i] + animationProperties.x, 0],
          [rowLineStartXArray[i] + animationProperties.x, el.clientHeight],
        );
      }
      for (let i = 0; i < columnLineCount; i++) {
        drawLine(
          canvasApi,
          [0, columnLineStartYArray[i] + animationProperties.y],
          [el.clientWidth, columnLineStartYArray[i] + animationProperties.y],
        );
      }

      /**
       * ステッカーの描画
       */
      for (let i = 0; i < images.length; i++) {
        const centerizePosition = getCenterizePosition(
          { width: el.clientWidth, height: el.clientHeight },
          { width: images[i].el.width, height: images[i].el.height },
        );
        drawImage(
          canvasApi,
          images[i].el,
          centerizePosition.x + images[i]?.x + animationProperties.x,
          centerizePosition.y + images[i]?.y + animationProperties.y,
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
