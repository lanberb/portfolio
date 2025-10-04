import { type SerializedStyles, css } from "@emotion/react";
import type { CSSProperties } from "react";
import { px } from "../helpers";
import type { BackgroundColor, Color, Theme } from "../theme";

export interface BaseProps {
  theme?: Theme;
  color?: Color;
  backgroundColor?: BackgroundColor;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  maxWidth?: CSSProperties["maxWidth"];
  maxHeight?: CSSProperties["maxHeight"];
  radius?: CSSProperties["borderRadius"] | "full";
  position?: CSSProperties["position"];
  top?: CSSProperties["top"];
  left?: CSSProperties["left"];
  right?: CSSProperties["right"];
  bottom?: CSSProperties["bottom"];
  inset?: CSSProperties["inset"];
  zIndex?: CSSProperties["zIndex"];
}

export const base = ({
  theme,
  color,
  backgroundColor,
  width = "auto",
  height = "auto",
  maxWidth = "none",
  maxHeight = "none",
  radius = 0,
  position,
  top,
  left,
  right,
  bottom,
  inset,
  zIndex,
}: BaseProps): SerializedStyles => {
  return css`
    ${color && `color: var(${theme?.text?.[color]});`}
    ${backgroundColor && `background-color: var(${theme?.surface?.[backgroundColor]});`}
    ${width != null && `width: ${px(width)};`}
    ${height != null && `height: ${px(height)};`}
    ${maxWidth != null && `max-width: ${px(maxWidth)};`}
    ${maxHeight != null && `max-height: ${px(maxHeight)};`}
    ${radius != null && `border-radius: ${px(radius === "full" ? 9999 : radius)};`}
    ${position != null && `position: ${position};`}
    ${top != null && `top: ${px(top)};`}
    ${left != null && `left: ${px(left)};`}
    ${right != null && `right: ${px(right)};`}
    ${bottom != null && `bottom: ${px(bottom)};`}
    ${inset != null && `inset: ${px(inset)};`}
    ${zIndex != null && `z-index: ${zIndex};`}
  `;
};
