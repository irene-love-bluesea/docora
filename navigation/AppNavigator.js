import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {View, TouchableOpacity ,Text} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AuthScreen from '../screens/AuthScreen';
import HomeScreen from '../screens/HomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

const CustomHeader = ({title, navigation, backgroundColor = 'transparent'}) => {
const insets = useSafeAreaInsets();

  return (
    <View style={[styles.headerContainer, {backgroundColor, paddingTop: insets.top+20 }]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
    <Ionicons name="chevron-back-sharp" size={30} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={({navigation}) => ({
          header: () => ( <CustomHeader title="Sign Up" navigation={navigation}
          backgroundColor="#E6F2FF" />   ),  })} />
      <Stack.Screen name="Login" component={LoginScreen} options={({navigation}) => ({
          header: () => ( <CustomHeader title="Log In" navigation={navigation}
          backgroundColor="#E6F2FF" />   ),  })} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

const styles ={
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
   headerTitle:{
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
    },
    backButton: {
    position: 'absolute',
    left: 10,
    bottom: 20,
    }
}