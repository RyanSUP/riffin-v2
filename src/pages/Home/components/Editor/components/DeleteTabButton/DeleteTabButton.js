// Components / hooks
import TooltipIconButton from "components/TooltipIconButton/TooltipIconButton";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TablatureContext } from "containers/TablatureProvider/TablatureProvider";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";

// Services / utils
import * as tablatureServices from "services/tablatureServices";
import { getIdTokenFromUser } from "utils/userUtils";

// MUI
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteTabButton = (props) => {
  const { user } = useContext(UserContext);
  const { deleteFromUsersTablature } = useContext(TablatureContext);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteFromUsersTablature(props.tablature_id)
    const idToken = getIdTokenFromUser(user);
    tablatureServices.delete(props.tablature_id, idToken)
    .then((res) => {
      console.log(res);
    });
    navigate(`/profile/${user.username}`)
  };
  return (
    <TooltipIconButton 
      title="Save"
      onClick={handleDelete}
      isDiabled={false}
      icon={<DeleteIcon />}
    />
  );
}
 
export default DeleteTabButton;