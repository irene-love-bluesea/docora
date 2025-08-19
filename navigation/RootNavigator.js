import { useAuth } from "../components/Providers/AuthProvider";
import SplashScreen from "../screens/splash/SplashScreen";
import AppNavigator, { AuthNavigator } from "./AppNavigator";
import { userRoles } from "../constant/data/role";

export default function RootNavigator() {
  const { session, isLoading, user } = useAuth();
  
  if (isLoading) return <SplashScreen />;

  if (!session) return <AuthNavigator />;

  const userData = session?.user;

  if (!userData) {
    return <AuthNavigator />;
  }

  console.log("User verification check:", {
    verifyEmail: userData.verifyEmail,
    role: userData.role !== userRoles.UNDEFINED,
    isUndefined: userData.role === userRoles.UNDEFINED
  });

  const isUserFullyAuthenticated =
    session && userData.verifyEmail && userData.role !== userRoles.UNDEFINED;

  if (isUserFullyAuthenticated) {
    return <AppNavigator />;
  }

  return <AuthNavigator user={userData} />;
}
