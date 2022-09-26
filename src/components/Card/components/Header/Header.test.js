import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Header from './Header'
import { testTab } from "utils/TestUtils/TestTabObject"

test('does not render edit button if isOwnedByUser is false', ()=> {
  render(<Header tabData={testTab} user={{username: 'test'}} isOwnedByUser={false} />, {wrapper: BrowserRouter})
  expect(screen.queryByTestId('EditIcon')).not.toBeInTheDocument()
})

test('renders share button', ()=> {
  render(<Header tabData={testTab} user={{username: 'test'}} />, {wrapper: BrowserRouter})
  expect(screen.getByTestId('ShareIcon')).toBeInTheDocument()
})

test('renders OpenInFullIcon when isExpanded is false', ()=> {
  render(<Header tabData={testTab} user={{username: 'test'}} isExpanded={false} />, {wrapper: BrowserRouter})
  expect(screen.getByTestId('OpenInFullIcon')).toBeInTheDocument()
})

test('renders edit button if isOwnedByUser is true', ()=> {
  render(<Header tabData={testTab} user={{username: 'test'}} isOwnedByUser={true} />, {wrapper: BrowserRouter})
  expect(screen.getByTestId('EditIcon')).toBeInTheDocument()
})

test('renders CloseFullscreenRoundedIcon when isExpanded is true', async ()=> {
  render(<Header tabData={testTab} user={{username: 'test'}} isExpanded={true}/>, {wrapper: BrowserRouter})
  expect(screen.getByTestId('CloseFullscreenRoundedIcon')).toBeInTheDocument()
})