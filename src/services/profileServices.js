const BASE_URL = process.env.REACT_APP_STACK_URL

const create = async (username, idToken) => {
    const payload = {
        user: username
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

export {
    create
}