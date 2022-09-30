import DashTextarea from "./components/DashTextarea/DashTextarea";
import InputTextarea from "./components/InputTextarea/InputTextarea";
import BlockOptionsMenu from "./components/BlockOptionsMenu/BlockOptionsMenu";
import NoteTextarea from "./components/NoteTextarea/NoteTextarea";

import { Box } from "@mui/material";

// TODO This has same name as anotehr component. One needs to change
const TablatureBlock = (props) => {
  return (
    <>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <NoteTextarea label={props.block.label} index={props.index}/>
        <BlockOptionsMenu block={props.block} index={props.index} />
      </Box>
      <div style={{ position: "relative"}}>
        <InputTextarea block={props.block} index={props.index}/>
        <DashTextarea block={props.block} />
      </div>
    </>
  );
}
 
export default TablatureBlock;
