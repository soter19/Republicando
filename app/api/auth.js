import firebase from 'firebase';
import 'firebase/auth';

export const auth = firebase.auth();

// Get Current User

export const getCurrentUser = () => auth.currentUser;

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () =>
    auth.signOut();
