import { createTimeline } from "animejs";
import type { ThemeState } from "@/components/styles/theme";
import { getIsBrowser } from "@/util/app";
import { getSurfaceColor } from "@/util/canvas";

const SQUARE_SIZE = 200;

export const animation = (
  canvasApi: CanvasRenderingContext2D,
  el: HTMLCanvasElement,
  themeState: ThemeState,
  onComplete: () => void,
) => {
  const isBrowser = getIsBrowser();
  if (isBrowser === false) {
    return;
  }
  console.log("Running transition...");

  const spaceRowCount = Math.ceil(el.clientWidth / SQUARE_SIZE) + 1;
  const spaceColumnCount = Math.ceil(el.clientHeight / SQUARE_SIZE) + 1;

  return new Promise<void>((resolve) => {
    const animationProperties = {
      squares: Array.from({ length: spaceRowCount * spaceColumnCount }, () => ({
        scale: 0,
      })),
    };

    let requestAnimationFrameId: number;
    let animationMode: "fill" | "clear" = "fill";

    const handleOnBegin = () => {
      console.log("handleOnBegin-02");
      canvasApi.fillStyle = getSurfaceColor("primaryInversed", themeState);

      if (animationMode === "clear") {
        canvasApi.globalCompositeOperation = "destination-out";
      }

      for (let j = 0; j < spaceRowCount; j++) {
        for (let i = 0; i < spaceColumnCount; i++) {
          const animatedSquareSize = animationProperties.squares[i * j].scale * SQUARE_SIZE;
          canvasApi.fillRect(
            j * SQUARE_SIZE + SQUARE_SIZE / 2 - animatedSquareSize / 2,
            i * SQUARE_SIZE + SQUARE_SIZE / 2 - animatedSquareSize / 2,
            animatedSquareSize,
            animatedSquareSize,
          );
        }
      }
      requestAnimationFrameId = window.requestAnimationFrame(handleOnBegin);
    };

    const handleOnComplete = () => {
      canvasApi.globalCompositeOperation = "source-over";
      console.log("About Page Complete timeline!");
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
        duration: 300,
        delay: (_, index: number) => (400 / animationProperties.squares.length) * index,
      })
      .set(animationProperties.squares, {
        scale: 0,
        opacity: 0,
        onComplete: () => {
          animationMode = "clear";
        },
      })
      .add(animationProperties.squares, {
        scale: 1,
        opacity: 1,
        ease: "inOut(1.6)",
        duration: 300,
        delay: (_, index: number) => (400 / animationProperties.squares.length) * index,
      });
  });
};
