import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Editor from "./Editor";

test('A tasty lick label loads on initialization', ()=> {
  render(<Editor />, {wrapper: BrowserRouter})
  expect(screen.getByPlaceholderText("A tasty lick")).toBeInTheDocument();
})

test('A bar should load on initialization', () => {
  render(<Editor />, {wrapper: BrowserRouter})
  expect(screen.getByPlaceholderText("a new bar")).toBeInTheDocument();
})

test.todo('Controls load on initialization')

test('Clicking new bar button adds a bar to the bargroup', async () => {
  render(<Editor />, {wrapper: BrowserRouter})
  const user = userEvent.setup()
  
  for(let i = 1; i < 5; i++) {
    await user.click(screen.getByLabelText(/new bar/i))
    const length = screen.getAllByPlaceholderText("a new bar").length
    expect(length).toBe(i + 1)
  }

})