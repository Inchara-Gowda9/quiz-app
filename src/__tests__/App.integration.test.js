import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

test("complete quiz flow", () => {
  render(<App />);

  // Start Quiz
  const startBtn = screen.getByText(/Start Quiz/i);
  fireEvent.click(startBtn);

  // Check question
  expect(screen.getByText(/1 \/ 10/i)).toBeInTheDocument();

  // Answer questions
  for (let i = 0; i < 10; i++) {
    const options = screen.getAllByRole("button");
    fireEvent.click(options[0]);
  }

  // Result page
  expect(screen.getByText(/Quiz Completed/i)).toBeInTheDocument();
});
