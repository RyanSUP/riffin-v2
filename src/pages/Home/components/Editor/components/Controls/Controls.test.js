import { render, screen } from "@testing-library/react";
import Controls from './Controls'

test('save button renders', () => {
  render(<Controls />)
  expect(screen.getByLabelText(/save/i)).toBeInTheDocument()
})

test('make private button renders when isPublic is true', () => {
  render(<Controls isPublic={true} />)
  expect(screen.getByLabelText(/make private/i)).toBeInTheDocument()
})

test('new bar button renders', () => {
  render(<Controls />)
  expect(screen.getByLabelText(/new bar/i)).toBeInTheDocument()
})

test('shows delete button when allowDelete is true', ()=> {
  render(<Controls allowDelete={true} />)
  expect(screen.getByLabelText(/delete/i)).toBeInTheDocument()
})

test('does not show delete button when alloDelete is false', ()=> {
  render(<Controls allowDelete={false} />)
  expect(screen.queryByLabelText(/delete/i)).not.toBeInTheDocument()
})

test('"make public" button renders when isPublic is false', ()=> {
  render(<Controls isPublic={false} />)
  expect(screen.getByLabelText(/make public/i)).toBeInTheDocument()
})