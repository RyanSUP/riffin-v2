// Components / hooks
import { useContext } from "react";
import { RiffinEditorDispatch } from "pages/Home/components/RiffinEditor/RiffinEditor";
// MUI
import { TextareaAutosize } from "@mui/material";

/**
 * * NoteTextarea is the textarea above the tablature. It allows users to take multi-line notes. The length of the textarea fills up the space between the container's left edge and the right edge of the Options button.
 */

const NoteTextarea = (props) => {
  const dispatcher = useContext(RiffinEditorDispatch);
  const inputsStyle = {
    width: "60%",
    background: "transparent",
    margin: 0,
    resize: "none",
    outline: "none",
    border: "none",
    color: "white",
    fontSize: "inherit",
    padding: 0
  };

  /**
   * Updates the value of the block's label property when a user types in the Textarea.
   * @param {Object} event - needed so it can be prevented.
   */
  const handleChange = (event) => {
    event.preventDefault();
    const action = {
      type: 'updateBlockLabel',
      value: event.target.value,
      index: props.index
    };
    dispatcher(action);
  };

  return (
    <TextareaAutosize
      spellCheck="false"
      style={inputsStyle}
      minRows={2}
      value={props.label}
      onChange={handleChange}
      placeholder={"Notes.\nAs many lines as you need, almost."}
    />
  );
}
 
export default NoteTextarea;