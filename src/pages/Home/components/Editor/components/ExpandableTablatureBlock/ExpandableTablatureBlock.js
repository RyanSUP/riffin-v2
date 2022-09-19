// Componeonts / hooks
import { useState, useEffect } from "react";
import BlockOptionsMenu from "./components/BlockOptionsMenu/BlockOptionsMenu";
import TablatureGrill from "../TablatureGrill/TablatureGrill";
import TablatureInputs from "../TablatureInputs/TablatureInputs";
import TablatureDashes from "../TablatureDashes/TablatureDashes";

// Utils / services
import { updateBlockValue, updateTextAreaAttributes, getMapOfLastColumnIndexes, getMapOfFirstColumnIndexes } from "../../utils/EditorUtils"

// MUI
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
          <TablatureInputs 
            handleBlockChange={props.handleBlockChange}
            handleKeyUpInBlock={props.handleKeyUpInBlock}
            handleClickedBlock={props.handleClickedBlock}
            mapOfFirstColumnIndexes={mapOfFirstColumnIndexes} 
            mapOfLastColumnIndexes={mapOfLastColumnIndexes}
            index={props.index}
            block={props.block}
          />
          <TablatureDashes 
            block={props.block}
          />
        </div>
      </Box>
    </>
  );
}
 
export default ExpandableTablatureBlock;