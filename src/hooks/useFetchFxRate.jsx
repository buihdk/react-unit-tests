import { useEffect } from 'react';

const useFetchFxRate = ({ currency, onFetchFxRateByCurrency }) =>
  useEffect(
    () => {
      if (!currency || currency === 'USD') return;

      onFetchFxRateByCurrency(currency);
    },
    [currency, onFetchFxRateByCurrency],
  );

export default useFetchFxRate;
