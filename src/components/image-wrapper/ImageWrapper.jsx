import React from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';

const styles = {};

const ImageWrapper = props => {
  if (props.src) {
    return (
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={props.src} alt="imageAd" />
      </div>
    );
  }
  return (
    <div className={styles.noImageWrapper}>
      <p>{I18n.t('common.noImage')}</p>
    </div>
  );
};

ImageWrapper.propTypes = {
  src: PropTypes.string,
};

ImageWrapper.defaultProps = {
  src: '',
};

export default ImageWrapper;
