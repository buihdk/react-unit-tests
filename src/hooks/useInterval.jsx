import { useRef, useEffect } from 'react';

const useInterval = (callback, period, ...deps) => {
  const callbackRef = useRef(callback);

  useEffect(
    () => {
      callbackRef.current = callback;
    },
    [callback],
  );

  useEffect(
    () => {
      const intervalId = setInterval(() => callbackRef.current(), period);
      return () => clearInterval(intervalId);
    },
    [period, ...deps],
  );
};

export default useInterval;
