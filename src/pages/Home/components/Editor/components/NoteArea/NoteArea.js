import { useTheme } from "@mui/material/styles";


const NoteArea = () => {
  const theme = useTheme();

  const inputsStyle = {
    background: "transparent",
    margin: 0,
    position: "relative",
    resize: "none",
    zIndex: 2,
    outline: "none",
    border: "none",
    borderLeft: "1px solid",
    color: theme.palette.primary.main,
    fontSize: "1.2rem",
  };

  return (
    <textarea
      style={inputsStyle}
      cols={40}
      placeholder={"Notes"}
      maxLength={250}
      id="riffin-editor-inputGrid"
    />
  );
}
 
export default NoteArea;