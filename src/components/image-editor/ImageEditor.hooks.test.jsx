import { renderHook } from '@testing-library/react-hooks';

import { FOOD_BANNER_AD, SIMPLE_NATIVE_CONTENT_AD } from 'src/config/constants';

import * as Utils from './ImageEditor.utils';
import {
  useHandleCancel,
  useHandleConfirm,
  useLoadImage,
  checkFoodBannerImageRatio,
} from './ImageEditor.hooks';

const mockFn = jest.fn();
jest.mock('blueimp-load-image', () => ({
  scale: () => ({ toDataURL: mockFn }),
}));

const getImageDimensions = jest.spyOn(Utils, 'getImageDimensions');
const getCropperSize = jest.spyOn(Utils, 'getCropperSize');
const setLoading = jest.fn();
const setVisible = jest.fn();
const setImageDimensions = jest.fn();
const setCropperStyle = jest.fn();
const onCropImage = jest.fn();
const setFoodBannerAspectRatio = jest.fn();
let imageDimensions = { width: 100, height: 100 };
let cropperRef = {
  current: {
    getCroppedCanvas: () => ({
      toDataURL: () => '1',
    }),
  },
};

beforeEach(() => {
  getImageDimensions.mockClear();
  getCropperSize.mockClear();
  setLoading.mockClear();
  setVisible.mockClear();
  setImageDimensions.mockClear();
  setCropperStyle.mockClear();
  onCropImage.mockClear();
  imageDimensions = { width: 100, height: 100 };
  cropperRef = {
    current: {
      getCroppedCanvas: () => ({
        toDataURL: () => '1',
      }),
    },
  };
});

describe('useHandleCancel', () => {
  test('works correctly', () => {
    const { result: { current: handleCancel } } = renderHook(() =>
      useHandleCancel({ setVisible }),
    );
    handleCancel();

    expect(setVisible).toBeCalledWith(false);
  });
});

describe('useHandleConfirm', () => {
  test('works correctly with image below 1200x1200px', async () => {
    getImageDimensions.mockImplementation(() => ({ width: 100, height: 100 }));
    const { result: { current: handleConfirm } } = renderHook(() =>
      useHandleConfirm({
        setLoading,
        setVisible,
        cropperRef,
        onCropImage,
        imageDimensions,
      }),
    );
    await handleConfirm();

    expect(setLoading).toBeCalled();
    expect(setVisible).toBeCalledWith(false);
    expect(onCropImage).toBeCalledWith({ dataURL: '1', type: 'image/jpeg' });
  });

  test('works correctly with image larger than 1200x1200px', async () => {
    getImageDimensions.mockImplementation(() => ({ width: 100, height: 1300 }));
    const { result: { current: handleConfirm } } = renderHook(() =>
      useHandleConfirm({
        setLoading,
        setVisible,
        cropperRef,
        onCropImage,
        imageDimensions,
      }),
    );
    await handleConfirm();

    expect(mockFn).toBeCalled();
    expect(setLoading).toBeCalled();
    expect(setVisible).toBeCalledWith(false);
    expect(onCropImage).toBeCalled();
  });
});

describe('useLoadImage', () => {
  test('do nothing when src is empty', () => {
    renderHook(() =>
      useLoadImage({
        src: '',
        setVisible,
        setCropperStyle,
        setImageDimensions,
        setFoodBannerAspectRatio,
        SIMPLE_NATIVE_CONTENT_AD,
      }),
    );

    expect(setImageDimensions).not.toBeCalled();
  });

  test('works correctly with foodBanner 700x280', done => {
    const creativeType = FOOD_BANNER_AD;
    getImageDimensions.mockResolvedValueOnce({ width: 700, height: 280 });
    getCropperSize.mockResolvedValueOnce({ width: 700, height: 280 });
    renderHook(() =>
      useLoadImage({
        src: '1',
        setVisible,
        setCropperStyle,
        setImageDimensions,
        setFoodBannerAspectRatio,
        creativeType,
      }),
    );

    setTimeout(() => {
      expect(setImageDimensions).toBeCalledWith({
        width: 700,
        height: 280,
      });
      expect(setVisible).toBeCalledWith(true);
      expect(setFoodBannerAspectRatio).toBeCalled();
      expect(setCropperStyle).toBeCalled();
      done();
    }, 0);
  });

  test('works correctly with foodBanner 700x300', done => {
    const creativeType = FOOD_BANNER_AD;
    getImageDimensions.mockResolvedValueOnce({ width: 700, height: 300 });
    getCropperSize.mockResolvedValueOnce({ width: 700, height: 300 });
    renderHook(() =>
      useLoadImage({
        src: '1',
        setVisible,
        setCropperStyle,
        setImageDimensions,
        setFoodBannerAspectRatio,
        creativeType,
      }),
    );

    setTimeout(() => {
      expect(setImageDimensions).toBeCalledWith({
        width: 700,
        height: 300,
      });
      expect(setVisible).toBeCalledWith(true);
      expect(setFoodBannerAspectRatio).toBeCalled();
      expect(setCropperStyle).toBeCalled();
      done();
    }, 0);
  });
});

describe('checkFoodBannerImageRatio', () => {
  test('work correctly with 700x280', () => {
    checkFoodBannerImageRatio({
      width: 700,
      height: 280,
      creativeType: FOOD_BANNER_AD,
      setFoodBannerAspectRatio,
    });

    expect(setFoodBannerAspectRatio).toBeCalled();
  });

  test('work correctly with 700x380', () => {
    checkFoodBannerImageRatio({
      width: 700,
      height: 280,
      creativeType: FOOD_BANNER_AD,
      setFoodBannerAspectRatio,
    });

    expect(setFoodBannerAspectRatio).toBeCalled();
  });
});
