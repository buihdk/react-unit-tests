import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import InclExclToggle from './InclExclToggle';

const props = {
  form: {
    getFieldDecorator: () => element => element,
  },
  type: 'segment',
};

describe('InclExclToggle', () => {
  test('renders without crashing ', () => {
    const wrapper = shallow(<InclExclToggle {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
