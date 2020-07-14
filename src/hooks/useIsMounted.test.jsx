import { renderHook } from '@testing-library/react-hooks';
import useIsMounted from './useIsMounted';

describe(`useIsMounted`, () => {
  test(`works correctly`, () => {
    const { result: { current: isMounted }, unmount } = renderHook(() =>
      useIsMounted(),
    );

    expect(isMounted()).toBe(true);

    unmount();

    expect(isMounted()).toBe(false);
  });
});
