import { renderHook } from '@testing-library/react-hooks';

import useFetchAdvertiserPermission from './useFetchAdvertiserPermission';

describe(`useFetchAdvertiserPermission`, () => {
  const onFetchAdvertiserPermission = jest.fn();
  const selectedAdvertiserId = '1';

  test(`works correctly`, () => {
    renderHook(() =>
      useFetchAdvertiserPermission({
        selectedAdvertiserId,
        onFetchAdvertiserPermission,
      }),
    );
    expect(onFetchAdvertiserPermission).toBeCalled();
  });
});
