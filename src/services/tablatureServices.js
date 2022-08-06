// TODO Normalize naming of properties - will be less confusing when working on the backend.

const BASE_URL = process.env.REACT_APP_STACK_URL

const create = async (tablature, idToken) => {
    const payload = {
        tablature
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

const getTablatureById = async (id) => {
    const response = await fetch(`${BASE_URL}/tablature/${id}`, {method: 'GET'})
    return response.json()
}

const getTrendingTablature = async () => {
    const response = await fetch(`${BASE_URL}/tablature`, {method: 'GET'})
    return response.json()
}

export {
    create,
    update,
    deleteTab as delete,
    getTablatureById,
    getTrendingTablature
}