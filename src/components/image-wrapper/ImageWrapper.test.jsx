import React from 'react';
import { mount, shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ImageWrapper from './ImageWrapper';

describe('Test Image Wrapper', () => {
  const props = {
    src: 'ABCDXYZ',
  };

  test('renders without crashing', () => {
    const wrapper = shallow(<ImageWrapper />, true);

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  test('render with props', () => {
    const wrapper = mount(<ImageWrapper {...props} />);

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
