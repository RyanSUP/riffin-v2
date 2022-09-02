import { render, screen } from '@testing-library/react'
import FavoriteIconButton from './FavoriteIconButton'

test('FavoriteIconButton is disabled if isDisabled is true', ()=> {
  render(<FavoriteIconButton isDisabled={true}/>)
  const button = screen.getByRole('button')
  expect(button).toHaveAttribute('disabled')
})

test('FavoriteIconButton is enabled if isDisabled is false', ()=> {
  render(<FavoriteIconButton isDisabled={false}/>)
  const button = screen.getByRole('button')
  expect(button).not.toHaveAttribute('disabled')
})