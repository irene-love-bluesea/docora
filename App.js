import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import "./global.css"
import { useFonts } from 'expo-font';

export default function App() {
  // const [fontsLoaded, fontError] = useFonts({
  //   'Alata-Regular': require('./assets/fonts/Alata-Regular.ttf'),
  //   'Inter-VariableFont': require('./assets/fonts/Inter-VariableFont.ttf'),
  // });

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
