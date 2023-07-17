const baseUrl = '/api/userprofile';

export const getAllUsers = () => {
  return fetch(baseUrl).then((response) => response.json());
};

export const getUserByFirebaseId = (firebaseId) => {
  return fetch(`${baseUrl}/${firebaseId}`).then((response) => response.json());
};

//https://localhost:5001/api/UserProfile/updateActiveStatus?userId=3&activeStatus=false

export const updateActiveStatus = (firebaseId, activeStatus) => {
  fetch(`${baseUrl}/updateActiveStatus?firebaseId=${firebaseId}&activeStatus=${activeStatus}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ firebaseId, activeStatus })
  })
    .then((response) => {
      return response.json
    }
    )
};