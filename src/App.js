import React, { useState } from "react";
import questions from "./data/questions";
import Quiz from "./Components/Quiz";
import Result from "./Components/Result";
import Home from "./Components/Home";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("home");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  
  const startQuiz = () => {
    setScreen("quiz");
    setCurrentQuestion(0);
    setScore(0);
  };

 
  const handleAnswer = (selectedOption) => {
    const currentQ = questions[currentQuestion];

    if (selectedOption === currentQ.answer) {
      setScore((prev) => prev + 1);
    }

    const next = currentQuestion + 1;

    if (next < questions.length) {
      setCurrentQuestion(next);
    } else {
      setScreen("result");
    }
  };

  
  const goHome = () => {
    setScreen("home");
  };

  
  const restartQuiz = () => {
    startQuiz();
  };

  return (
    <div className="app-container">
      {screen === "home" && <Home startQuiz={startQuiz} />}

      {screen === "quiz" && (
        <Quiz
          questionData={questions[currentQuestion]}
          currentQuestion={currentQuestion}
          total={questions.length}
          handleAnswer={handleAnswer}
        />
      )}

      {screen === "result" && (
        <Result
          score={score}
          total={questions.length}
          restartQuiz={restartQuiz}
          goHome={goHome}
        />
      )}
    </div>
  );
}

export default App;
