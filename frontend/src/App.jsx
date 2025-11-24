import React, { useEffect, useState, useCallback, useRef } from 'react';
import Header from './Components/Header';
import QuestionCard from './Components/QuestionCard';
import Keyboard from './Components/Keyboard';
import ActionButtons from './Components/ActionButtons';
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

  const abortControllerRef = useRef(null);

  const fetchRandomWord = useCallback(async () => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new controller
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const signal = controller.signal;

    setIsLoading(true);
    try {
      const url = difficulty === 'all'
        ? 'http://localhost:5000/api/vocabulary/random'
        : `http://localhost:5000/api/vocabulary/random?level=${difficulty}`;

      const response = await axios.get(url, { signal });

      console.log('Fetched word:', response.data.english_meaning);
      console.log('Fetched word1:', response.data.korean_word);
      setWord(response.data.english_meaning);
      setAnswer(response.data.korean_word);
      setCorrect(null);
      setInput('');
      setShowHint(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        console.error('Error fetching the word:', error);
      }
    } finally {
      // Only update loading state if this is still the active request
      if (abortControllerRef.current === controller) {
        setIsLoading(false);
      }
    }
  }, [difficulty]);

  useEffect(() => {
    fetchRandomWord();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchRandomWord]);

  const checkWord = useCallback(() => {
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
  }, [input, answer, fetchRandomWord]);

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
  }, [input, correct, checkWord]);

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
  }, [handleKeyPress, correct]);

  const skipWord = useCallback(() => {
    setStreak(0);
    fetchRandomWord();
  }, [fetchRandomWord]);

  const getHint = useCallback(() => {
    setShowHint(true);
  }, []);

  const setDifficultyCallback = useCallback((newDifficulty) => {
    setDifficulty(newDifficulty);
  }, []);

  const accuracy = totalAttempts > 0 ? ((score / totalAttempts) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header
        difficulty={difficulty}
        setDifficulty={setDifficultyCallback}
        score={score}
        streak={streak}
        accuracy={accuracy}
        disabled={correct === true}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <QuestionCard
            word={word}
            showHint={showHint}
            answer={answer}
            input={input}
            correct={correct}
            isLoading={isLoading}
          />

          {/* Keyboard */}
          <div className="mb-6">
            <Keyboard onKeyPress={handleKeyPress} />
          </div>

          <ActionButtons
            checkWord={checkWord}
            getHint={getHint}
            skipWord={skipWord}
            correct={correct}
            showHint={showHint}
            inputTrimmed={!!input.trim()}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
