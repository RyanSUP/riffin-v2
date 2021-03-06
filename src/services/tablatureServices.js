const BASE_URL = process.env.REACT_APP_STACK_URL

const create = async (username, idToken) => {
    const payload = {
        user: username
    }
    const response = await fetch(`${BASE_URL}/tablature`, {
        method: 'POST',
        headers: {
            "Authorization": idToken,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })
    return response.json()
}

const update = async (tab, idToken) => {
    const payload = { tab }
    
    const response = await fetch(`${BASE_URL}/tablature/${tab._id}`, {
        method: 'PUT',
        headers: {
            "Authorization": idToken,
            "Content-Type": "application/json",

        },
        body: JSON.stringify(payload)
    })
    return response.json()
}

const deleteTab = async (tab_id, idToken) => {
    const payload = { tab_id }
    
    const response = await fetch(`${BASE_URL}/tablature/${tab_id}`, {
        method: 'DELETE',
        headers: {
            "Authorization": idToken,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })
    return response.json()
}

export {
    create,
    update,
    deleteTab
}