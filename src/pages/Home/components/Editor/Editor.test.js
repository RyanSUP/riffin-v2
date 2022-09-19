import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Editor from "./Editor";

const setTagBarTitle = () => null
const tags = []

test('A tasty lick label loads on initialization', ()=> {
  render(<Editor tags={tags} setTagBarTitle={setTagBarTitle} />, {wrapper: BrowserRouter})
  expect(screen.getByPlaceholderText("A tasty lick")).toBeInTheDocument();
})

test('loads a tablatureblock on initialization', () => {
  render(<Editor tags={tags} setTagBarTitle={setTagBarTitle} />, {wrapper: BrowserRouter})
  const length = screen.getAllByPlaceholderText("label").length
  expect(length).toBe(1)
})

test('Controls load on initialization', ()=> {
  render(<Editor tags={tags} setTagBarTitle={setTagBarTitle} />, {wrapper: BrowserRouter})
  expect(screen.getByLabelText(/save/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/add tablature block/i)).toBeInTheDocument()
  expect(screen.getByLabelText(/add note block/i)).toBeInTheDocument()
})

test('Clicking add tablature block button adds a tablature block to the editor', async () => {
  render(<Editor tags={tags} setTagBarTitle={setTagBarTitle} />, {wrapper: BrowserRouter})
  const user = userEvent.setup()
  
  for(let i = 1; i < 5; i++) {
    await user.click(screen.getByLabelText(/add tablature block/i))
    const length = screen.getAllByPlaceholderText("label").length
    expect(length).toBe(i + 1)
  }
})

test.todo('delete removes a block from the blocks array')