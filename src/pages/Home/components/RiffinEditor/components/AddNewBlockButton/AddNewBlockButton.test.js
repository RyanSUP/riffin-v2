import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import AddNewBlockButton from './AddNewBlockButton'

test('button enabled when numberOfBlocks props < MAX_BLOCKS', () => {
  // ARRANGE
  render(<AddNewBlockButton numberOfBlocks={6}/>)
  // ASSERT
  expect(screen.getByRole('button')).toBeEnabled();
})

test('button disabled when numberOfBlocks props === MAX_BLOCKS', () => {
  // ARRANGE
  render(<AddNewBlockButton numberOfBlocks={12}/>)
  // ASSERT
  expect(screen.getByRole('button')).toBeDisabled();
})

test('button disabled when numberOfBlocks props >= MAX_BLOCKS', () => {
  // ARRANGE
  render(<AddNewBlockButton numberOfBlocks={13}/>)
  // ASSERT
  expect(screen.getByRole('button')).toBeDisabled();
})