import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import CustomModal from './CustomModal';

describe('CustomModal', () => {
  test('renders without crashing', () => {
    const wrapper = shallow(<CustomModal />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
