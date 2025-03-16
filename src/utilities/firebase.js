// Import the functions you need from the SDKs you need
const { initializeApp,  } = require("firebase/app")
const { getFirestore } = require("firebase/firestore");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APP_API_KEY,
  authDomain: process.env.FIREBASE_APP_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_APP_PROJECT_ID,
  storageBucket: process.env.FIREBASE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_APP_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_APP_ID,
  measurementId: process.env.FIREBASE_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
module.exports = {
  db,
  app,
};
