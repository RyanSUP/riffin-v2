// Components / hooks
import DashTextarea from "./components/DashTextarea/DashTextarea";
import InputTextarea from "./components/InputTextarea/InputTextarea";
import TablatureWrapper from "./components/TablatureWrapper/TablatureWrapper";
import { useState, useContext } from "react";
import NoteTextarea from "./components/NoteTextarea/NoteTextarea";
import OptionsMenu from "./components/OptionsMenu/OptionsMenu";
import { RiffinEditorDispatch } from "../../RiffinProvider";
// MUI
import { Box } from "@mui/material";

/**
 * * TablatureBlock is a section of the screen dedicated to 1 piece of tablature. This component has functionality to show and hide the options menu depending on if the mouse is in the block. Note that a RiffinEditor document can have multiple TablatureBlocks.
 * props: index, block, numberOfStrings
 */

const TablatureBlock = (props) => {
  const { editor } = useContext(RiffinEditorDispatch);


  return (
    <Box>
      <NoteTextarea label={props.block.label} index={props.index}/>
      <TablatureWrapper>
        <InputTextarea
          block={props.block} 
          index={props.index} 
          numberOfStrings={editor.tablature.numberOfStrings}
        />
        <DashTextarea 
          block={props.block} 
          numberOfStrings={editor.tablature.numberOfStrings}
        />
      </TablatureWrapper>
    </Box>
  );
}
 
export default TablatureBlock;
