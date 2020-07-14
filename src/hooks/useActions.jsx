import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';

const useActions = (...actionCreators) => {
  const dispatch = useDispatch();

  return useMemo(
    () =>
      actionCreators.map(actionCreator =>
        bindActionCreators(actionCreator, dispatch),
      ),
    [dispatch, ...actionCreators],
  );
};

export default useActions;
