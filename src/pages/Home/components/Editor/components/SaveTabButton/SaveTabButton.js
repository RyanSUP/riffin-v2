// Components / Hooks
import TooltipIconButton from "components/TooltipIconButton/TooltipIconButton";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { useContext } from "react";
import { TablatureContext } from "containers/TablatureProvider/TablatureProvider";

// Services / utils
import * as tablatureServices from "services/tablatureServices";
import { getIdTokenFromUser } from "utils/userUtils";

// MUI
import SaveIcon from '@mui/icons-material/Save';

const SaveTabButton = (props) => {
  const { user } = useContext(UserContext);
  const { addToUsersTablature, updateUserTablature } = useContext(TablatureContext);
  
  const handleSave = () => {
    const idToken = getIdTokenFromUser(user);
    props.tablature.tags = props.tags

    const updateExistingTablature = () => {
      props.toggleLoading(true);
      tablatureServices.update(props.tablature, idToken)
      .then((res) => {
        console.log(res);
        props.toggleLoading(false);
        props.refreshTablatureObject();
      });
    }
  
    const saveNewTablature = () => {
      props.toggleLoading(true);
      tablatureServices
      .create(props.tablature, idToken)
      .then((tablatureFromResponse) => {
        console.log(tablatureFromResponse)
        props.toggleLoading(false);
      });
    }
    
    if (props.tablature._id) {
      updateUserTablature(props.tablature)
      updateExistingTablature();
    } else {
      addToUsersTablature(props.tablature)
      saveNewTablature();
    }
  };

  return (
    <TooltipIconButton 
      title="Save"
      onClick={handleSave}
      isDiabled={false}
      icon={<SaveIcon />}
    />
  );
}
 
export default SaveTabButton;