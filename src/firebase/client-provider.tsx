"use client";

import { useState } from "react";
import { initializeFirebase } from ".";
import { FirebaseProvider } from "./provider";

export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  const [firebase] = useState(() => initializeFirebase());

  return (
    <FirebaseProvider
      app={firebase.app}
      auth={firebase.auth}
      firestore={firebase.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
