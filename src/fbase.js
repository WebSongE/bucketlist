import firebase from "firebase/compat/app";
import { getAuth } from '@firebase/auth';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID,

};

const app=initializeApp(firebaseConfig);
export const authService = getAuth();
export const firebaseInstance = getAuth();
export const storageService = getStorage();
export const dbService=getFirestore();
