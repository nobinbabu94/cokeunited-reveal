"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { initAmplify } from "./amplifyConfig";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const extractRole = (session) => {
    const groups =
      session?.signInUserSession?.accessToken?.payload?.[
        "cognito:groups"
      ] || [];

    if (groups.includes("Admins")) return "admin";
    if (groups.includes("Retailers")) return "retailer";

    return "user";
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        initAmplify();

        const sessionUser = await Auth.currentAuthenticatedUser();

        const role = extractRole(sessionUser);

        setUser({
          username:
            sessionUser.attributes?.email ||
            sessionUser.username,
          role,
        });
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async ({ username, password }) => {
    const signedInUser = await Auth.signIn(username, password);

    const role = extractRole(signedInUser);

    const userObj = {
      username:
        signedInUser.attributes?.email ||
        signedInUser.username,
      role,
    };

    setUser(userObj);

    return userObj;
  };

  const logout = async () => {
    await Auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAdmin: user?.role === "admin",
        isRetailer: user?.role === "retailer",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}