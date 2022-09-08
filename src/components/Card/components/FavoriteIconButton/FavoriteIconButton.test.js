import { render, screen } from "@testing-library/react";
import FavoriteIconButton from "./FavoriteIconButton";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

const mockedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

test('navigates non users to login when clicked', async ()=> {
  render(<FavoriteIconButton isDisabled={false}/>, {wrapper: BrowserRouter})
  const user = userEvent.setup()
  await user.click(screen.getByRole('button'))
  expect(mockedNavigate).toHaveBeenCalledWith('/login');
})