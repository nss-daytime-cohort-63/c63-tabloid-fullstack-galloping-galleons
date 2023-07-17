const baseUrl = '/api/userprofile';

export const getAllUsers = () => {
  return fetch(baseUrl).then((response) => response.json());
};

export const getUserByFirebaseId = (firebaseId) => {
  return fetch(`${baseUrl}/${firebaseId}`).then((response) => response.json());
};
