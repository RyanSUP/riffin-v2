import { render, screen } from "@testing-library/react"
import Header from './Header'

test('header does not render edit button if showOwnerControls is false', ()=> {
  render(<Header showOwnerControls={false} />)
  expect(screen.queryByTestId('EditIcon')).not.toBeInTheDocument()
})

test('header renders like button', ()=> {
  render(<Header />)
  expect(screen.getByTestId('FavoriteBorderIcon')).toBeInTheDocument()
})

test('header renders share button', ()=> {
  render(<Header />)
  expect(screen.getByTestId('ShareIcon')).toBeInTheDocument()
})

test('header renders OpenInFullIcon when isExpanded is false', ()=> {
  render(<Header isExpanded={false} />)
  expect(screen.getByTestId('OpenInFullIcon')).toBeInTheDocument()
})

test('header renders edit button if showOwnerControls is true', ()=> {
  render(<Header showOwnerControls={true} />)
  expect(screen.getByTestId('EditIcon')).toBeInTheDocument()
})

test('header renders CloseFullscreenRoundedIcon when isExpanded is true', async ()=> {
  render(<Header isExpanded={true}/>)
  expect(screen.getByTestId('CloseFullscreenRoundedIcon')).toBeInTheDocument()
})