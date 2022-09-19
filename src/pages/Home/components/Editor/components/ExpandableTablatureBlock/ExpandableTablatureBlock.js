// Componeonts / hooks
import { useState, useEffect } from "react";
import BlockOptionsMenu from "./components/BlockOptionsMenu/BlockOptionsMenu";
import TablatureGrill from "../TablatureGrill/TablatureGrill";
import TablatureInputs from "../TablatureInputs/TablatureInputs";
import TablatureDashes from "../TablatureDashes/TablatureDashes";


// MUI
import { Box } from "@mui/material";

const ExpandableTablatureBlock = (props) => {

  const deleteBlock = () => props.deleteBlock(props.index)

  const duplicateBlock = () => props.duplicateBlock(props.index)

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
          deleteBlock={deleteBlock} 
          duplicateBlock={duplicateBlock}
          block={props.block}
          refreshTablatureObject={props.refreshTablatureObject}
        />
      </Box>
      <Box sx={{display: 'flex'}}>
        <TablatureGrill />
        <div style={{ position: "relative" }}>
          <TablatureInputs 
            handleBlockChange={props.handleBlockChange}
            handleKeyUpInBlock={props.handleKeyUpInBlock}
            handleClickedBlock={props.handleClickedBlock}
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