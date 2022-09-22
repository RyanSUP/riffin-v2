// Componeonts / hooks
import BlockOptionsMenu from "./components/BlockOptionsMenu/BlockOptionsMenu";
import TablatureGrill from "../../../../../../components/TablatureGrill/TablatureGrill";
import InputTextarea from "./components/InputTextarea/InputTextarea";
import DashTextarea from "./components/DashTextarea/DashTextarea";
import NoteTextarea from "../NoteTextarea/NoteTextarea";
// MUI
import { Box } from "@mui/material";

const ExpandableTablatureBlock = (props) => {
  const deleteBlock = () => props.deleteBlock(props.index)
  const duplicateBlock = () => props.duplicateBlock(props.index)

  return (
    <>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <NoteTextarea block={props.block} sx={{flexGrow: 1}}/>
        <BlockOptionsMenu 
          numberOfStrings={props.numberOfStrings}
          deleteBlock={deleteBlock} 
          duplicateBlock={duplicateBlock}
          block={props.block}
          refreshTablatureObject={props.refreshTablatureObject}
        />
      </Box>
      <Box sx={{display: 'flex'}}>
        <div style={{ position: "relative"}}>
          <InputTextarea 
            handleBlockChange={props.handleBlockChange}
            handleKeyUpInBlock={props.handleKeyUpInBlock}
            handleClickedBlock={props.handleClickedBlock}
            index={props.index}
            block={props.block}
            numberOfStrings={props.numberOfStrings}
          />
          <DashTextarea 
            block={props.block}
            numberOfStrings={props.numberOfStrings}
          />
        </div>
      </Box>
    </>
  );
}
 
export default ExpandableTablatureBlock;