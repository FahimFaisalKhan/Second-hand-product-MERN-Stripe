import React, { createContext, useEffect, useState } from "react";

import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../configs/firebase.config";

export const MyAuthContext = createContext();

const AuthContext = ({ children }) => {
  const auth = getAuth(app);
  const gProvider = new GoogleAuthProvider();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const createUser = (email, pass) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };
  const loginUser = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, gProvider);
  };
  const updateUser = (name, img) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: img,
    });
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (cUser) => {
      setUser(cUser);
      setLoading(false);
    });

    return () => unSubscribe();
  }, [auth]);
  return (
    <div>
      <MyAuthContext.Provider
        value={{
          createUser,
          user,
          loginUser,
          updateUser,
          logOut,
          googleSignIn,
          loading,
          setLoading,
        }}
      >
        {children}
      </MyAuthContext.Provider>
    </div>
  );
};

export default AuthContext;
