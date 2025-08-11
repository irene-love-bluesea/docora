import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserSession } from "../../storage/AuthStorage";
import axiosInstance from "../../api/axiosInstance";
import { API_ENDPOINTS } from "../../api/endpoints";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedSession = await getUserSession();
        if (storedSession) {
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${storedSession?.token}`;
          const { data: user } = await axiosInstance.get(
            API_ENDPOINTS.auth.getMe
          );
          console.log("Loaded user:", user, "token:", storedSession?.token);

          setSession({ token: storedSession?.token, user: user });
        }
      } catch (e) {
        console.error("Failed to load session", e);
        await deleteAuthToken();
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();
  }, []);
  const value = { session, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log("Auth context:", context);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};