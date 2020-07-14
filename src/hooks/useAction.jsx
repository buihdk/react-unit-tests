import { useCallback } from 'react';

const useAction = (actionCreator, dispatch) =>
  useCallback((...args) => dispatch(actionCreator(...args)), [
    actionCreator,
    dispatch,
  ]);

export default useAction;
