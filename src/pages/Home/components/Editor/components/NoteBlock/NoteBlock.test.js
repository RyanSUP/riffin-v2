import NoteBlock from "./NoteBlock";
import { getNewNoteBlock } from "../../utils/EditorUtils";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("login form is rendered on load", () => {
  const block = getNewNoteBlock();
  const deleteBlock = jest.fn();
  render(<NoteBlock block={block} deleteBlock={deleteBlock} />);
  expect(screen.getByLabelText("Delete note")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Notes")).toBeInTheDocument();
});

test.todo("handle input");

test("deletes self", async () => {
  const blockA = getNewNoteBlock();
  const blockB = getNewNoteBlock();
  let blocks = [blockA, blockB];
  const deleteBlock = jest.fn(
    (index) => (blocks = blocks.filter((b, i) => i !== index))
  );

  render(<NoteBlock block={blockA} deleteBlock={deleteBlock} index={0} />);
  const user = userEvent.setup();
  await user.click(screen.getByLabelText("Delete note"));
  expect(deleteBlock.mock.calls.length).toBe(1);
  expect(blocks).toEqual([blockB]);
});
