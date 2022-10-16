// Components and hooks
import { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
// Services / utils
import * as profileServices from "services/profileServices";
import { getIdTokenFromUser } from "utils/userUtils";

const TablatureContext = createContext({});

const TablatureProvider = (props) => {
  const [usersTablature, setUsersTablature] = useState([]);
  const [usersTags, setUsersTags] = useState({});
  const [tablatureIsLoading, setTablatureIsLoading] = useState(true);
  const { user } = useContext(UserContext);

  const addToUsersTablature = (tab) => {
    setUsersTablature((prev) => {
      return [tab, ...prev];
    });
  };

  const deleteFromUsersTablature = (tab_id) => {
    setUsersTablature((prev) => {
      return prev.filter((tab) => tab._id !== tab_id);
    });
  };

  const updateUserTablature = (updatedTab) => {
    setUsersTablature((prev) => {
      return prev.map((tab) => {
        let tabObject = {};
        if(tab._id === updatedTab._id) {
          tabObject = { ...updatedTab };
        } else {
          tabObject = { ...tab };
        }
        return tabObject
      });
    });
  };

  const getTabFromUser = (tab_id) => usersTablature.find((tab) => tab._id === tab_id);

  /**
   * When the User data loads, add user info to tablature and sorts user's tablature in descenging order based on creation date.
   */
  useEffect(() => {
    setTablatureIsLoading(true);
    if(user) {
      const idToken = getIdTokenFromUser(user);
      profileServices
      .getProfileOfLoggedInUser(user.username, idToken)
      .then((response) => {
        const profile = response.profile;
        const sortedTabsWithOwnerInfo = [];
        for(let i = profile.tablature.length - 1; i >= 0; i--) {
          const tab = profile.tablature[i];
          const owner = {
            _id: tab._id,
            preferredUsername: profile.preferredUsername,
            user: user.username,
          };
          tab.owner = owner;
          sortedTabsWithOwnerInfo.push(tab);
        }
        setTablatureIsLoading(false);
        setUsersTablature(sortedTabsWithOwnerInfo);
      });
    }
  }, [user]);

  /**
   * Update usersTags when usersTablature changes. This keeps the tagbar suggestions up to date.
   */
  useEffect(() => {
    if(usersTablature) {
      const tagMapWithCount = {};
      usersTablature.forEach((tab) => {
        tab.tags.forEach((tag) => {
          if(tagMapWithCount[tag]) {
            tagMapWithCount[tag] = tagMapWithCount[tag] + 1;
          } else {
            tagMapWithCount[tag] = 1;
          }
        });
        setUsersTags(tagMapWithCount);
      });
    }
  }, [usersTablature]);

  return (
    <TablatureContext.Provider
      value={{
        usersTablature,
        tablatureIsLoading,
        usersTags,
        deleteFromUsersTablature,
        addToUsersTablature,
        getTabFromUser,
        updateUserTablature,
      }}
    >
      {props.children}
    </TablatureContext.Provider>
  );
}
 
export { TablatureProvider, TablatureContext }