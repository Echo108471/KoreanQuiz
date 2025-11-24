import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const db = new sqlite3.Database('./vocabulary.db', (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Database connected successfully');
    }
});

const app = express();

// CORS configuration
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5173/'],
    methods: ['GET', 'POST'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Create table if it doesn't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS vocabulary (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            korean_word TEXT NOT NULL,
            english_meaning TEXT NOT NULL,
            example_sentence TEXT,
            level TEXT DEFAULT 'Beginner'
        )
    `, (err) => {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log('Vocabulary table ready');
            
            // Check if table is empty
            db.get('SELECT COUNT(*) as count FROM vocabulary', (err, row) => {
                if (err) {
                    console.error('Error checking table:', err);
                } else if (row.count === 0) {
                    console.log('Populating database with initial vocabulary...');
                    insertInitialVocabulary();
                }
            });
        }
    });
});

function insertInitialVocabulary() {
    const vocabulary = [
        // Beginner Level
        ['안녕하세요', 'Hello', '안녕하세요! 오늘 날씨가 좋네요.', 'Beginner'],
        ['사랑', 'Love', '사랑은 모든 것을 이긴다.', 'Beginner'],
        ['고맙습니다', 'Thank you', '도와주셔서 고맙습니다.', 'Beginner'],
        ['학교', 'School', '나는 학교에 갑니다.', 'Beginner'],
        ['친구', 'Friend', '그녀는 나의 가장 친한 친구입니다.', 'Beginner'],
        ['음식', 'Food', '한국 음식은 정말 맛있어요.', 'Beginner'],
        ['집', 'House', '우리 집은 서울에 있어요.', 'Beginner'],
        ['가족', 'Family', '가족이 제일 중요해요.', 'Beginner'],
        ['물', 'Water', '물 한 잔 주세요.', 'Beginner'],
        ['책', 'Book', '나는 책을 읽는 것을 좋아해요.', 'Beginner'],
        ['나무', 'Tree', '공원에 나무가 많아요.', 'Beginner'],
        ['꽃', 'Flower', '봄에는 꽃이 예뻐요.', 'Beginner'],
        ['하늘', 'Sky', '하늘이 파래요.', 'Beginner'],
        ['바다', 'Sea', '여름에 바다에 가요.', 'Beginner'],
        ['산', 'Mountain', '주말에 산에 올라가요.', 'Beginner'],
        
        // Intermediate Level
        ['여행', 'Travel', '여행은 나의 취미입니다.', 'Intermediate'],
        ['영화', 'Movie', '어제 좋은 영화를 봤어요.', 'Intermediate'],
        ['음악', 'Music', '음악은 내 삶의 중요한 부분이에요.', 'Intermediate'],
        ['운동', 'Exercise', '매일 운동을 해요.', 'Intermediate'],
        ['건강', 'Health', '건강이 제일 중요해요.', 'Intermediate'],
        ['회사', 'Company', '회사에서 일해요.', 'Intermediate'],
        ['컴퓨터', 'Computer', '컴퓨터로 일을 해요.', 'Intermediate'],
        ['전화', 'Phone', '전화 좀 받아주세요.', 'Intermediate'],
        ['시간', 'Time', '시간이 없어요.', 'Intermediate'],
        ['약속', 'Promise', '친구와 약속이 있어요.', 'Intermediate'],
        ['문제', 'Problem', '문제가 생겼어요.', 'Intermediate'],
        ['생각', 'Thought', '좋은 생각이에요.', 'Intermediate'],
        ['기회', 'Opportunity', '좋은 기회예요.', 'Intermediate'],
        ['경험', 'Experience', '좋은 경험이었어요.', 'Intermediate'],
        ['노력', 'Effort', '노력하면 성공해요.', 'Intermediate'],
        
        // Advanced Level
        ['환경', 'Environment', '환경 보호가 중요합니다.', 'Advanced'],
        ['경제', 'Economy', '경제가 어려워요.', 'Advanced'],
        ['정치', 'Politics', '정치에 관심이 많아요.', 'Advanced'],
        ['사회', 'Society', '사회 문제를 해결해야 해요.', 'Advanced'],
        ['문화', 'Culture', '한국 문화가 독특해요.', 'Advanced'],
        ['역사', 'History', '역사를 공부해요.', 'Advanced'],
        ['과학', 'Science', '과학 기술이 발전했어요.', 'Advanced'],
        ['교육', 'Education', '교육이 중요해요.', 'Advanced'],
        ['기술', 'Technology', '기술이 발전하고 있어요.', 'Advanced'],
        ['발전', 'Development', '계속 발전하고 있어요.', 'Advanced']
    ];

    const stmt = db.prepare('INSERT INTO vocabulary (korean_word, english_meaning, example_sentence, level) VALUES (?, ?, ?, ?)');
    
    vocabulary.forEach(item => {
        stmt.run(item, (err) => {
            if (err) {
                console.error('Error inserting:', err);
            }
        });
    });
    
    stmt.finalize(() => {
        console.log('Initial vocabulary inserted successfully');
    });
}

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
    const level = req.query.level;
    let query = 'SELECT * FROM vocabulary';
    let params = [];
    
    if (level && level !== 'all') {
        query += ' WHERE level = ?';
        params = [level];
    }
    
    query += ' ORDER BY RANDOM() LIMIT 1';
    
    db.get(query, params, (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'No vocabulary found' });
        }
        res.json(row);
    });
});

// Endpoint to get vocabulary count by level
app.get('/api/vocabulary/stats', (req, res) => {
    db.all(`
        SELECT level, COUNT(*) as count 
        FROM vocabulary 
        GROUP BY level
    `, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
