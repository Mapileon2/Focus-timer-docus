import { useState } from 'react';

export const useModals = () => {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const openSettingsModal = () => setIsSettingsModalOpen(true);
  const closeSettingsModal = () => setIsSettingsModalOpen(false);

  return {
    isSettingsModalOpen,
    openSettingsModal,
    closeSettingsModal,
  };
};