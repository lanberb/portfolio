import { createTimeline } from "animejs";
import type { ThemeState } from "@/components/styles/theme";
import { getSurfaceColor, isMobile } from "@/util/canvas";

const SQUARE_SIZE = isMobile() ? 40 : 320;

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
      squares: Array.from({ length: spaceColumnCount }, () => ({
        scale: 0,
      })),
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
          const animatedSquareSize = animationProperties.squares[y].scale * SQUARE_SIZE;
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

    const targetScale = 1.05;
    const duration = 200;

    const timeline = createTimeline({
      onBegin: handleOnBegin,
      onComplete: handleOnComplete,
    });
    timeline
      .add(animationProperties.squares, {
        scale: targetScale,
        ease: "inOut(1.6)",
        duration,
        delay: (_, index: number) => {
          return 80 * (spaceColumnCount - index);
        },
        onBegin: () => {
          animationMode = "fill";
        },
      })
      .set(animationProperties.squares, {
        scale: 0,
        onBegin: () => {
          animationMode = "clear";
        },
      })
      .add(animationProperties.squares, {
        scale: targetScale,
        ease: "inOut(1.6)",
        duration,
        delay: (_, index: number) => {
          return 80 * (spaceColumnCount - index);
        },
      });
  });
};
