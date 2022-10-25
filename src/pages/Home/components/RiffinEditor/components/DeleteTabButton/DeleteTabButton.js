// Components / hooks
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TablatureContext } from "containers/TablatureProvider/TablatureProvider";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { RiffinEditorDispatch } from "../../RiffinProvider";
import { useSnackbar } from "notistack";
// Services / utils
import * as tablatureServices from "services/tablatureServices";
import { getIdTokenFromUser } from "utils/userUtils";
// MUI
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

/**
 *  * Handles deleting the tablature and issues a request to the snackbarProvider to show a snackbar after deleting. No dispatch is sent to the RiffinEditor.
 *  props: tablature, disabled
 */

const DeleteTabButton = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { editor } = useContext(RiffinEditorDispatch);
  const { deleteFromUsersTablature } = useContext(TablatureContext);
  
  /**
   * Sends a request to delete the tab on the backend and shows a snackbar depending on status of deleting
   */
  const dispatchDeleteRequestToBackend = () => {
    const idToken = getIdTokenFromUser(user);
    return tablatureServices.delete(editor.tablature._id, idToken)
    .then((res) => {
      enqueueSnackbar(`Deleted ${editor.tablature.name}!`, { variant: "success" });
    })
    .catch((res) => {
      enqueueSnackbar(`Error deleting ${editor.tablature.name}!`, { variant: "error" });
    })
  }

  /**
   * Sends a request to the backend to delete the tablature, then navigates the user to their profile. If a user does not own the tab they will just be redirected to their profile (this is a defensive catch as a non-owner should never have a access to editing a tab they don't own).
   */
  const handleDelete = () => {
    console.log('entering delete', editor.tablature)
    if(editor.tablature.owner.user === user.username) {
      console.log('delete if statement is true');
      deleteFromUsersTablature(editor.tablature);
      dispatchDeleteRequestToBackend()
    }
    navigate(`/profile/${user.username}`);
  };

  return (
    <Button 
      variant="outlined" 
      onClick={handleDelete}
      disabled={props.disabled}
      color="error"
      startIcon={<DeleteIcon />}
    >
      Delete
    </Button>
  );
};
 
export default DeleteTabButton;