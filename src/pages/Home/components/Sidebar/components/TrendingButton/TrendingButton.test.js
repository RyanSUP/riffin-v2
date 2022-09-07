import renderer from 'react-test-renderer';
import { render, screen } from "@testing-library/react";
import TrendingButton from './TrendingButton';
import {BrowserRouter, MemoryRouter} from 'react-router-dom'
import userEvent from "@testing-library/user-event";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

test('variant is "text" when not viewing trending', ()=> {
  const component = (
    <MemoryRouter initialEntries={['/latest']}>
      <TrendingButton />
    </MemoryRouter>
  )
  const tree = renderer
    .create(component)
    .toJSON();
  expect(tree).toMatchSnapshot();
})

test('variant changes to "contained" when viewing trending', () => {

  const component = (
    <MemoryRouter initialEntries={['/trending']}>
      <TrendingButton />
    </MemoryRouter>
  )

  const tree = renderer
  .create(component)
  .toJSON();
  expect(tree).toMatchSnapshot();
})

test('routes to trending on click', async ()=> {
  const component = (
    <BrowserRouter>
      <TrendingButton />
    </BrowserRouter>
  )

  render(component)
  const user = userEvent.setup()
  await user.click(screen.getByRole('button'))
  expect(mockedNavigate).toHaveBeenCalledWith('/trending');
})