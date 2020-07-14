import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { ButtonGroup } from './ButtonGroup';

describe(`ButtonGroup`, () => {
  const props = {
    cancelText: 'common.cancel',
    handleCancel: () => {},
    handleSubmit: () => {},
    submitText: 'common.save',
  };
  test(`renders without crashing`, () => {
    const wrapper = shallow(<ButtonGroup {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test(`renders without crashing with submit form`, () => {
    const newProps = {
      ...props,
      isSubmitForm: true,
    };
    const wrapper = shallow(<ButtonGroup {...newProps} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
