"use client";

import { createContext, useContext } from "react";
import type { FirebaseApp } from "firebase/app";
import type { Firestore } from "firebase/firestore";

type FirebaseContextType = {
  app: FirebaseApp | null;
  firestore: Firestore | null;
};

export const FirebaseContext = createContext<FirebaseContextType>({
  app: null,
  firestore: null,
});

export const FirebaseProvider = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  app: FirebaseApp;
  firestore: Firestore;
}) => {
  return (
    <FirebaseContext.Provider value={props}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
