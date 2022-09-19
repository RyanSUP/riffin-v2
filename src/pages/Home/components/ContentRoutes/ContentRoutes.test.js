import { render, screen } from "@testing-library/react";
import {MemoryRouter} from 'react-router-dom'
import ContentRoutes from './ContentRoutes'
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
const setTagBarTitle = () => null
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

test('/profile/:cognitoUsername renders ProfileContent component', ()=> {
  const mockUser = {
    value: {
      user: {
        username: 'JarJar_Binks',
        userDataKey: "pizza",
        profile: {},
        storage: {}
      }
    }
  }
  const component = (
    <UserContext.Provider {...mockUser}>
      <MemoryRouter initialEntries={['/profile/1']}>
        <ContentRoutes tags={tags} setTagBarTitle={setTagBarTitle} />
      </MemoryRouter>
    </UserContext.Provider>
  )
  render(component)
  expect(screen.getByTestId('ProfileContent')).toBeInTheDocument()
})

test.todo('Renders 404 on bad route')