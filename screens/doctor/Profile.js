import React from 'react';
import { View, Text } from 'react-native';

export default function ProfileScreen() {
  return (
    <View className="flex-1 justify-center items-center p-5 bg-background">
      <Text className="text-5xl font-bold mb-4 text-green-700">Profile Screen</Text>
      <Text className="text-base text-center text-gray-600">
        Welcome to Doctor's Profile!
      </Text>
    </View>
  );
}
