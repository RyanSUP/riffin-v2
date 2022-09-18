// Componeonts / hooks
import { useState, useEffect, useRef } from "react";
import BlockOptionsMenu from "./components/BlockOptionsMenu/BlockOptionsMenu";

// Utils / services
import { updateBlockValue, updateTextAreaAttributes, getMapOfLastColumnIndexes, getMapOfFirstColumnIndexes } from "../../utils/EditorUtils"

// MUI
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";


const ExpandableBar = (props) => {
  // ! Update the stringcount when bass is implemented
  const [mapOfLastColumnIndexes, setMapOfLastColumnIndexes] = useState(getMapOfLastColumnIndexes({
    cols: props.bar.cols,
    stringCount: 6
  }))
  const [mapOfFirstColumnIndexes, setMapOfFirstColumnIndexes] = useState(getMapOfFirstColumnIndexes({
    cols: props.bar.cols,
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

  const breakupStyle = {
    background: "transparent",
    margin: 0,
    position: "relative",
    resize: "none",
    zIndex: 2,
    outline: "none",
    border: "none",
    color: theme.palette.primary.main,
    fontSize: "1.2rem",
    padding: 0,
    textAlign: "right"
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

  const deleteBlock = () => props.deleteBarFromTablature(props.index)

  const duplicateBlock = () => props.duplicateBlock(props.index)

  const updateInputAreaSize = (action) => {
    const inputAction = {
      area: props.bar.inputs,
      characterToAdd: " ",
      type: action.type,
      stepCount: action.stepCount,
      cols: props.bar.cols
    }
    props.bar.inputs = updateBlockValue(inputAction)
  }

  const updateDashAreaSize = (action) => {
    const dashAction = {
      area: props.bar.dashes,
      characterToAdd: "-",
      type: action.type,
      stepCount: action.stepCount,
      cols: props.bar.cols
    }
    props.bar.dashes = updateBlockValue(dashAction)
  }

  const updateBlockProperties = (action) => {
    // ! Update the string count when bass tabs are implemented
    const textAreaAction = {
      cols: props.bar.cols,
      maxLength: props.bar.maxLength,
      type: action.type,
      stepCount: action.stepCount,
      stringCount: 6
    }
    const { cols, maxLength } = updateTextAreaAttributes(textAreaAction)
    props.bar.cols = cols
    props.bar.maxLength = maxLength
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
      ...props.bars[barIndex],
      label: event.target.value,
    };
    props.bars[barIndex] = updatedBar
    // props.refreshTablatureObject()
  }

  useEffect(() => {
    setMapOfLastColumnIndexes(getMapOfLastColumnIndexes({
      cols: props.bar.cols,
      stringCount: 6
    }))

    setMapOfFirstColumnIndexes(getMapOfFirstColumnIndexes({
      cols: props.bar.cols,
      stringCount: 6
    }))
  }, [props.bar.cols, props.bar.maxLength])

  return (
    <>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
      <input 
          style={{"marginLeft": "10px"}}
          type="text"
          name="name"
          value={props.bar.label}
          onChange={(event) => handleLabelInput(event, props.index)}
          placeholder="a new bar"
        />
        {/* <ButtonGroup

        <Tooltip title="Delete bar" size="small">
          <IconButton onClick={()=> props.deleteBarFromTablature(props.index)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip> */}
        <BlockOptionsMenu 
          updateBlockSize={updateBlockSize}
          deleteBlock={deleteBlock} 
          duplicateBlock={duplicateBlock}
          cols={props.bar.cols}
        />
      </Box>
      <Box sx={{display: 'flex'}}>
        <textarea
          readOnly={true}
          style={breakupStyle}
          value={`|\n|\n|\n|\n|\n|`}
          cols={1}
          rows="6"
        />
        <div style={{ position: "relative" }}>
          <textarea
            style={inputsStyle}
            value={props.bar.inputs}
            onChange={(event) => props.handleBarChange(event, mapOfLastColumnIndexes, mapOfFirstColumnIndexes)}
            onKeyUp={(event) =>  props.handleKeyUpInBar(event)}
            onPaste={(event) => event.preventDefault()}
            onClick={(event) => props.handleClickedBar(event, props.index, inputRef)}
            cols={props.bar.cols}
            rows="6"
            maxLength={props.bar.maxLength}
            id="riffin-editor-inputGrid"
            ref={inputRef}
          />
          <textarea
            readOnly={true}
            style={dashesStyle}
            value={props.bar.dashes}
            cols={props.bar.cols}
            rows="6"
            maxLength={props.bar.maxLength}
            id="riffin-editor-dashGrid"
          />
        </div>
      </Box>
    </>
  );
}
 
export default ExpandableBar;