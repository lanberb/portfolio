/**
 * 慣性アニメーションの設定
 */
export interface InertiaConfig {
  /** 速度の減衰率 (0-1の範囲。値が大きいほど長く動く) */
  friction: number;
  /** 停止とみなす最小速度の閾値（ピクセル/フレーム） */
  minVelocity: number;
}

/**
 * 慣性設定のプリセット
 */
export const INERTIA_PRESETS: Record<string, InertiaConfig> = {
  /** 軽めの慣性（すぐに止まる） */
  light: {
    friction: 0.91,
    minVelocity: 0.5,
  } as InertiaConfig,
  /** 中程度の慣性（自然な感じ） */
  medium: {
    friction: 0.94,
    minVelocity: 0.5,
  } as InertiaConfig,
  /** 強めの慣性（滑らかに長く動く） */
  strong: {
    friction: 0.97,
    minVelocity: 0.3,
  } as InertiaConfig,
  /** 慣性なし */
  none: {
    friction: 0,
    minVelocity: 0,
  } as InertiaConfig,
} as const;

/**
 * デフォルトの慣性設定（中程度の慣性）
 */
export const DEFAULT_INERTIA_CONFIG: InertiaConfig = INERTIA_PRESETS.medium;
