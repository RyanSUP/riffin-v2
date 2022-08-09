// Services
import { Route, Routes, useNavigate } from 'react-router-dom'
import { createContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { useEffect, useState, useCallback } from "react";
import UserPool from "./utils/UserPool";
import * as profileServices from "./services/profileServices"
import * as userUtils from "./utils/userUtils"

// Components
import Nav from './components/Nav/Nav';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import TablatureEditorPLUS from './pages/TablatureEditorPLUS/TablatureEditorPLUS';

// Pages
import Landing from './pages/Landing/Landing';
import Trending from './pages/Trending/Trending';
import Profile from './pages/Profile/Profile';

const UserContext = createContext();

function App() {
    const [user, setUser] = useState(null); // Cognito User object that also holds profile data from MongoDB
    let navigate = useNavigate();

    // TODO ---
    const updateTabInUsersTablature = () => console.log('updateTabInUsersTablature');
    const addTabToUsersTablature = () => console.log('addTabToUsersTablature');
    const removeTabFromUsersTablature = () => console.log('removeTabFromUsersTablature');
    // TODO ---

    /**
     * Returns session data from local storage if it exists.
     * @return {Object} session data
     */
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
                    navigate(`/profile/${user.username}`)
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

    /**
     * Logout user from the user pool and remove session data from local storage.
     */
    const logout = () => {
        if(user) {
            user.signOut();
            setUser(null);
            navigate('/login')
        }
    };

    /**
     * Handle changes to user state.
     */
    useEffect(() => {

        // If user is not set, check if there is user data in session storage. This allows users to return to the app without having to log back in each time.
        if(!user) {
            const userFromPool = UserPool.getCurrentUser();
            setUser(userFromPool);
        }
        
        // Fetch Profile from the backend if it doesn't exist in user state. Profile is the MongoDB Document associated with the user.
        if(user && !user.profile) {
            const userFromPool = UserPool.getCurrentUser();
            const idToken = userUtils.getIdTokenFromUser(userFromPool);
            profileServices.getProfileOfLoggedInUser(userFromPool.username, idToken)
            .then( (response)=> {
                const profile = response.profile;
                userFromPool['profile'] = profile;
                setUser( userFromPool );
            });
        }
    }, [user]);


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
                path='/profile/:id'
                element={<Profile />}
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
                        <TablatureEditorPLUS />
                    </ProtectedRoute>
                }
            />
            <Route
                exact
                path={'/tablature/:id'}
                element={
                    <ProtectedRoute>
                        <TablatureEditorPLUS />
                    </ProtectedRoute>
                }
            />
        </Routes>
    </UserContext.Provider>

  );
}

export {App, UserContext};
