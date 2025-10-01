import { type ButtonHTMLAttributes, type FC, type ReactNode } from "react";
import { type ButtonProps, button } from "@/styles/mixins";
import styled from "@emotion/styled";

const _Button = styled.button<ButtonProps>`
  ${button}
`;

interface Props extends ButtonProps {
  children: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;

  type: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
}

export const Button: FC<Props> = ({
  children,
  startIcon,
  endIcon,
  type,
  onClick,
  ...rest
}) => {
  return (
    <_Button {...rest} type={type} onClick={onClick}>
      {startIcon}
      {children}
      {endIcon}
    </_Button>
  );
};
