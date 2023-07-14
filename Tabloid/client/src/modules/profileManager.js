const baseUrl = '/api/userprofile';

export const getAllUsers = () => {
    return fetch(baseUrl)
        .then((response) => response.json())
}
