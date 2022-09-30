// Components / Hooks
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { useContext } from "react";
import { TablatureContext } from "containers/TablatureProvider/TablatureProvider";
import { useNavigate } from "react-router-dom";

// Services / utils
import * as tablatureServices from "services/tablatureServices";
import { getIdTokenFromUser } from "utils/userUtils";

// MUI
import { Button } from "@mui/material";

const SaveTabButton = (props) => {
  const { user } = useContext(UserContext);
  const { addToUsersTablature, updateUserTablature } = useContext(TablatureContext);
  const navigate = useNavigate()

  const handleSave = async () => {
    const idToken = getIdTokenFromUser(user);
    props.tablature.tags = props.tags
    props.tablature.owner = user.username

    const updateExistingTablature = () => {
      props.setIsLoading(true);
      tablatureServices.update(props.tablature, idToken)
      .then((res) => {
        props.setIsLoading(false);
      });
    }
  
    const saveNewTablature = () => {
      props.setIsLoading(true);
      return tablatureServices
      .create(props.tablature, idToken)
      .then((tablatureFromResponse) => {
        props.setIsLoading(false);
        return tablatureFromResponse;
      });
    }
    
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
    <Button variant="contained" onClick={handleSave}>
      SAVE
    </Button>
  );
}
 
export default SaveTabButton;