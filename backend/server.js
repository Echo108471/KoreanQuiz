import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const db = new sqlite3.Database('./vocabulary.db', (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    }
});

const app = express();
app.use(cors());
app.use(express.json());

// Sample database with words generated with AI
// Not all metadata is used
db.serialize(() => {
    db.run(`
        INSERT INTO vocabulary (korean_word, english_meaning, example_sentence, level) VALUES
        ('안녕하세요', 'Hello', '안녕하세요! 오늘 날씨가 좋네요.', 'Beginner'),
        ('사랑', 'Love', '사랑은 모든 것을 이긴다.', 'Beginner'),
        ('고맙습니다', 'Thank you', '도와주셔서 고맙습니다.', 'Beginner'),
        ('학교', 'School', '나는 학교에 갑니다.', 'Beginner'),
        ('친구', 'Friend', '그녀는 나의 가장 친한 친구입니다.', 'Beginner'),
        ('음식', 'Food', '한국 음식은 정말 맛있어요.', 'Beginner'),
        ('여행', 'Travel', '여행은 나의 취미입니다.', 'Intermediate'),
        ('영화', 'Movie', '어제 좋은 영화를 봤어요.', 'Intermediate'),
        ('책', 'Book', '나는 책을 읽는 것을 좋아해요.', 'Intermediate'),
        ('음악', 'Music', '음악은 내 삶의 중요한 부분이에요.', 'Intermediate');
    `);
});


// Endpoint to get all vocabulary words
app.get('/api/vocabulary', (req, res) => {
    db.all('SELECT * FROM vocabulary', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Endpoint to get a random word for the quiz
app.get('/api/vocabulary/random', (req, res) => {
    db.get('SELECT * FROM vocabulary ORDER BY RANDOM() LIMIT 1', (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(row);
    });
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
