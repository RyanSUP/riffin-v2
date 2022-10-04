// Components / hooks
import DashTextarea from "./components/DashTextarea/DashTextarea";
import InputTextarea from "./components/InputTextarea/InputTextarea";
import TablatureWrapper from "./components/TablatureWrapper/TablatureWrapper";
import { useState } from "react";
import NoteTextarea from "./components/NoteTextarea/NoteTextarea";
import OptionsMenu from "./components/OptionsMenu/OptionsMenu"
// MUI
import { Box } from "@mui/material";

/**
 * * TablatureBlock is a section of the screen dedicated to 1 piece of tablature. This component has functionality to show and hide the options menu depending on if the mouse is in the block. Note that a RiffinEditor document can have multiple TablatureBlocks.
 * props: index, block, numberOfStrings
 */

const TablatureBlock = (props) => {
  const [showOptions, setShowOptions] = useState(false)

  /**
   * Shows the options menu when the mouse enters the TablatureBlock.
   */
  const handleMouseEnter = () => setShowOptions(true);

  /**
   * Hides the options menu when the mouse leaves the TablatureBlock
   */
  const handleMouseLeave = () => setShowOptions(false);

  return (
    <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <NoteTextarea label={props.block.label} index={props.index}/>
        {showOptions &&
          <OptionsMenu block={props.block} index={props.index} />
        }
      </Box>
      <TablatureWrapper>
        <InputTextarea 
          block={props.block} 
          index={props.index} 
          numberOfStrings={props.numberOfStrings}
        />
        <DashTextarea 
          block={props.block} 
          numberOfStrings={props.numberOfStrings}
        />
      </TablatureWrapper>
    </Box>
  );
}
 
export default TablatureBlock;
