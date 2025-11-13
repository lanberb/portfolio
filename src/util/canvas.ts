import { MediaQuery } from "@/components/styles/media";

interface Size {
  width: number;
  height: number;
}
interface Position {
  x: number;
  y: number;
}

export const getCenterizePosition = (container: Size, item: Size): Position => {
  return {
    x: (container.width - item.width) / 2,
    y: (container.height - item.height) / 2,
  };
};

export const getMobileFullWidthWithMargin = (width: number, margin = 16) => {
  if (window.matchMedia(MediaQuery.sp).matches) {
    return document.documentElement.clientWidth - margin * 2;
  }
  return width;
};
