import { useCallback, useEffect, useRef, useState } from "react";
import { useUnmount } from "@/hooks/useUnmount";

type State = {
  position: {
    x: number;
    y: number;
  };
  scale: number;
};

type Props = {
  el: HTMLCanvasElement | null;
};

type Return = {
  isDragging: boolean;
  position: Readonly<{
    x: number;
    y: number;
  }>;
  engine: () => State;
};

export const usePointerEvent = ({ el }: Props): Return => {
  const [isDragging, setIsDragging] = useState(false);

  const ref = useRef<State>({
    position: {
      x: 0,
      y: 0,
    },
    scale: 1,
  });

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
      ref.current.position.x += e.movementX;
      ref.current.position.y += e.movementY;
    },
    [isDragging],
  );

  /**
   * キーボードイベント
   */
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowUp" || e.key === "w") {
      ref.current.position.y += 10;
    }
    if (e.key === "ArrowDown" || e.key === "s") {
      ref.current.position.y += -10;
    }
    if (e.key === "ArrowLeft" || e.key === "a") {
      ref.current.position.x += 10;
    }
    if (e.key === "ArrowRight" || e.key === "d") {
      ref.current.position.x += -10;
    }
  }, []);

  const reset = useCallback(() => {
    ref.current.position = {
      x: 0,
      y: 0,
    };
    ref.current.scale = 1;
  }, []);

  /**
   * マウスイベント登録
   */
  useEffect(() => {
    el?.addEventListener("pointermove", handlePointerMove);
    el?.addEventListener("pointerout", handlePointerUp);
    el?.addEventListener("pointerup", handlePointerUp);
    el?.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      el?.removeEventListener("pointermove", handlePointerMove);
      el?.removeEventListener("pointerout", handlePointerUp);
      el?.removeEventListener("pointerup", handlePointerUp);
      el?.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [el, handlePointerMove, handlePointerUp, handlePointerDown, handleKeyDown]);

  /**
   * Unmount時に描画状態を保持しない
   */
  useUnmount(reset);

  return {
    isDragging,
    position: ref.current.position,
    engine: () => ref.current,
  };
};
