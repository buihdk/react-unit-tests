import React, { memo } from 'react';
import I18n from 'i18n-js';
import PropTypes from 'prop-types';
import { Radio, message as Message } from 'antd';

import { errorMessageDuration } from 'src/config/constants';
import CustomAlert from 'src/components/alert/CustomAlert';

const styles = {};

const AndOrToggle = ({
  form: { getFieldDecorator },
  type,
  initialLogicalOperator,
}) => (
  <div className={styles.wrapper}>
    <CustomAlert
      message={I18n.t(`messages.flights.${type}Targeting.message`)}
      description={I18n.t(`messages.flights.${type}Targeting.description`)}
    />
    <div className={styles.toggleWrapper}>
      <span className={styles.label}>{I18n.t('common.select')}</span>
      {getFieldDecorator(`${type}LogicalOperatorToggle`, {
        initialValue: initialLogicalOperator,
      })(
        <Radio.Group
          buttonStyle="solid"
          onChange={event =>
            Message.warn(
              I18n.t(`messages.${type}ToggleChange`, {
                value: event.target.value.toUpperCase(),
              }),
              errorMessageDuration,
            )
          }
        >
          <Radio.Button buttonStyle="secondary" value="and">
            {I18n.t('common.and').toUpperCase()}
          </Radio.Button>
          <Radio.Button buttonStyle="secondary" value="or">
            {I18n.t('common.or').toUpperCase()}
          </Radio.Button>
        </Radio.Group>,
      )}
      <div>
        <span className={styles.note}> {I18n.t('messages.note')} </span>
        {I18n.t(`messages.${type}Note`)}
      </div>
    </div>
  </div>
);

AndOrToggle.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,
  initialLogicalOperator: PropTypes.string,
};

AndOrToggle.defaultProps = {
  initialLogicalOperator: '',
};

export default memo(AndOrToggle);
