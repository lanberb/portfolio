import { createTimeline } from "animejs";
import type { ThemeState } from "@/components/styles/theme";
import {
  BACKGROUND_GRID_STROKE_WIDTH,
  caluculateFirstLineStart,
  caluculateLineStartArray,
  drawImage,
  drawLine,
  getSurfaceColor,
  type RenderableImage,
} from "./common";

export const animation = (
  canvasApi: CanvasRenderingContext2D,
  el: HTMLCanvasElement,
  themeState: ThemeState,
  rowLineCount: number,
  columnLineCount: number,
  images: RenderableImage[],
  onComplete: () => void,
) => {
  console.log("Running openingAnimation...");

  canvasApi.clearRect(0, 0, canvasApi.canvas.width, canvasApi.canvas.height);
  canvasApi.strokeStyle = getSurfaceColor("backgroundGrid", themeState);
  canvasApi.lineWidth = BACKGROUND_GRID_STROKE_WIDTH;

  const rowFirstLineStartX = caluculateFirstLineStart(el?.width ?? 0, rowLineCount, 0);
  const rowLineStartXArray = caluculateLineStartArray(rowFirstLineStartX, rowLineCount);
  const columnFirstLineStartY = caluculateFirstLineStart(el?.height ?? 0, columnLineCount, 0);
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
      canvasApi.clearRect(0, 0, canvasApi.canvas.width, canvasApi.canvas.height);
      // 縦軸
      for (let i = 0; i < rowLineCount; i++) {
        const startPositionY = i % 2 === 0 ? 0 : canvasApi.canvas.height;
        const endPositionY =
          i % 2 === 0 ? animationProperties.lines.y : canvasApi.canvas.height - animationProperties.lines.y;
        drawLine(canvasApi, [rowLineStartXArray[i], startPositionY], [rowLineStartXArray[i], endPositionY]);
      }
      // 横軸
      for (let i = 0; i < columnLineCount; i++) {
        const startPositionX = i % 2 === 0 ? 0 : canvasApi.canvas.width;
        const endPositionX =
          i % 2 === 0 ? animationProperties.lines.x : canvasApi.canvas.width - animationProperties.lines.x;
        drawLine(canvasApi, [startPositionX, columnLineStartYArray[i]], [endPositionX, columnLineStartYArray[i]]);
      }

      for (let i = 0; i < images.length; i++) {
        drawImage(
          canvasApi,
          images[i].el,
          { x: animationProperties.images[i]?.x, y: animationProperties.images[i]?.y },
          animationProperties.images[i]?.scale,
          animationProperties.images[i]?.opacity,
        );
      }

      requestAnimationFrameId = window.requestAnimationFrame(handleOnBegin);
    };

    const handleOnComplete = () => {
      console.log("Complete timeline!");
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
        x: canvasApi.canvas.width,
        y: canvasApi.canvas.height,
        duration: 1200,
        ease: "inOut(1.6)",
      })
      .add(
        animationProperties.images,
        {
          scale: 1,
          opacity: 1,
          duration: 300,
          delay: (_, index: number) => (800 / images.length) * index,
          ease: "inOut(1.6)",
        },
        0,
      )
      .add(animationProperties.images, {
        scale: 0.96,
        duration: 240,
        ease: "inBack(0.8)",
      })
      .add(animationProperties.images, {
        x: (_: unknown, index: number) => animationProperties.images[index].x,
        y: (_: unknown, index: number) => animationProperties.images[index].y,
        scale: 1,
        duration: 640,
        ease: "outBack(0.4)",
      });
  });
};
