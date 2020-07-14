import { renderHook } from '@testing-library/react-hooks';
import * as ReactRedux from 'react-redux';

import useShallowEqualSelector from './useShallowEqualSelector';

const useSelectorSpy = jest.spyOn(ReactRedux, 'useSelector');

beforeEach(() => {
  useSelectorSpy.mockReset();
});

describe(`useSelector`, () => {
  test(`works correctly`, () => {
    const selector = () => {};
    const useSelectorResult = () => {};
    useSelectorSpy.mockResolvedValue(useSelectorResult);
    renderHook(() => useShallowEqualSelector(selector));

    expect(useSelectorSpy).toBeCalledWith(selector, ReactRedux.shallowEqual);
  });
});
