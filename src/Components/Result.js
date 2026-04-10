import React from "react";
import Confetti from "react-confetti";

function Result({ score, total, restartQuiz, goHome }) {
  const percentage = (score / total) * 100;
  const isHighScore = percentage >= 70;

  const getMessage = () => {
    if (percentage === 100) return "🔥 Perfect Score!";
    if (percentage >= 70) return "👏 Great Job!";
    if (percentage >= 40) return "🙂 Good effort!";
    return "😅 Keep Practicing!";
  };

  return (
    <div className="result-container">
      {isHighScore && <Confetti />}

      <h1 className="result-title">Quiz Completed</h1>

      <div className="score-circle">
        <span>{score}</span>
        <small>/{total}</small>
      </div>

      <p className="message">{getMessage()}</p>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <p className="percentage">{percentage.toFixed(0)}%</p>

      <div className="actions">
        <button className="restart-btn" onClick={restartQuiz}>
          Restart Quiz
        </button>

        <button className="home-btn" onClick={goHome}>
          Go Home
        </button>
      </div>
    </div>
  );
}

export default Result;
