import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LoginForm from "./LoginForm";

test("has email and password fields", () => {
  render(<LoginForm />, { wrapper: BrowserRouter });
  expect(screen.getByLabelText("Email")).toBeInTheDocument();
  expect(screen.getByLabelText("Password")).toBeInTheDocument();
});

test('has "LOGIN" button', () => {
  render(<LoginForm />, { wrapper: BrowserRouter });
  expect(screen.getByTestId("login-button")).toBeInTheDocument();
});
