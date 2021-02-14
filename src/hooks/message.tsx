import { useCallback } from 'react';

export const useMessage = () => {
  return useCallback((text) => {
    if (window.alert && text) {
      console.log('message text :>> ', text);
      window.alert(text);
    }
  }, []);
};
