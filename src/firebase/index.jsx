import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBANiRczljS7r9GCkn6z2aGy366nnWqUP8",
  authDomain: "project-sprint4.firebaseapp.com",
  projectId: "project-sprint4",
  storageBucket: "project-sprint4.appspot.com",
  messagingSenderId: "24338543449",
  appId: "1:24338543449:web:01022218c409ddabc15248",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get the function of the data base
export const getFirestore = firebase.firestore();

// Get the function of the storage
export const getStorage = firebase.storage();

// Get the function of authentication
export const getAuth = firebase.auth();

// Get the function of the provider to authenticate
export const getProvider = new firebase.auth.GoogleAuthProvider();

// Get the function to login
export const getLoginGoogle = () => getAuth.signInWithPopup(getProvider);

// Get the function to logout
export const logOut = () => getAuth.signOut();

// Export all the package of firebase
export default firebase;
