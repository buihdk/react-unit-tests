import { useCallback } from 'react';

export const useValidateTime = ({
  form: { setFields, getFieldValue, validateFields },
}) =>
  useCallback(() => {
    setFields({}, () => {
      const times = getFieldValue('frequencyCapTimes');
      if (times !== '') {
        validateFields(['frequencyCapTimes'], { force: true });
      }
    });
  }, [setFields, getFieldValue, validateFields]);
