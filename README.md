# 🇰🇷 Korean Vocabulary Quiz

An interactive web application for learning Korean vocabulary with a virtual Korean keyboard. Test your knowledge, track your progress, and improve your Korean language skills!

## 🎥 Demo

https://www.youtube.com/watch?v=9quqF8QYDKc

## ✨ Features

### 🎯 Core Features
- **Virtual Korean Keyboard**: Click buttons to type in Korean (Hangul)
- **Physical Keyboard Support**: Type using your physical keyboard with automatic Korean character mapping
- **Real-time Feedback**: Instant visual feedback for correct/incorrect answers
- **Auto-advance**: Automatically moves to the next question after correct answers

### 📊 Progress Tracking
- **Score Counter**: Track how many words you've gotten correct
- **Streak Tracker**: Monitor your consecutive correct answers 🔥
- **Accuracy Percentage**: See your overall performance

### 🎓 Learning Tools
- **Difficulty Levels**: Choose from Beginner, Intermediate, or Advanced vocabulary
- **Hint System**: Get help with the first character of the answer
- **Skip Option**: Move to the next word if you're stuck
- **40+ Vocabulary Words**: Comprehensive word list across all levels

### 🎨 User Experience
- **Modern UI**: Clean, responsive design with smooth animations
- **Color-coded Feedback**: Green for correct, red for incorrect
- **Responsive Layout**: Works on desktop and mobile devices
- **Loading States**: Visual feedback during data fetching

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Echo108471/KoreanQuiz.git
   cd KoreanQuiz
   ```

2. **Install all dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   cd ..
   ```

### Running the Application

**Option 1: Use the automated start script (Windows)**
```powershell
.\start.ps1
```

**Option 2: Manual start**

1. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   The server will run on `http://localhost:5000`

2. **Start the frontend (in a new terminal)**
   ```bash
   cd frontend
   npm run dev
   ```
   The app will run on `http://localhost:5173`

3. **Open your browser** and navigate to `http://localhost:5173`

## 🎮 How to Use

1. **Select a Difficulty**: Choose from All Levels, Beginner, Intermediate, or Advanced
2. **Read the English Word**: Look at the word you need to translate
3. **Type in Korean**: Use either:
   - Virtual keyboard (click buttons)
   - Physical keyboard (type using Korean character mapping)
4. **Submit Your Answer**: Click "Check Answer" or press Enter
5. **Get Feedback**: See if you're correct and learn from mistakes
6. **Track Progress**: Monitor your score, streak, and accuracy

### Keyboard Shortcuts
- **Enter**: Submit your answer
- **Backspace**: Delete last character
- **Physical Keys**: Mapped to Korean characters (e.g., 'r' = ㄱ, 'k' = ㅏ)

## 🛠️ Technology Stack

### Frontend
- **React**: UI framework
- **Vite**: Build tool and dev server
- **TailwindCSS**: Utility-first CSS framework
- **Hangul.js**: Korean character composition/decomposition
- **Axios**: HTTP client for API requests

### Backend
- **Express.js**: Web server framework
- **SQLite3**: Lightweight database
- **CORS**: Cross-origin resource sharing

## 📁 Project Structure

```
KoreanQuiz/
├── frontend/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── InputArea.jsx      # Display user input
│   │   │   ├── Keyboard.jsx       # Virtual Korean keyboard
│   │   │   └── Settings.jsx       # Settings modal
│   │   ├── App.jsx                # Main application
│   │   └── index.css              # Tailwind CSS imports
│   ├── public/                    # Static assets
│   ├── index.html                 # HTML template
│   ├── package.json               # Frontend dependencies
│   ├── tailwind.config.js         # Tailwind configuration
│   ├── postcss.config.js          # PostCSS configuration
│   └── vite.config.js             # Vite configuration
├── backend/
│   ├── server.js                  # Express server
│   ├── vocabulary.db              # SQLite database
│   └── package.json               # Backend dependencies
├── package.json                   # Root package (monorepo)
├── start.ps1                      # Automated start script
└── README.md                      # Documentation
```

## 🎯 API Endpoints

- `GET /api/vocabulary` - Get all vocabulary words
- `GET /api/vocabulary/random` - Get a random word
- `GET /api/vocabulary/random?level=Beginner` - Get random word by difficulty
- `GET /api/vocabulary/stats` - Get vocabulary statistics

## 🔧 Configuration

### Adding New Vocabulary

Edit `backend/server.js` and add words to the `insertInitialVocabulary()` function:

```javascript
['한글', 'Hangul', '한글은 한국어 문자입니다.', 'Beginner']
```

### Changing Port

Backend port can be changed via environment variable:
```bash
PORT=3000 npm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Future Enhancements

- [ ] Sound effects for correct/incorrect answers
- [ ] User authentication and progress saving
- [ ] Spaced repetition algorithm
- [ ] More vocabulary categories
- [ ] Pronunciation audio
- [ ] Mobile app version
- [ ] Multiplayer quiz mode

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Eugene Cho**
- GitHub: [@Echo108471](https://github.com/Echo108471)

## 🙏 Acknowledgments

- Korean vocabulary sourced from various educational materials
- Hangul.js library for Korean character processing
- React and Vite communities for excellent documentation

---

**Happy Learning! 화이팅! (Fighting!)** 🎓📚
