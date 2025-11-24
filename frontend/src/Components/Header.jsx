import React, { useMemo, memo } from 'react';
import { motion } from 'framer-motion';

const difficultyLevels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

const Header = memo(({ difficulty, setDifficulty, score, streak, accuracy, disabled }) => {
  const getSliderPosition = useMemo(() => {
    const index = difficultyLevels.indexOf(difficulty);
    return {
      left: `${index * 25}%`,
      width: '25%'
    };
  }, [difficulty]);

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center">
            {/* Title */}
            <div>
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Korean Quiz
              </h1>
              <p className="text-gray-600 text-xs mt-0.5">Master Korean vocabulary</p>
            </div>

            {/* Difficulty Selector */}
            <div className="flex-1 flex justify-center mx-8">
              <div className="bg-gray-100 rounded-full p-1 inline-flex relative w-[500px]">
                <motion.div
                  className="absolute bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg"
                  initial={false}
                  animate={getSliderPosition}
                  transition={{
                    type: 'spring',
                    stiffness: 350,
                    damping: 35
                  }}
                  style={{
                    top: 4,
                    bottom: 4
                  }}
                />
                {difficultyLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    disabled={disabled}
                    className={`flex-1 py-2 rounded-full font-semibold text-sm transition-colors relative z-10 ${
                      difficulty === level
                        ? 'text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {level === 'all' ? 'All' : level}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">Score</p>
                <p className="text-2xl font-bold text-indigo-600">{score}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">Streak</p>
                <p className="text-2xl font-bold text-orange-500">{streak} 🔥</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">Accuracy</p>
                <p className="text-2xl font-bold text-purple-600">{accuracy}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Header.displayName = 'Header';

export default Header;
