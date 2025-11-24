import React, { memo } from 'react';

const consonants = ['ㄱ','ㄲ', 'ㄴ', 'ㄷ','ㄸ', 'ㄹ', 'ㅁ', 'ㅂ','ㅃ', 'ㅅ','ㅆ', 'ㅇ', 'ㅈ','ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const vowels = ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ', 'ㅐ', 'ㅒ', 'ㅔ', 'ㅖ'];

const Keyboard = memo(({ onKeyPress }) => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
      <div className="flex gap-6">
        {/* Consonants */}
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 text-center">Consonants (자음)</p>
          <div className="grid grid-cols-5 gap-2">
            {consonants.map((key) => (
              <button
                key={key}
                onClick={() => onKeyPress(key)}
                className="p-3 text-xl bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-xl cursor-pointer transition-all font-bold shadow-sm hover:shadow-md hover:scale-105 hover:from-indigo-50 hover:to-indigo-100 hover:border-indigo-300 active:scale-95"
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Vowels */}
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 text-center">Vowels (모음)</p>
          <div className="grid grid-cols-5 gap-2">
            {vowels.map((key) => (
              <button
                key={key}
                onClick={() => onKeyPress(key)}
                className="p-3 text-xl bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-xl cursor-pointer transition-all font-bold shadow-sm hover:shadow-md hover:scale-105 hover:from-purple-50 hover:to-purple-100 hover:border-purple-300 active:scale-95"
              >
                {key}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Action Keys */}
      <div className="flex gap-3 justify-center mt-6">
        <button
          onClick={() => onKeyPress('Backspace')}
          className="flex-1 max-w-xs px-6 py-3 text-base bg-gradient-to-r from-orange-400 to-orange-500 text-white border-0 rounded-xl cursor-pointer font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 hover:from-orange-500 hover:to-orange-600 active:scale-95"
        >
          ⌫ Backspace
        </button>
        <button
          onClick={() => onKeyPress('Enter')}
          className="flex-1 max-w-xs px-6 py-3 text-base bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 rounded-xl cursor-pointer font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 hover:from-green-600 hover:to-emerald-600 active:scale-95"
        >
          ↵ Enter
        </button>
      </div>
    </div>
  );
});

Keyboard.displayName = 'Keyboard';

export default Keyboard;

