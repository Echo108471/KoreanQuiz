import React, { memo } from 'react';

const ActionButtons = memo(({ checkWord, getHint, skipWord, correct, showHint, inputTrimmed, isLoading }) => {
  return (
    <div className="flex justify-center gap-3 flex-wrap">
      <button
        onClick={checkWord}
        className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-700 hover:shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg"
        disabled={correct === true || !inputTrimmed || isLoading}
      >
        Check Answer
      </button>
      <button
        onClick={getHint}
        className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-xl font-bold text-lg shadow-lg hover:bg-yellow-500 hover:shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg"
        disabled={correct === true || showHint || isLoading}
      >
        💡 Hint
      </button>
      <button
        onClick={skipWord}
        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-300 hover:shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg"
        disabled={correct === true || isLoading}
      >
        Skip →
      </button>
    </div>
  );
});

ActionButtons.displayName = 'ActionButtons';

export default ActionButtons;
