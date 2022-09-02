// Components / hooks
import { useNavigate } from "react-router-dom";
import TooltipIconButton from "components/TooltipIconButton/TooltipIconButton";
// MUI
import EditIcon from '@mui/icons-material/Edit';

const EditButtonIcon = (props) => {
  const navigate = useNavigate()
  const handleClick = () => navigate(`/edit/${props.tab_id}`)

  return (
    <TooltipIconButton 
      icon={ <EditIcon />}
      title={"Edit"}
      onClick={handleClick}
    />
  );
}
 
export default EditButtonIcon;