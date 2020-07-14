export const getImageDimensions = src =>
  new Promise(resolve => {
    const image = new Image();
    image.onload = () => {
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
    };
    image.src = src;
  });

export const getCropperSize = ({ width, height }) => {
  const maxWidth =
    document.documentElement.clientWidth ||
    document.body.clientWidth ||
    window.innerWidth;
  const maxHeight =
    0.8 *
    (document.documentElement.clientHeight ||
      document.body.clientHeight ||
      window.innerHeight);

  if (width <= maxWidth && height <= maxHeight) return { width, height };

  const ratio = Math.min(maxWidth / width, maxHeight / height);
  return {
    width: width * ratio,
    height: height * ratio,
  };
};
