import express from 'express';
import sqlite3 from 'sqlite3';
import path from 'path';
import cors from 'cors';

// Initialize the SQLite database
const db = new sqlite3.Database('./vocabulary.db', (err) => {
    if (err) {
        console.error('Error opening database: ' + err.message);
        process.exit(1); // Exit the app if the database cannot be opened
    } else {
        console.log('Connected to the SQLite database.');
    }
});

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration: restrict origins in production, allow all in development
const allowedOrigins = ['https://korean-quiz-red.vercel.app', 'http://localhost:3000'];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};
app.use(cors(corsOptions)); // Apply the CORS options

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'dist' folder (after Vite build)
app.use(express.static(path.join(process.cwd(), 'dist')));

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

// Serve the frontend for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

// Graceful shutdown handler
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received. Closing the database...');
    db.close((err) => {
        if (err) {
            console.error('Error closing the database: ' + err.message);
        }
        process.exit(0);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Optional: Seed the database if it's empty
// Uncomment the following section if you want to initialize the database only if it's empty
// db.serialize(() => {
//     db.run(`CREATE TABLE IF NOT EXISTS vocabulary (
//         id INTEGER PRIMARY KEY,
//         korean_word TEXT,
//         english_meaning TEXT,
//         example_sentence TEXT,
//         level TEXT
//     );`);

//     db.get('SELECT COUNT(*) AS count FROM vocabulary', [], (err, row) => {
//         if (row.count === 0) {
//             db.run(`INSERT INTO vocabulary (korean_word, english_meaning, example_sentence, level) VALUES
//                 ('안녕하세요', 'Hello', '안녕하세요! 오늘 날씨가 좋네요.', 'Beginner'),
//                 ('사랑', 'Love', '사랑은 모든 것을 이긴다.', 'Beginner'),
//                 ('고맙습니다', 'Thank you', '도와주셔서 고맙습니다.', 'Beginner'),
//                 ('학교', 'School', '나는 학교에 갑니다.', 'Beginner'),
//                 ('친구', 'Friend', '그녀는 나의 가장 친한 친구입니다.', 'Beginner'),
//                 ('음식', 'Food', '한국 음식은 정말 맛있어요.', 'Beginner'),
//                 ('여행', 'Travel', '여행은 나의 취미입니다.', 'Intermediate'),
//                 ('영화', 'Movie', '어제 좋은 영화를 봤어요.', 'Intermediate'),
//                 ('책', 'Book', '나는 책을 읽는 것을 좋아해요.', 'Intermediate'),
//                 ('음악', 'Music', '음악은 내 삶의 중요한 부분이에요.', 'Intermediate');
//             `);
//         }
//     });
// });
