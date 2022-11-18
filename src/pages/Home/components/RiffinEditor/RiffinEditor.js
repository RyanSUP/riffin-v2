// Components / hooks
import AddNewBlockButton from "./components/AddNewBlockButton/AddNewBlockButton";
import TitleInput from "./components/TitleInput/TitleInput";
import TablatureBlock from "./components/TablatureBlock/TablatureBlock";
import { useContext } from "react";
import { RiffinEditorDispatch } from "./RiffinProvider";
import BlockContent from "components/Card/components/BlockContent/BlockContent";
import SaveTabButton from "./components/SaveTabButton/SaveTabButton";
import DeleteTabButton from "./components/DeleteTabButton/DeleteTabButton";
import ModeSwitch from "./components/ModeSwitch/ModeSwitch";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
// MUI
import { Box, Grid } from "@mui/material";

/**
 * * Displays the fields for editing a tablature.
 * @returns 
 */
const RiffinEditor = () => {
  const { editor } = useContext(RiffinEditorDispatch);
  const { user } = useContext(UserContext);
  return (
    <Box sx={{mb: 12}}>
      <Grid container rowSpacing={2} columnSpacing={4} sx={{alignItems: "end"}}>
        <Grid item xs={12}>
          <TitleInput />
        </Grid>
        <Grid item>
          <SaveTabButton disabled={!user} />
        </Grid>
        <Grid item>
          <DeleteTabButton disabled={!editor.tablature._id || !user} />
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
              <Box sx={{my: 4}} key={(block.tempKey || block._id) + i.toString()}>
                <TablatureBlock key={block.tempKey || block._id} index={i} block={block} />
              </Box>
            ))}
            <AddNewBlockButton />
          </>
      }
    </Box>
  );
}
 
export default RiffinEditor;