import { renderHook } from '@testing-library/react-hooks';
import useEffectAsync from './useEffectAsync';

describe(`useEffectAsync`, () => {
  test(`works correctly`, () => {
    const effect = jest.fn();
    renderHook(() => useEffectAsync(effect, []));

    expect(effect).toBeCalled();
  });
});
