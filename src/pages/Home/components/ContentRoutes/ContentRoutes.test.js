import { render, screen } from "@testing-library/react";
import {MemoryRouter} from 'react-router-dom'
import ContentRoutes from './ContentRoutes'
const tags = []

const renderContentRoutesWithMemoryWrapper = (entries) => render(
  <MemoryRouter initialEntries={entries}>
    <ContentRoutes tags={tags} />
  </MemoryRouter>
)

test('/login renders LoginSignupForm component', ()=> {
  renderContentRoutesWithMemoryWrapper(['/login'])
  expect(screen.getByText('Login')).toBeInTheDocument()
})

test.todo('Renders 404 on bad route')