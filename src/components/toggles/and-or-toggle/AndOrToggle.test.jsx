import React from 'react';
import { message as Message } from 'antd';
import { shallow, mount } from 'enzyme';
import I18n from 'i18n-js';
import toJSON from 'enzyme-to-json';

import { errorMessageDuration } from 'src/config/constants';

import AndOrToggle from './AndOrToggle';

const MessageWarn = jest.spyOn(Message, 'warn');

const props = {
  form: {
    getFieldDecorator: () => element => element,
  },
  type: 'properties',
};

describe('AndOrToggle', () => {
  test('renders without crashing ', () => {
    const wrapper = shallow(<AndOrToggle {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  test(`simulate to change to 'OR'`, () => {
    const wrapper = mount(<AndOrToggle {...props} />);
    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value: 'or' } });

    expect(MessageWarn).toBeCalledWith(
      I18n.t('messages.propertiesToggleChange', { value: 'OR' }),
      errorMessageDuration,
    );
  });
});
