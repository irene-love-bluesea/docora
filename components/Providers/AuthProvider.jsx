import { useNavigation } from "@react-navigation/native";
import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { API_ENDPOINTS } from "../../api/endpoints";
import { deleteAuthToken, getAuthToken, saveAuthToken } from "../../storage/AuthStorage";
import { userRoles } from "../../constant/data/role";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedSession = await getAuthToken();
        if (storedSession) {
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${storedSession}`;
          const { data: user } = await axiosInstance.get(
            API_ENDPOINTS.auth.getMe
          );
          setSession({ token: storedSession, user: user });
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
      await saveAuthToken(token);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      try {
        const { data: freshUserData } = await axiosInstance.get(
          API_ENDPOINTS.auth.getMe
        );
        setSession({ token, user: freshUserData });

        if (freshUserData) {
          console.log("user: ", freshUserData);
          if (!freshUserData?.data.verifyEmail) {
            navigation.navigate("Verify");
          } else if (freshUserData?.data.role === userRoles.UNDEFINED) {
            navigation.navigate("RoleSelector");
          }
        }
      } catch (fetchError) {
        // If fetching fresh data fails, use the provided user data
        console.warn("Failed to fetch fresh user data, using login response:", fetchError);
        setSession({ token, user });
      }
    } catch (error) {
      console.error("Login failed:", error);
      await deleteAuthToken();
      throw error;
    }
    // finally {
    //   setIsLoading(false);
    // }
  };

  const logout = async () => {
    try {
      await deleteAuthToken();
      delete axiosInstance.defaults.headers.common["Authorization"];
      setSession(null);
      navigation.navigate("Auth");
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
