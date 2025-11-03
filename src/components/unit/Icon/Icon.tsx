import type { FC, SVGProps } from "react";

export type IconName = "lightMode" | "darkMode" | "footprint" | "close";

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "color"> {
  name: IconName;
  size?: number;
}

export const Icon: FC<IconProps> = ({ name, size = 24 }) => {
  return (
    <svg width={size} height={size}>
      <use href={`#${name}`} fill="currentColor" />
    </svg>
  );
};
