import { createTimeline } from "animejs";
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
} from "../../common/common";

export const openingAnimation = (
  canvasApi: CanvasRenderingContext2D,
  el: HTMLCanvasElement,
  themeState: ThemeState,
  rowLineCount: number,
  columnLineCount: number,
  images: RenderableImage[],
  onComplete: () => void,
) => {
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
    };

    let requestAnimationFrameId: number;

    const handleOnBegin = () => {
      canvasApi.clearRect(0, 0, el.clientWidth, el.clientHeight);
      // 縦軸
      for (let i = 0; i < rowLineCount; i++) {
        const startPositionY = i % 2 === 0 ? 0 : el.clientHeight;
        const endPositionY = i % 2 === 0 ? animationProperties.lines.y : el.clientHeight - animationProperties.lines.y;
        drawLine(canvasApi, [rowLineStartXArray[i], startPositionY], [rowLineStartXArray[i], endPositionY]);
      }
      // 横軸
      for (let i = 0; i < columnLineCount; i++) {
        const startPositionX = i % 2 === 0 ? 0 : el.clientWidth;
        const endPositionX = i % 2 === 0 ? animationProperties.lines.x : el.clientWidth - animationProperties.lines.x;
        drawLine(canvasApi, [startPositionX, columnLineStartYArray[i]], [endPositionX, columnLineStartYArray[i]]);
      }

      for (let i = 0; i < images.length; i++) {
        drawImage(
          canvasApi,
          el,
          images[i].el,
          { x: animationProperties.images[i]?.x, y: animationProperties.images[i]?.y },
          animationProperties.images[i]?.scale,
          animationProperties.images[i]?.opacity,
        );
      }

      requestAnimationFrameId = window.requestAnimationFrame(handleOnBegin);
    };

    const handleOnComplete = () => {
      window.cancelAnimationFrame(requestAnimationFrameId);
      onComplete();
      resolve();
    };

    const timeline = createTimeline({
      onBegin: handleOnBegin,
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
        duration: 1200,
        ease: "inOut(1.6)",
      })
      .add(
        animationProperties.images,
        {
          scale: 1,
          opacity: 1,
          duration: 300,
          delay: (_, index: number) => (480 / images.length) * index,
          ease: "inOut(1.6)",
        },
        0,
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
        duration: 440,
        ease: "outBack(0.68)",
      });
  });
};

export const transitionAnimation = (
  canvasApi: CanvasRenderingContext2D,
  el: HTMLCanvasElement,
  themeState: ThemeState,
  rowLineCount: number,
  columnLineCount: number,
  position: { x: number; y: number },
  images: RenderableImage[],
) => {
  canvasApi.clearRect(0, 0, el.clientWidth, el.clientHeight);
  canvasApi.strokeStyle = getSurfaceColor("backgroundGrid", themeState);
  canvasApi.lineWidth = BACKGROUND_GRID_STROKE_WIDTH;

  const rowFirstLineStartX = caluculateFirstLineStart(
    el.clientWidth,
    rowLineCount,
    position.x % BACKGROUND_GRID_GAP,
  );
  const rowLineStartXArray = caluculateLineStartArray(rowFirstLineStartX, rowLineCount);
  const columnFirstLineStartY = caluculateFirstLineStart(
    el.clientHeight,
    columnLineCount,
    position.y % BACKGROUND_GRID_GAP,
  );
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
    };

    let requestAnimationFrameId: number;

    const handleOnBegin = () => {
      canvasApi.clearRect(0, 0, el.clientWidth, el.clientHeight);
      // // 縦軸
      // for (let i = 0; i < rowLineCount; i++) {
      //   drawLine(canvasApi, [rowLineStartXArray[i], 0], [rowLineStartXArray[i], animationProperties.lines.y]);
      // }
      // // 横軸
      // for (let i = 0; i < columnLineCount; i++) {
      //   drawLine(canvasApi, [0, columnLineStartYArray[i]], [animationProperties.lines.x, columnLineStartYArray[i]]);
      // }
      for (let i = 0; i < rowLineCount; i++) {
        const startPositionY = i % 2 === 0 ? 0 : el.clientHeight;
        const endPositionY = i % 2 === 0 ? animationProperties.lines.y : el.clientHeight - animationProperties.lines.y;
        drawLine(canvasApi, [rowLineStartXArray[i], startPositionY], [rowLineStartXArray[i], endPositionY]);
      }
      // 横軸
      for (let i = 0; i < columnLineCount; i++) {
        const startPositionX = i % 2 === 0 ? 0 : el.clientWidth;
        const endPositionX = i % 2 === 0 ? animationProperties.lines.x : el.clientWidth - animationProperties.lines.x;
        drawLine(canvasApi, [startPositionX, columnLineStartYArray[i]], [endPositionX, columnLineStartYArray[i]]);
      }

      for (let i = 0; i < images.length; i++) {
        drawImage(
          canvasApi,
          el,
          images[i].el,
          { x: animationProperties.images[i]?.x + position.x, y: animationProperties.images[i]?.y + position.y },
          animationProperties.images[i]?.scale,
          animationProperties.images[i]?.opacity,
        );
      }

      requestAnimationFrameId = window.requestAnimationFrame(handleOnBegin);
    };

    const handleOnComplete = () => {
      window.cancelAnimationFrame(requestAnimationFrameId);
      resolve();
    };

    const timeline = createTimeline({
      onBegin: handleOnBegin,
      onComplete: handleOnComplete,
    });

    timeline
      .add(animationProperties.lines, {
        x: el.clientWidth,
        y: el.clientHeight,
        duration: 1200,
        ease: "inOut(1.6)",
      })
      .add(
        animationProperties.images,
        {
          scale: 1,
          opacity: 1,
          duration: 300,
          delay: (_, index: number) => (480 / images.length) * index,
          ease: "inOut(1.6)",
        },
        0,
      );
  });
};
