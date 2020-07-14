import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import ViewabilityMeasurement from './ViewabilityMeasurement';

const form = {
  getFieldDecorator: () => element => element,
  getFieldValue: jest.fn(),
  getFieldError: jest.fn(),
};

describe('ViewabilityMeasurement', () => {
  test('renders without crashing', () => {
    const wrapper = shallow(<ViewabilityMeasurement form={form} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
