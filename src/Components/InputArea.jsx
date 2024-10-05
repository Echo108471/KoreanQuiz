import React from 'react';

const InputArea = ({ input }) => {
  return (
    <div style={inputStyle}>
      <h2>{input}</h2>
    </div>
  );
};

const inputStyle = {
  padding: '20px',
  border: '1px solid black',
  minHeight: '50px',
};

export default InputArea;
