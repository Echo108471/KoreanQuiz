import React from 'react';

const koreanKeys = [
  'ㄱ','ㄲ', 'ㄴ', 'ㄷ','ㄸ', 'ㄹ', 'ㅁ', 'ㅂ','ㅃ', 'ㅅ','ㅆ', 'ㅇ', 'ㅈ','ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
  'ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅔ', 'ㅖ', 'ㅐ', 'ㅒ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ', 'Backspace'
];

// Keys are mapped onto buttons to create the virtual keyboard
// Only different keyboard is the backspace, hence the different styling for it
const Keyboard = ({ onKeyPress }) => {
  return (
    <div style={keyboardContainerStyle}>
      <div style={keyboardStyle}>
      {koreanKeys.map((key) => (
        <button
          key={key}
          onClick={() => onKeyPress(key)}
          style={key === 'Backspace' ? backspaceStyle : keyStyle}
        >
          {key}
        </button>
      ))}
      </div>
    </div>
  );
};

const keyboardContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '50vh',
};

const keyboardStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 50px)', 
  gap: '10px',
  margin: 'auto'
};

const keyStyle = {
  padding: '10px',
  fontFamily: 'Sans-Serif',
  fontSize: '20px',
};

const backspaceStyle = {
  padding: '5px 15px',
  fontSize: '17px',
  gridColumn: 'span 2',
};

export default Keyboard;
