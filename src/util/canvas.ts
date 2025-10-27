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
    x: container.width / 2 - item.width / 2,
    y: container.height / 2 - item.height / 2,
  };
};
