import { render, screen } from "@testing-library/react"
import Bar from './Bar'

test('Bar renders both "inputs" and "dashes" text areas', () => {
  const barData = {
    inputs: 'test inputs',
    dashes: 'test dashes',
  }
  render(<Bar barData={barData} />)
  expect(screen.getByText('test inputs')).toBeInTheDocument()
  expect(screen.getByText('test dashes')).toBeInTheDocument()
})