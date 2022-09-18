// MUI
import { TextareaAutosize } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const NoteBlock = (props) => {

  const theme = useTheme();

  const inputsStyle = {
    width: "100%",
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
    props.block.inputs = event.target.value
    props.refreshTablatureObject();
  }

  return (
    <TextareaAutosize
      style={inputsStyle}
      minRows={3}
      maxCols={60}
      placeholder={"Notes"}
      value={props.block.inputs}
      onChange={handleChange}
    />
  );
}
 
export default NoteBlock;