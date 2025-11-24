import React from 'react';

const koreanKeys = [
  'ㄱ','ㄲ', 'ㄴ', 'ㄷ','ㄸ', 'ㄹ', 'ㅁ', 'ㅂ','ㅃ', 'ㅅ','ㅆ', 'ㅇ', 'ㅈ','ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
  'ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅔ', 'ㅖ', 'ㅐ', 'ㅒ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ'
];

const Keyboard = ({ onKeyPress }) => {
  return (
    <div className="flex flex-col justify-center items-center mt-5 gap-4">
      {/* Korean Keys Grid */}
      <div className="grid grid-cols-7 gap-2 m-auto">
        {koreanKeys.map((key) => (
          <button
            key={key}
            onClick={() => onKeyPress(key)}
            className="p-3 text-xl bg-gray-100 border-2 border-gray-300 rounded-lg cursor-pointer transition-all font-bold shadow-sm hover:bg-gray-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm"
          >
            {key}
          </button>
        ))}
      </div>
      
      {/* Action Keys */}
      <div className="flex gap-2.5 justify-center">
        <button
          onClick={() => onKeyPress('Backspace')}
          className="px-5 py-2.5 text-base bg-yellow-400 text-black border-2 border-yellow-500 rounded-lg cursor-pointer font-bold transition-all shadow-sm hover:bg-yellow-500 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm"
        >
          ⌫ Backspace
        </button>
        <button
          onClick={() => onKeyPress('Enter')}
          className="px-5 py-2.5 text-base bg-green-500 text-white border-2 border-green-600 rounded-lg cursor-pointer font-bold transition-all shadow-sm hover:bg-green-600 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm"
        >
          ↵ Enter
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
