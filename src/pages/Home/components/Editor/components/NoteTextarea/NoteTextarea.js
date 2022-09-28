// MUI
import { TextareaAutosize } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const NoteTestarea = (props) => {
  const theme = useTheme();

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
    props.block.label = event.target.value
    props.refreshTablatureObject()
  }


  return (
      <TextareaAutosize
        spellCheck="false"
        style={inputsStyle}
        minRows={1}
        value={props.block.label}
        onChange={handleChange}
        placeholder={"Notes"}
      />
  );
}
 
export default NoteTestarea;