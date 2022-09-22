// Components / hooks
import TooltipIconButton from "components/TooltipIconButton/TooltipIconButton";
// utils
import { getNewNoteBlock } from "../../utils/EditorUtils";
// MUI
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

const AddNoteBlockButton = (props) => {
  const handleAddBlock = () => {
    const previousBlocks = [];
    props.tablature.blocks.forEach((bar) => {
      previousBlocks.push({ ...bar });
    });
    const newBlock = getNewNoteBlock();
    props.tablature.blocks = [...previousBlocks, newBlock];
    props.refreshTablatureObject();
  };

  return (
    <TooltipIconButton
      title="Add note block"
      onClick={handleAddBlock}
      isDiabled={false}
      icon={<TextSnippetIcon />}
    />
  );
};

export default AddNoteBlockButton;
