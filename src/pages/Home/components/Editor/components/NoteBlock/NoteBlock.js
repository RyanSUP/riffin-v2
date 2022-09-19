// Components / hooks
import TooltipIconButton from "components/TooltipIconButton/TooltipIconButton";

// MUI
import { TextareaAutosize } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from '@mui/icons-material/Delete';

const NoteBlock = (props) => {
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
    props.block.inputs = event.target.value
    props.refreshTablatureObject();
  }

  return (
    <>
      <TextareaAutosize
        style={inputsStyle}
        minRows={3}
        placeholder={"Notes"}
        value={props.block.inputs}
        onChange={handleChange}
      />
      <TooltipIconButton 
        title={"Delete note"}
        isDiabled={false}
        onClick={() => props.deleteBlock(props.index)}
        icon={<DeleteIcon />}
      />
    </>
  );
}
 
export default NoteBlock;