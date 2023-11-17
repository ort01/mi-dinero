import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBvI0S52877svseLIJ4fB45_9A77auSDcY",
    authDomain: "midinero-88476.firebaseapp.com",
    projectId: "midinero-88476",
    storageBucket: "midinero-88476.appspot.com",
    messagingSenderId: "158372855720",
    appId: "1:158372855720:web:f9a0ee618040b97dbfe79d"
};


const app = initializeApp(firebaseConfig); // Initialize Firebase service

const db = getFirestore(app); // Initialize Cloud Firestore and get a reference to the service
const auth = getAuth(app) // Initialize Firebase Authentication and get a reference to the service


export { db, auth }

