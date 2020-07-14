import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import CustomNotice from './CustomNotice';

describe('CustomNotice', () => {
  test('renders without crashing', () => {
    const wrapper = shallow(<CustomNotice />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
