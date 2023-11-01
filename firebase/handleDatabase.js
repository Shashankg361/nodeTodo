// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.DATABASE_APP_APIKEY,
  authDomain: process.env.DATABASE_APP_AUTHDOMAIN,
  databaseURL: process.env.DATABASE_APP_DATABASE_URL,
  projectId: process.env.DATABASE_APP_PROJECTID,
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
