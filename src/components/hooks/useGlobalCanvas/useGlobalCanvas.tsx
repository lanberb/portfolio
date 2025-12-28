import {
  createContext,
  type FC,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useGlobalStore } from "@/state/global";
import { useCanvas } from "../useCanvas";
import { useInertia } from "../useInertia";
import { useUnmount } from "../useUnmount";

type ImmutableState = {
  position: {
    x: number;
    y: number;
  };
  scale: number;
};

type State = ReturnType<typeof useCanvas> &
  ImmutableState & {
    isDragging: boolean;
    isInertiaAnimating: boolean;
    update: (position: { x: number; y: number }, scale: number) => void;
  };

const GlobalCanvasContext = createContext<State | null>(null);

export const GlobalCanvasProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const immutableState = useRef<ImmutableState>({
    position: {
      x: 0,
      y: 0,
    },
    scale: 1,
  });

  const canvas = useCanvas();
  const globalStore = useGlobalStore();
  const { isInertiaAnimating, setInertiaVelocity, startInertia, stopInertia } = useInertia({
    onUpdate: (inertiaMoveX, inertiaMoveY) => {
      immutableState.current.position.x += inertiaMoveX;
      immutableState.current.position.y += inertiaMoveY;
    },
  });

  /**
   * マウスイベント
   */
  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    startInertia();
  }, [startInertia]);

  const handlePointerDown = useCallback(() => {
    stopInertia();
    setIsDragging(true);
  }, [stopInertia]);

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (isDragging === false || globalStore.isEndedOpeningAnimation === false) {
        return;
      }
      // 位置を更新
      immutableState.current.position.x += e.movementX;
      immutableState.current.position.y += e.movementY;

      // 速度を設定（慣性アニメーション用）
      setInertiaVelocity(e.movementX, e.movementY);
    },
    [isDragging, globalStore.isEndedOpeningAnimation, setInertiaVelocity],
  );

  const update = useCallback((position: { x: number; y: number }, scale: number) => {
    immutableState.current.position.x = position.x;
    immutableState.current.position.y = position.y;
    immutableState.current.scale = scale;
  }, []);

  /**
   * リセット処理
   */
  const reset = useCallback(() => {
    stopInertia();
    immutableState.current.position.x = 0;
    immutableState.current.position.y = 0;
    immutableState.current.scale = 1;
  }, [stopInertia]);

  /**
   * マウスイベント登録
   */
  useEffect(() => {
    canvas.el?.addEventListener("pointerout", handlePointerUp);
    canvas.el?.addEventListener("pointerup", handlePointerUp);
    canvas.el?.addEventListener("pointerdown", handlePointerDown);
    canvas.el?.addEventListener("pointermove", handlePointerMove);

    return () => {
      canvas.el?.removeEventListener("pointerout", handlePointerUp);
      canvas.el?.removeEventListener("pointerup", handlePointerUp);
      canvas.el?.removeEventListener("pointerdown", handlePointerDown);
      canvas.el?.removeEventListener("pointermove", handlePointerMove);
    };
  }, [canvas.el, handlePointerUp, handlePointerDown, handlePointerMove]);

  /**
   * Unmount時に描画状態を保持しない
   */
  useUnmount(reset);

  return (
    <GlobalCanvasContext.Provider
      value={{
        ...canvas,
        position: immutableState.current.position,
        scale: immutableState.current.scale,
        isDragging,
        isInertiaAnimating,
        update,
      }}
    >
      {children}
    </GlobalCanvasContext.Provider>
  );
};

export const useGlobalCanvas = () => {
  const context = useContext(GlobalCanvasContext);
  if (context == null) {
    throw new Error("GlobalCanvasContext is not found");
  }

  return context;
};
