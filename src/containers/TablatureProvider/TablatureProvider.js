// Components and hooks
import { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "containers/CognitoUserProvider/CognitoUserProvider";

// Services / utils
import * as profileServices from "services/profileServices";
import { getIdTokenFromUser } from "utils/userUtils";

const TablatureContext = createContext({});

const TablatureProvider = (props) => {
  const [usersTablature, setUsersTablature] = useState([])
  const [usersLikedTablature, setUsersLikedTablature] = useState({})
  const { user } = useContext(UserContext)

  const addToUsersLikedTablature = (tab_id) => {
    setUsersLikedTablature((prev) => {
      prev[tab_id] = true
      return { ...prev }
    })
  }

  const removeFromUsersLikedTablature = (tab_id) => {
    setUsersLikedTablature((prev) => {
      delete prev[tab_id]
      return({...prev})
    })
  }

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

        // get users liked tablature
        const favoriteTabHash = {}
        profile.favoriteTablature.forEach((tab) => {
          favoriteTabHash[tab._id] = true
        })
        setUsersLikedTablature(favoriteTabHash)
      })
    }
  }, [user])

  return (
    <TablatureContext.Provider
      value={{
        usersTablature,
        usersLikedTablature,
        addToUsersLikedTablature,
        removeFromUsersLikedTablature,
      }}
    >
      {props.children}
    </TablatureContext.Provider>
  );
}
 
export { TablatureProvider, TablatureContext }