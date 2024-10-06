import React, { useEffect, useState } from 'react';
import InputArea from './Components/InputArea';
import Keyboard from './Components/Keyboard';
import Hangul from 'hangul-js';
import axios from 'axios';
import './App.css';


const App = () => {
  const [input, setInput] = useState('');
  const [word, setWord] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [correct, setCorrect] = useState(false); 

  useEffect(() => {
    fetchRandomWord();
  }, []);

  const fetchRandomWord = async () => {
    try {
        const response = await axios.get('https://koreanquizbackend.onrender.com/api/vocabulary/random');
        console.log('Fetched word:', response.data.english_meaning);
        console.log('Fetched word1:', response.data.korean_word);
        setWord(response.data.english_meaning);
        setAnswer(response.data.korean_word);
        setCorrect(false); // Reset correctness when fetching a new word
        setInput(''); // Reset input for the next round
    } catch (error) {
        console.error('Error fetching the word:', error);
    }
  };

  const handleKeyPress = (key) => {
    if (key === 'Backspace') {
      const disassembled = Hangul.disassemble(input); // Dissasemble the hangul
      const updatedDisassembled = disassembled.slice(0, -1); // Remove the last character
      const combined = Hangul.assemble(updatedDisassembled); // Update the input area
      setInput(combined);
    } else {
      const combined = Hangul.assemble([...Hangul.disassemble(input), key]);
      setInput(combined);
    }
  };

  const checkWord = () => {
    if (input === answer) {
      setCorrect(true);
      console.log('Correct Answer:', answer);
    } else {
      setCorrect(false);
      console.log('Incorrect Answer');
    }
    if (correct === true) {
      fetchRandomWord();
    }
  };


  // Changing style when correct
  const appStyle = {
    fontFamily: 'Sans-Serif',
    backgroundColor: correct ? 'green' : 'white', 
    color: correct ? 'white' : 'black',
    transition: 'background-color 0.5s ease', 
    padding: '20px',
    minHeight: '100vh',
    textAlign: 'center'
  };

  return (
    <div style={appStyle}>
      <h1>Korean Vocabulary Quiz</h1>
      <h2>Translate: {word}</h2>
      <InputArea input={input} />
      <br />
      <Keyboard onKeyPress={handleKeyPress} />
      <button onClick={checkWord} style={buttonStyle}>Check Answer</button>
      <p>{correct ? 'Correct!' : 'Try Again!'}</p>
    </div>
  );


};


const buttonStyle = {
  padding: '10px 20px',
  fontSize: '18px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '20px',
};

export default App;
