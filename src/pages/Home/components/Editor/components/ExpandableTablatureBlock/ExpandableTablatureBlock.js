// Componeonts / hooks
import { useState, useEffect, useRef } from "react";
import BlockOptionsMenu from "./components/BlockOptionsMenu/BlockOptionsMenu";
import TablatureGrill from "../TablatureGrill/TablatureGrill";

// Utils / services
import { updateBlockValue, updateTextAreaAttributes, getMapOfLastColumnIndexes, getMapOfFirstColumnIndexes } from "../../utils/EditorUtils"

// MUI
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";


const ExpandableTablatureBlock = (props) => {
  // ! Update the stringcount when bass is implemented
  const [mapOfLastColumnIndexes, setMapOfLastColumnIndexes] = useState(getMapOfLastColumnIndexes({
    cols: props.block.cols,
    stringCount: 6
  }))
  const [mapOfFirstColumnIndexes, setMapOfFirstColumnIndexes] = useState(getMapOfFirstColumnIndexes({
    cols: props.block.cols,
    stringCount: 6
  }))

  const inputRef = useRef(); // This is used to know which bar the user has selected.
  const theme = useTheme(); // theme obtained with invoking this hook
  

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

  const dashesStyle = {
    background: "transparent",
    margin: 0,
    position: "absolute",
    resize: "none",
    left: "0",
    translate: "0",
    zIndex: 1,
    outline: "none",
    border: "none",
    color: theme.palette.background.default,
    fontSize: "1.2rem",
    padding: 0
  };

  const deleteBlock = () => props.deleteBlock(props.index)

  const duplicateBlock = () => props.duplicateBlock(props.index)

  const updateInputAreaSize = (action) => {
    const inputAction = {
      area: props.block.inputs,
      characterToAdd: " ",
      type: action.type,
      stepCount: action.stepCount,
      cols: props.block.cols
    }
    props.block.inputs = updateBlockValue(inputAction)
  }

  const updateDashAreaSize = (action) => {
    const dashAction = {
      area: props.block.dashes,
      characterToAdd: "-",
      type: action.type,
      stepCount: action.stepCount,
      cols: props.block.cols
    }
    props.block.dashes = updateBlockValue(dashAction)
  }

  const updateBlockProperties = (action) => {
    // ! Update the string count when bass tabs are implemented
    const textAreaAction = {
      cols: props.block.cols,
      maxLength: props.block.maxLength,
      type: action.type,
      stepCount: action.stepCount,
      stringCount: 6
    }
    const { cols, maxLength } = updateTextAreaAttributes(textAreaAction)
    props.block.cols = cols
    props.block.maxLength = maxLength
  }

  const updateBlockSize = (action) => {
    updateInputAreaSize(action)
    updateDashAreaSize(action)
    updateBlockProperties(action)
    props.refreshTablatureObject()
  }

  // ! Broken atm
  const handleLabelInput = (event, barIndex) => {
    event.preventDefault()
    const updatedBar = {
      ...props.blocks[barIndex],
      label: event.target.value,
    };
    props.blocks[barIndex] = updatedBar
    // props.refreshTablatureObject()
  }

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
    <>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <input 
          style={{"marginLeft": "10px"}}
          type="text"
          name="name"
          value={props.block.label}
          onChange={(event) => handleLabelInput(event, props.index)}
          placeholder="label"
        />
        <BlockOptionsMenu 
          updateBlockSize={updateBlockSize}
          deleteBlock={deleteBlock} 
          duplicateBlock={duplicateBlock}
          cols={props.block.cols}
        />
      </Box>
      <Box sx={{display: 'flex'}}>
        <TablatureGrill />
        <div style={{ position: "relative" }}>
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
            id="riffin-editor-inputGrid"
            ref={inputRef}
          />
          <textarea
            readOnly={true}
            style={dashesStyle}
            value={props.block.dashes}
            cols={props.block.cols}
            rows="6"
            maxLength={props.block.maxLength}
            id="riffin-editor-dashGrid"
          />
        </div>
      </Box>
    </>
  );
}
 
export default ExpandableTablatureBlock;