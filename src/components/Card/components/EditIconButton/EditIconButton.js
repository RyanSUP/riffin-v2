// Components / hooks
import { useNavigate } from "react-router-dom";
import ToolTipIconButton from "components/TooltipIconButton/ToolTipIconButton";
// MUI
import EditIcon from '@mui/icons-material/Edit';

const EditButtonIcon = (props) => {
  const navigate = useNavigate()
  const handleEdit = () => navigate(`/edit/${props.tab_id}`)

  return (
    <ToolTipIconButton 
      icon={ <EditIcon />}
      title={"Edit"}
      onClick={handleEdit}
    />
  );
}
 
export default EditButtonIcon;