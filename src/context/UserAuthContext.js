import { createContext, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState("");
  

  function signUp(email, password, age, gender) {
    return createUserWithEmailAndPassword(auth, email, password, age, gender);
  }

  function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
    // setIsAuthenticated(true);
  }

  function logOut(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
    // setIsAuthenticated(true);
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  function facebookSignIn() {
    const facebookAuthProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, facebookAuthProvider);
  }

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
  return (
    <userAuthContext.Provider
      value={{ signUp, signIn, logOut, googleSignIn, facebookSignIn }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
