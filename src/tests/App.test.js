import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

test("renders first question after starting quiz", () => {
  render(<App />);
  
  // Start quiz
  const startBtn = screen.getByText(/Start Quiz/i);
  fireEvent.click(startBtn);
  
  // Check we're on question 1
  expect(screen.getByText(/1 \/ 10/i)).toBeInTheDocument();
});

test("moves to next question after clicking answer", () => {
  render(<App />);

  // Start quiz
  const startBtn = screen.getByText(/Start Quiz/i);
  fireEvent.click(startBtn);

  // Click first answer option
  const options = screen.getAllByRole("button");
  const firstAnswerBtn = options[0];
  fireEvent.click(firstAnswerBtn);

  // Check we're on question 2
  expect(screen.getByText(/2 \/ 10/i)).toBeInTheDocument();
});
