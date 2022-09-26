// Components / hooks
// utils
import { getNewGuitarBlock } from "../../utils/EditorUtils";
// MUI
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Button } from "@mui/material";

const AddTablatureBlockButton = (props) => {
  const handleAddBlock = () => {
    const previousBlocks = [];
    props.tablature.blocks.forEach((bar) => {
      previousBlocks.push({ ...bar });
    });
    const newBlock = getNewGuitarBlock(props.tablature.numberOfStrings)
    props.tablature.blocks = [...previousBlocks, newBlock];
    props.refreshTablatureObject();
  }

  return (
    <Button variant="outlined" onClick={handleAddBlock} endIcon={<PlaylistAddIcon />}>
      add tablature
    </Button>
  );
}
 
export default AddTablatureBlockButton;