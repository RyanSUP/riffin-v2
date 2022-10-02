import AddNewBlockButton from "./AddNewBlockButton";
import { testTab } from "utils/TestUtils/TestUtils";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

test.todo('adds a note block to the editor')

test('is disabled when maximum number of blocks are reached', () => {
  render(<AddNewBlockButton numberOfBlocks={12}/>)
  expect(screen.getByText("You've reached the limit, dude!")).toBeInTheDocument();
})