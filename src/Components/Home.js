import React from "react";

function Home({ startQuiz }) {
  return (
    <div className="home">
      <h1 className="title">🧠 Quiz Master</h1>
      <p className="subtitle">Test your knowledge in a fun way!</p>

      <button className="start-btn" onClick={startQuiz}>
        Start Quiz
      </button>
    </div>
  );
}

export default Home;
