import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import Results from './components/Results';
import './App.css';

function App() {
  //  three distinct states 
  const [gameState, setGameState] = useState('START_SCREEN');
  const [score, setScore] = useState(0);
  const [config, setConfig] = useState({ category: '9', difficulty: 'medium' });

  const startQuiz = (selectedConfig) => {
    setConfig(selectedConfig);
    setScore(0);
    setGameState('QUIZ_ACTIVE');
  };

  const endQuiz = (finalScore) => {
    setScore(finalScore);
    setGameState('RESULTS_SCREEN');
  };

  return (
    <div className="app-container">
      {gameState === 'START_SCREEN' && (
        <StartScreen onStart={startQuiz} />
      )}
      {gameState === 'QUIZ_ACTIVE' && (
        <Quiz config={config} onEnd={endQuiz} />
      )}
      {gameState === 'RESULTS_SCREEN' && (
        <Results score={score} onRestart={() => setGameState('START_SCREEN')} />
      )}
    </div>
  );
}

export default App;