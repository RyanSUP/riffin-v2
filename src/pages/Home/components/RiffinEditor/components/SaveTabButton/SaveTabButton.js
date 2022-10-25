// Components / Hooks
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { useContext } from "react";
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
 * * In the event of saving a new tablature the user will be redirected to the edit page once the tablature is stored and the backend responds with the _id. Saving an already stored tab has no visible effects - the user can keep editing.
 */

// TODO When editing, there should be and indicator if changes haven't been saved.

const SaveTabButton = (props) => {
  const { user } = useContext(UserContext);
  const { tagsInSearchbar } = useContext(TagContext);
  const { addToUsersTablature, updateUserTablature } = useContext(TablatureContext);
  const { setIsLoading, editor } = useContext(RiffinEditorDispatch);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  /**
   * Saves a new tablature or updates an existing tablature.
   */
  const handleSave = async () => {
    const idToken = getIdTokenFromUser(user);
    editor.tablature.tags = tagsInSearchbar;
    editor.tablature.owner = user.username;

    /**
     * Sends a request to the backend to update the tablature and displays a snackbar when a response is received.
     */
    const updateExistingTablature = () => {
      setIsLoading(true);
      tablatureServices.update(editor.tablature, idToken)
      .then((res) => {
        setIsLoading(false);
        enqueueSnackbar("Tab saved!", {variant: "success"});
      });
    };
    
    /**
     * Sends a request to the backend to create a new tablature and displays a snackbar when the response is received.
     * @returns the id assigned to the saved tablature.
     */
    const saveNewTablature = () => {
      setIsLoading(true);
      return tablatureServices
      .create(editor.tablature, idToken)
      .then((tablatureFromResponse) => {
        setIsLoading(false);
        enqueueSnackbar("Tab saved!", {variant: "success"});
        return tablatureFromResponse;
      });
    };
    
    if (editor.tablature._id) {
      updateUserTablature(editor.tablature);
      updateExistingTablature();
    } else {
      const newTab = await saveNewTablature();
      addToUsersTablature(newTab);
      navigate(`/edit/${newTab._id}`);
    }
  };

  return (
    <Button startIcon={<SaveIcon />} variant="outlined" onClick={handleSave}>
      SAVE
    </Button>
  );
};
 
export default SaveTabButton;