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
import axiosPublic from "../../api/axiosPublic";

export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("borrower");
  const [loading, setLoading] = useState(true);

  // ✅ Create JWT cookie after login/register
  const createJwtCookie = async (email) => {
    try {
      const res = await axiosPublic.get(`/users/role?email=${email}`);
      const dbRole = res.data?.role || "borrower";
      setRole(dbRole);

      await axiosPublic.post("/jwt", { email, role: dbRole });
    } catch (err) {
      console.error("JWT cookie create failed:", err);
    }
  };

  //login with email and password
  const createUser = async (email, password) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result;
  };

  //signin with email and password
  const signIn = async (email, password) => {
    setLoading(true);
    const result = await signInWithEmailAndPassword(auth, email, password);
    await createJwtCookie(result.user.email);

    toast.success("Login successful!");
    return result;
  };

  //signin with google
  const signInWithGoogle = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, googleProvider);

    await createJwtCookie(result.user.email);
    toast.success("Login successful!");
    return result;
  };

  //signout
  const logOut = async () => {
    try {
      await axiosPublic.post("/logout");
    } catch (e) {
      console.error("Logout cookie clear failed:", e);
    }

    await signOut(auth);
    setUser(null);
    setRole("borrower");
    toast.success("Logout Successful!");
  };

  //password reset
  const resetPass = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  //updateuser data
  const updateUser = (updatedData) => {
    if (!auth.currentUser) {
      throw new Error("No authenticated user found");
    }
    return updateProfile(auth.currentUser, updatedData);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        await createJwtCookie(currentUser.email);
      } else {
        setRole("borrower");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authData = {
    createUser,
    user,
    role,
    setRole,
    setUser,
    signIn,
    logOut,
    resetPass,
    updateUser,
    signInWithGoogle,
    loading,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
