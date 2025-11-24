import React from 'react';

const InputArea = ({ input, correct }) => {
  const getBorderColor = () => {
    if (correct === true) return 'border-green-500 border-[3px]';
    if (correct === false) return 'border-red-500 border-[3px]';
    return 'border-blue-500 border-2';
  };

  return (
    <div className={`p-5 min-h-[60px] rounded-lg my-5 mx-auto max-w-[500px] bg-white/90 shadow-md transition-all ${getBorderColor()}`}>
      <h2 className="m-0 text-[32px] font-bold text-gray-800 min-h-[40px]">
        {input || ' '}
      </h2>
    </div>
  );
};

export default InputArea;
