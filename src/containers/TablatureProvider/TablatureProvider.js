// Components and hooks
import { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";

// Services / utils
import * as profileServices from "services/profileServices";
import { getIdTokenFromUser } from "utils/userUtils";

const TablatureContext = createContext({});

const TablatureProvider = (props) => {
  const [usersTablature, setUsersTablature] = useState([]);
  const [tablatureIsLoading, setTablatureIsLoading] = useState(true);
  const { user } = useContext(UserContext);

  const addToUsersTablature = (tab) => {
    setUsersTablature((prev) => {
      return [tab, ...prev]
    })
  }

  const deleteFromUsersTablature = (tab_id) => {
    setUsersTablature((prev) => {
      return prev.filter((tab) => tab._id !== tab_id)
    })
  }

  const updateUserTablature = (updatedTab) => {
    setUsersTablature((prev) => {
      return prev.map((tab) => {
        let tabObject = {}
        if(tab._id === updatedTab._id) {
          tabObject = { ...updatedTab }
        } else {
          tabObject = { ...tab }
        }
        return tabObject
      })
    })
  }

  const getTabFromUser = (tab_id) => usersTablature.find((tab) => tab._id === tab_id)

  useEffect(() => {
    // console.log('================================')
    // console.log('TabProvider useEffect running - user value ', user)
    setTablatureIsLoading(true);
    if(user) {
      const idToken = getIdTokenFromUser(user)
      // Get users tablature
      profileServices
      .getProfileOfLoggedInUser(user.username, idToken)
      .then((response) => {
        const profile = response.profile;
        const tabsWithOwnerInfo = profile.tablature.map((tab)=> {
          const owner = {
            _id: tab._id,
            preferredUsername: profile.preferredUsername,
            user: user.username,
          }
          tab.owner = owner
          return tab
        })
        setTablatureIsLoading(false)
        setUsersTablature(tabsWithOwnerInfo)
      })
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