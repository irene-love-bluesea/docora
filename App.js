import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import "./global.css"
//import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
      <NavigationContainer>
            <AppNavigator />
      </NavigationContainer>

  );
}
