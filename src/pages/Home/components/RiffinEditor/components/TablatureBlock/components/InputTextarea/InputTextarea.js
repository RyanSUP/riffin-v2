// Components / hooks
import { useRef, useEffect, useState, useContext } from "react";
// Utils / services
import { getMapOfLastColumnIndexes, getMapOfFirstColumnIndexes, isMovementKey } from "../../../../Utilities"
// MUI
import { useTheme } from "@mui/material/styles";
import { RiffinEditorDispatch } from "pages/Home/components/RiffinEditor/RiffinEditor";

const InputTextarea = (props) => {
  const [textAreaProperties] = useState({
    cols: props.block.cols,
    stringCount: props.block.numberOfStrings
  })
  const [mapOfLastColumnIndexes, setMapOfLastColumnIndexes] = useState(getMapOfLastColumnIndexes(textAreaProperties))
  const [mapOfFirstColumnIndexes, setMapOfFirstColumnIndexes] = useState(getMapOfFirstColumnIndexes(textAreaProperties))

  const dispatch = useContext(RiffinEditorDispatch);
  const ref = useRef();
  const theme = useTheme();
  
  const inputsStyle = {
    background: "transparent",
    margin: 0,
    fontFamily: "Fira Code",
    position: "relative",
    resize: "none",
    zIndex: 2,
    outline: "none",
    border: "none",
    color: theme.palette.primary.tabInput,
    fontSize: "1.2rem",
    padding: 0
  };

  const handleClick = (event) => {
    const action = {
      type: "updateSelection",
      blockIndex: props.index,
      blockRef: ref,
      selectionStart: event.target.selectionStart
    };
    dispatch(action);
  };

  const handleKeyUp = (event) => {
    if(isMovementKey(event.key)) {
      const action = {
        type: "updateCursorPosition",
        selectionStart: event.target.selectionStart
      };
      dispatch(action);
    }
  };

  useEffect(() => {
    setMapOfLastColumnIndexes(getMapOfLastColumnIndexes(textAreaProperties))
    setMapOfFirstColumnIndexes(getMapOfFirstColumnIndexes(textAreaProperties))
  }, [textAreaProperties]);

  return (
    <textarea
      style={inputsStyle}
      value={props.block.inputs}
      onChange={(event) => props.handleBlockChange(event, mapOfLastColumnIndexes, mapOfFirstColumnIndexes)}
      onKeyUp={handleKeyUp}
      onPaste={(event) => event.preventDefault()}
      onClick={handleClick}
      cols={props.block.cols}
      rows={props.block.numberOfStrings}
      maxLength={props.block.maxLength}
      ref={ref}
    />
  );
}
 
export default InputTextarea;