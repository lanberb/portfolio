import { type SerializedStyles, css } from "@emotion/react";
import type { Theme } from "../theme";
import { base } from "./base";
import { borders } from "./border";
import { paddings } from "./padding";
import { stack } from "./stack";

type ButtonVariant = "filled" | "outlined";

const getVariantStyles = (variant: ButtonVariant, theme?: Theme): SerializedStyles => {
  switch (variant) {
    case "outlined": {
      return css`
        ${borders({ theme, b: 1, bs: "solid", bc: "primaryInversed" })}
        ${base({ theme, color: "primary", height: 30, radius: "full" })}
      `;
    }
    default: {
      return css`
        ${base({
          theme,
          color: "primaryInversed",
          backgroundColor: "primaryInversed",
          height: 30,
          radius: "full",
        })}
      `;
    }
  }
};

export interface ButtonProps {
  theme?: Theme;
  variant: ButtonVariant;
}

export const button = ({ variant, theme }: ButtonProps): SerializedStyles => {
  return css`
    &:hover {
      opacity: 0.64;
    }

    ${stack({
      direction: "row",
      gap: 8,
      justifyContent: "center",
      alignItems: "center",
    })}
    ${paddings({ px: 32 })}

    ${getVariantStyles(variant, theme)}
  `;
};
