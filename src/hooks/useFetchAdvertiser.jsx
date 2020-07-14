import { useEffect } from 'react';

const useFetchAdvertiser = ({ selectedAdvertiserId, onFetchAdvertiser }) =>
  useEffect(() => {
    onFetchAdvertiser(selectedAdvertiserId);
  }, []);

export default useFetchAdvertiser;
