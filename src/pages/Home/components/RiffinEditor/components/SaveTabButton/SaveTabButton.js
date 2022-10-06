// Components / Hooks
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { useContext } from "react";
import { TablatureContext } from "containers/TablatureProvider/TablatureProvider";
import { useNavigate } from "react-router-dom";
import { TagContext } from "containers/TagProvider/TagProvider";
// Services / utils
import * as tablatureServices from "services/tablatureServices";
import { getIdTokenFromUser } from "utils/userUtils";
// MUI
import { Button } from "@mui/material";

/**
 * * Saving does not send a dispatch to the RiffinEditor because no changes are made to the frontend. In the event of saving a new tablature the user will be redirected to the edit page once the tablature is stored and the backend responds with the _id. Saving an already stored tab has no visible effects - the user can keep editing.
 */

// TODO When editing, there should be and indicator if changes haven't been saved.

const SaveTabButton = (props) => {
  const { user } = useContext(UserContext);
  const { tagsInSearchbar } = useContext(TagContext);
  const { addToUsersTablature, updateUserTablature } = useContext(TablatureContext);
  const navigate = useNavigate();

  /**
   * Saves a new tablature or updates an existing tablature.
   */
  const handleSave = async () => {
    const idToken = getIdTokenFromUser(user);
    props.tablature.tags = tagsInSearchbar;
    props.tablature.owner = user.username;

    /**
     * Sends a request to the backend to update the tablature.
     */
    const updateExistingTablature = () => {
      props.setIsLoading(true);
      tablatureServices.update(props.tablature, idToken)
      .then((res) => {
        props.setIsLoading(false);
      });
    };
    
    /**
     * Sends a request to the backend to create a new tablature.
     * @returns the id assigned to the saved tablature.
     */
    const saveNewTablature = () => {
      props.setIsLoading(true);
      return tablatureServices
      .create(props.tablature, idToken)
      .then((tablatureFromResponse) => {
        props.setIsLoading(false);
        return tablatureFromResponse;
      });
    };
    
    if (props.tablature._id) {
      updateUserTablature(props.tablature);
      updateExistingTablature();
    } else {
      const newTab = await saveNewTablature();
      addToUsersTablature(newTab);
      navigate(`/edit/${newTab._id}`);
    }
  };

  return (
    <Button variant="outlined" onClick={handleSave}>
      SAVE
    </Button>
  );
};
 
export default SaveTabButton;