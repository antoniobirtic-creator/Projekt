import React from "react";
import { Navigate } from "react-router-dom";

/**
 * SNR komponenta koja provjerava postoji li autorizacijski ključ.
 * Ako ne postoji, vraća korisnika na login.
 */
const ProtectedRoute = ({ children }) => {
  // Provjeravamo localStorage koji smo postavili u SignIn.js
  const isAuthenticated = localStorage.getItem("adminAuth");

  if (!isAuthenticated) {
    // Ako nema ključa, "izbaci" ga na sign-in
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
