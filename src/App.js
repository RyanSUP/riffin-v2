// Services
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { createContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { useEffect, useState, useCallback } from "react";
import UserPool from "./utils/UserPool";
import * as profileServices from "./services/profileServices";
import * as userUtils from "./utils/userUtils";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";
// import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.js"

// Components
import Nav from "./components/Nav/Nav";
import TrendingContent from "./components/TrendingContent/TrendingContent";
import ProfileContent from "./components/ProfileContent/ProfileContent";
import Landing from "./pages/Landing/Landing";
import TablatureEditorPLUS from "./pages/TablatureEditorPLUS/TablatureEditorPLUS";
import { Grid } from "@mui/material";

const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null); // Cognito User object that also holds profile data from MongoDB

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
          navigate("/trending");
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
      setUser(userFromPool);
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
          setUser(userFromPool);
        });
    }
  }, [user]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <UserContext.Provider
          value={{
            authenticate,
            getUserSessionFromCognito,
            logout,
            user,
            setUser,
          }}
        >
          <Nav />

          <Grid container>
            <Grid item xs={12}>
              header
            </Grid>
            <Grid item xs={2}>
              {/* TODO Tim create nav area and plop it here */}
              nav area
            </Grid>
            <Grid item xs={8}>
              <Routes>
                <Route path="/login" element={<Landing />} />
                <Route path="/trending" element={<TrendingContent />} />
                <Route
                  path="/profile/:cognitoUsername"
                  element={<ProfileContent />}
                />
                <Route path="/tablature/:tabId" element={<TrendingContent />} />
                <Route path="/new" element={<TablatureEditorPLUS />} />
                <Route path="*" element={<Navigate to="/trending" replace />} />
              </Routes>
            </Grid>
            <Grid item xs={2}>
              Ad
            </Grid>
          </Grid>
        </UserContext.Provider>
      </ThemeProvider>
    </>
  );
}

export { App, UserContext };
