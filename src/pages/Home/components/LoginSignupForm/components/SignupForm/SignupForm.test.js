import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignupForm from "./SignupForm";

test('has email, username, and password fields', () => {
  render(<SignupForm />, {wrapper: BrowserRouter})
  expect(screen.getByLabelText('Email')).toBeInTheDocument();
  expect(screen.getByLabelText('Password')).toBeInTheDocument();
  expect(screen.getByLabelText('Username')).toBeInTheDocument();
})

// test('has "SIGNUP" button', () => {
//   render(<SignupForm />, {wrapper: BrowserRouter})
//   expect(screen.getByTestId('signup-button')).toBeInTheDocument()
// })