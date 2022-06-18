import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/storage';

firebase.initializeApp({
    apiKey: "AIzaSyCofhqX0fLyQG6Kj3lAt6QTLfvIH8ShIRs",
    authDomain: "traderbook-c792d.firebaseapp.com",
    projectId: "traderbook-c792d",
    storageBucket: "traderbook-c792d.appspot.com",
    messagingSenderId: "655655955842",
    appId: "1:655655955842:web:68113c96110eba0b15339b"
  });

const auth=firebase.auth();
const storage=firebase.firestore();

export {storage,auth};