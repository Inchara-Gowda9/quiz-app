import React, { useEffect, useState } from "react";

function Quiz({
  questionData,
  handleAnswer,
  currentQuestion,
  total,
}) {
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    setTimeLeft(10);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          handleAnswer(null); // auto skip
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, handleAnswer]);

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <span>
          {currentQuestion + 1} / {total}
        </span>
        <span className="timer">⏱️ {timeLeft}s</span>
      </div>

      <h2 className="question">{questionData.question}</h2>

      <div className="options">
        {questionData.options.map((option, index) => (
          <button
            key={index}
            className="option"
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
