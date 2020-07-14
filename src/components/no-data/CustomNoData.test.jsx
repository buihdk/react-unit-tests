import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import CustomNoData from './CustomNoData';

describe('CustomNoData', () => {
  test('renders without crashing', () => {
    const wrapper = shallow(<CustomNoData />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
