export const loadImageAsync = (imageUrl: string, width?: number): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      if (width != null) {
        const dw = image.width;
        const dh = image.height;
        image.width = width;
        image.height = (width * dh) / dw;
      }
      resolve(image);
    };
    image.onerror = reject;

    image.src = imageUrl;
  });
};
