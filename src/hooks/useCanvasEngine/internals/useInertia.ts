import { useCallback, useRef, useState } from "react";
import { DEFAULT_INERTIA_CONFIG, type InertiaConfig } from "@/util/inertia";

interface UseInertiaOptions {
  onUpdate: (deltaX: number, deltaY: number) => void;
}

export const useInertia = ({ onUpdate }: UseInertiaOptions) => {
  const [isInertiaAnimating, setIsInertiaAnimating] = useState(false);
  const velocityRef = useRef({ x: 0, y: 0 });
  const inertiaFrameIdRef = useRef<number | null>(null);
  const inertiaConfigRef = useRef<InertiaConfig>(DEFAULT_INERTIA_CONFIG);

  /**
   * 慣性アニメーションを停止
   */
  const stopInertia = useCallback(() => {
    if (inertiaFrameIdRef.current !== null) {
      cancelAnimationFrame(inertiaFrameIdRef.current);
      inertiaFrameIdRef.current = null;
      setIsInertiaAnimating(false);
    }
  }, []);

  /**
   * 慣性アニメーションを開始
   */
  const startInertia = useCallback(() => {
    setIsInertiaAnimating(true);

    const animate = () => {
      // 速度を減衰
      velocityRef.current.x *= inertiaConfigRef.current.friction;
      velocityRef.current.y *= inertiaConfigRef.current.friction;

      // 位置を更新
      onUpdate(velocityRef.current.x, velocityRef.current.y);

      // 速度が閾値を下回ったら停止
      const speed = Math.sqrt(velocityRef.current.x ** 2 + velocityRef.current.y ** 2);

      if (speed > inertiaConfigRef.current.minVelocity) {
        inertiaFrameIdRef.current = requestAnimationFrame(animate);
      } else {
        inertiaFrameIdRef.current = null;
        velocityRef.current.x = 0;
        velocityRef.current.y = 0;
        setIsInertiaAnimating(false);
      }
    };

    inertiaFrameIdRef.current = requestAnimationFrame(animate);
  }, [onUpdate]);

  /**
   * 速度を設定
   */
  const setInertiaVelocity = useCallback((x: number, y: number) => {
    velocityRef.current.x = x;
    velocityRef.current.y = y;
  }, []);

  return {
    isInertiaAnimating,
    setInertiaVelocity,
    startInertia,
    stopInertia,
  };
};
