// Components / hooks
import AddNewBlockButton from "./components/AddNewBlockButton/AddNewBlockButton";
import TitleInput from "./components/TitleInput/TitleInput";
import DeleteTabButton from "./components/DeleteTabButton/DeleteTabButton";
import SaveTabButton from "./components/SaveTabButton/SaveTabButton";
import TablatureBlock from "./components/TablatureBlock/TablatureBlock";
import { useContext } from "react";
import { RiffinEditorDispatch } from "./RiffinProvider";
// MUI
import { Box, Grid } from "@mui/material";
const Content = () => {
  const { editor } = useContext(RiffinEditorDispatch);
  return (
    <>
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
        </Grid>
        {editor.tablature.blocks.map((block, i) => (
          <Box sx={{my: 4}} key={i}>
            <TablatureBlock key={i} index={i} block={block} />
          </Box>
        ))}
        <AddNewBlockButton />
    </>
  );
}
 
export default Content;