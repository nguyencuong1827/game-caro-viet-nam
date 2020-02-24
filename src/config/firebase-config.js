import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmzk11GixKwJY9RQ6s4RzTbP3ThfBrK9Y",
    authDomain: "caro-vn.firebaseapp.com",
    databaseURL: "https://caro-vn.firebaseio.com",
    projectId: "caro-vn",
    storageBucket: "caro-vn.appspot.com",
    messagingSenderId: "606123640956",
    appId: "1:606123640956:web:fca2ffc6f9f678e3a961f9",
    measurementId: "G-HF8ZC7N6S7"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export default storage;