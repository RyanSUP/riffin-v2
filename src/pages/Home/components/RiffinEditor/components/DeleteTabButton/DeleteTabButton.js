// Components / hooks
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TablatureContext } from "containers/TablatureProvider/TablatureProvider";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { RiffinEditorDispatch } from "../../RiffinProvider";
import { useSnackbar } from "notistack";
// Services / utils
import * as tablatureServices from "services/tablatureServices";
import { getIdTokenFromUser } from "utils/userUtils";
// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
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
  const [open, setOpen] = useState(false);

  /**
   * This closes the delete confirmation dialog. If 'delete' is passed as an action, the logic to delete the tab is carried out. 
   * @param {String} action 
   */
  const handleDialogClose = (action) => {
    if(action === 'delete') handleDelete();
    setOpen(false);
  }

  /**
   * Sends a request to delete the tab on the backend and shows a snackbar depending on status of deleting
   */
  const dispatchDeleteRequestToBackend = () => {
    const idToken = getIdTokenFromUser(user);
    return tablatureServices.deleteTab(editor.tablature._id, idToken, user.username)
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
  const handleDelete = async () => {
    if(editor.tablature.owner.user === user.username) {
      deleteFromUsersTablature(editor.tablature);
      dispatchDeleteRequestToBackend();
    }
    navigate(`/profile/${user.username}`);
  };

  return (
    <>    
      <Button 
        variant="outlined" 
        onClick={()=> setOpen(true)}
        disabled={props.disabled}
        color="error"
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>

      <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this tab?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button color="error" onClick={() => handleDialogClose('delete')} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
 
export default DeleteTabButton;