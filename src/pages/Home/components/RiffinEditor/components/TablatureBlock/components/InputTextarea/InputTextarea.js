// Components / hooks
import { useRef, useEffect, useState, useContext } from "react";
// Utils / services
import * as utils from "../../../../Utilities";

// MUI
import { useTheme } from "@mui/material/styles";
import { RiffinEditorDispatch } from "pages/Home/components/RiffinEditor/RiffinEditor";

const InputTextarea = (props) => {
  const [textAreaProperties] = useState({
    cols: props.block.cols,
    stringCount: props.block.numberOfStrings
  })
  const [mapOfLastColumnIndexes, setMapOfLastColumnIndexes] = useState(utils.getMapOfLastColumnIndexes(textAreaProperties))
  const [mapOfFirstColumnIndexes, setMapOfFirstColumnIndexes] = useState(utils.getMapOfFirstColumnIndexes(textAreaProperties))

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
    if(utils.isMovementKey(event.key)) {
      const action = {
        type: "updateCursorPosition",
        selectionStart: event.target.selectionStart
      };
      dispatch(action);
    }
  };
  
  const cursorIsOnLastColumn = (selectionStart) => (selectionStart in mapOfLastColumnIndexes)
  const cursorIsOnFirstColumn = (selectionStart) => (selectionStart in mapOfFirstColumnIndexes)

  const handleAddCharacter = (selectionStart, key) => {
    let action = {};
    if(cursorIsOnLastColumn(selectionStart - 1)) {
      action = {
        type: 'updateCursorPosition',
        selectionStart: selectionStart - 1
      };
    } else {
     action ={ 
        type: "addCharacter",
        character: key,
        selectionStart: selectionStart - 1
      };
    }
    dispatch(action);
  }

  const handleDeleteCharacter = (selectionStart) => {
    let action = {};
    if(cursorIsOnFirstColumn(selectionStart + 1)) {
      action = {
        type: 'updateCursorPosition',
        selectionStart: selectionStart + 1
      };
    } else {
      action = {
        type: "deleteCharacter",
        selectionStart: selectionStart
      };
    }
    dispatch(action);
  }

  const handleChange = (event) => {
    event.preventDefault();
    const key = event.nativeEvent.data || "Backspace";
    const dispatchType = utils.getDispatchTypeOfPressedKey(key);
    console.log(key)
    if(dispatchType === undefined) {
      let action = {
        type: 'updateCursorPosition',
        selectionStart: event.target.selectionStart - 1
      };
      dispatch(action);
    } else if(dispatchType === "addCharacter") {
      handleAddCharacter(event.target.selectionStart, key)
    } else if(dispatchType === "deleteCharacter") {
      handleDeleteCharacter(event.target.selectionStart)
    }
  };

  useEffect(() => {
    setMapOfLastColumnIndexes(utils.getMapOfLastColumnIndexes(textAreaProperties))
    setMapOfFirstColumnIndexes(utils.getMapOfFirstColumnIndexes(textAreaProperties))
  }, [textAreaProperties]);

  return (
    <textarea
      style={inputsStyle}
      value={props.block.inputs}
      onChange={handleChange}
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