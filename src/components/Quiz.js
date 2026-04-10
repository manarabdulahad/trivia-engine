import React, { useState, useEffect, useCallback } from 'react';

function Quiz({ config, onEnd }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(""); 
  const [error, setError] = useState(null); 

  const shuffle = useCallback((array) => {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }, []);

  const prepareAnswers = useCallback((questionObj) => {
    const allAnswers = [
      questionObj.correct_answer,
      ...questionObj.incorrect_answers
    ];
    setShuffledAnswers(shuffle(allAnswers));
  }, [shuffle]);

  useEffect(() => {
    const url = `https://opentdb.com/api.php?amount=10&category=${config.category}&difficulty=${config.difficulty}&type=multiple`;
    
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then(data => {
        if (data.response_code === 0 && data.results.length > 0) {
          setQuestions(data.results);
          prepareAnswers(data.results[0]);
          setLoading(false);
        } else {
          setError("Trivia content currently unavailable, please try again later.");
          setLoading(false);
        }
      })
      .catch(() => {
        setError("Trivia content currently unavailable, please try again later.");
        setLoading(false);
      });
  }, [config, prepareAnswers]);

  // handleNext wrapped in useCallback to fix Vercel/ESLint dependency errors
  const handleNext = useCallback((isCorrect) => {
    const feedbackClass = isCorrect ? "flash-correct" : "shake-wrong";
    setFeedback(feedbackClass);
    
    if (isCorrect) {
      setScore(prev => prev + 10);
      const ding = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
      ding.volume = 0.5;
      ding.play().catch(() => console.log("Sound blocked"));
    }

    setTimeout(() => {
      setFeedback("");
      const nextIndex = currentIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentIndex(nextIndex);
        prepareAnswers(questions[nextIndex]);
        setTimeLeft(15);
      } else {
        onEnd(score + (isCorrect ? 10 : 0));
      }
    }, 600);
  }, [currentIndex, questions, score, onEnd, prepareAnswers]);

  useEffect(() => {
    if (loading || error || feedback) return;

    if (timeLeft === 0) {
      handleNext(false); 
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer); 
  }, [timeLeft, loading, error, feedback, handleNext]); 

  if (error) {
    return (
      <div className="quiz-box">
        <h2 style={{ color: '#f44336' }}>{error}</h2>
        <button className="start-btn" onClick={() => window.location.reload()}>Go Back</button>
      </div>
    );
  }

  if (loading) return <div className="quiz-box"><h2>Loading...</h2></div>;

  return (
    <div className={`quiz-box ${feedback}`}>
      <div className="stats-bar">
        <span className={timeLeft < 5 ? "timer-warning" : ""}>⏳ {timeLeft}s</span>
        <span>Score: {score}</span>
      </div>
      
      <h2 dangerouslySetInnerHTML={{ __html: questions[currentIndex].question }} />
      
      <div className="answers-grid">
        {shuffledAnswers.map((answer, i) => (
          <button 
            key={i} 
            className="answer-btn"
            disabled={feedback !== ""}
            onClick={() => handleNext(answer === questions[currentIndex].correct_answer)}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
    </div>
  );
}

export default Quiz;
