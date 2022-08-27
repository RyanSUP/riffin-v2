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
  const length = screen.getAllByPlaceholderText("a new bar").length
  expect(length).toBe(1)
})

test('Controls load on initialization', ()=> {
  render(<Editor />, {wrapper: BrowserRouter})
  expect(screen.getByLabelText(/save/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/new bar/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/make private/i)).toBeInTheDocument()
})

test('Clicking new bar button adds a bar to the bargroup', async () => {
  render(<Editor />, {wrapper: BrowserRouter})
  const user = userEvent.setup()
  
  for(let i = 1; i < 5; i++) {
    await user.click(screen.getByLabelText(/new bar/i))
    const length = screen.getAllByPlaceholderText("a new bar").length
    expect(length).toBe(i + 1)
  }

})

test('user can toggle between public and private', async () => {
  render(<Editor />, {wrapper: BrowserRouter})
  const user = userEvent.setup()
  expect(screen.getByLabelText(/make private/i)).toBeInTheDocument()
  await user.click(screen.getByLabelText(/make private/i))
  expect(screen.getByLabelText(/make public/i)).toBeInTheDocument()
  expect(screen.queryByLabelText(/make private/i)).not.toBeInTheDocument()
  await user.click(screen.getByLabelText(/make public/i))
  expect(screen.getByLabelText(/make private/i)).toBeInTheDocument()
  expect(screen.queryByLabelText(/make public/i)).not.toBeInTheDocument()
})

test('delete a bar removes a bar from the bars array', async () => {
  render(<Editor />, {wrapper: BrowserRouter})
  const user = userEvent.setup()
  
  for(let i = 1; i < 5; i++) {
    await user.click(screen.getByLabelText(/new bar/i))
    const length = screen.getAllByPlaceholderText("a new bar").length
    expect(length).toBe(i + 1)
  }

  await user.click(screen.getAllByLabelText(/delete bar/i))[0]
  const length = screen.getAllByPlaceholderText("a new bar").length
  expect(length).toBe(5)
})