import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthProvider from "./components/Providers/AuthProvider";
import "./global.css";
import { navigationRef } from "./navigation/NavigationService";
import RootNavigator from "./navigation/RootNavigator";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    "Inter-Regular": require("./assets/fonts/inter/Inter_Regular.ttf"),
    "Inter-Bold": require("./assets/fonts/inter/Inter_Bold.ttf"),
    "Inter-SemiBold": require("./assets/fonts/inter/Inter_SemiBold.ttf"),
    "Alata-Regular": require("./assets/fonts/alata/Alata-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  const queryClient = new QueryClient();

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <RootNavigator />
          </QueryClientProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
