import * as ReactRedux from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import useActions from './useActions';

const dispatch = jest.fn();
const useDispatchSpy = jest
  .spyOn(ReactRedux, 'useDispatch')
  .mockReturnValue(dispatch);

beforeEach(() => {
  dispatch.mockClear();
  useDispatchSpy.mockClear();
});

describe(`useActions`, () => {
  test(`works correctly`, () => {
    const actionCreator = jest.fn().mockReturnValue({ type: 'Action1' });
    const { result: { current: [action] } } = renderHook(() =>
      useActions(actionCreator),
    );
    action('test');

    expect(useDispatchSpy).toBeCalled();
    expect(actionCreator).toBeCalledWith('test');
    expect(dispatch).toBeCalledWith({ type: 'Action1' });
  });
});
