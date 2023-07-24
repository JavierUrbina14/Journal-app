import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
    apiKey: "AIzaSyBMNdo2K99EvbQvCl1uoyROTnd5IAxBdpc",
    authDomain: "journal-app-bccc6.firebaseapp.com",
    projectId: "journal-app-bccc6",
    storageBucket: "journal-app-bccc6.appspot.com",
    messagingSenderId: "581800246058",
    appId: "1:581800246058:web:f690ae0c154b32d1befc53"
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );
