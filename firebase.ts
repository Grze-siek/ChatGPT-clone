import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAzUt_HiI0JXGNDKi7UL87MG42wT2Ru--s',
  authDomain: 'chatgpt-diego.firebaseapp.com',
  projectId: 'chatgpt-diego',
  storageBucket: 'chatgpt-diego.appspot.com',
  messagingSenderId: '166491762847',
  appId: '1:166491762847:web:5bacbcf2bf20f8b9ebb2aa',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
// Initialize Firebase
const db = getFirestore(app);

export { db };
