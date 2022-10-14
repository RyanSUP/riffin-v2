// Components / hooks
import { useContext, useState, useEffect } from "react";
import SizeSlider from "./components/SizeSlider/SizeSlider";
import { RiffinEditorDispatch } from "../../RiffinProvider";
import DuplicateBlockButton from "./components/DuplicateBlockButton/DuplicateBlockButton";
import DeleteBlockButton from "./components/DeleteBlockButton/DeleteBlockButton";
import Legend from "./components/Legend/Legend";
// MUI
import { Box, Container, Stack, Typography } from "@mui/material";
import StaffMenuHeader from "./components/StaffMenuHeader/StaffMenuHeader";

/**
 * * The RiffinDrawer sits next to the RiffinEditor and provides additional controls for the selected block, as well as a legend that displays special inputs and tablature notation.
 * @returns 
 */
const RiffinDrawer = () => {
  const { editor } = useContext(RiffinEditorDispatch);
  const [selectedBlock, setBlock] = useState({...editor.tablature.blocks[editor.selectedBlock.index]});

  /**
   * This useEffect tells the children of the drawer which block is selected. The children cannot mutate editor.selectedBlock via sending dispatch requests as it will cause issues, mainly because reducer updates do not happen until rerendering while some components, such as the slider, require immediate updates of the block object.
   */
  useEffect(() => {
    if(editor.selectedBlock.block) {
      setBlock({...editor.tablature.blocks[editor.selectedBlock.index]});
    }
  }, [editor]);

  return (
    <>    
      {!editor.previewMode &&
        <Container sx={{mt: 4}}>
            <Stack spacing={2} sx={{my: 4}}>
              <StaffMenuHeader />
              <Box>
                <Typography>Size</Typography>
                <SizeSlider block={ selectedBlock }/>
              </Box>
              <DuplicateBlockButton />
              <DeleteBlockButton 
                block={ selectedBlock } 
                disabled={(editor.tablature.blocks.length === 1)} 
              />
              <Legend />
            </Stack>
        </Container>
      }
    </>
  );
}
 
export default RiffinDrawer;