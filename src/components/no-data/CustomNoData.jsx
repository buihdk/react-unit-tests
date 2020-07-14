import React from 'react';
import PropTypes from 'prop-types';

const styles = {};

const CustomNoData = props => {
  const { noDataText, createNewDataText, noDataLogo } = props;

  return (
    <div className={styles.container}>
      <div className={styles.noDataLogo}> {noDataLogo} </div>
      <div className={styles.textStyle}>{noDataText}</div>
      <div className={styles.newDataTextStyle}> {createNewDataText} </div>
    </div>
  );
};

CustomNoData.propTypes = {
  noDataText: PropTypes.string,
  createNewDataText: PropTypes.string,
  noDataLogo: PropTypes.node,
};

CustomNoData.defaultProps = {
  noDataText: '',
  createNewDataText: '',
  noDataLogo: null,
};

export default CustomNoData;
