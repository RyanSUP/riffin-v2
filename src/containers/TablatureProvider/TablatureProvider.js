// Components and hooks
import { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";
// Services / utils
import * as profileServices from "services/profileServices";
import { getIdTokenFromUser } from "utils/userUtils";

const TablatureContext = createContext({});

/**
 * * Tablature provider requests the user's tablature data from the backend and stores it on the client. Since it is a context provider, all children have access to the tablature data.
 * @param {Object} props 
 * @returns 
 */
const TablatureProvider = (props) => {
  const [usersTablature, setUsersTablature] = useState([]);
  const [ownerObject, setOwnerObject] = useState({})
  const [tablatureIsLoading, setTablatureIsLoading] = useState(true);
  const { user } = useContext(UserContext);

  /**
   * Adds a tablature to state.
   * @param {Object} tab 
   */
   const addToUsersTablature = (tab) => {
    if(typeof tab["owner"] === "string") {
      console.log('addign owner: , ', ownerObject)
      tab["owner"] = ownerObject;
    }
    setUsersTablature((prev) => {
      return [tab, ...prev];
    });
  };

  /**
   * Deletes a tablature from state.
   * @param {String} tab_id 
   */
  const deleteFromUsersTablature = (tablature) => {
    setUsersTablature((prev) => {
      return prev.filter((tab) => tab._id !== tablature._id);
    });
  };

  /**
   * Updates a tablature in state.
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
        const owner = {
          _id: profile._id,
          preferredUsername: profile.preferredUsername,
          user: user.username,
        }
        setOwnerObject(owner)
        const sortedTabsWithOwnerInfo = [];
        for(let i = profile.tablature.length - 1; i >= 0; i--) {
          const tab = profile.tablature[i];
          tab.owner = {...owner};
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
        updateUserTablature
      }}
    >
      {props.children}
    </TablatureContext.Provider>
  );
}
 
export { TablatureProvider, TablatureContext }