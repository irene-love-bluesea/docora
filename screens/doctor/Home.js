import React from 'react';
import { View, Text } from 'react-native';
import CustomButton from '../../components/Buttons/CustomButton';

export default function HomeScreen({navigation}) {
  return (
    <View className="flex-1 justify-center items-center p-5 bg-background">
      <Text className="text-5xl font-bold mb-4 text-green-700">Doctor Home Screen</Text>
      <Text className="text-base text-center text-gray-600">
        Welcome to the app! You're now logged in.
      </Text>
     
    </View>
  );
}
