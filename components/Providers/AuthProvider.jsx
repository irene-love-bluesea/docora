import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { API_ENDPOINTS } from "../../api/endpoints";
import { deleteAuthToken, getAuthToken, saveAuthToken } from "../../storage/AuthStorage";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedSession = await getAuthToken();
        if (storedSession) {
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${storedSession?.token}`;
          const { data: user } = await axiosInstance.get(
            API_ENDPOINTS.auth.getMe
          );

          setSession({ token: storedSession?.token, user: user });
        }
      } catch (e) {
        await deleteAuthToken();
        console.error("Failed to load session", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();
  }, []);

  const login = async (token, user) => {
    try {
      console.log("token : " , token);
      
      await saveAuthToken(token);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      setSession({ token, user });
    } catch (error) {
      console.error("Login failed:", error);
      await deleteAuthToken();
      throw error;
    }finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await deleteAuthToken();
      delete axiosInstance.defaults.headers.common["Authorization"];
      setSession(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value = {
    session,
    isLoading,
    login,
    logout,
    user: session?.user,
    token: session?.token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
