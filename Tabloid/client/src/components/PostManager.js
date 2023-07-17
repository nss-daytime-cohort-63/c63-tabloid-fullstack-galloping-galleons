const _apiUrl = "/api/post";

export default {
    getAllPosts() {
        return fetch(_apiUrl)
            .then(response => response.json())
    }
}
