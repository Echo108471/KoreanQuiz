import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InputArea from './InputArea';

const QuestionCard = ({ word, showHint, answer, input, correct, isLoading }) => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6 border border-gray-100 relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
        </div>
      )}

      <div className="text-center mb-6">
        <p className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-3">Translate to Korean</p>
        <AnimatePresence mode="wait">
          <motion.h2
            key={word}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            {word}
          </motion.h2>
        </AnimatePresence>

        {showHint && answer && (
          <div className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium animate-fadeIn">
            Hint: Starts with "{answer.charAt(0)}"
          </div>
        )}
      </div>

      <InputArea input={input} correct={correct} />

      {/* Feedback */}
      {correct === true && (
        <div className="mt-6 text-center animate-fadeIn">
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-6 py-3 rounded-full font-bold text-lg">
            <span>Correct!</span>
          </div>
        </div>
      )}
      {correct === false && (
        <div className="mt-6 text-center animate-fadeIn">
          <div className="inline-block bg-red-100 text-red-800 px-6 py-3 rounded-2xl">
            <p className="font-bold text-lg mb-1">✗ Incorrect</p>
            <p className="text-sm">The answer is: <span className="font-bold">{answer}</span></p>
          </div>
        </div>
      )}
    </div>
  );
};

QuestionCard.displayName = 'QuestionCard';

// Custom comparison to prevent unnecessary re-renders
const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.word === nextProps.word &&
    prevProps.showHint === nextProps.showHint &&
    prevProps.answer === nextProps.answer &&
    prevProps.input === nextProps.input &&
    prevProps.correct === nextProps.correct &&
    prevProps.isLoading === nextProps.isLoading
  );
};

export default memo(QuestionCard, areEqual);
