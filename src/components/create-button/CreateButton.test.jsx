import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { CreateButton } from './CreateButton';

describe(`CreateButton`, () => {
  test(`renders without crashing`, () => {
    const props = {
      onShowModal: () => {},
      className: 'button',
      label: 'campaigns.create',
    };
    const wrapper = shallow(<CreateButton {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
