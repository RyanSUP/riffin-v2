import { Box } from "@mui/material";
import NoteTextarea from "./components/NoteTextarea/NoteTextarea";
import OptionsMenu from "./components/OptionsMenu/OptionsMenu";
const BlockHeader = (props) => {
  return (
    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
      <NoteTextarea label={props.block.label} index={props.index}/>
      {props.showOptions &&
        <OptionsMenu block={props.block} index={props.index} />
      }
    </Box>
  );
}
 
export default BlockHeader;