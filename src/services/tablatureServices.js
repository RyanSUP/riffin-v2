const BASE_URL = process.env.REACT_APP_STACK_URL

/**
 * Request to create a new tablature document in MongoDB.
 * @param {Object} tablature 
 * @param {string} idToken 
 * @returns {Object} The newly created tablature document
 */
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

/**
 * Request to update a tablature document in MongoDB.
 * @param {Object} tab
 * @param {string} idToken 
 * @returns {Object} { status: "" }
 */
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

/**
 * Request to delete a tab from MongoDB.
 * @param {string} tab_id 
 * @param {string} idToken 
 * @returns {Object} { status: "" }
 */
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

/**
 * Request to get a tablature by id.
 * @param {string} id 
 * @returns {Object}
 */
const getTablatureById = async (id) => {
    const response = await fetch(`${BASE_URL}/tablature/${id}`, {method: 'GET'})
    return response.json()
}

/**
 * Request to get all tablature where the isPublic value === true
 * @returns {Array of tablature Objects}
 */
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