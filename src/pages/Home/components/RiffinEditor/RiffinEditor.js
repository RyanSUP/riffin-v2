// Components / hooks
import AddNewBlockButton from "./components/AddNewBlockButton/AddNewBlockButton";
import TitleInput from "./components/TitleInput/TitleInput";
import TablatureBlock from "./components/TablatureBlock/TablatureBlock";
import { useContext } from "react";
import { RiffinEditorDispatch } from "./RiffinProvider";
// MUI
import { Box, Grid } from "@mui/material";
import BlockContent from "components/Card/components/BlockContent/BlockContent";
import SaveTabButton from "./components/SaveTabButton/SaveTabButton";
import DeleteTabButton from "./components/DeleteTabButton/DeleteTabButton";
import ModeSwitch from "./components/ModeSwitch/ModeSwitch";
const RiffinEditor = () => {
  const { editor } = useContext(RiffinEditorDispatch);
  return (
    <Box sx={{mb: 12}}>
      <Grid container rowSpacing={2} columnSpacing={4} sx={{alignItems: "end"}}>
        <Grid item>
          <TitleInput />
        </Grid>
        <Grid item>
          <SaveTabButton />
        </Grid>
        <Grid item>
          <DeleteTabButton />
        </Grid>
        <Grid item>
          <ModeSwitch />
        </Grid>
      </Grid>
      {editor.previewMode
        ?
          <Box sx={{my:4}}>
            <BlockContent blocks={editor.tablature.blocks} numberOfStrings={editor.tablature.numberOfStrings}/>
          </Box>
        :
          <>
            {editor.tablature.blocks.map((block, i) => (
              <Box sx={{my: 4}} key={i}>
                <TablatureBlock key={i} index={i} block={block} />
              </Box>
            ))}
            <AddNewBlockButton />
          </>
      }
    </Box>
  );
}
 
export default RiffinEditor;