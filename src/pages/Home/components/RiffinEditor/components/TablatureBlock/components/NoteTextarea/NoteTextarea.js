// Components / hooks
import { useContext } from "react";
import { RiffinEditorDispatch } from "pages/Home/components/RiffinEditor/RiffinProvider";
// MUI
import { TextareaAutosize } from "@mui/material";
import Typography from "@mui/material/Typography";

/**
 * * NoteTextarea is the textarea above the tablature. It allows users to take multi-line notes. The length of the textarea fills up the space between the container's left edge and the right edge of the Options button.
 */

const NoteTextarea = (props) => {
  const { dispatch } = useContext(RiffinEditorDispatch);
  const inputsStyle = {
    width: "100%",
    background: "transparent",
    margin: 0,
    resize: "none",
    outline: "none",
    border: "none",
    color: "white",
    fontSize: "16px",
    padding: 0,
    whiteSpace: "pre-line",
  };

  /**
   * Sends a dispatch to update the selected block. The new selected block will be whichever block is handling the click.
   * @param {Object} event
   */
  const handleClick = (event) => {
    const action = {
      type: "updateSelection",
      blockIndex: props.index,
      blockRef: null,
      selectionStart: event.target.selectionStart,
    };
    dispatch(action);
  };

  /**
   * Updates the value of the block's label property when a user types in the Textarea.
   * @param {Object} event - needed so it can be prevented.
   */
  const handleChange = (event) => {
    event.preventDefault();
    const action = {
      type: "updateBlockLabel",
      value: event.target.value,
      index: props.index,
    };
    dispatch(action);
  };

  return (
    <Typography>
      <TextareaAutosize
        spellCheck="false"
        style={inputsStyle}
        minRows={2}
        value={props.label}
        onClick={handleClick}
        onChange={handleChange}
        placeholder={"Notes.\nTake as many lines as you need."}
      />
    </Typography>
  );
};

export default NoteTextarea;
