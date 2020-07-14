import React, { createContext } from 'react';
import { __RouterContext } from 'react-router';
import { renderHook } from '@testing-library/react-hooks';
import useRouter from './useRouter';

const useContextSpy = jest.spyOn(React, 'useContext');

beforeEach(() => {
  useContextSpy.mockReset();
});

describe(`useRouter`, () => {
  test(`when router not found`, () => {
    useContextSpy.mockReturnValueOnce(null);
    const { result: { error } } = renderHook(() => useRouter());

    expect(useContextSpy).toBeCalledWith(__RouterContext);
    expect(error).toEqual(expect.any(Error));
  });

  test(`when router found`, () => {
    const router = { history: {}, location: {} };
    useContextSpy.mockReturnValueOnce(router);
    const { result: { current } } = renderHook(() => useRouter());

    expect(useContextSpy).toBeCalledWith(__RouterContext);
    expect(current).toBe(router);
  });

  test(`using custom context`, () => {
    const customContext = createContext();
    renderHook(() => useRouter(customContext));

    expect(useContextSpy).toBeCalledWith(customContext);
  });
});
