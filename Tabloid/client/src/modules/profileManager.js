const baseUrl = '/api/userprofile';

export const getAllUsers = () => {
  return fetch(baseUrl).then((response) => response.json());
};

export const getUserByFirebaseId = (firebaseId) => {
  return fetch(`${baseUrl}/${firebaseId}`).then((response) => response.json());
};

//https://localhost:5001/api/UserProfile/updateActiveStatus?userId=3&activeStatus=false

export const updateActiveStatus = (userId, activeStatus) => {
  fetch(`${baseUrl}/updateActiveStatus?userId=${userId}&activeStatus=${activeStatus}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ activeStatus })
  })
    .then((response) => {
      return response.json
    }
    )
};