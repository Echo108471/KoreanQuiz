import React, { useState } from 'react';

const Settings = ({ onClose, settings, onSave }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-[1000]">
      <div className="bg-white p-8 rounded-lg min-w-[400px] max-w-[90%] shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Settings ⚙️</h2>
        
        <div className="mb-5 p-2.5 bg-gray-100 rounded">
          <label className="flex items-center gap-2.5 text-base cursor-pointer">
            <input
              type="checkbox"
              checked={localSettings.soundEnabled}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                soundEnabled: e.target.checked
              })}
              className="w-5 h-5 cursor-pointer"
            />
            Enable Sound Effects
          </label>
        </div>

        <div className="mb-5 p-2.5 bg-gray-100 rounded">
          <label className="flex items-center gap-2.5 text-base cursor-pointer">
            <input
              type="checkbox"
              checked={localSettings.autoAdvance}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                autoAdvance: e.target.checked
              })}
              className="w-5 h-5 cursor-pointer"
            />
            Auto-advance to Next Word
          </label>
        </div>

        <div className="mb-5 p-2.5 bg-gray-100 rounded">
          <label className="flex items-center gap-2.5 text-base cursor-pointer">
            <input
              type="checkbox"
              checked={localSettings.showKeyboardHints}
              onChange={(e) => setLocalSettings({
                ...localSettings,
                showKeyboardHints: e.target.checked
              })}
              className="w-5 h-5 cursor-pointer"
            />
            Show Keyboard Mapping Hints
          </label>
        </div>

        <div className="flex gap-2.5 justify-end mt-8">
          <button 
            onClick={handleSave} 
            className="px-5 py-2.5 bg-green-500 text-white border-none rounded cursor-pointer text-base font-bold hover:bg-green-600 transition-colors"
          >
            Save
          </button>
          <button 
            onClick={onClose} 
            className="px-5 py-2.5 bg-gray-600 text-white border-none rounded cursor-pointer text-base font-bold hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
