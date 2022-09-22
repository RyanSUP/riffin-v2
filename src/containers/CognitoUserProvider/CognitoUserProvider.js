// Components and hooks
import { createContext, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Services / utils
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import * as profileServices from "services/profileServices";
import * as userUtils from "utils/userUtils";
import UserPool from "utils/UserPool";

const UserContext = createContext({});

const CognitoUserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [userIsLoading, setUserIsLoading] = useState(true);

  let navigate = useNavigate();

  /**
   * Returns session data from local storage if it exists.
   * @return {Object} session data
   */
  const getUserSessionFromCognito = useCallback(() => {
    const getSession = async () => {
      return await new Promise((resolve, reject) => {
        if (user) {
          user.getSession((error, session) => {
            if (error) {
              reject(error);
            } else {
              resolve(session);
            }
          });
        } else {
          reject("No user");
        }
      });
    };

    return getSession();
  }, [user]);

  /**
   * Checks provided username and password against the Cognito user pool.
   * Sets 'user' state and navigates to the users profile page on successful authentication.
   * @param {string} Username
   * @param {string} Password
   */
  const authenticate = async (Username, Password) => {
    return await new Promise((resolve, reject) => {
      // 1. Create a user object with email and pool info
      const user = new CognitoUser({
        Username,
        Pool: UserPool,
      });

      // 2. Get the authdetails needed to authenticate the user
      const authDetails = new AuthenticationDetails({
        Username,
        Password,
      });

      // 3. Check if user is in the pool. The data returned will contain the access tokens.
      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("onSuccess: ", data);
          setUser(user);
          resolve(user);
          navigate("/login");
        },
        onFailure: (error) => {
          console.error("onFailure: ", error);
          reject(error);
        },
        newPasswordRequired: (data) => {
          console.log("newPasswordRequired: ", data);
          resolve(user);
        },
      });
    });
  };

  /**
   * Logout user from the user pool and remove session data from local storage.
   */
  const logout = () => {
    if (user) {
      user.signOut();
      setUser(null);
      navigate("/login");
    }
  };

  /**
   * Handle changes to user state.
   */
  useEffect(() => {
    // If user is not set, check if there is user data in session storage. This allows users to return to the app without having to log back in each time.
    if (!user) {
      const userFromPool = UserPool.getCurrentUser();
      setUserIsLoading(true);
      setUserIsLoading(false);
      setUser(userFromPool);
    }
    if (user && user.profile) {
      setUserIsLoading(false);
    }

    // Fetch Profile from the backend if it doesn't exist in user state. Profile is the MongoDB Document associated with the user.
    if (user && !user.profile) {
      const userFromPool = UserPool.getCurrentUser();
      const idToken = userUtils.getIdTokenFromUser(userFromPool);
      profileServices
        .getProfileOfLoggedInUser(userFromPool.username, idToken)
        .then((response) => {
          const profile = response.profile;
          userFromPool["profile"] = profile;
          // TODO Remove tabsWithOwnerInfo -- not needed for non-public build
          const tabsWithOwnerInfo = profile.tablature.map((tab) => {
            const owner = {
              _id: tab._id,
              preferredUsername: profile.preferredUsername,
              user: user.username,
            };
            tab.owner = owner;
            return tab;
          });
          userFromPool.profile.tablature = tabsWithOwnerInfo;

          // TODO Remove liked tablature stuff
          // set favorite tablature hash
          const favoriteTabHash = {};
          profile.favoriteTablature.forEach((tab) => {
            favoriteTabHash[tab._id] = true;
          });
          userFromPool.profile.favoriteTabHash = favoriteTabHash;

          setUserIsLoading(false);
          setUser(userFromPool);
        });
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        authenticate,
        getUserSessionFromCognito,
        logout,
        user,
        setUser,
        userIsLoading,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export { CognitoUserProvider, UserContext };
