import { render, screen } from "@testing-library/react"
import Card from './Card'
import userEvent from "@testing-library/user-event";

import { BrowserRouter } from 'react-router-dom'
const testTab = {
  tags: [],
  name: 'test bar name',
  bars: [{
    label: 'test bar',
    inputs: 'test inputs',
    dashes: 'test dashes',
  }]
}
const testAuthor = {
  user: 'testUser',
  preferredUsername: 'JarJar_Binks',
}

test('card renders header', () => {
  render(<Card tabData={testTab} authorData={testAuthor} />, {wrapper: BrowserRouter})
  expect(screen.getByText('test bar name')).toBeInTheDocument()
  expect(screen.getByTestId('FavoriteBorderIcon')).toBeInTheDocument()
  expect(screen.getByTestId('ShareIcon')).toBeInTheDocument()
  expect(screen.getByTestId('OpenInFullIcon')).toBeInTheDocument()
})

test('card renders content', ()=> {
  render(<Card tabData={testTab} authorData={testAuthor} />, {wrapper: BrowserRouter})
  expect(screen.getByText('test inputs')).toBeInTheDocument()
})

test('card renders footer', ()=> {
  render(<Card tabData={testTab} authorData={testAuthor} />, {wrapper: BrowserRouter})
  expect(screen.getByText('by JarJar_Binks')).toBeInTheDocument()
})

test('expand button toggles between OpenInFullIcon and CloseFullscreenRoundedIcon when clicked by the user', async ()=> {
  render(<Card tabData={testTab} authorData={testAuthor} />, {wrapper: BrowserRouter})
  const user = userEvent.setup()

  await user.click(screen.getByTestId('OpenInFullIcon'))
  expect(screen.getByTestId('CloseFullscreenRoundedIcon')).toBeInTheDocument()
})