import { type SerializedStyles, css } from "@emotion/react";
import { deg } from "../helpers";

export interface TransformProps {
  rotate?: number;
}

export const transform = ({ rotate }: TransformProps): SerializedStyles => {
  return css`
    transform: ${rotate && `rotate(${deg(rotate)})`};
  `;
};
