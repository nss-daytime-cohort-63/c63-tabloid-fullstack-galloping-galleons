import firebase from "firebase/app";
import "firebase/auth";
import { getActiveStatusByEmail } from "./profileManager";

const _apiUrl = "/api/userprofile";


const _doesUserExist = (firebaseUserId) => {
  return getToken().then((token) =>
    fetch(`${_apiUrl}/DoesUserExist/${firebaseUserId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(resp => resp.ok));
};

const _saveUser = (userProfile) => {
  return getToken().then((token) =>
    fetch(_apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userProfile)
    }).then(resp => resp.json()));
};



export const getToken = () => firebase.auth().currentUser.getIdToken();


export const login = (email, pw) => {
  return firebase.auth().signInWithEmailAndPassword(email, pw)
    .then((signInResponse) => {
      return Promise.all([_doesUserExist(signInResponse.user.uid), getActiveStatusByEmail(signInResponse.user.email)])
        .then(([doesUserExist, activeStatus]) => {
          if (!doesUserExist || !activeStatus) {
            logout();
            throw new Error("Something's wrong. The user exists in firebase, but not in the application database.");
          }
        });
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
};



export const logout = () => {
  firebase.auth().signOut()
};


export const register = (userProfile, password) => {
  return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
    .then((createResponse) => _saveUser({ 
      ...userProfile, 
      firebaseUserId: createResponse.user.uid 
    }));
};


export const onLoginStatusChange = (onLoginStatusChangeHandler) => {
  firebase.auth().onAuthStateChanged((user) => {
    onLoginStatusChangeHandler(!!user);
  });
};