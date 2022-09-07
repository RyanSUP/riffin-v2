import renderer from 'react-test-renderer';
import { render, screen } from "@testing-library/react";
import LatestButton from './LatestButton';
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import userEvent from "@testing-library/user-event";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

test('variant is "text" when not viewing latest', ()=> {
  const component = (
    <MemoryRouter initialEntries={['/profile']}>
      <LatestButton />
    </MemoryRouter>
  )
  const tree = renderer
    .create(component)
    .toJSON();
  expect(tree).toMatchSnapshot();
})

test('variant changes to "contained" when viewing latest', () => {

  const component = (
    <MemoryRouter initialEntries={['/latest']}>
      <LatestButton />
    </MemoryRouter>
  )

  const tree = renderer
  .create(component)
  .toJSON();
  expect(tree).toMatchSnapshot();
})

test('routes to latest on click', async ()=> {
  const component = (
    <BrowserRouter>
      <LatestButton />
    </BrowserRouter>
  )

  render(component)
  const user = userEvent.setup()
  await user.click(screen.getByRole('button'))
  expect(mockedNavigate).toHaveBeenCalledWith('/latest');
})