import React, { useState, useEffect } from 'react';
import { Button } from './ui/button'
import { Card } from './ui/card'
import { useApiKey } from '../hooks/useApiKey';
import { testApiKey } from '../services/geminiService';
import Spinner from './ui/Spinner';
import CheckCircleIcon from './icons/CheckCircleIcon';
import XCircleIcon from './icons/XCircleIcon';
import { SELECTABLE_MODELS } from '../constants';
import EyeIcon from './icons/EyeIcon';
import EyeSlashIcon from './icons/EyeSlashIcon';


interface ApiKeySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApiKeySettingsModal = ({ isOpen, onClose }: ApiKeySettingsModalProps) => {
  const { apiKey, setApiKey, selectedModel, setSelectedModel } = useApiKey();
  const [localApiKey, setLocalApiKey] = useState(apiKey || '');
  const [localModel, setLocalModel] = useState(selectedModel);
  const [isKeyVisible, setIsKeyVisible] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isOpen) {
        setLocalApiKey(apiKey || '');
        setLocalModel(selectedModel);
        setTestStatus('idle');
        setIsKeyVisible(false);
    }
  }, [isOpen, apiKey, selectedModel])

  useEffect(() => {
    setTestStatus('idle');
  }, [localApiKey, localModel]);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    setApiKey(localApiKey);
    setSelectedModel(localModel);
    onClose();
  };
  
  const handleClose = () => {
    setLocalApiKey(apiKey || '');
    setLocalModel(selectedModel);
    onClose();
  }
  
  const handleTestKey = async () => {
      if (!localApiKey) return;
      setIsTesting(true);
      setTestStatus('idle');
      const isValid = await testApiKey(localApiKey, localModel);
      setTestStatus(isValid ? 'success' : 'error');
      setIsTesting(false);
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in-0 duration-300">
      <Card className="max-w-lg w-full shadow-2xl border-0 bg-white dark:bg-gray-950 animate-in zoom-in-95 duration-300">
        <div className="p-6 space-y-6">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center">
              <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                🔑 API Configuration
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">API Key Settings</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Enter your Google Gemini API key to enable AI features. Your key is stored locally and never sent to our servers.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="api-key" className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Gemini API Key
              </label>
              <div className="relative">
                <input
                  id="api-key"
                  type={isKeyVisible ? 'text' : 'password'}
                  value={localApiKey}
                  onChange={(e) => setLocalApiKey(e.target.value)}
                  className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-3 pr-20 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your API key"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-2">
                  <button 
                    type="button" 
                    onClick={() => setIsKeyVisible(!isKeyVisible)} 
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" 
                    aria-label={isKeyVisible ? "Hide API key" : "Show API key"}
                  >
                    {isKeyVisible ? <EyeSlashIcon className="w-4 h-4"/> : <EyeIcon className="w-4 h-4"/>}
                  </button>
                  {isTesting ? (
                    <Spinner size="sm"/>
                  ) : (
                    <>
                      {testStatus === 'success' && <CheckCircleIcon className="w-4 h-4 text-green-500" />}
                      {testStatus === 'error' && <XCircleIcon className="w-4 h-4 text-red-500" />}
                    </>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="model-select" className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Text Generation Model
              </label>
              <select
                id="model-select"
                value={localModel}
                onChange={(e) => setLocalModel(e.target.value)}
                className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                {SELECTABLE_MODELS.map(modelName => (
                  <option key={modelName} value={modelName}>{modelName}</option>
                ))}
              </select>
            </div>

            <Button 
              onClick={handleTestKey} 
              disabled={isTesting || !localApiKey} 
              variant="outline" 
              className="w-full gap-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {isTesting ? (
                <>
                  <Spinner size="sm" />
                  Testing...
                </>
              ) : (
                <>
                  <span>🧪</span>
                  Test Key
                </>
              )}
            </Button>
          </div>

          <div className="pt-5 border-t border-gray-200 dark:border-gray-700 space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <span>🤖</span>
              Models Used by this App
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">Text Generation:</span>
                <span className="text-xs font-mono bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                  {localModel}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">Image Editing:</span>
                <span className="text-xs font-mono bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                  gemini-2.5-flash-image-preview
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">Image Generation:</span>
                <span className="text-xs font-mono bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                  imagen-4.0-generate-001
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={handleClose}
              className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              className="gap-2 bg-blue-500 hover:bg-blue-600 text-white"
            >
              <span>💾</span>
              Save Settings
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ApiKeySettingsModal;