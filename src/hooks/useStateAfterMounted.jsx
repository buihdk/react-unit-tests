import { useState, useCallback } from 'react';

const useStateAfterMounted = (initialValue, isMounted) => {
  const [state, setState] = useState(initialValue);
  const setStateCallback = useCallback(value => {
    if (isMounted()) {
      setState(value);
    }
  }, []);
  return [state, setStateCallback];
};

export default useStateAfterMounted;
