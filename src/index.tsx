import React, { createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDDA42VzHo17EjyOBZ_d9sD3c9I_MyFMFM",
  authDomain: "hoops-map-project.firebaseapp.com",
  projectId: "hoops-map-project",
  storageBucket: "hoops-map-project.appspot.com",
  messagingSenderId: "158329401812",
  appId: "1:158329401812:web:9c853fd699b1dffe1c2641",
  measurementId: "G-5NHQYRYNYD",
};

interface AuthContext {
  auth: any;
  db: any;
  storage: any;
}

export const Context = createContext<AuthContext>({
  auth: null,
  db: null,
  storage: null,
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);

ReactDOM.render(
  <Context.Provider
    value={{
      auth,
      db,
      storage,
    }}
  >
    <App />
  </Context.Provider>,
  document.getElementById("root")
);
