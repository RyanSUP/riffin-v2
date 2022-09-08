import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Header from './Header'

test('header does not render edit button if isOwnedByUser is false', ()=> {
  render(<Header tabData={{name: 'test'}} user={{username: 'test'}} isOwnedByUser={false} />, {wrapper: BrowserRouter})
  expect(screen.queryByTestId('EditIcon')).not.toBeInTheDocument()
})

test('header renders like button', ()=> {
  render(<Header tabData={{name: 'test'}} user={{username: 'test'}} />, {wrapper: BrowserRouter})
  expect(screen.getByTestId('FavoriteBorderIcon')).toBeInTheDocument()
})

test('header renders share button', ()=> {
  render(<Header tabData={{name: 'test'}} user={{username: 'test'}} />, {wrapper: BrowserRouter})
  expect(screen.getByTestId('ShareIcon')).toBeInTheDocument()
})

test('header renders OpenInFullIcon when isExpanded is false', ()=> {
  render(<Header tabData={{name: 'test'}} user={{username: 'test'}} isExpanded={false} />, {wrapper: BrowserRouter})
  expect(screen.getByTestId('OpenInFullIcon')).toBeInTheDocument()
})

test('header renders edit button if isOwnedByUser is true', ()=> {
  render(<Header tabData={{name: 'test'}} user={{username: 'test'}} isOwnedByUser={true} />, {wrapper: BrowserRouter})
  expect(screen.getByTestId('EditIcon')).toBeInTheDocument()
})

test('header renders CloseFullscreenRoundedIcon when isExpanded is true', async ()=> {
  render(<Header tabData={{name: 'test'}} user={{username: 'test'}} isExpanded={true}/>, {wrapper: BrowserRouter})
  expect(screen.getByTestId('CloseFullscreenRoundedIcon')).toBeInTheDocument()
})