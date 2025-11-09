import { css, type SerializedStyles } from "@emotion/react";
import type { CSSProperties } from "react";
import { px } from "../helpers";
import { MediaQuery } from "../media";
import type { BackgroundColor, Theme } from "../theme";

type MediaQueryValue<Value> = Array<{
  key: keyof typeof MediaQuery;
  value: Value;
}>;

type MediaQueryValues<Obj> = {
  [Key in keyof Obj]: Obj[Key] | MediaQueryValue<Obj[Key]>;
};

interface Props {
  theme?: Theme;
  backgroundColor?: BackgroundColor;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  maxWidth?: CSSProperties["maxWidth"];
  maxHeight?: CSSProperties["maxHeight"];
  minWidth?: CSSProperties["minWidth"];
  minHeight?: CSSProperties["minHeight"];
  radius?: CSSProperties["borderRadius"] | "full";
  position?: CSSProperties["position"];
  top?: CSSProperties["top"];
  left?: CSSProperties["left"];
  right?: CSSProperties["right"];
  bottom?: CSSProperties["bottom"];
  inset?: CSSProperties["inset"];
  zIndex?: CSSProperties["zIndex"];
}

export type BaseProps = MediaQueryValues<Omit<Props, "theme">> & { theme?: Theme };

const mixin = ({
  theme,
  backgroundColor,
  width,
  height,
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,
  radius,
  position,
  top,
  left,
  right,
  bottom,
  inset,
  zIndex,
}: Props): SerializedStyles => {
  return css`
    ${backgroundColor && `background-color: var(${theme?.surface?.[backgroundColor]});`}
    ${width != null && `width: ${px(width)};`}
    ${height != null && `height: ${px(height)};`}
    ${maxWidth != null && `max-width: ${px(maxWidth)};`}
    ${maxHeight != null && `max-height: ${px(maxHeight)};`}
    ${minWidth != null && `min-width: ${px(minWidth)};`}
    ${minHeight != null && `min-height: ${px(minHeight)};`}
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

export const base = (props: BaseProps): SerializedStyles => {
  const propsEntries = Object.entries(props);
  const propsByMediaQuery = propsEntries.reduce<Record<keyof typeof MediaQuery, Props>>(
    (acc, [propKey, propValue]) => {
      if (Array.isArray(propValue) && propKey !== "children") {
        propValue.forEach(({ key: mediaQueryKey, value: mediaQueryValue }) => {
          Object.assign(acc[mediaQueryKey], { [propKey]: mediaQueryValue });
        });
      } else {
        Object.assign(acc.pc, { [propKey]: propValue });
      }
      return acc;
    },
    {
      pc: {},
      sp: {},
    },
  );

  const styles = css`
      ${propsByMediaQuery.pc && mixin(propsByMediaQuery.pc)}

      @media ${MediaQuery.sp} {
        ${propsByMediaQuery.sp && mixin(propsByMediaQuery.sp)}
      }
    `;

  return styles;
};
