import AddNoteBlockButton from "./AddNoteBlockButton";
import { testTab } from "utils/TestUtils/TestUtils";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

test("adds a note block to the editor", async () => {
  const tablature = { ...testTab };
  const refreshTablatureObject = jest.fn();
  render(
    <AddNoteBlockButton
      tablature={tablature}
      refreshTablatureObject={refreshTablatureObject}
    />
  );

  const user = userEvent.setup();
  await user.click(screen.getByRole("button"));
  expect(refreshTablatureObject.mock.calls.length).toBe(1);
  expect(tablature.blocks.length).toBe(3);
});
