import { getImageDimensions, getCropperSize } from './ImageEditor.utils';

const spyImage = jest.spyOn(window, 'Image').mockImplementation(() => {
  const fakeImage = {
    width: 1,
    height: 1,
  };
  setTimeout(() => {
    if (fakeImage.onload) fakeImage.onload();
  }, 0);
  return fakeImage;
});

beforeEach(() => {
  spyImage.mockClear();
});

describe('getCropperSize', () => {
  test('works correctly with small size', () => {
    expect(getCropperSize({ width: 200, height: 200 })).toEqual({
      width: 200,
      height: 200,
    });
  });

  test('works correctly with large size', () => {
    expect(getCropperSize({ width: 2048, height: 400 })).toEqual({
      width: 1024,
      height: 200,
    });
  });
});

describe('getImageDimensions', () => {
  test('works correctly', async () => {
    const result = await getImageDimensions('1');
    expect(result).toEqual({});
  });
});
