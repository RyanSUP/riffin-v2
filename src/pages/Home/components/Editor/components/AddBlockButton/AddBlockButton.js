// Components / hooks
import TooltipIconButton from "components/TooltipIconButton/TooltipIconButton";
// utils
import { getNewGuitarBlock } from "../../utils/EditorUtils";
// MUI
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

const AddBlock = (props) => {
  const handleAddBlock = () => {
    const previousBars = [];
    props.tablature.bars.forEach((bar) => {
      previousBars.push({ ...bar });
    });

    const newBlock = getNewGuitarBlock()

    props.tablature.bars = [...previousBars, newBlock];
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
 
export default AddBlock;