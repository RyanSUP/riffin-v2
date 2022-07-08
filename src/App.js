import { Route, Routes } from 'react-router-dom'
import { createContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { useEffect, useState } from "react";

import UserPool from "./utils/UserPool";

import Landing from './pages/Landing';
import Trending from './pages/Trending';


const UserContext = createContext();

function App() {
    const [user, setUser] = useState(null);

    // Check if there is a user session in local storage
    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = UserPool.getCurrentUser();
            if (user) {
                user.getSession((error, session) => {
                    if(error) {
                        reject(error);
                    } else {
                        resolve(session);
                    }
                })
            } else {
                reject("No user");
            }
        })
    }

  const authenticate = async (Username, Password) => {
      return await new Promise((resolve, reject) => {
          // 1. Create a user object with email and pool info
          const user = new CognitoUser({
              Username,
              Pool: UserPool
          });

          // 2. Get the authdetails needed to authenticate the user
          const authDetails = new AuthenticationDetails({
              Username,
              Password
          });

          // 3. Check if user is in the pool. The data returned will contain the access tokens.
          user.authenticateUser(authDetails, {
              onSuccess: (data) => {
                  console.log('onSuccess: ', data);
                  setUser(data);
                  resolve(data);
              },
              onFailure: (error) => {
                  console.error('onFailure: ', error);
                  setUser(null);
                  reject(error);
              },
              newPasswordRequired: (data) => {
                  console.log('newPasswordRequired: ', data);
                  resolve(data);
              },
          });
      });
  };

  const logout = () => {
      const user = UserPool.getCurrentUser();
      if(user) {
          user.signOut();
          setUser(null);
      }
  }

  useEffect(() => {
    getSession()
    .then(session => {
        console.log("Session: ", session);
        setUser(session);
    })
    .catch(error => {
        console.error("Session error: ", error);
    })
  }, []);

  return (

    <UserContext.Provider value={{ authenticate, getSession, logout, user }}>
        <Routes>
            <Route 
                exact
                path='/'
                element=
                {
                    user ? (
                        <Trending />
                    ) : (
                        <Landing />
                    )
                }
            />
        </Routes>
    </UserContext.Provider>

  );
}

export {App, UserContext};
