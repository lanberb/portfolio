import { createTimeline } from "animejs";
import type { ThemeState } from "@/components/styles/theme";
import { getSurfaceColor, isMobile } from "@/util/canvas";

const SQUARE_SIZE = isMobile() ? 20 : 40;

export const animation = (
  canvasApi: CanvasRenderingContext2D,
  el: HTMLCanvasElement,
  theme: ThemeState,
  onComplete: () => void,
) => {
  const surfaceColor = getSurfaceColor("primaryInversed", theme);
  canvasApi.fillStyle = surfaceColor;

  const _spaceRowCount = Math.ceil(el.clientWidth / SQUARE_SIZE);
  const spaceRowCount = _spaceRowCount % 2 === 0 ? _spaceRowCount + 1 : _spaceRowCount;
  const _spaceColumnCount = Math.ceil(el.clientHeight / SQUARE_SIZE);
  const spaceColumnCount = _spaceColumnCount % 2 === 0 ? _spaceColumnCount + 1 : _spaceColumnCount;
  const distX = (el.clientWidth - spaceRowCount * SQUARE_SIZE) / 2;
  const distY = (el.clientHeight - spaceColumnCount * SQUARE_SIZE) / 2;

  return new Promise<void>((resolve) => {
    const animationProperties = {
      fillSquares: Array.from({ length: spaceColumnCount }, () =>
        Array.from({ length: spaceRowCount }, () => ({
          scale: 0,
        })),
      ),
      clearSquares: Array.from({ length: spaceColumnCount }, () =>
        Array.from({ length: spaceRowCount }, () => ({
          scale: 0,
        })),
      ),
    };

    let requestAnimationFrameId: number;
    let animationMode: "fill" | "clear" = "fill";

    const handleOnBegin = () => {
      canvasApi.save();
      if (animationMode === "fill") {
        canvasApi.globalCompositeOperation = "source-over";
      } else {
        canvasApi.globalCompositeOperation = "destination-out";
      }
      for (let y = 0; y < spaceColumnCount; y++) {
        for (let x = 0; x < spaceRowCount; x++) {
          const animatedSquareSize =
            animationMode === "fill"
              ? animationProperties.fillSquares[y][x].scale * SQUARE_SIZE
              : animationProperties.clearSquares[y][x].scale * SQUARE_SIZE;
          canvasApi.fillRect(
            x * SQUARE_SIZE + SQUARE_SIZE / 2 - animatedSquareSize / 2 + distX,
            y * SQUARE_SIZE + SQUARE_SIZE / 2 - animatedSquareSize / 2 + distY,
            animatedSquareSize,
            animatedSquareSize,
          );
        }
      }
      canvasApi.restore();
      requestAnimationFrameId = window.requestAnimationFrame(handleOnBegin);
    };

    const handleOnComplete = () => {
      window.cancelAnimationFrame(requestAnimationFrameId);
      onComplete();
      resolve();
    };

    const targetScale = 1.2;
    const duration = 400;
    const delay = 16;

    const centerX = (spaceRowCount - 1) / 2;
    const centerY = (spaceColumnCount - 1) / 2;
    const flatFillSquares = animationProperties.fillSquares.flat();
    const flatClearSquares = animationProperties.clearSquares.flat();

    const timeline = createTimeline({
      onBegin: handleOnBegin,
      onComplete: handleOnComplete,
    });
    timeline
      .add(flatFillSquares, {
        scale: targetScale,
        ease: "inOut(1.6)",
        duration,
        delay: (_, index: number) => {
          const x = index % spaceRowCount;
          const y = Math.floor(index / spaceRowCount);
          const distanceFromCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
          return delay * distanceFromCenter;
        },
        onBegin: () => {
          animationMode = "fill";
        },
      })
      .add(flatClearSquares, {
        scale: targetScale,
        ease: "inOut(1.6)",
        duration,
        delay: (_, index: number) => {
          const x = index % spaceRowCount;
          const y = Math.floor(index / spaceRowCount);
          const distanceFromCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
          return delay * distanceFromCenter;
        },
        onBegin: () => {
          animationMode = "clear";
        },
      });
  });
};
