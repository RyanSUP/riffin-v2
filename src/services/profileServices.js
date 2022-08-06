const BASE_URL = process.env.REACT_APP_STACK_URL

const create = async (username, preferredUsername, idToken) => {
    const payload = {
        user: username,
        preferredUsername
    }
    
    let response = await fetch(`${BASE_URL}/profile`, {
        method: 'POST',
        headers: {
            "Authorization": idToken,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })
    return response.json()
}

const getProfileOfLoggedInUser = async (username, idToken) => { 
    const response = await fetch(`${BASE_URL}/profile/${username}`, {
        method: 'GET',
        headers: {
            "Authorization": idToken,
        }
    })
    return response.json()
}

const getUsersPublicInfo = async (username, idToken) => { 
    const response = await fetch(`${BASE_URL}/profile/public/${username}`, {
        method: 'GET',
        headers: {
            "Authorization": idToken,
        }
    })
    return response.json()
}

export {
    create,
    getUsersPublicInfo,
    getProfileOfLoggedInUser
}