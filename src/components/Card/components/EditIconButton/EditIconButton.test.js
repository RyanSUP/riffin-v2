import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditButtonIcon from "./EditIconButton";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

test("clicking the edit button navigates to the edit component", async () => {
  render(<EditButtonIcon tab_id={2} />);
  const user = userEvent.setup();
  await user.click(screen.getByLabelText("Edit"));
  expect(mockedNavigate).toHaveBeenCalledWith("/edit/2");
});
