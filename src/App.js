import { Route, Routes } from 'react-router-dom'
import { createContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { useEffect, useState, useCallback } from "react";

import UserPool from "./utils/UserPool";

import Landing from './pages/Landing/Landing';
import Trending from './pages/Trending/Trending';
import Nav from './components/Nav/Nav';
import TablatureInput from './components/TablatureInput/TablatureInput';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NewTablature from './pages/NewTablature/NewTablature';
import TablatureEditor from './pages/TablatureEditor/TablatureEditor';


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
            });
        }

        return getSession()

    }, [user]);

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
                    resolve(user);
                },
                onFailure: (error) => {
                    console.error('onFailure: ', error);
                    reject(error);
                },
                newPasswordRequired: (data) => {
                    console.log('newPasswordRequired: ', data);
                    resolve(user);
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
    setUser(user);
  }, [])


  return (

    <UserContext.Provider value={{ authenticate, getUserSessionFromCognito, logout, user, setUser }}>
        <Nav />
        <Routes>
            <Route 
                exact
                path='/'
                element={<Trending />}
            />
            <Route
                exact
                path='/login'
                element={<Landing />}
            />
            <Route
                exact
                path='/tablature/new'
                element={
                    <ProtectedRoute>
                        <NewTablature />
                    </ProtectedRoute>
                }
            />
            <Route
                exact
                path={'/tablature/:id'}
                element={ <TablatureEditor /> }
            />
        </Routes>
    </UserContext.Provider>

  );
}

export {App, UserContext};
