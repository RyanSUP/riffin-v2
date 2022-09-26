// Components and hooks
import { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";

// Services / utils
import * as profileServices from "services/profileServices";
import { getIdTokenFromUser } from "utils/userUtils";

const TablatureContext = createContext({});

const TablatureProvider = (props) => {
  const [usersTablature, setUsersTablature] = useState([])
  // TODO Remove liked tablature stuff
  const [usersLikedTablature, setUsersLikedTablature] = useState({})
  const { user } = useContext(UserContext)

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

  // TODO Remove liked tablature stuff
  const addToUsersLikedTablature = (tab_id) => {
    setUsersLikedTablature((prev) => {
      prev[tab_id] = true
      return { ...prev }
    })
  }
  // TODO Remove liked tablature stuff
  const removeFromUsersLikedTablature = (tab_id) => {
    setUsersLikedTablature((prev) => {
      delete prev[tab_id]
      return({...prev})
    })
  }

  const getTabFromUser =(tab_id) => usersTablature.find((tab) => tab._id === tab_id)

  useEffect(() => {
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
        setUsersTablature(tabsWithOwnerInfo)
        // TODO Remove liked tablature stuff
        // get users liked tablature
        const favoriteTabHash = {}
        profile.favoriteTablature.forEach((tab) => {
          favoriteTabHash[tab._id] = true
        })
        setUsersLikedTablature(favoriteTabHash)
      })
    }
  }, [user])

  // TODO Remove liked tablature stuff
  return (
    <TablatureContext.Provider
      value={{
        usersTablature,
        usersLikedTablature,
        deleteFromUsersTablature,
        addToUsersLikedTablature,
        addToUsersTablature,
        removeFromUsersLikedTablature,
        getTabFromUser,
        updateUserTablature,
      }}
    >
      {props.children}
    </TablatureContext.Provider>
  );
}
 
export { TablatureProvider, TablatureContext }