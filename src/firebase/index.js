// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
    apiKey: "AIzaSyCk1ANWeZQ24e8ItnH1JyUJp0dgry2UIqU",
    authDomain: "caridas-fund.firebaseapp.com",
    databaseURL: "https://caridas-fund.firebaseio.com",
    projectId: "caridas-fund",
    storageBucket: "caridas-fund.appspot.com",
    messagingSenderId: "624252173797",
    appId: "1:624252173797:web:a7d451df926c15c832430c",
    measurementId: "G-YX79SM85F4"
});

export default firebase