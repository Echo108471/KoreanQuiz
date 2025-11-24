import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./vocabulary.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error(err.message);
        process.exit(1);
    }
    console.log('Connected to the vocabulary database.');
});

db.all(`SELECT level, count(*) as count FROM vocabulary GROUP BY level`, [], (err, rows) => {
    if (err) {
        throw err;
    }
    rows.forEach((row) => {
        console.log(`${row.level}: ${row.count}`);
    });
});

db.all(`SELECT korean_word FROM vocabulary`, [], (err, rows) => {
    if (err) {
        throw err;
    }
    console.log('Total words:', rows.length);
    // console.log('Words:', rows.map(r => r.korean_word).join(', '));
});

db.close();
