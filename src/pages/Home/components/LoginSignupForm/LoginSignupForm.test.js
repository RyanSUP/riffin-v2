import { render, screen } from "@testing-library/react";
import LoginSignupForm from "./LoginSignupForm";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

test("login form is rendered on load", () => {
  render(<LoginSignupForm />, { wrapper: BrowserRouter });
  expect(screen.getByTestId(`LoginForm`)).toBeInTheDocument();
});

test('login form is paired with a "Sign up!" button', () => {
  render(<LoginSignupForm />, { wrapper: BrowserRouter });
  expect(screen.getByTestId(`LoginForm`)).toBeInTheDocument();
  expect(screen.getByText("Sign up!")).toBeInTheDocument();
});

test('clicking the "Sign up!" button shows the signup form with a button to go back to the login form', async () => {
  render(<LoginSignupForm />, { wrapper: BrowserRouter });
  const user = userEvent.setup();

  await user.click(screen.getByText("Sign up!"));
  expect(screen.getByText(/signup/i)).toBeInTheDocument();
  expect(screen.queryByTestId(`LoginForm`)).not.toBeInTheDocument();
  expect(screen.getByText(/log in!/i)).toBeInTheDocument();
});

test('clicking the "Log in!" button shows the login form', async () => {
  render(<LoginSignupForm />, { wrapper: BrowserRouter });
  const user = userEvent.setup();

  await user.click(screen.getByText("Sign up!"));
  expect(screen.getByText(/signup/i)).toBeInTheDocument();
  expect(screen.queryByTestId(`LoginForm`)).not.toBeInTheDocument();
  expect(screen.getByText(/log in!/i)).toBeInTheDocument();
  await user.click(screen.getByText(/log in!/i));
  expect(screen.getByTestId(`LoginForm`)).toBeInTheDocument();
  expect(screen.queryByTestId(/signup/i)).not.toBeInTheDocument();
});
