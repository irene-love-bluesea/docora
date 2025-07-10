import React from 'react';
import { View, Text, TextInput, SafeAreaView } from 'react-native';

export default function SignUpScreen() {

 const [fullName, setFullName] = React.useState('');

  return (
    <View className="flex-1 justify-top items-left px-5 bg-background">
      <Text className="text-xl font-normal mb-2">Full Name</Text>
      <TextInput
              className="border border-gray-300 rounded-xl px-4 py-2 text-base bg-white text-black h-[55px]"
              placeholder="Enter Your Full name"
              placeholderTextColor="#999"
              value={fullName}
              onChangeText={setFullName}
            />
    </View>
  );
}
