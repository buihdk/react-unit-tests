import { renderHook } from '@testing-library/react-hooks';

import useFetchAdvertiser from './useFetchAdvertiser';

describe(`useFetchAdvertiser`, () => {
  const onFetchAdvertiser = jest.fn();
  const selectedAdvertiserId = '1';
  const advertiser = {
    advertiserId: '1',
    currency: 'USD',
  };

  test(`onFetchAdvertiser should be called`, () => {
    const newAd = {
      ...advertiser,
      advertiserId: '2',
    };

    renderHook(() =>
      useFetchAdvertiser({
        selectedAdvertiserId,
        onFetchAdvertiser,
        advertiser: newAd,
      }),
    );
    expect(onFetchAdvertiser).toBeCalled();
  });
});
