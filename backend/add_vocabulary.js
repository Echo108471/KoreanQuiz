import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./vocabulary.db', (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
        process.exit(1);
    } else {
        console.log('Database connected successfully');
        insertNewVocabulary();
    }
});

function insertNewVocabulary() {
    const newVocabulary = [
        // Beginner Level (Everyday objects, basic verbs/adjectives)
        ['사과', 'Apple', '사과가 빨개요.', 'Beginner'],
        ['우유', 'Milk', '매일 우유를 마셔요.', 'Beginner'],
        ['고양이', 'Cat', '고양이가 귀여워요.', 'Beginner'],
        ['강아지', 'Puppy', '강아지가 뛰어놀아요.', 'Beginner'],
        ['비', 'Rain', '비가 많이 와요.', 'Beginner'],
        ['눈', 'Snow', '겨울에는 눈이 와요.', 'Beginner'],
        ['달', 'Moon', '밤하늘에 달이 떴어요.', 'Beginner'],
        ['별', 'Star', '별이 반짝여요.', 'Beginner'],
        ['버스', 'Bus', '버스를 타고 학교에 가요.', 'Beginner'],
        ['지하철', 'Subway', '지하철이 빨라요.', 'Beginner'],
        ['가방', 'Bag', '가방이 무거워요.', 'Beginner'],
        ['모자', 'Hat', '모자를 썼어요.', 'Beginner'],
        ['신발', 'Shoes', '새 신발을 샀어요.', 'Beginner'],
        ['안경', 'Glasses', '안경을 쓰면 잘 보여요.', 'Beginner'],
        ['시계', 'Clock', '시계를 보세요.', 'Beginner'],

        // Intermediate Level (Abstract concepts, feelings, workplace)
        ['성공', 'Success', '성공을 위해 노력해요.', 'Intermediate'],
        ['실패', 'Failure', '실패는 성공의 어머니입니다.', 'Intermediate'],
        ['행복', 'Happiness', '행복은 가까이에 있어요.', 'Intermediate'],
        ['슬픔', 'Sadness', '슬픔을 나누면 반이 됩니다.', 'Intermediate'],
        ['자유', 'Freedom', '자유를 원해요.', 'Intermediate'],
        ['평화', 'Peace', '세계 평화를 기원합니다.', 'Intermediate'],
        ['전쟁', 'War', '전쟁은 비극입니다.', 'Intermediate'],
        ['결혼', 'Marriage', '그들은 결혼을 약속했어요.', 'Intermediate'],
        ['졸업', 'Graduation', '졸업을 축하합니다.', 'Intermediate'],
        ['취직', 'Employment', '좋은 회사에 취직했어요.', 'Intermediate'],
        ['회의', 'Meeting', '오후에 회의가 있어요.', 'Intermediate'],
        ['서류', 'Document', '서류를 작성해주세요.', 'Intermediate'],
        ['계약', 'Contract', '계약을 체결했어요.', 'Intermediate'],
        ['월급', 'Salary', '월급날이 기다려져요.', 'Intermediate'],
        ['휴가', 'Vacation', '여름 휴가를 계획하고 있어요.', 'Intermediate'],

        // Advanced Level (Academic, political, specialized terms)
        ['민주주의', 'Democracy', '민주주의의 가치를 지켜야 합니다.', 'Advanced'],
        ['혁명', 'Revolution', '산업 혁명이 일어났습니다.', 'Advanced'],
        ['철학', 'Philosophy', '그는 철학을 전공했습니다.', 'Advanced'],
        ['심리학', 'Psychology', '인간의 심리를 연구합니다.', 'Advanced'],
        ['우주', 'Universe', '우주는 신비롭습니다.', 'Advanced'],
        ['인공지능', 'Artificial Intelligence', '인공지능 기술이 급격히 발달하고 있습니다.', 'Advanced'],
        ['기후변화', 'Climate Change', '기후변화는 심각한 문제입니다.', 'Advanced'],
        ['지속가능성', 'Sustainability', '지속가능한 발전을 추구해야 합니다.', 'Advanced'],
        ['국제관계', 'International Relations', '국제관계가 복잡해지고 있습니다.', 'Advanced'],
        ['인권', 'Human Rights', '인권은 보편적인 가치입니다.', 'Advanced'],
        ['헌법', 'Constitution', '헌법은 국가의 최고 법입니다.', 'Advanced'],
        ['재판', 'Trial', '공정한 재판을 받을 권리가 있습니다.', 'Advanced'],
        ['선거', 'Election', '선거에 참여합시다.', 'Advanced'],
        ['복지', 'Welfare', '복지 제도를 개선해야 합니다.', 'Advanced'],
        ['통일', 'Unification', '남북 통일을 희망합니다.', 'Advanced']
    ];

    const stmt = db.prepare('INSERT INTO vocabulary (korean_word, english_meaning, example_sentence, level) VALUES (?, ?, ?, ?)');

    let insertedCount = 0;

    db.serialize(() => {
        newVocabulary.forEach(item => {
            stmt.run(item, function (err) {
                if (err) {
                    console.error(`Error inserting ${item[1]}:`, err.message);
                } else {
                    insertedCount++;
                }
            });
        });

        stmt.finalize(() => {
            console.log(`Finished processing. Successfully inserted words.`);

            // Verify counts
            db.all('SELECT level, COUNT(*) as count FROM vocabulary GROUP BY level', [], (err, rows) => {
                if (err) {
                    console.error('Error verifying counts:', err);
                } else {
                    console.log('Current vocabulary stats:');
                    console.table(rows);
                }
                db.close();
            });
        });
    });
}
