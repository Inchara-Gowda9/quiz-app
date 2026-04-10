import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders home screen on initial load', () => {
  render(<App />);
  expect(screen.getByText(/🧠 Quiz Master/i)).toBeInTheDocument();
  expect(screen.getByText(/Test your knowledge in a fun way!/i)).toBeInTheDocument();
  expect(screen.getByText(/Start Quiz/i)).toBeInTheDocument();
});

test('renders quiz screen after clicking start', () => {
  render(<App />);
  const startBtn = screen.getByText(/Start Quiz/i);
  fireEvent.click(startBtn);
  expect(screen.getByText(/1 \/ 10/i)).toBeInTheDocument();
});
