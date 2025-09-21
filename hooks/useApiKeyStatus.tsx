import { useState, useEffect } from 'react';
import { useApiKey } from './useApiKey';

export const useApiKeyStatus = () => {
  const { apiKey } = useApiKey();
  const [isKeySet, setIsKeySet] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (apiKey) {
      setIsKeySet(true);
      setShowNotification(false);
    } else {
      setIsKeySet(false);
      setShowNotification(true);
    }
  }, [apiKey]);

  return {
    isKeySet,
    showNotification,
    setShowNotification,
  };
};