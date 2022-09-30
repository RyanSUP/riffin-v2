// MUI
import { TextareaAutosize } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useContext } from "react";
import { RiffinEditorDispatch } from "pages/Home/components/RiffinEditor/RiffinEditor";

const NoteTextarea = (props) => {
  const theme = useTheme();
  const dispatcher = useContext(RiffinEditorDispatch);
  const inputsStyle = {
    width: "60%",
    background: "transparent",
    margin: 0,
    resize: "none",
    outline: "none",
    border: "none",
    borderLeft: "1px solid",
    color: theme.palette.primary.main,
    fontSize: "1.2rem",
  };

  const handleChange = (event) => {
    event.preventDefault()
    const action = {
      type: 'updateBlockLabel',
      value: event.target.value,
      index: props.index
    }
    dispatcher(action);
  }


  return (
      <TextareaAutosize
        spellcheck="false"
        style={inputsStyle}
        minRows={1}
        value={props.label}
        onChange={handleChange}
        placeholder={"Notes"}
      />
  );
}
 
export default NoteTextarea;