import React, { memo } from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import { Button } from 'antd';
import classnames from 'classnames';

import { noop } from 'src/utils';

const styles = {};

export const ButtonGroup = ({
  cancelText,
  handleCancel,
  handleSubmit,
  submitText,
  isSubmitForm,
  customGroupBtnWrap,
}) => {
  let submitButtonCustom = {
    type: 'primary',
    className: styles.btnSize,
  };

  // TODO: check if submit type is Form then handle submit form
  // Otherwise, handle event submit
  if (isSubmitForm) {
    submitButtonCustom = { ...submitButtonCustom, htmlType: 'submit' };
  }
  submitButtonCustom = { ...submitButtonCustom, onClick: handleSubmit };

  return (
    <div className={classnames(styles.groupBtnWrap, customGroupBtnWrap)}>
      <Button
        onClick={handleCancel}
        className={classnames(styles.cancelBtn, styles.btnSize)}
      >
        {I18n.t(cancelText)}
      </Button>
      <Button {...submitButtonCustom}>{I18n.t(submitText)}</Button>
    </div>
  );
};

ButtonGroup.propTypes = {
  handleCancel: PropTypes.func,
  cancelText: PropTypes.string,
  submitText: PropTypes.string,
  handleSubmit: PropTypes.func,
  isSubmitForm: PropTypes.bool,
  customGroupBtnWrap: PropTypes.string,
};

ButtonGroup.defaultProps = {
  cancelText: '',
  submitText: '',
  handleCancel: noop,
  handleSubmit: noop,
  isSubmitForm: false,
  customGroupBtnWrap: '',
};

export default memo(ButtonGroup);
