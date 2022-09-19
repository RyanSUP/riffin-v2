// Components / hooks
import { useRef, useEffect, useState } from "react";
// Utils / services
import { getMapOfLastColumnIndexes, getMapOfFirstColumnIndexes } from "../../../../utils/EditorUtils"
// MUI
import { useTheme } from "@mui/material/styles";

const InputTextarea = (props) => {
  const [mapOfLastColumnIndexes, setMapOfLastColumnIndexes] = useState(getMapOfLastColumnIndexes({
    cols: props.block.cols,
    stringCount: 6
  }))
  const [mapOfFirstColumnIndexes, setMapOfFirstColumnIndexes] = useState(getMapOfFirstColumnIndexes({
    cols: props.block.cols,
    stringCount: 6
  }))

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

  useEffect(() => {
    setMapOfLastColumnIndexes(getMapOfLastColumnIndexes({
      cols: props.block.cols,
      stringCount: 6
    }))

    setMapOfFirstColumnIndexes(getMapOfFirstColumnIndexes({
      cols: props.block.cols,
      stringCount: 6
    }))
  }, [props.block.cols, props.block.maxLength])
  
  return (
    <textarea
      style={inputsStyle}
      value={props.block.inputs}
      onChange={(event) => props.handleBlockChange(event, mapOfLastColumnIndexes, mapOfFirstColumnIndexes)}
      onKeyUp={(event) =>  props.handleKeyUpInBlock(event)}
      onPaste={(event) => event.preventDefault()}
      onClick={(event) => props.handleClickedBlock(event, props.index, inputRef)}
      cols={props.block.cols}
      rows="6"
      maxLength={props.block.maxLength}
      ref={inputRef}
    />
  );
}
 
export default InputTextarea;