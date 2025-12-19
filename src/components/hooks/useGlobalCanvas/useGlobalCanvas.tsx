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
    update: (position: { x: number; y: number }, scale: number) => void;
  };

const GlobalCanvasContext = createContext<State | null>(null);

export const GlobalCanvasProvider: FC<PropsWithChildren> = ({ children }) => {
  const canvas = useCanvas();
  const globalStore = useGlobalStore();

  const [isDragging, setIsDragging] = useState(false);
  const immutableState = useRef<ImmutableState>({
    position: {
      x: 0,
      y: 0,
    },
    scale: 1,
  });

  /**
   * マウスイベント
   */
  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);
  const handlePointerDown = useCallback(() => {
    setIsDragging(true);
  }, []);
  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (isDragging === false || globalStore.isEndedOpeningAnimation === false) {
        return;
      }
      immutableState.current.position.x += e.movementX;
      immutableState.current.position.y += e.movementY;
    },
    [isDragging, globalStore.isEndedOpeningAnimation],
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
    immutableState.current.position.x = 0;
    immutableState.current.position.y = 0;
    immutableState.current.scale = 1;
  }, []);

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
