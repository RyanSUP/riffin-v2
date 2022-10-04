// Components / hooks
import { useNavigate } from "react-router-dom";
import TooltipIconButton from "components/TooltipIconButton/TooltipIconButton";
// MUI
import EditIcon from '@mui/icons-material/Edit';

/**
 * * Displays an edit button. When clicked the button will route the user to edit the tablature in RiffinEditor.
 * @param {Object} props - tab_id - id of the tab to navigate to
 * @returns The button component
 */
const EditButtonIcon = (props) => {
  const navigate = useNavigate();
  /**
   * Routes the user to edit the tablature in RiffinEditor..
   */
  const handleClick = () => navigate(`/edit/${props.tab_id}`);
  return (
    <TooltipIconButton 
      icon={ <EditIcon />}
      title={"Edit"}
      onClick={handleClick}
    />
  );
};
 
export default EditButtonIcon;