import { renderHook } from '@testing-library/react-hooks';
import useScript from './useScript';

describe(`useScript`, () => {
  test(`works correctly`, () => {
    const url = 'http://test.com';

    const { unmount } = renderHook(() => useScript(url));

    unmount();

    expect(unmount()).toMatchInlineSnapshot(`undefined`);
  });
});
