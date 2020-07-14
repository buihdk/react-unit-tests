import { renderHook } from '@testing-library/react-hooks';
import {
  getArrayValue,
  useValidateLengths,
} from './ViewabilityMeasurement.utils';

describe('getArrayValue', () => {
  test('returns []', () => {
    expect(getArrayValue(null)).toEqual([]);
  });
  test('returns ["a", "b"]', () => {
    expect(getArrayValue(' a   \n b ')).toEqual(['a', 'b']);
  });
});

describe('useValidateLengths', () => {
  const arr1 = ['1'];
  const arr2 = ['2'];
  const setHasError = jest.fn();

  test('setHasError is called with false', () => {
    const arr3 = ['3'];
    renderHook(() => useValidateLengths({ arr1, arr2, arr3, setHasError }));

    expect(setHasError).toBeCalledWith(false);
  });
  test('setHasError is called with true', () => {
    const arr3 = ['3', '4'];
    renderHook(() => useValidateLengths({ arr1, arr2, arr3, setHasError }));

    expect(setHasError).toBeCalledWith(false);
  });
});
