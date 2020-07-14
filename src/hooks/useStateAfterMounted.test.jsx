import { renderHook, act } from '@testing-library/react-hooks';
import useStateAfterMounted from './useStateAfterMounted';

const isMounted = jest.fn();

beforeEach(() => {
  isMounted.mockReset();
});

describe(`useState`, () => {
  test(`works correctly`, () => {
    const { result } = renderHook(() => useStateAfterMounted(1, isMounted));
    const { current: [, setState] } = result;

    expect(result.current[0]).toBe(1);

    isMounted.mockReturnValueOnce(true);
    act(() => setState(2));

    expect(isMounted).toBeCalledTimes(1);
    expect(result.current[0]).toBe(2);

    isMounted.mockReturnValueOnce(false);
    act(() => setState(3));

    expect(isMounted).toBeCalledTimes(2);
    expect(result.current[0]).toBe(2);
  });
});
