import React, { memo } from 'react';

const InputArea = memo(({ input, correct }) => {
  const getStyles = () => {
    if (correct === true) {
      return 'border-teal-500 bg-teal-50 shadow-teal-200';
    }
    if (correct === false) {
      return 'border-red-500 bg-red-50 shadow-red-200';
    }
    return 'border-cyan-300 bg-white shadow-cyan-100';
  };

  return (
    <div className={`p-6 rounded-2xl my-6 mx-auto max-w-md border-2 shadow-xl transition-all duration-300 ${getStyles()}`}>
      <div className="text-5xl font-bold text-gray-800 min-h-[60px] flex items-center justify-center tracking-wide">
        {input || <span className="text-gray-300">...</span>}
      </div>
    </div>
  );
});

InputArea.displayName = 'InputArea';

export default InputArea;

