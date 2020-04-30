// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore"

firebase.initializeApp({
    apiKey: "AIzaSyCO7hSRt8D2Lg-IEOVNQWl7M0yInq8Z-m4",
    authDomain: "app.caridas.fund",
    databaseURL: "https://caridas-49c30.firebaseio.com",
    projectId: "caridas-49c30",
    storageBucket: "caridas-49c30.appspot.com",
    messagingSenderId: "444448385849",
    appId: "1:444448385849:web:f9124dbc32f0b8d06616e8",
    measurementId: "G-CNC79REFL2"
});

export default firebase