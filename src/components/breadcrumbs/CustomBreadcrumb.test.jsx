import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CustomBreadcrumb from './CustomBreadcrumb';

const props = {
  list: [
    {
      pageName: 'Campaign List',
      link: '/',
    },
    {
      pageName: 'Campaign Detail',
    },
  ],
};

describe('Custom Breadcrumb', () => {
  test('renders without crashing ', () => {
    const wrapper = shallow(<CustomBreadcrumb />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  test('should render with items', () => {
    const wrapper = shallow(<CustomBreadcrumb {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
