import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'antd';
import { noop } from 'src/utils';

const CustomModal = props => {
  const {
    loading,
    handleCancelModal,
    modalVisible,
    children,
    title,
    handleSubmit,
    okText,
    cancelText,
    closable,
    customWidth,
  } = props;

  return (
    <Modal
      title={title}
      width={customWidth}
      visible={modalVisible}
      onOk={handleSubmit}
      onCancel={handleCancelModal}
      okText={okText}
      confirmLoading={loading}
      closable={closable}
      cancelText={cancelText}
    >
      {children}
    </Modal>
  );
};

CustomModal.propTypes = {
  loading: PropTypes.bool,
  modalVisible: PropTypes.bool,
  children: PropTypes.shape({}),
  title: PropTypes.string,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  closable: PropTypes.bool,
  customWidth: PropTypes.number,
  handleCancelModal: PropTypes.func,
  handleSubmit: PropTypes.func,
};

CustomModal.defaultProps = {
  loading: false,
  modalVisible: false,
  children: {},
  title: '',
  okText: '',
  cancelText: '',
  closable: false,
  customWidth: 400,
  handleCancelModal: noop,
  handleSubmit: noop,
};

export default CustomModal;
