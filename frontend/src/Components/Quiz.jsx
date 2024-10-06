// This component is not being used atm, I originally built it but it was not particularly needed
// Its just here tho lol 

import React, { useEffect, useState } from 'react';
import axios from 'axios';



const Quiz = ({answer}) => {
    const [word, setWord] = useState(null);
    const [feedback, setFeedback] = useState('');

    // Fetch a random word when the component mounts
    useEffect(() => {
        fetchRandomWord();
    }, []);

    const fetchRandomWord = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/vocabulary/');
            setWord(response.data);
            setAnswer('');
            setFeedback('');
        } catch (error) {
            console.error('Error fetching the word:', error);
        }
    };

    const checkAnswer = () => {
        if (answer.toLowerCase() === word.english_meaning.toLowerCase()) {
            setFeedback('Correct!');
        } else {
            setFeedback(`Incorrect. The correct answer is "${word.english_meaning}".`);
        }
    };

    return (
        <div>
            {word ? (
                <>
                    <h2>Translate the word: {word.korean_word}</h2>
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Your answer"
                    />
                    <button onClick={checkAnswer}>Submit</button>
                    <button onClick={fetchRandomWord}>Next Word</button>
                    <p>{feedback}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Quiz;
