// Components / hooks
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TablatureContext } from "containers/TablatureProvider/TablatureProvider";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
// Services / utils
import * as tablatureServices from "services/tablatureServices";
import { getIdTokenFromUser } from "utils/userUtils";
// MUI
import { Button } from "@mui/material";

/**
 * * The DeleteTabButton controls its own visibility. Tabs that are stored on the backend show the delete button while new tabs don't show any delete button.
 * 
 *  * No dispatch is sent to the RiffinEditor since deleting navigates the user.
 */

const DeleteTabButton = (props) => {
  const { user } = useContext(UserContext);
  const { deleteFromUsersTablature } = useContext(TablatureContext);
  const navigate = useNavigate();

  /**
   * Sends a request to the backend to delete the tablature, then navigates the user to their profile. If a user does not own the tab they will just be redirected to their profile (this is a defensive catch as a non-owner should never have a access to editing a tab they don't own).
   */
  const handleDelete = () => {
    if(props.tablature.owner.user === user.username) {
      deleteFromUsersTablature(props.tablature._id);
      const idToken = getIdTokenFromUser(user);
      tablatureServices.delete(props.tablature._id, idToken)
      .then((res) => {
        console.log(res);
      });
    }
    navigate(`/profile/${user.username}`);
  };
  
  return (
    <>
      {props.tablature._id &&
        <Button onClick={handleDelete}>Delete</Button>
      }
    </>
  );
};
 
export default DeleteTabButton;