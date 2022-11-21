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
  const [user, setUser] = useState(null)
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

  const changePassword = async (PreviousPassword, ProposedPassword) => {
    return new Promise((resolve, reject) => {
      // I need to authenticate the user. To do this, I need the user's email.
      // How do I get the email?
      getUserSessionFromCognito()
      .then(session => {
        const Username = session.idToken.payload.email;
        // 1. Create a user object with email and pool info
        const cogUser = new CognitoUser({
          Username,
          Pool: UserPool,
        });

        // 2. Get the authdetails needed to authenticate the user
        const authDetails = new AuthenticationDetails({
          Username,
          Password: PreviousPassword
        });

        cogUser.authenticateUser(authDetails, {
          onSuccess: (data) => {
            const callback = (err, result) => {
              if(err) {
                console.error("Inside Error")
                console.error(err.message || JSON.stringify(err));
                reject(err.message || JSON.stringify(err))
              } else {
                resolve(true);
              }
            }
            cogUser.changePassword(PreviousPassword, ProposedPassword, callback);
          },
          onFailure: (error) => {
            reject(error);
          },
          newPasswordRequired: (data) => {
            resolve(true)
          },
        });
      });
    })
  }

  /**
   * Checks provided username and password against the Cognito user pool.
   * Sets 'user' state and navigates to the users profile page on successful authentication.
   * @param {string} Username
   * @param {string} Password
   */
  const authenticate = async (Username, Password, type) => {
    setUserIsLoading(true)
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
          const idToken = userUtils.getIdTokenFromUser(user);
          if(type === 'new user') {
            profileServices
            .create(user.username, idToken)
            .then((res) => {
              user["profile"] = res;
              setUser(user);
              resolve(user);
              setUserIsLoading(false)
              navigate(`/profile/${user.username}`);
            })
            .catch((error) => {
            });
          } else {
            profileServices.getProfileOfLoggedInUser(user.username, idToken)
            .then((response) => {
              user["profile"] = response.profile;
              setUser(user);
              resolve(user);
              setUserIsLoading(false)
              navigate(`/profile/${user.username}`);
            });
          }
        },
        onFailure: (error) => {
          reject(error);
        },
        newPasswordRequired: (data) => {
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
      setUserIsLoading(true)
      const userFromPool = UserPool.getCurrentUser();
      setUser(userFromPool);
    }
    if (user && user.profile) {
      setUserIsLoading(false)
    }

    // Fetch Profile from the backend if it doesn't exist in user state. Profile is the MongoDB Document associated with the user.
    if (user && !user.profile) {
      const idToken = userUtils.getIdTokenFromUser(user);
      profileServices.getProfileOfLoggedInUser(user.username, idToken)
      .then((response) => {
        const profile = response.profile;
        user["profile"] = profile;
        setUserIsLoading(false)
        setUser(user);
      });
    }
  }, [user]);

  /**
   * Utility for navigating to the profile page. Navs to login if there is no user.
   */
  const navToProfile = () => user.username ? navigate(`/profile/${user.username}`) : navigate(`/login`);
 
  return (
    <UserContext.Provider
      value={{
        authenticate,
        getUserSessionFromCognito,
        logout,
        user,
        setUser,
        userIsLoading,
        navToProfile,
        changePassword,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
 
export { CognitoUserProvider, UserContext }