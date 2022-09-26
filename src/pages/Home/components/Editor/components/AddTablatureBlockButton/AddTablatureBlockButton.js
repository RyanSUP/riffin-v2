// Components / hooks
import TooltipIconButton from "components/TooltipIconButton/TooltipIconButton";
// utils
import { getNewGuitarBlock } from "../../utils/EditorUtils";
// MUI
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

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
    <TooltipIconButton 
      title="Add tablature block"
      onClick={handleAddBlock}
      isDiabled={false}
      icon={<PlaylistAddIcon />}
    />
  );
}
 
export default AddTablatureBlockButton;