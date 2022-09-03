// Components / hooks
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
import CardGrid from "components/CardGrid/CardGrid";

// Services
import * as profileServices from "services/profileServices";
import * as userUtils from "utils/userUtils";

// MUI
import { CircularProgress } from "@mui/material";

const ProfileContent = () => {
  const [tablature, setTablature] = useState(null);
  const { cognitoUsername } = useParams();
  const { user } = useContext(UserContext);

  // TODO Find out why this always runs twice if the user is viewing their own profile -- first it makes a request to grab the public profile data and then it makes a request to grab all profiledata. My guess is because 'user' isn't loading right away.
  useEffect(() => {
    if(tablature === null) {
      if (user && user.username === cognitoUsername) {
        // If the current user is viewing their own profile, grab all of their data.
        // Otherwise only grab public data.
        const idToken = userUtils.getIdTokenFromUser(user);
        profileServices
        .getProfileOfLoggedInUser(user.username, idToken)
        .then((res) => {
          setTablature(res.profile.tablature.map((tab) => {
              const owner = {
                _id: tab._id,
                preferredUsername: user.profile?.preferredUsername,
                user: user.username,
              }
              tab.owner = owner
              return tab
            }))
        });
      } else {
        profileServices.getUsersPublicInfo(cognitoUsername)
        .then((res) => {
          setTablature(res.usersTablature.map((tab) => {
            const owner = {_id: tab._id, ...res.authorInfo}
            tab.owner = owner
            return tab
          }))
        })
      }
    }
  }, [cognitoUsername, user, tablature]);


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
