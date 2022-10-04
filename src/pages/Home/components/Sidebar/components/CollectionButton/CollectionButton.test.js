import renderer from 'react-test-renderer';
import { render, screen } from "@testing-library/react";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import CollectionButton from './CollectionButton';
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import userEvent from "@testing-library/user-event";
import { TagProvider } from 'containers/TagProvider/TagProvider';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

it('variant is "text" when not at the collections route', () => {
  const component = (
    <MemoryRouter>
      <TagProvider>
        <CollectionButton />
      </TagProvider>
    </MemoryRouter>
  )
  const tree = renderer
    .create(component)
    .toJSON();
  expect(tree).toMatchSnapshot();
})

test('variant is "contained" when viewing owned collection', ()=> {
  const mockUser = {
    value: {
      user: {
        username: 'JarJar_Binks',
        userDataKey: "pizza",
        storage: {}
      }
    }
  }
  const component = (
    <MemoryRouter initialEntries={['/profile/JarJar_Binks']}>
      <UserContext.Provider {...mockUser}>
        <TagProvider>
          <CollectionButton />
        </TagProvider>
      </UserContext.Provider>
    </MemoryRouter>
  )

  const tree = renderer
  .create(component)
  .toJSON();
  expect(tree).toMatchSnapshot();
})

test('routes to the current users collection on click', async ()=> {
  const mockUser = {
    value: {
      user: {
        username: 'JarJar_Binks',
        userDataKey: "pizza",
        storage: {}
      }
    }
  }
  const component = (
    <BrowserRouter>
      <UserContext.Provider {...mockUser}>
        <TagProvider>
          <CollectionButton />
        </TagProvider>
      </UserContext.Provider>
    </BrowserRouter>
  )

  render(component)
  const user = userEvent.setup()
  await user.click(screen.getByRole('button'))
  expect(mockedNavigate).toHaveBeenCalledWith('/profile/JarJar_Binks');
})

test('routes to login on click when there is no user', async ()=> {
  const component = (
    <BrowserRouter>
      <TagProvider>
        <CollectionButton />
      </TagProvider>
    </BrowserRouter>
  )

  render(component)
  const user = userEvent.setup()
  await user.click(screen.getByRole('button'))
  expect(mockedNavigate).toHaveBeenCalledWith('/login');
})