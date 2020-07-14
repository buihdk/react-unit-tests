import { useCallback } from 'react';
import { message as Message } from 'antd';
import I18n from 'i18n-js';
import loadImage from 'blueimp-load-image';

import { useEffectAsync } from 'src/hooks';
import {
  STANDARD_IMAGE,
  FOOD_BANNER_AD,
  FOOD_BANNER_IMAGE_RATIO_7X3,
  DEFAULT_FOOD_BANNER_IMAGE_RATIO,
} from 'src/config/constants';
import { getImageDimensions, getCropperSize } from './ImageEditor.utils';

const { maxWidth, maxHeight, type, quality, safeSizeInKB } = STANDARD_IMAGE;
const safeImageSizeInBytes = safeSizeInKB * 1000;

export const useHandleCancel = ({ setVisible }) =>
  useCallback(() => setVisible(false), [setVisible]);

export const useHandleConfirm = ({
  setVisible,
  cropperRef,
  setLoading,
  onCropImage,
  imageDimensions,
}) =>
  useCallback(async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));

    let dataURL = cropperRef.current
      .getCroppedCanvas()
      .toDataURL(type, quality);
    const { width, height } = await getImageDimensions(dataURL);

    if (
      dataURL.length > safeImageSizeInBytes ||
      width > maxWidth ||
      height > maxHeight
    ) {
      dataURL = loadImage
        .scale(cropperRef.current.getCroppedCanvas(), { maxWidth, maxHeight })
        .toDataURL(type, quality);
      const dimensions = await getImageDimensions(dataURL);
      Message.warn(I18n.t('messages.resizedImage', dimensions));
    }

    setVisible(false);
    setLoading(false);
    onCropImage({ dataURL, type });
  }, [imageDimensions, cropperRef, setVisible, onCropImage]);

export const checkFoodBannerImageRatio = async ({
  width,
  height,
  creativeType,
  setFoodBannerAspectRatio,
}) => {
  // foodBanner support both 700x280 and 700x300
  if (
    creativeType === FOOD_BANNER_AD &&
    width / height === FOOD_BANNER_IMAGE_RATIO_7X3
  ) {
    setFoodBannerAspectRatio(FOOD_BANNER_IMAGE_RATIO_7X3);
  } else {
    setFoodBannerAspectRatio(DEFAULT_FOOD_BANNER_IMAGE_RATIO);
  }
};

export const useLoadImage = ({
  src,
  setVisible,
  setCropperStyle,
  setImageDimensions,
  setFoodBannerAspectRatio,
  creativeType,
}) =>
  useEffectAsync(async () => {
    if (!src) return;
    const { width, height } = await getImageDimensions(src);

    checkFoodBannerImageRatio({
      width,
      height,
      creativeType,
      setFoodBannerAspectRatio,
    });

    setImageDimensions({ width, height });
    setVisible(true);
    setCropperStyle({
      ...getCropperSize({ width, height }),
      margin: 'auto',
    });
  }, [src]);
