import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { firebaseConfig } from "./config";

let app: FirebaseApp;
let firestore: Firestore;

function initializeFirebase(): {
  app: FirebaseApp;
  firestore: Firestore;
} {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    firestore = getFirestore(app);
  } else {
    app = getApps()[0];
    firestore = getFirestore(app);
  }
  return { app, firestore };
}

export { initializeFirebase };
