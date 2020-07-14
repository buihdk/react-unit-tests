import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ImageEditor from './ImageEditor';

const props = {
  src: 'src',
  onEditedImage: jest.fn(),
};

beforeEach(() => {
  props.src = 'src';
  props.onEditedImage.mockClear();
});

describe('Test Upload Component', () => {
  test('renders without crashing', () => {
    const wrapper = shallow(<ImageEditor {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
