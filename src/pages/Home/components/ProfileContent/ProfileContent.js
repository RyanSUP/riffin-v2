// Components / hooks
import { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { TablatureContext } from "containers/TablatureProvider/TablatureProvider";
import CardGrid from "components/CardGrid/CardGrid";

import LoadingPlaceholder from "containers/LoadingPlaceholder/LoadingPlaceholder";

const ProfileContent = () => {
  const { cognitoUsername } = useParams();
  const { user, userIsLoading } = useContext(UserContext);
  const { usersTablature } = useContext(TablatureContext);
  const navigate = useNavigate();

  // TODO Handle nav for non users
  useEffect(() => {
    if(user && cognitoUsername && (user.username !== cognitoUsername)) {
      navigate(`/profile/${user.username}`)
    }
  }, [cognitoUsername, user, navigate]);

  return (
    <LoadingPlaceholder isLoading={userIsLoading}>
      <CardGrid 
        tablature={usersTablature}
      />
    </LoadingPlaceholder>
  );
};

export default ProfileContent;
