import { renderHook } from '@testing-library/react-hooks';

import useFetchFxRate from './useFetchFxRate';

const onFetchFxRateByCurrency = jest.fn();

describe(`useFetchAdvertiser`, () => {
  test(`onFetchFxRateByCurrency should not be called`, () => {
    const currency = 'USD';

    renderHook(() =>
      useFetchFxRate({
        currency,
        onFetchFxRateByCurrency,
      }),
    );
    expect(onFetchFxRateByCurrency).not.toBeCalled();
  });

  test(`onFetchFxRateByCurrency should be called`, () => {
    const currency = 'SGD';

    renderHook(() =>
      useFetchFxRate({
        currency,
        onFetchFxRateByCurrency,
      }),
    );
    expect(onFetchFxRateByCurrency).toBeCalled();
  });
});
