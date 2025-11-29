import { createTimeline } from "animejs";
import type { ThemeState } from "@/components/styles/theme";
import { getSurfaceColor, isMobile } from "@/util/canvas";

const SQUARE_SIZE = isMobile() ? 80 : 200;

export const animation = (
  canvasApi: CanvasRenderingContext2D,
  el: HTMLCanvasElement,
  theme: ThemeState,
  onComplete: () => void,
) => {
  const surfaceColor = getSurfaceColor("backgroundGrid", theme);
  canvasApi.fillStyle = surfaceColor;

  const _spaceRowCount = Math.ceil(el.clientWidth / SQUARE_SIZE);
  const spaceRowCount = _spaceRowCount % 2 === 0 ? _spaceRowCount + 1 : _spaceRowCount;
  const _spaceColumnCount = Math.ceil(el.clientHeight / SQUARE_SIZE);
  const spaceColumnCount = _spaceColumnCount % 2 === 0 ? _spaceColumnCount + 1 : _spaceColumnCount;
  const distX = (el.clientWidth - spaceRowCount * SQUARE_SIZE) / 2;
  const distY = (el.clientHeight - spaceColumnCount * SQUARE_SIZE) / 2;

  return new Promise<void>((resolve) => {
    const animationProperties = {
      squares: Array.from({ length: spaceRowCount * spaceColumnCount }, () => ({
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

      for (let j = 0; j < spaceRowCount; j++) {
        for (let i = 0; i < spaceColumnCount; i++) {
          const animatedSquareSize = animationProperties.squares[i * j].scale * SQUARE_SIZE;
          canvasApi.fillRect(
            j * SQUARE_SIZE + SQUARE_SIZE / 2 - animatedSquareSize / 2 + distX,
            i * SQUARE_SIZE + SQUARE_SIZE / 2 - animatedSquareSize / 2 + distY,
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

    const timeline = createTimeline({
      onBegin: handleOnBegin,
      onComplete: handleOnComplete,
    });
    timeline
      .add(animationProperties.squares, {
        scale: 1,
        opacity: 1,
        ease: "inOut(1.6)",
        duration: 120,
        delay: (_, index: number) => {
          return (400 / animationProperties.squares.length) * index;
        },
      })
      .set(animationProperties.squares, {
        scale: 0,
        opacity: 0,
        onBegin: () => {
          animationMode = "clear";
        },
      })
      .add(animationProperties.squares, {
        scale: 1,
        opacity: 1,
        ease: "inOut(1.6)",
        duration: 120,
        delay: (_, index: number) => {
          return (400 / animationProperties.squares.length) * index;
        },
      });
  });
};
