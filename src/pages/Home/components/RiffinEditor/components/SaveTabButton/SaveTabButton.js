// Components / Hooks
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { useContext, useState } from "react";
import { TablatureContext } from "containers/TablatureProvider/TablatureProvider";
import { useNavigate } from "react-router-dom";
import { TagContext } from "containers/TagProvider/TagProvider";
import { RiffinEditorDispatch } from "../../RiffinProvider";
import { useSnackbar } from "notistack";
// Services / utils
import * as tablatureServices from "services/tablatureServices";
import { getIdTokenFromUser } from "utils/userUtils";
// MUI
import { Button } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';

/**
 * * In the event of saving a new tablature the user will be redirected to the edit page once the tablature is stored and the backend responds with the _id. Saving an already stored tab disables the save button until a success response is sent.
 */

// TODO When editing, there should be and indicator if changes haven't been saved.

const SaveTabButton = (props) => {
  const { user } = useContext(UserContext);
  const { tagsInSearchbar } = useContext(TagContext);
  const { addToUsersTablature, updateUserTablature } = useContext(TablatureContext);
  const { editor } = useContext(RiffinEditorDispatch);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [waitingForResponse, setWaitingForResponse] = useState(false);

  /**
   * Saves a new tablature or updates an existing tablature.
   */
  const handleSave = () => {
    setWaitingForResponse(true);
    const idToken = getIdTokenFromUser(user);
    editor.tablature.tags = tagsInSearchbar;
    editor.tablature.owner = user.username;

    /**
     * Sends a request to the backend to update the tablature and displays a snackbar when a response is received.
     */
    const updateExistingTablature = () => {
      tablatureServices.update(editor.tablature, idToken)
      .then((res) => {
        enqueueSnackbar("Tab saved!", {variant: "success"});
        setWaitingForResponse(false);
      });
    };
    
    if (editor.tablature._id) {
      updateUserTablature(editor.tablature);
      updateExistingTablature();
    } else {
      tablatureServices
      .create(editor.tablature, idToken)
      .then((tablatureFromResponse) => {
        enqueueSnackbar("Tab saved!", {variant: "success"});
        addToUsersTablature(tablatureFromResponse);
        setWaitingForResponse(false);
        navigate(`/edit/${tablatureFromResponse._id}`, {replace: true});
      });
    }
  };

  return (
    <Button disabled={waitingForResponse} startIcon={<SaveIcon />} variant="outlined" onClick={handleSave}>
      SAVE
    </Button>
  );
};
 
export default SaveTabButton;