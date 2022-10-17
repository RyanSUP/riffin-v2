// Components and hooks
import { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
// Services / utils
import * as profileServices from "services/profileServices";
import { getIdTokenFromUser } from "utils/userUtils";

const TablatureContext = createContext({});

/**
 * * Tablature provider requests the user's tablature data from the backend and stores it on the client. Since it is a context provider, all children have access to the tablature data. TablatureProvider also stores a list of unique tags derived from all tablature which is used to generate a list of suggestions in the searchbar.
 * @param {Object} props 
 * @returns 
 */
const TablatureProvider = (props) => {
  const [usersTablature, setUsersTablature] = useState([]);
  const [tablatureIsLoading, setTablatureIsLoading] = useState(true);
  const { user } = useContext(UserContext);

  /**
   * Adds a tablature to state. This allows the user's tablature to stay up-to-date without additional calls to the backend.
   * @param {Object} tab 
   */
  const addToUsersTablature = (tab) => {
    setUsersTablature((prev) => {
      return [tab, ...prev];
    });
  };

  /**
   * Deletes a tablature from state. This allows the user's tablature to stay up-to-date without additional calls to the backend.
   * @param {String} tab_id 
   */
  const deleteFromUsersTablature = (tab_id) => {
    setUsersTablature((prev) => {
      return prev.filter((tab) => tab._id !== tab_id);
    });
  };

  /**
   * Updates a tablature in state. This allows the user's tablature to stay up-to-date without additional calls to the backend.
   * @param {Object} updatedTab 
   */
  const updateUserTablature = (updatedTab) => {
    setUsersTablature((prev) => {
      return prev.map((tab) => {
        let tabObject = {};
        if(tab._id === updatedTab._id) {
          tabObject = { ...updatedTab };
        } else {
          tabObject = { ...tab };
        }
        return tabObject;
      });
    });
  };

  /**
   * Getter for accessing a specific tab based on the given _id.
   * @param {String} tab_id 
   * @returns The tablature object, or undefined if no tab was found.
   */
  const getTabFromUser = (tab_id) => usersTablature.find((tab) => tab._id === tab_id);

  /**
   * When the User data loads, add user info to the tablature object and sorts user's tablature in descending order based on creation date.
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


  return (
    <TablatureContext.Provider
      value={{
        usersTablature,
        tablatureIsLoading,
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