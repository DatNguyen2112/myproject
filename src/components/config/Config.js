import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyC6RbrKmTzoqI0DwM5MVE_psjNCB9zdKsg",
  authDomain: "startup-96e5b.firebaseapp.com",
  projectId: "startup-96e5b",
  storageBucket: "startup-96e5b.appspot.com",
  messagingSenderId: "811656496241",
  appId: "1:811656496241:web:6e835750482391765147d0"
};
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()
const storage = firebase.storage()
const dbRef = firebase.database().ref();

export {auth, db, storage,dbRef}
