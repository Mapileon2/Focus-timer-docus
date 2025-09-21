import { useState, useEffect } from 'react';

export const useStats = () => {
  const [completedWorkSessionsToday, setCompletedWorkSessionsToday] = useState(0);

  useEffect(() => {
    // In a real application, you would fetch this from storage or an API
    // For now, we'll just use a placeholder.
    setCompletedWorkSessionsToday(5); // Example value
  }, []);

  return {
    completedWorkSessionsToday,
  };
};