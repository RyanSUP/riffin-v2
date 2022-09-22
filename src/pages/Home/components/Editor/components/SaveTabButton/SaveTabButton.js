// Components / Hooks
import TooltipIconButton from "components/TooltipIconButton/TooltipIconButton";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { useContext } from "react";
import { TablatureContext } from "containers/TablatureProvider/TablatureProvider";
import { useNavigate } from "react-router-dom";

// Services / utils
import * as tablatureServices from "services/tablatureServices";
import { getIdTokenFromUser } from "utils/userUtils";

// MUI
import SaveIcon from "@mui/icons-material/Save";

const SaveTabButton = (props) => {
  const { user } = useContext(UserContext);
  const { addToUsersTablature, updateUserTablature } =
    useContext(TablatureContext);
  const navigate = useNavigate();

  const handleSave = async () => {
    const idToken = getIdTokenFromUser(user);
    props.tablature.tags = props.tags;

    const updateExistingTablature = () => {
      props.toggleLoading(true);
      tablatureServices.update(props.tablature, idToken).then((res) => {
        console.log(res);
        props.toggleLoading(false);
        props.refreshTablatureObject();
      });
    };

    const saveNewTablature = () => {
      props.toggleLoading(true);
      return tablatureServices
        .create(props.tablature, idToken)
        .then((tablatureFromResponse) => {
          props.toggleLoading(false);
          return tablatureFromResponse;
        });
    };

    if (props.tablature._id) {
      updateUserTablature(props.tablature);
      updateExistingTablature();
    } else {
      const newTab = await saveNewTablature();
      console.log(newTab);
      addToUsersTablature(newTab);
      navigate(`/edit/${newTab._id}`);
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
};

export default SaveTabButton;
