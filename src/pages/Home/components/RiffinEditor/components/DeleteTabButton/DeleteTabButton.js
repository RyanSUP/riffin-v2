// Components / hooks
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TablatureContext } from "containers/TablatureProvider/TablatureProvider";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { RiffinEditorDispatch } from "../../RiffinProvider";
// Services / utils
import * as tablatureServices from "services/tablatureServices";
import { getIdTokenFromUser } from "utils/userUtils";
// MUI
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

/**
 *  * Handles deleting the tablature. No dispatch is sent to the RiffinEditor since deleting navigates the user.
 *  props: tablature, disabled
 */

const DeleteTabButton = (props) => {
  const { user } = useContext(UserContext);
  const { deleteFromUsersTablature } = useContext(TablatureContext);
  const { editor } = useContext(RiffinEditorDispatch);
  const navigate = useNavigate();

  /**
   * Sends a request to the backend to delete the tablature, then navigates the user to their profile. If a user does not own the tab they will just be redirected to their profile (this is a defensive catch as a non-owner should never have a access to editing a tab they don't own).
   */
  const handleDelete = () => {
    if(editor.tablature.owner.user === user.username) {
      deleteFromUsersTablature(editor.tablature._id);
      const idToken = getIdTokenFromUser(user);
      tablatureServices.delete(editor.tablature._id, idToken)
      .then((res) => {
        console.log(res);
      });
    }
    navigate(`/profile/${user.username}`);
  };
  
  return (
    <Button 
      variant="outlined" 
      onClick={handleDelete}
      disabled={props.disabled}
      color="error"
      endIcon={<DeleteIcon />}
    >
      Delete
    </Button>
  );
};
 
export default DeleteTabButton;