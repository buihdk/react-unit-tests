import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { Alert } from 'antd';

const styles = {};

const CustomAlert = ({ className, message, description }) => (
  <Alert
    className={classnames(styles.alert, className)}
    message={message && <span className={styles.message}>{message}</span>}
    description={
      description && <span className={styles.description}>{description}</span>
    }
  />
);

CustomAlert.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  description: PropTypes.string,
};

CustomAlert.defaultProps = {
  className: '',
  message: '',
  description: '',
};

export default CustomAlert;
