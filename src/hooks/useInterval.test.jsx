import { renderHook } from '@testing-library/react-hooks';
import useInterval from './useInterval';

const setIntervalSpy = jest.spyOn(window, 'setInterval');
const clearIntervalSpy = jest.spyOn(window, 'clearInterval');

beforeEach(() => {
  setIntervalSpy.mockReset();
  clearIntervalSpy.mockClear();
});

describe(`useInterval`, () => {
  test(`works correctly`, () => {
    const intervalId = 1000;
    const period = 5000;
    const callback = jest.fn();
    let trigger;
    setIntervalSpy.mockImplementationOnce(cb => {
      trigger = cb;
      return intervalId;
    });
    const { unmount } = renderHook(() => useInterval(callback, period));

    expect(setIntervalSpy).toBeCalledWith(expect.any(Function), period);

    trigger();

    expect(callback).toBeCalled();

    unmount();

    expect(clearIntervalSpy).toBeCalledWith(intervalId);
  });
});
