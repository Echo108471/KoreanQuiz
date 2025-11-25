import React, { memo } from 'react';

const consonants = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
const vowels = ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ', 'ㅐ', 'ㅒ', 'ㅔ', 'ㅖ'];

const Keyboard = memo(({ onKeyPress, onHint, onSkip, showHint }) => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Consonants */}
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 text-center">Consonants (자음)</p>
          <div className="grid grid-cols-5 gap-2">
            {consonants.map((key) => (
              <button
                key={key}
                onClick={() => onKeyPress(key)}
                className="p-3 text-xl bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-xl cursor-pointer transition-all font-bold shadow-sm hover:shadow-md hover:scale-105 hover:from-cyan-50 hover:to-cyan-100 hover:border-cyan-300 active:scale-95"
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
                className="p-3 text-xl bg-gradient-to-b from-white to-gray-50 border border-gray-200 rounded-xl cursor-pointer transition-all font-bold shadow-sm hover:shadow-md hover:scale-105 hover:from-teal-50 hover:to-teal-100 hover:border-teal-300 active:scale-95"
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
          onClick={onHint}
          disabled={showHint}
          className={`flex-1 max-w-[140px] px-4 py-3 text-base border-0 rounded-xl cursor-pointer font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 ${showHint
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
            : 'bg-gradient-to-r from-amber-400 to-amber-500 text-white hover:from-amber-500 hover:to-amber-600'
            }`}
        >
          Hint
        </button>

        <button
          onClick={() => onKeyPress('Backspace')}
          className="flex-1 max-w-[140px] px-4 py-3 text-base bg-gradient-to-r from-slate-600 to-slate-700 text-white border-0 rounded-xl cursor-pointer font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 hover:from-slate-700 hover:to-slate-800 active:scale-95"
        >
          Delete
        </button>

        <button
          onClick={() => onKeyPress('Enter')}
          className="flex-1 max-w-[140px] px-4 py-3 text-base bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-0 rounded-xl cursor-pointer font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 hover:from-teal-600 hover:to-cyan-600 active:scale-95"
        >
          Submit
        </button>

        <button
          onClick={onSkip}
          className="flex-1 max-w-[140px] px-4 py-3 text-base bg-gradient-to-r from-slate-400 to-slate-500 text-white border-0 rounded-xl cursor-pointer font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105 hover:from-slate-500 hover:to-slate-600 active:scale-95"
        >
          Skip
        </button>
      </div>
    </div>
  );
});

Keyboard.displayName = 'Keyboard';

export default Keyboard;
