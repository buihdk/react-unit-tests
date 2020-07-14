import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import I18n from 'i18n-js';

import { noop } from 'src/utils';

const styles = {};

const CustomNotice = ({ noticeQuery, actionText, onClick }) => (
  <div className={styles.container}>
    <span className={styles.noticeText}>
      {I18n.t('common.noticeText.part1')}
      <strong> {noticeQuery} </strong>
      {I18n.t('common.noticeText.part2')}
    </span>
    <Button type="ghost" className={styles.actionText} onClick={onClick}>
      {actionText}
    </Button>
  </div>
);

CustomNotice.propTypes = {
  noticeQuery: PropTypes.string,
  actionText: PropTypes.string,
  onClick: PropTypes.func,
};

CustomNotice.defaultProps = {
  noticeQuery: '',
  actionText: '',
  onClick: noop,
};

export default CustomNotice;
