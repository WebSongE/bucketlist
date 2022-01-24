import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC4LoKyuGSomTvuRA7uT5aXOrh4WQbic2w",
    authDomain: "bucketlist-ef183.firebaseapp.com",
    projectId: "bucketlist-ef183",
    storageBucket: "bucketlist-ef183.appspot.com",
    messagingSenderId: "60967211945",
    appId: "1:60967211945:web:7499f6c64ed47f1c07eab8"
};

const app=initializeApp(firebaseConfig);
export const authService = getAuth();
export const firebaseInstance = getAuth();
export const storageService = getStorage();
export const dbService=getFirestore();