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
    ${backgroundColor &&
    `background-color: var(${theme?.surface?.[backgroundColor]});`}
    ${width && `width: ${px(width)};`}
    ${height && `height: ${px(height)};`}
    ${maxWidth && `max-width: ${px(maxWidth)};`}
    ${maxHeight && `max-height: ${px(maxHeight)};`}
    ${radius && `border-radius: ${px(radius === "full" ? 9999 : radius)};`}
    ${position && `position: ${position};`}
    ${top && `top: ${px(top)};`}
    ${left && `left: ${px(left)};`}
    ${right && `right: ${px(right)};`}
    ${bottom && `bottom: ${px(bottom)};`}
    ${inset && `bottom: ${px(inset)};`}
    ${zIndex && `zIndex: ${px(zIndex)};`}
  `;
};
