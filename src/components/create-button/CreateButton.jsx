import React, { memo } from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';

import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

import { noop } from 'src/utils';

export const CreateButton = ({ className, onClick, label }) => (
  <Button type="primary" onClick={onClick} className={className}>
    <HomeOutlined />
    {I18n.t(label)}
  </Button>
);

CreateButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
};

CreateButton.defaultProps = {
  className: '',
  onClick: noop,
};

export default memo(CreateButton);
