import { useAuth } from "../components/Providers/AuthProvider";
import SplashScreen from "../screens/splash/SplashScreen";
import AppNavigator, { AuthNavigator } from "./AppNavigator";

export default function RootNavigator() {
  const { session, isLoading } = useAuth();
  console.log("Session:", session, "Loading:", isLoading);

  if (isLoading) {
    return <SplashScreen />;
  }

  return session ? <AppNavigator /> : <AuthNavigator />;
}
