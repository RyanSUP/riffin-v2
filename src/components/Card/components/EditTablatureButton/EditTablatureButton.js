// Components / hooks
import { useNavigate } from "react-router-dom";
// MUI
import EditIcon from '@mui/icons-material/Edit';
import { Button } from "@mui/material";

/**
 * * Displays an edit button. When clicked the button will route the user to edit the tablature in RiffinEditor.
 * @param {Object} props - tab_id - id of the tab to navigate to
 * @returns The button component
 */
const EditIconButton = (props) => {
  const navigate = useNavigate();
  /**
   * Routes the user to edit the tablature in RiffinEditor..
   */
  const handleClick = () => navigate(`/edit/${props.tab_id}`);
  return (
    <Button 
      variant="outlined" 
      size="small" 
      onClick={handleClick} 
      startIcon={<EditIcon />}
    >
      Edit
    </Button>
  );
};
 
export default EditIconButton;