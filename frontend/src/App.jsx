import React, { useEffect, useState, useCallback } from 'react';
import InputArea from './Components/InputArea';
import Keyboard from './Components/Keyboard';
import Hangul from 'hangul-js';
import axios from 'axios';

const App = () => {
  const [input, setInput] = useState('');
  const [word, setWord] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [correct, setCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [difficulty, setDifficulty] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRandomWord();
  }, [difficulty]);

  // Physical keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (correct === true) return;
      
      // Map physical keyboard to Korean characters
      const keyMap = {
        'q': 'ㅂ', 'w': 'ㅈ', 'e': 'ㄷ', 'r': 'ㄱ', 't': 'ㅅ',
        'y': 'ㅛ', 'u': 'ㅕ', 'i': 'ㅑ', 'o': 'ㅐ', 'p': 'ㅔ',
        'a': 'ㅁ', 's': 'ㄴ', 'd': 'ㅇ', 'f': 'ㄹ', 'g': 'ㅎ',
        'h': 'ㅗ', 'j': 'ㅓ', 'k': 'ㅏ', 'l': 'ㅣ',
        'z': 'ㅋ', 'x': 'ㅌ', 'c': 'ㅊ', 'v': 'ㅍ',
        'b': 'ㅠ', 'n': 'ㅜ', 'm': 'ㅡ',
        'Q': 'ㅃ', 'W': 'ㅉ', 'E': 'ㄸ', 'R': 'ㄲ', 'T': 'ㅆ',
        'O': 'ㅒ', 'P': 'ㅖ'
      };
      
      if (e.key === 'Enter') {
        e.preventDefault();
        handleKeyPress('Enter');
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleKeyPress('Backspace');
      } else if (keyMap[e.key]) {
        e.preventDefault();
        handleKeyPress(keyMap[e.key]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, correct]);

  const fetchRandomWord = async () => {
    setIsLoading(true);
    try {
        const url = difficulty === 'all' 
          ? 'http://localhost:5000/api/vocabulary/random'
          : `http://localhost:5000/api/vocabulary/random?level=${difficulty}`;
        const response = await axios.get(url);
        console.log('Fetched word:', response.data.english_meaning);
        console.log('Fetched word1:', response.data.korean_word);
        setWord(response.data.english_meaning);
        setAnswer(response.data.korean_word);
        setCorrect(null);
        setInput('');
        setShowHint(false);
    } catch (error) {
        console.error('Error fetching the word:', error);
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyPress = useCallback((key) => {
    if (correct === true) return; // Prevent typing after correct answer
    
    if (key === 'Backspace') {
      const disassembled = Hangul.disassemble(input);
      const updatedDisassembled = disassembled.slice(0, -1);
      const combined = Hangul.assemble(updatedDisassembled);
      setInput(combined);
    } else if (key === 'Enter') {
      checkWord();
    } else {
      const combined = Hangul.assemble([...Hangul.disassemble(input), key]);
      setInput(combined);
    }
  }, [input, correct]);

  const checkWord = () => {
    if (!input.trim()) return;
    
    setTotalAttempts(prev => prev + 1);
    
    if (input === answer) {
      setCorrect(true);
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      console.log('Correct Answer:', answer);
      
      // Auto-advance to next word after 1.5 seconds
      setTimeout(() => {
        fetchRandomWord();
      }, 1500);
    } else {
      setCorrect(false);
      setStreak(0);
      console.log('Incorrect Answer');
    }
  };

  const skipWord = () => {
    setStreak(0);
    fetchRandomWord();
  };

  const getHint = () => {
    setShowHint(true);
  };

  const accuracy = totalAttempts > 0 ? ((score / totalAttempts) * 100).toFixed(1) : 0;

  const bgColor = correct === true 
    ? 'bg-green-500' 
    : correct === false 
    ? 'bg-red-500' 
    : 'bg-white';
  
  const textColor = correct !== null ? 'text-white' : 'text-black';

  return (
    <div className={`${bgColor} ${textColor} transition-all duration-500 min-h-screen p-5 text-center`}>
      {/* Stats Container */}
      <div className="flex justify-center gap-8 mb-5 flex-wrap">
        <div className="flex flex-col items-center">
          <span className="text-sm font-bold mb-1">Score:</span>
          <span className="text-2xl font-bold">{score}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm font-bold mb-1">Streak:</span>
          <span className="text-2xl font-bold">{streak} 🔥</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm font-bold mb-1">Accuracy:</span>
          <span className="text-2xl font-bold">{accuracy}%</span>
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-5">Korean Vocabulary Quiz</h1>
      
      {/* Difficulty Selector */}
      <div className="mb-5">
        <label className="text-base font-bold mr-2">Difficulty: </label>
        <select 
          value={difficulty} 
          onChange={(e) => setDifficulty(e.target.value)}
          className="px-4 py-2 text-base rounded border-2 border-blue-500 cursor-pointer text-black"
          disabled={correct === true}
        >
          <option value="all">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {isLoading ? (
        <p className="text-xl">Loading...</p>
      ) : (
        <>
          <h2 className="text-3xl font-semibold mb-5">Translate: {word}</h2>
          {showHint && answer && (
            <p className="text-lg italic text-yellow-400 mt-2">
              Hint: Starts with "{answer.charAt(0)}"
            </p>
          )}
          <InputArea input={input} correct={correct} />
          <br />
          <Keyboard onKeyPress={handleKeyPress} />
          
          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-5 flex-wrap">
            <button 
              onClick={checkWord} 
              className="px-5 py-2.5 text-lg text-white bg-blue-500 border-none rounded cursor-pointer font-bold transition-all hover:bg-blue-600 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              disabled={correct === true || !input.trim()}
            >
              Check Answer
            </button>
            <button 
              onClick={getHint} 
              className="px-5 py-2.5 text-lg text-black bg-yellow-400 border-none rounded cursor-pointer font-bold transition-all hover:bg-yellow-500 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              disabled={correct === true || showHint}
            >
              Get Hint
            </button>
            <button 
              onClick={skipWord} 
              className="px-5 py-2.5 text-lg text-white bg-gray-600 border-none rounded cursor-pointer font-bold transition-all hover:bg-gray-700 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              disabled={correct === true}
            >
              Skip
            </button>
          </div>
          
          {correct === true && (
            <p className="text-2xl font-bold mt-5 animate-fadeIn">✅ Correct!</p>
          )}
          {correct === false && (
            <p className="text-2xl font-bold mt-5 animate-fadeIn">
              ❌ Incorrect! The answer is: {answer}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default App;
