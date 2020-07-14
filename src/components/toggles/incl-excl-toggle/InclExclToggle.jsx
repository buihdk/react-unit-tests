import React, { memo } from 'react';
import I18n from 'i18n-js';
import PropTypes from 'prop-types';
import { Radio } from 'antd';

const InclExclToggle = ({ form: { getFieldDecorator }, type }) => (
  <div>
    {getFieldDecorator(`${type}InclExclToggle`, { initialValue: 'include' })(
      <Radio.Group>
        <Radio value="include">{I18n.t('types.siteZoneType.include')}</Radio>
        <Radio value="exclude">{I18n.t('types.siteZoneType.exclude')}</Radio>
      </Radio.Group>,
    )}
  </div>
);

InclExclToggle.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

const MemoInclExclToggle = memo(InclExclToggle);
MemoInclExclToggle.displayName = 'InclExclToggle';

export default MemoInclExclToggle;
