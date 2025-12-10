import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.init";
import { toast } from "react-toast";

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //login with email and password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //signin with email and password
  const signIn = async (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //signout
  const logOut = () => {
    toast.success("Logout Successful!");
    return signOut(auth);
  };

  //password reset
  const resetPass = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  //updateuser data
  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  //signin with google
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authData = {
    createUser,
    user,
    setUser,
    signIn,
    logOut,
    resetPass,
    updateUser,
    signInWithGoogle,
    loading,
  };
  return (
    <AuthContext.Provider value={authData}> {children} </AuthContext.Provider>
  );
};

export default AuthProvider;
