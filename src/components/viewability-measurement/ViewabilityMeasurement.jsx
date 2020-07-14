import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import I18n from 'i18n-js';
import { Form, Row, Input, Alert } from 'antd';

import CustomAlert from 'src/components/alert/CustomAlert';

import {
  getArrayValue,
  useValidateLengths,
} from './ViewabilityMeasurement.utils';

const styles = {};

const { Item } = Form;
const { TextArea } = Input;
const formItemLayout = { labelCol: { span: 24 }, wrapperCol: { span: 24 } };

const ViewabilityMeasurement = ({
  form: { getFieldDecorator, getFieldValue },
  measurementJSURLs,
  measurementVendorKeys,
  measurementParams,
}) => {
  const [hasError, setHasError] = useState(false);
  const arr1 = getArrayValue(getFieldValue('measurementJSURLs'));
  const arr2 = getArrayValue(getFieldValue('measurementVendorKeys'));
  const arr3 = getArrayValue(getFieldValue('measurementParams'));

  getFieldDecorator('equalMeasurementLengths', {
    rules: [{ required: hasError }],
  });
  useValidateLengths({ arr1, arr2, arr3, setHasError });

  return (
    <Row>
      <CustomAlert
        message={I18n.t('measurement.title')}
        description={I18n.t('measurement.description')}
      />
      <Alert
        message={I18n.t('messages.inputOneItemPerLine')}
        className={styles.warning}
        type="warning"
        showIcon
      />
      <Item {...formItemLayout} label={I18n.t('measurement.measurementJSURLs')}>
        {getFieldDecorator('measurementJSURLs', {
          initialValue: measurementJSURLs,
          rules: [
            {
              type: 'string',
              whitespace: true,
              message: I18n.t('messages.wrongStringFormat'),
            },
          ],
        })(<TextArea rows={4} />)}
      </Item>
      <Item
        {...formItemLayout}
        label={I18n.t('measurement.measurementVendorKeys')}
      >
        {getFieldDecorator('measurementVendorKeys', {
          initialValue: measurementVendorKeys,
          rules: [
            {
              type: 'string',
              whitespace: true,
              message: I18n.t('messages.wrongStringFormat'),
            },
          ],
        })(<TextArea rows={4} />)}
      </Item>
      <Item {...formItemLayout} label={I18n.t('measurement.measurementParams')}>
        {getFieldDecorator('measurementParams', {
          initialValue: measurementParams,
          rules: [
            {
              type: 'string',
              whitespace: true,
              message: I18n.t('messages.wrongStringFormat'),
            },
          ],
        })(<TextArea rows={4} />)}
      </Item>
      <Item
        validateStatus="error"
        className={styles[!hasError && 'hideMsg']}
        help={I18n.t('measurement.equalMeasurementLengthsErrorMsg')}
      />
    </Row>
  );
};

ViewabilityMeasurement.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func,
    getFieldValue: PropTypes.func,
    getFieldError: PropTypes.func,
  }).isRequired,
  measurementJSURLs: PropTypes.string,
  measurementVendorKeys: PropTypes.string,
  measurementParams: PropTypes.string,
};

ViewabilityMeasurement.defaultProps = {
  measurementJSURLs: null,
  measurementVendorKeys: null,
  measurementParams: null,
};

export default memo(ViewabilityMeasurement);
