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
  const [userRole, setUserRole] = useState("borrower");
  const [loading, setLoading] = useState(true);
  const [userSuspended, setUserSuspended] = useState(false);

  // ✅ Load full user profile from /me endpoint (backend may not have it yet)
  const loadUserProfile = async () => {
    try {
      const res = await axiosPublic.get("/me");
      setUser(res.data);
      setUserRole(res.data?.role || "borrower");
      setUserSuspended(res.data?.suspended || false);
    } catch (err) {
      // Silently fail if /me doesn't exist (404) - backend may not be updated yet
      if (err.response?.status === 404) {
        return; // Fall back to JWT-based role
      }
      // Log actual errors (not 404)
      console.error("Failed to load user profile:", err.message);
      setUser(null);
      setUserRole("borrower");
      setUserSuspended(false);
    }
  };

  // Create backend JWT cookie from verified Firebase ID token
  const createJwtCookie = async (firebaseUser) => {
    try {
      if (!firebaseUser) return;
      const idToken = await firebaseUser.getIdToken();
      const res = await axiosPublic.post("/jwt", { idToken });
      setUserRole(res.data?.role || "borrower");
      // Now load full profile from /me
      await loadUserProfile();
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
    await createJwtCookie(result.user);

    toast.success("Login successful!");
    return result;
  };

  //signin with google
  const signInWithGoogle = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, googleProvider);

    await createJwtCookie(result.user);
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
    setUserRole("borrower");
    setUserSuspended(false);
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

      if (currentUser) {
        await createJwtCookie(currentUser);
      } else {
        setUserRole("borrower");
        setUserSuspended(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authData = {
    createUser,
    user,
    userRole,
    setUserRole,
    setUser,
    signIn,
    logOut,
    resetPass,
    updateUser,
    signInWithGoogle,
    loading,
    userSuspended,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
