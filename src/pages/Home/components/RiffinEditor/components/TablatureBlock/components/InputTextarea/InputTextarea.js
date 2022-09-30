// Components / hooks
import { useRef, useEffect, useState, useContext } from "react";
// Utils / services
import * as utils from "../../../../Utilities";

// MUI
import { useTheme } from "@mui/material/styles";
import { RiffinEditorDispatch } from "pages/Home/components/RiffinEditor/RiffinEditor";
import { DUPLICATION_COLUMN_GAP } from "pages/Home/components/RiffinEditor/EditorConfig";

const InputTextarea = (props) => {
  const [textAreaProperties] = useState({
    cols: props.block.cols,
    // TODO Refactor to numberOfStrings (stringCount is more tangled than youd think >.>)
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

  // ------------- 🏗 MISC HELPERS --------------------------------
  
  /**
   * Checks if the cursor selection is on the last column.
   * @param {Number} selectionStart 
   * @param {Object} mapOfLastColumnIndexes 
   * @returns true if the cursor is on the last column, otherwise false
   */
  const selectionIsOnLastColumn = (selectionStart, mapOfLastColumnIndexes) => (selectionStart in mapOfLastColumnIndexes)

  /**
   * Checks if the cursor selection is on the First column.
   * @param {Number} selectionStart 
   * @param {Object} mapOfFirstColumnIndexes 
   * @returns true if the cursor is on the first column, otherwise false
   */
  const selectionIsOnFirstColumn = (selectionStart, mapOfFirstColumnIndexes) => (selectionStart in mapOfFirstColumnIndexes)

  /**
   * Checks if the cursor selection is on the second to last column. Second to last column is rarely needed and not stored in state.
   * @param {Number} selectionStart 
   * @param {Object} mapOfLastColumnIndexes 
   * @returns true if the cursor is on the second to last column, otherwise false
   */
  const selectionIsOnSecondToLastColumn = (selectionStart, mapOfLastColumnIndexes) => {
    const mapOfSecondToLastColumnIndexes = Object.keys(mapOfLastColumnIndexes).map((val) => val - 1)
    return mapOfSecondToLastColumnIndexes.includes(selectionStart)
  }

  // ------------- 🛠 HELPERS FOR DUPLICATING / DELETING ENTIRE COLUMNS --------------------------------

  /**
   * Gets the positions of the input textarea in a column directly above the curent selection.
   * @param {Number} selectionStart 
   * @param {Number} cols 
   * @returns an array of positions
   */
  const getPositionsAboveSelection = (selectionStart, cols) => {
    let arrayOfPositions = []
    const indexGapBetweenStrings = cols + 1 // The + 1 compensates for the hidden \n
    for(let position = selectionStart - indexGapBetweenStrings; position >= 0; position -= indexGapBetweenStrings) {
      arrayOfPositions.push(position - 1)
    }
    return arrayOfPositions
  }

  /**
   * Gets the positions of the input textarea in a column directly below the curent selection.
   * @param {Number} selectionStart 
   * @param {Number} cols 
   * @returns an array of positions
   */
  const getPositionsBelowSelection = (selectionStart, cols, editableLength) => {
    const indexGapBetweenStrings = cols + 1 // The + 1 compensates for the hidden \n
    let arrayOfPositions = []
    for(let position = selectionStart + indexGapBetweenStrings; position <= editableLength; position += indexGapBetweenStrings) {
      arrayOfPositions.push(position - 1)
    }
    return arrayOfPositions
  }
  
  /**
   * Gets the column of positions directly behind the cursor in the input textarea.
   * @param {Number} selectionStart 
   * @param {Number} cols 
   * @param {Number} maxLength 
   * @param {Number} numberOfStrings 
   * @returns 
   */
  const getColumnOfPositionsBeforeSelection = (selectionStart, cols, maxLength, numberOfStrings) => {
    let numberOfEditablePositionsOnBlock = maxLength - numberOfStrings
    let positionsAboveSelection = getPositionsAboveSelection(selectionStart - 1, cols)
    let positionsBelowSelection = getPositionsBelowSelection(selectionStart - 1, cols, numberOfEditablePositionsOnBlock)
    let allPositionsToDuplicate = [selectionStart - 2, ...positionsAboveSelection, ...positionsBelowSelection]
    return allPositionsToDuplicate
  }

  /**
   * Generates an array of objects represening the inputs to be duplicated and their target positions.
   * @param {Number} selectionStart 
   * @returns an array of objects
   */
  const generateDuplicationValues = (selectionStart) => {
    let positionsToDuplicate = getColumnOfPositionsBeforeSelection(selectionStart, textAreaProperties.cols, props.block.maxLength, textAreaProperties.stringCount)
    let inputsAsArray = [...props.block.inputs]
    const duplicationValues = [];
    positionsToDuplicate.forEach((position) => {
      const characterToDuplicate = inputsAsArray[position];
      duplicationValues.push({
        inputValue: characterToDuplicate,
        dashValue: (characterToDuplicate === " ") ? "-" : " ",
        targetPosition: position + DUPLICATION_COLUMN_GAP
      })
    })
    return duplicationValues;
  }
  // ------------- 🖐 HANDLERS --------------------------------

  /**
   * Sends a dispatch to update the selected block. The new selected block will be whichever block is handling the click.
   * @param {Object} event 
   */
  const handleClick = (event) => {
    const action = {
      type: "updateSelection",
      blockIndex: props.index,
      blockRef: ref,
      selectionStart: event.target.selectionStart
    };
    dispatch(action);
  };

  /**
   * Sends a dispatch to update the selection when an arrow key is pressed. This allows the user to move around the textarea with arrow keys.
   * @param {Object} event 
   */
  const handleKeyUp = (event) => {
    if(utils.isMovementKey(event.key)) {
      const action = {
        type: "updateCursorPosition",
        selectionStart: event.target.selectionStart
      };
      dispatch(action);
    }
  };

  /**
   * Sends a dispatch to insert a character into the textarea. This allows the user to type in the textarea on valid spaces. The only column that is not valid is the last column. This is because there are hidden new-line characters (\n) that keep the structure of the tab intact, making the textarea appear as if it were guitar strings.
   * @param {Number} selectionStart 
   * @param {String} key 
   */
  const handleAddCharacter = (selectionStart, key) => {
    let action = {};
    if(selectionIsOnLastColumn(selectionStart - 1, mapOfLastColumnIndexes)) {
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

  /**
   * Sends a dispatch to remove a character into the textarea. This allows the user to delete on valid spaces. The only column that is not valid is the first column. This prevents the user form deleting a new-line characters (\n) on the previous space, which keeps the structure of the tab intact.
   * @param {*} selectionStart 
   */
  const handleDeleteCharacter = (selectionStart) => {
    let action = {};
    if(selectionIsOnFirstColumn(selectionStart + 1, mapOfFirstColumnIndexes)) {
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

  /**
   * Sends a dispatch to duplicate an entire column in the textarea. The values of the duplicated column will be pasted two spaces over, leaving one blank space between the original and duplicated columns.
   * @param {*} selectionStart 
   */
  const handleDuplicateColumn = (selectionStart) => {
    let action = {};
    if(selectionIsOnLastColumn(selectionStart - 1, mapOfLastColumnIndexes)
      || selectionIsOnFirstColumn(selectionStart - 1, mapOfFirstColumnIndexes)
      || selectionIsOnSecondToLastColumn(selectionStart - 1, mapOfLastColumnIndexes)
    ) {
      action = {
        type: 'updateCursorPosition',
        selectionStart: selectionStart - 1
      };
    } else {
      action = {
        type: "duplicateColumn",
        duplicationValues: generateDuplicationValues(selectionStart),
        selectionStart: selectionStart
      }
    }
    dispatch(action);
  }

  /**
   * Sends a dispatch to delete an entire column in the textarea.
   * @param {Number} selectionStart 
   */
  const handleDeleteColumn = (selectionStart) => {
    let action = {};
    if(selectionIsOnFirstColumn(selectionStart - 1, mapOfFirstColumnIndexes)) {
      action = {
        type: 'updateCursorPosition',
        selectionStart: selectionStart - 1
      };
    } else {
      const positionsToDelete = getColumnOfPositionsBeforeSelection(selectionStart, textAreaProperties.cols, props.block.maxLength, textAreaProperties.stringCount)
      action = {
        type: 'deleteColumn',
        positionsToDelete,
        selectionStart: selectionStart - 1
      }
    }
    dispatch(action);
  }

  /**
   * Checks the pressed key and routes to the appropriate dispatch handler.
   * @param {Object} event 
   */
  const handleChange = (event) => {
    event.preventDefault();
    const key = event.nativeEvent.data || "Backspace";
    const dispatchType = utils.getDispatchTypeOfPressedKey(key);
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
    } else if(dispatchType === "duplicateColumn") {
      handleDuplicateColumn(event.target.selectionStart)
    } else if(dispatchType === "deleteColumn") {
      handleDeleteColumn(event.target.selectionStart)
    }
  };

  // ------------- 🦾 EFFECTS --------------------------------
  
  /**
   * Updates the bounry maps when the size of the block changes.
   */
  useEffect(() => {
    setMapOfLastColumnIndexes(utils.getMapOfLastColumnIndexes(textAreaProperties))
    setMapOfFirstColumnIndexes(utils.getMapOfFirstColumnIndexes(textAreaProperties))
  }, [textAreaProperties, props.block.cols]);

  return (
    <textarea
      style={inputsStyle}
      value={props.block.inputs}
      onChange={handleChange}
      onKeyUp={handleKeyUp}
      onPaste={(event) => event.preventDefault()}
      onClick={handleClick}
      cols={textAreaProperties.cols}
      rows={textAreaProperties.stringCount}
      maxLength={props.block.maxLength}
      ref={ref}
    />
  );
}
 
export default InputTextarea;