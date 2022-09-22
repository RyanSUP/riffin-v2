import renderer from "react-test-renderer";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TagSuggestions from "./TagSuggestions";

const mockAddTag = jest.fn((tag) => tag);

test("renders correctly", () => {
  const tree = renderer.create(<TagSuggestions />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("clicking a button passes the tag to the onClick function", async () => {
  render(<TagSuggestions addTag={mockAddTag} />);
  const user = userEvent.setup();
  await user.click(screen.getByText("Tasters"));
  expect(mockAddTag).toHaveBeenCalledWith("Tasters");
});
