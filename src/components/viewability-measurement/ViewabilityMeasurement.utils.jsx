import { useEffect } from 'react';

import { parseMultilineStrToArray } from 'src/utils';

export const getArrayValue = multilineStr =>
  parseMultilineStrToArray(multilineStr);

export const useValidateLengths = ({ arr1, arr2, arr3, setHasError }) =>
  useEffect(() => {
    if (arr1.length !== arr2.length || arr1.length !== arr3.length)
      setHasError(true);
    else setHasError(false);
  }, [arr1, arr2, arr3]);
