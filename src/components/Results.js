import React, { useState, useEffect } from 'react';

function Results({ score, onRestart }) {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Retrieved data from localStorage 
    const savedScores = JSON.parse(localStorage.getItem('triviaScores')) || [];
    
    // Add current score and keep top 5 
    const updatedScores = [...savedScores, score]
      .sort((a, b) => b - a)
      .slice(0, 5);

    // Save data back to localStorage 
    localStorage.setItem('triviaScores', JSON.stringify(updatedScores));
    setLeaderboard(updatedScores);
  }, [score]);

  return (
    <div className="results-container">
      <h1>Game Over!</h1>
      <p>Your Score: {score}</p>
      <h3>🏆 Top 5 High Scores</h3>
      <ul>
        {leaderboard.map((s, i) => (
          <li key={i}>#{i + 1}: {s} points</li>
        ))}
      </ul>
      <button className="start-btn" onClick={onRestart}>Play Again</button>
    </div>
  );
}

export default Results;