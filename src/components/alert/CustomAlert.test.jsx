import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import CustomAlert from './CustomAlert';

describe(`CustomAlert`, () => {
  test(`renders without crashing`, () => {
    const wrapper = shallow(
      <CustomAlert message="Message" description="Description" />,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
