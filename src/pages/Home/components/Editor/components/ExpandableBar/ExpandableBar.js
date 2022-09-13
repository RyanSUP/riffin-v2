// Componeonts / hooks
import { useState, useEffect, useRef } from "react";

// Utils / services
import { updateBlockValue, updateTextAreaAttributes, getMapOfLastColumnIndexes, getMapOfFirstColumnIndexes } from "../../utils/EditorUtils"

// MUI
import { useTheme } from "@mui/material/styles";
import { Tooltip, IconButton, Box, Button, ButtonGroup } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

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

  const updateInputAreaSize = (action) => {
    const inputAction = {
      area: props.bar.inputs,
      characterToAdd: " ",
      action: action,
      cols: props.bar.cols
    }
    props.bar.inputs = updateBlockValue(inputAction)
  }

  const updateDashAreaSize = (action) => {
    const dashAction = {
      area: props.bar.dashes,
      characterToAdd: "-",
      action: action,
      cols: props.bar.cols
    }
    props.bar.dashes = updateBlockValue(dashAction)
  }

  const updateTextAreaSize = (action) => {
    // ! Update the string count when bass tabs are implemented
    const textAreaAction = {
      cols: props.bar.cols,
      maxLength: props.bar.maxLength,
      action: action,
      stringCount: 6
    }
    const { cols, maxLength } = updateTextAreaAttributes(textAreaAction)
    props.bar.cols = cols
    props.bar.maxLength = maxLength
  }

  const UpdateBlockSize = (action) => {
    updateInputAreaSize(action)
    updateDashAreaSize(action)
    updateTextAreaSize(action)
    props.refreshTablatureObject()
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
        <ButtonGroup
          disableElevation
          variant="contained"
          aria-label="Disabled elevation buttons"
        >
          <Tooltip placement="top-start" title="Decrease tab length">
            <Button onClick={() => UpdateBlockSize("decrease")}><RemoveIcon /></Button>
          </Tooltip>
          <Tooltip placement="top-start" title="Increase tab length">
            <Button onClick={() => UpdateBlockSize("increase")}><AddIcon /></Button>
          </Tooltip>
        </ButtonGroup>
        <Tooltip title="Delete bar" size="small">
          <IconButton onClick={()=> props.deleteBarFromTablature(props.index)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
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