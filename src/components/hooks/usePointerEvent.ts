import { useUnmount } from "@/components/hooks/useRenderingEvent";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  el: HTMLCanvasElement | null;
};

type Return = {
  isDragging: boolean;
  position: Readonly<{
    x: number;
    y: number;
  }>;
};

export const usePointerEvent = ({ el }: Props): Return => {
  const [isDragging, setIsDragging] = useState(false);

  const position = useRef({
    x: 0,
    y: 0,
  });
  const scale = useRef(1);

  /**
   * マウスアップイベント
   */
  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  const handlePointerDown = useCallback(() => {
    setIsDragging(true);
  }, []);
  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (isDragging === false) {
        return;
      }
      position.current.x += e.movementX;
      position.current.y += e.movementY;
    },
    [isDragging],
  );

  const handleUnMount = useCallback(() => {
    position.current = {
      x: 0,
      y: 0,
    };
    scale.current = 1;
  }, []);

  /**
   * マウスイベント登録
   */
  useEffect(() => {
    el?.addEventListener("pointermove", handlePointerMove);
    el?.addEventListener("pointerout", handlePointerUp);
    el?.addEventListener("pointerup", handlePointerUp);
    el?.addEventListener("pointerdown", handlePointerDown);

    return () => {
      el?.removeEventListener("pointermove", handlePointerMove);
      el?.removeEventListener("pointerout", handlePointerUp);
      el?.removeEventListener("pointerup", handlePointerUp);
      el?.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [el, handlePointerMove, handlePointerUp, handlePointerDown]);

  /**
   * Unmount時に描画状態を保持しない
   */
  useUnmount(handleUnMount);

  return {
    isDragging,
    position: position.current,
  };
};
