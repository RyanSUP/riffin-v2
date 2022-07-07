import { createContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";

const AccountContext = createContext();

const Account = (props) => {

    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = UserPool.getCurrentUser();
            if (user) {
                user.getSession((error, session) => {
                    if(error) {
                        reject();
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
                    resolve(data);
                },
                onFailure: (error) => {
                    console.error('onFailure: ', error);
                    reject(error)
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
        }
    }

    return (
        <AccountContext.Provider value={{ authenticate, getSession, logout }}>
            {props.children}
        </AccountContext.Provider>
    );
}
 
export {Account, AccountContext};