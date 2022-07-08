import { Route, Routes } from 'react-router-dom'
import { createContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { useEffect, useState, useCallback } from "react";

import UserPool from "./utils/UserPool";

import Landing from './pages/Landing/Landing';
import Trending from './pages/Trending/Trending';
import Nav from './components/Nav/Nav';


const UserContext = createContext();

function App() {
    const [user, setUser] = useState(null);

    // Check if there is a user session in local storage
    const getUserSessionFromCognito = useCallback(()=> {
        const getSession = async () => {
            return await new Promise((resolve, reject) => {
                if(user) {
                    user.getSession((error, session) => {
                        if(error) {
                            reject(error);
                        } else {
                            resolve(session);
                        }
                    })
                } else {
                    reject('No user');
                }
            })
        }

        return getSession()

    }, [user])

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
                    setUser(user);
                    resolve(data);
                },
                onFailure: (error) => {
                    console.error('onFailure: ', error);
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
      if(user) {
          user.signOut();
          setUser(null);
      }
  }

  useEffect(() => {
    const user = UserPool.getCurrentUser();
    setUser(user)
  }, [])


  return (

    <UserContext.Provider value={{ authenticate, getUserSessionFromCognito, logout, user, setUser }}>
        <Routes>
            <Route 
                exact
                path='/'
                element=
                {
                    <>
                        <Nav />               
                        {user ? (
                            <Trending />
                        ) : (
                            <Landing />
                        )}
                    </>
                }
            />
        </Routes>
    </UserContext.Provider>

  );
}

export {App, UserContext};
