// Componeonts / hooks
import BlockOptionsMenu from "./components/BlockOptionsMenu/BlockOptionsMenu";
import TablatureGrill from "../../../../../../components/TablatureGrill/TablatureGrill";
import InputTextarea from "./components/InputTextarea/InputTextarea";
import DashTextarea from "./components/DashTextarea/DashTextarea";

// MUI
import { Box } from "@mui/material";

const ExpandableTablatureBlock = (props) => {
  const deleteBlock = () => props.deleteBlock(props.index)
  const duplicateBlock = () => props.duplicateBlock(props.index)
  // ! Broken atm
  const handleLabelInput = (event, barIndex) => {
    event.preventDefault()
    const updatedBar = {
      ...props.blocks[barIndex],
      label: event.target.value,
    };
    props.blocks[barIndex] = updatedBar
    // props.refreshTablatureObject()
  }

  return (
    <>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <input 
          style={{"marginLeft": "10px"}}
          type="text"
          name="name"
          value={props.block.label}
          onChange={(event) => handleLabelInput(event, props.index)}
          placeholder="label"
        />
        <BlockOptionsMenu 
          numberOfStrings={props.numberOfStrings}
          deleteBlock={deleteBlock} 
          duplicateBlock={duplicateBlock}
          block={props.block}
          refreshTablatureObject={props.refreshTablatureObject}
        />
      </Box>
      <Box sx={{display: 'flex'}}>
        <TablatureGrill numberOfStrings={props.numberOfStrings}/>
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