// Components / hooks
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import { TablatureContext } from "containers/TablatureProvider/TablatureProvider";
import CardGrid from "components/CardGrid/CardGrid";


// Services
import * as profileServices from "services/profileServices";

// MUI
import { CircularProgress } from "@mui/material";

const ProfileContent = () => {
  const [tablature, setTablature] = useState(null);
  const { cognitoUsername } = useParams();
  const { user, userIsLoading } = useContext(UserContext);
  const { usersTablature } = useContext(TablatureContext);

  useEffect(() => {
    let subscribed = true
    if(!userIsLoading && cognitoUsername) {
      if (user.username === cognitoUsername) {
        setTablature(usersTablature)
      } else {
        profileServices.getUsersPublicInfo(cognitoUsername)
        .then((res) => {
          if(subscribed) {
            setTablature(res.usersTablature.map((tab) => {
              const owner = {_id: tab._id, ...res.authorInfo}
              tab.owner = owner
              return tab
            }))
          }
        })
      }
    }
    return () => {
      subscribed = false
    }
  }, [cognitoUsername, user, userIsLoading, usersTablature]);

  return (
    <div data-testid="ProfileContent">
      {tablature === null ? (
        <CircularProgress />
      ) : (
        <CardGrid 
          tablature={tablature}
        />
      )}
    </div>
  );
};

export default ProfileContent;
