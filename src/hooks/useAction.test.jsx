import { renderHook } from '@testing-library/react-hooks';

import useAction from './useAction';

const dispatch = jest.fn();

beforeEach(() => {
  dispatch.mockReset();
});

describe(`useAction`, () => {
  test(`works correctly`, () => {
    const action = { type: 'XYZ' };
    const actionCreator = jest.fn().mockReturnValueOnce(action);
    const args = 1;
    const { result } = renderHook(() => useAction(actionCreator, dispatch));
    result.current(args);

    expect(actionCreator).toBeCalledWith(args);
    expect(dispatch).toBeCalledWith(action);
  });
});
