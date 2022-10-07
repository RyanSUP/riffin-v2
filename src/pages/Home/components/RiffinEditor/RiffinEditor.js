// Components / hooks
import AddNewBlockButton from "./components/AddNewBlockButton/AddNewBlockButton";
import TitleInput from "./components/TitleInput/TitleInput";
import DeleteTabButton from "./components/DeleteTabButton/DeleteTabButton";
import SaveTabButton from "./components/SaveTabButton/SaveTabButton";
import TablatureBlock from "./components/TablatureBlock/TablatureBlock";
import { useContext, useState } from "react";
import { RiffinEditorDispatch } from "./RiffinProvider";
// MUI
import { Box, Button, Grid } from "@mui/material";
import BlockContent from "components/Card/components/BlockContent/BlockContent";
const RiffinEditor = () => {
  const { editor } = useContext(RiffinEditorDispatch);
  const [preview, setPreview] = useState(false);
  return (
    <>
      <Grid container rowSpacing={2} columnSpacing={4} sx={{alignItems: "end"}}>
        <Grid item>
          <TitleInput />
        </Grid>
        <Grid item>
          <SaveTabButton />
        </Grid>
        {editor.tablature._id &&
          <Grid item>
            <DeleteTabButton />
          </Grid>
        } 
        <Grid item>
          <Button variant="outlined" onClick={() => setPreview(prev => !prev)}>
            {preview ? "Edit" : "Preview"}
          </Button>
        </Grid>
      </Grid>
      {preview
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
    </>
  );
}
 
export default RiffinEditor;