import React from 'react';
import { View, Text, Button } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View className="flex-1 justify-center items-center p-5 bg-white">
      <Text className="text-5xl font-bold mb-4 text-red-700">Login Screen</Text>
      <Text className="text-base mb-6 text-center text-gray-600">
        Welcome! Please log in to continue.
      </Text>
      <Button title="Login" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}
