//import { getToken } from "./authManager";

const baseUrl = "/api/Category"

export const getCategories = () => {
    return fetch(baseUrl, {
        method: "GET",
        headers: {
            //Authorization: `Bearer ${token}`
        }
    }).then((resp) => {
        if(resp.ok){
            return resp.json()
        }
        else {
            throw new Error("An unknown error occurred while trying to retrieve all categories.")
        }
        })
}

export const getCategoryById = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "GET"
    }).then((resp) => {
        if(resp.ok){
            return resp.json()
        }
        else
        {
            throw new Error(`An error occurred while trying to retrieve category by id of "${id}"`)
        }
    })
}

export const postCategory = (category) => {
    return fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
    }).then((resp) => {
        if(resp.ok){
            return resp.json()
        }
        else
        {
            throw new Error("An error occurred when trying to post this category. Is it formatted correctly?")
        }
    })
}

export const updateCategory = (id, category) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category)
    }).then((resp) => {
        if(resp.ok){
            return
        }
        else
        {
            throw new Error(`An error occurred while updating the category. Supplied Id: ${id} Supplied category.id: ${category?.id}. Did you mismatch something?`)
        }
    })
}

export const deleteCategory = (id) => {
    return fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
        headers: {

        }
    }).then(resp => {
        if(resp.ok){
            return
        }
        else{
            throw new Error(`Had an error deleting category with id ${id} - does it exist?`)
        }
    });
}