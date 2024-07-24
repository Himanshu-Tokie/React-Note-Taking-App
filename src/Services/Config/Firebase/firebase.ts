// Import the functions you need from the SDKs you need
import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { Auth, getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBfCYmn2kKx_HbVSDc7dm0PGXRdtXcU3Dk',
  authDomain: 'note-firebase-6366d.firebaseapp.com',
  projectId: 'note-firebase-6366d',
  storageBucket: 'note-firebase-6366d.appspot.com',
  messagingSenderId: '963157051833',
  appId: '1:963157051833:web:3c3f53ea603dd373d4ce68',
  measurementId: 'G-9G4NFTN3LP',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
// Initialize Firebase Authentication and get a reference to the service
export const auth: Auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
