//import { getToken } from "./authManager";

const baseUrl = "/api/Category"

export const getCategories = () => {
    return fetch(baseUrl, {
        method: "GET",
        headers: {
            //Authorization: `Bearer ${token}`
        }
    }).then(resp => resp.json())
}

export const getCategoryById = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "GET"
    }).then(resp => resp.json())
}

export const postCategory = (category) => {
    return fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
    }).then(resp => resp.json())
}