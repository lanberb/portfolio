import { useCanvas } from "@/components/hooks/useCanvas";
import { useCanvasColor } from "@/components/hooks/useCanvasColor";
import { useCanvasPointer } from "@/components/hooks/useCanvasPointer";
import { Canvas } from "@/components/unit/Canvas";
import styled from "@emotion/styled";
import { animate } from "animejs";
import { type FC, useCallback, useEffect, useMemo, useRef } from "react";

const _Canvas = styled(Canvas)`
  cursor: grab;

  &[data-dragging="true"] {
    cursor: grabbing;
  }
`;

const BACKGROUND_GRID_GAP = 40;
const BACKGROUND_GRID_STROKE_WIDTH = 0.5;

/**
 * @summary 与えられた幅からグリッドの幅で割った値を偶数で返す
 */
const caluculateLineCount = (width: number) => {
  const lineCount = Math.floor(width / BACKGROUND_GRID_GAP);
  if (lineCount % 2 === 1) {
    return lineCount + 1; // +1することでグリッドの最大表示可能本数を返す
  }
  return lineCount;
};

/**
 * @summary (与えられた幅)から(行数 - 1) * グリッドの幅)を引いた値を2で割る
 * @param width 描画する領域幅
 * @param lineCount グリッドの本数
 * @param dist ドラッグなどによる描画位置のズレ量
 */
const caluculateFirstLineStart = (
  width: number,
  lineCount: number,
  dist: number
) => {
  return (width - (lineCount - 1) * BACKGROUND_GRID_GAP) / 2 + dist;
};

/**
 * @summary グリット線の開始位置を配列で返す
 */
const caluculateLineStartArray = (startPosition: number, lineCount: number) => {
  return Array.from({ length: lineCount }, (_, i) => {
    return startPosition + i * BACKGROUND_GRID_GAP;
  });
};

/**
 * @summary 与えられた座標に従い描画するだけの関数
 */
type DrawLineAnimateOptions = {
  duration: number;
  delay: number;
};
const drawLine = (
  canvasApi: CanvasRenderingContext2D,
  startPosition: [number, number],
  endPosition: [number, number],
  options?: DrawLineAnimateOptions
) => {
  if (options == null) {
    canvasApi.beginPath();
    canvasApi.moveTo(startPosition[0], startPosition[1]);
    canvasApi.lineTo(endPosition[0], endPosition[1]);
    canvasApi.stroke();
    return;
  }

  const target = {
    x: startPosition[0],
    y: startPosition[1],
  };
  animate(target, {
    x: endPosition[0],
    y: endPosition[1],
    duration: options.duration,
    delay: options.delay,
    onUpdate: () => {
      canvasApi.beginPath();
      canvasApi.moveTo(startPosition[0], startPosition[1]);
      canvasApi.lineTo(target.x, target.y);
      canvasApi.stroke();
    },
  });
};

export const GlobalCanvas: FC = () => {
  const { el, canvasApi, canvasRef } = useCanvas();
  const { getSurfaceColor } = useCanvasColor();
  const { position, isDragging } = useCanvasPointer({ el });

  const isMounted = useRef(false);

  const strokeColor = useMemo(
    () => getSurfaceColor("backgroundGrid"),
    [getSurfaceColor]
  );

  const xLineCount = useMemo(() => caluculateLineCount(el?.width ?? 0), [el]);
  const yLineCount = useMemo(() => caluculateLineCount(el?.height ?? 0), [el]);

  const drawBackgroundGrid = useCallback(() => {
    if (canvasApi == null || el == null) {
      return;
    }
    canvasApi.strokeStyle = strokeColor;
    canvasApi.lineWidth = BACKGROUND_GRID_STROKE_WIDTH;
    canvasApi.clearRect(0, 0, canvasApi.canvas.width, canvasApi.canvas.height);

    const xFirstLineStartX = caluculateFirstLineStart(
      el?.width ?? 0,
      xLineCount,
      position.x % BACKGROUND_GRID_GAP // pointermoveによって生まれるズレ量
    );
    const xLineStartXArray = caluculateLineStartArray(
      xFirstLineStartX,
      xLineCount
    );
    const yFirstLineStartY = caluculateFirstLineStart(
      el?.height ?? 0,
      yLineCount,
      position.y % BACKGROUND_GRID_GAP // pointermoveによって生まれるズレ量
    );
    const yLineStartYArray = caluculateLineStartArray(
      yFirstLineStartY,
      yLineCount
    );

    for (let i = 0; i < xLineCount; i++) {
      drawLine(
        canvasApi,
        [xLineStartXArray[i], 0],
        [xLineStartXArray[i], el.height],
        isMounted.current
          ? undefined
          : {
              duration: 500,
              delay: 10 * i,
            }
      );
    }
    for (let i = 0; i < yLineCount; i++) {
      drawLine(
        canvasApi,
        [0, yLineStartYArray[i]],
        [el.width, yLineStartYArray[i]],
        isMounted.current
          ? undefined
          : {
              duration: 500,
              delay: 25 * i,
            }
      );
    }

    isMounted.current = true;
  }, [canvasApi, el, strokeColor, xLineCount, yLineCount]);

  /**
   * Effect: themeの切り替えに応じて描画を更新
   * Cleanup: 描画をクリア
   */
  useEffect(() => {
    drawBackgroundGrid();
  }, [drawBackgroundGrid]);

  /**
   * マウスイベント登録
   */
  useEffect(() => {
    el?.addEventListener("pointermove", drawBackgroundGrid);

    return () => {
      el?.removeEventListener("pointermove", drawBackgroundGrid);
    };
  }, [el, drawBackgroundGrid]);

  return (
    <_Canvas
      ref={canvasRef}
      position="fixed"
      inset={0}
      zIndex={-1}
      width="100%"
      height="100%"
      data-dragging={isDragging}
    />
  );
};
