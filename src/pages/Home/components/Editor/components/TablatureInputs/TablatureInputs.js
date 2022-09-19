import { useRef } from "react";
import { useTheme } from "@mui/material/styles";

const TablatureInputs = (props) => {
  const inputRef = useRef();
  const theme = useTheme();
  const inputsStyle = {
    background: "transparent",
    margin: 0,
    position: "relative",
    resize: "none",
    zIndex: 2,
    outline: "none",
    border: "none",
    color: theme.palette.primary.main,
    fontSize: "1.2rem",
    padding: 0
  };

  return (
    <textarea
      style={inputsStyle}
      value={props.block.inputs}
      onChange={(event) => props.handleBlockChange(event, props.mapOfLastColumnIndexes, props.mapOfFirstColumnIndexes)}
      onKeyUp={(event) =>  props.handleKeyUpInBlock(event)}
      onPaste={(event) => event.preventDefault()}
      onClick={(event) => props.handleClickedBlock(event, props.index, inputRef)}
      cols={props.block.cols}
      rows="6"
      maxLength={props.block.maxLength}
      id="riffin-editor-inputGrid"
      ref={inputRef}
    />
  );
}
 
export default TablatureInputs;