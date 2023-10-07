import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCdpv83bGAF6aETIn62u3Ni1s0dANhzzKw",
  authDomain: "todo-app-2bb14.firebaseapp.com",
  projectId: "todo-app-2bb14",
  storageBucket: "todo-app-2bb14.appspot.com",
  messagingSenderId: "354058917942",
  appId: "1:354058917942:web:2b3879e7c99474e019e097",
  measurementId: "G-3F99R6H5Y9"
};
const app = initializeApp(firebaseConfig);
const auth=getAuth();
const db= getFirestore(app);
export {db,auth};
