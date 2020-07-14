import { useEffect, useCallback } from 'react';

const useIsMounted = () => {
  let isMounted = false;

  useEffect(() => {
    isMounted = true;
    return () => {
      isMounted = false;
    };
  }, []);

  return useCallback(() => isMounted, []);
};

export default useIsMounted;
