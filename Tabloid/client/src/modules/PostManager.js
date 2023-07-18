import { getToken } from "./authManager";

const _apiUrl = "/api/post";

export const getAllPosts = () => {
    return getToken().then((token) => {
        return fetch(_apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error("An unknown error occurred while trying to fetch all posts.")
            }
        });
    });
};

export const getPostsByAuthor = (firebaseUserId) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/ByAuthor/${firebaseUserId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error("An unknown error occurred while trying to fetch posts by author.")
            }
        });
    });
};