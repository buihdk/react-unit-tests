import { useEffect } from 'react';

const useFetchAdvertiserPermission = ({
  selectedAdvertiserId,
  onFetchAdvertiserPermission,
}) =>
  useEffect(() => {
    onFetchAdvertiserPermission(selectedAdvertiserId);
  }, []);

export default useFetchAdvertiserPermission;
