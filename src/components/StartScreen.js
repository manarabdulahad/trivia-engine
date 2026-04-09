import React, { useState } from 'react';

function StartScreen({ onStart }) {
  const [category, setCategory] = useState('9'); 
  const [difficulty, setDifficulty] = useState('medium');

  return (
    <div className="start-screen">
      <h1>🏆 Grand Master Trivia</h1>
      <p>Select your challenge to begin:</p>
      
      <div className="form-group">
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="9">General Knowledge</option>
          <option value="18">Computer Science</option>
          <option value="23">History</option>
          <option value="21">Sports</option>
        </select>
      </div>

      <div className="form-group">
        <label>Difficulty:</label>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <button className="start-btn" onClick={() => onStart({ category, difficulty })}>
        START GAME
      </button>
    </div>
  );
}

export default StartScreen;