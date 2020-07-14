import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import Cropper from 'react-cropper';
import { Modal, Button } from 'antd';

import { useIsMounted, useStateAfterMounted } from 'src/hooks';
import { noop } from 'src/utils';
import {
  previewImageProps,
  DEFAULT_FOOD_BANNER_IMAGE_RATIO,
} from 'src/config/constants';

import {
  useLoadImage,
  useHandleCancel,
  useHandleConfirm,
} from './ImageEditor.hooks';

const styles = {};

const minCropSize = 40;

const ImageEditor = ({ src, onCropImage, aspectRatio, creativeType }) => {
  const cropperRef = useRef();

  const isMounted = useIsMounted();
  const [loading, setLoading] = useStateAfterMounted(false, isMounted);
  const [cropperStyle, setCropperStyle] = useStateAfterMounted({}, isMounted);
  const [visible, setVisible] = useStateAfterMounted(false, isMounted);
  const [imageDimensions, setImageDimensions] = useStateAfterMounted(
    { width: 0, height: 0 },
    isMounted,
  );
  const [
    foodBannerAspectRatio,
    setFoodBannerAspectRatio,
  ] = useStateAfterMounted(DEFAULT_FOOD_BANNER_IMAGE_RATIO, isMounted); // 700x280

  const handleCancel = useHandleCancel({ setVisible });
  const handleConfirm = useHandleConfirm({
    setVisible,
    cropperRef,
    setLoading,
    onCropImage,
    imageDimensions,
  });

  useLoadImage({
    src,
    setVisible,
    setCropperStyle,
    setImageDimensions,
    setFoodBannerAspectRatio,
    creativeType,
  });

  return (
    <Modal
      {...previewImageProps}
      wrapClassName={styles.cropWrapper}
      centered
      width="100%"
      footer={null}
      closable={false}
      visible={visible}
      handleCancel={handleCancel}
    >
      {src && (
        <Cropper
          src={src}
          ref={cropperRef}
          style={cropperStyle}
          guides={false}
          movable={false}
          zoomable={false}
          autoCropArea={1}
          minContainerWidth={1}
          minContainerHeight={1}
          minCropBoxWidth={minCropSize}
          minCropBoxHeight={minCropSize}
          aspectRatio={aspectRatio || foodBannerAspectRatio}
        />
      )}
      <Button className={styles.button} onClick={handleCancel}>
        {I18n.t('common.cancel')}
      </Button>
      <Button
        className={styles.button}
        onClick={handleConfirm}
        loading={loading}
      >
        {I18n.t('common.confirm')}
      </Button>
    </Modal>
  );
};

ImageEditor.propTypes = {
  src: PropTypes.string,
  onCropImage: PropTypes.func,
  aspectRatio: PropTypes.number,
  creativeType: PropTypes.string,
};

ImageEditor.defaultProps = {
  src: '',
  onCropImage: noop,
  aspectRatio: null,
  creativeType: '',
};

export default ImageEditor;
