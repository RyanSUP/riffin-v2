const BASE_URL = process.env.REACT_APP_STACK_URL

/**
 * Request to create a new profile document in MongoDB.
 * @param {string} cognitoUsername - refering to the Cognito user.username
 * @param {string} preferredUsername 
 * @param {string} idToken 
 * @returns {Object} profile document
 */
const create = async (cogniteUsername, preferredUsername, idToken) => {
    const payload = {
        user: cogniteUsername,
        preferredUsername
    };
    
    let response = await fetch(`${BASE_URL}/profile`, {
        method: 'POST',
        headers: {
            "Authorization": idToken,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    });
    return response.json();
}

/**
 * Request to get profile document of the currently logged in user.
 * @param {string} cogniteUsername - refering to the Cognito user.username
 * @param {string} idToken 
 * @returns {Object} profile document
 */
const getProfileOfLoggedInUser = async (cogniteUsername, idToken) => { 
    const response = await fetch(`${BASE_URL}/profile/${cogniteUsername}`, {
        method: 'GET',
        headers: {
            "Authorization": idToken,
        }
    });
    return response.json();
}

/**
 * Request to get a profile's public information, such as public tablature and preferredUsername.
 * @param {string} username - refering to the Cognito user.username
 * @returns {Object} public profile info
 */
const getUsersPublicInfo = async (username) => { 
    const response = await fetch(`${BASE_URL}/profile/public/${username}`, {
        method: 'GET'
    });
    return response.json();
}

export {
    create,
    getUsersPublicInfo,
    getProfileOfLoggedInUser
}