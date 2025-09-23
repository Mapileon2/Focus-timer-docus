import React from 'react';
import { ModernDashboard } from './modern-ui/ModernDashboard';
import SmilePopup from './SmilePopup';
import ApiKeySettingsModal from './ApiKeySettingsModal';
import { useApiKey } from '../hooks/useApiKey';

const ModernFullAppView = () => {
    const { isSettingsModalOpen, closeSettingsModal } = useApiKey();

    return (
        <>
            <ModernDashboard />
            <SmilePopup />
            {isSettingsModalOpen && (
                <ApiKeySettingsModal 
                    isOpen={isSettingsModalOpen} 
                    onClose={closeSettingsModal} 
                />
            )}
        </>
    );
};

export default ModernFullAppView;