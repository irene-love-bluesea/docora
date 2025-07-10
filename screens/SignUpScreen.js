import React from "react";
import { View, Text, TextInput,TouchableOpacity } from "react-native";
import CustomButton from '../components/Buttons/CustomButton';

export default function SignUpScreen({ navigation }) {
  const [fullName, setFullName] = React.useState("");

  return (
    <View className="flex-1 justify-start items-center px-5 bg-background">
      <View className="w-full">
        <Text className="text-lg text-left font-medium mb-2">Full Name</Text>
      </View>
      <TextInput
        className="border border-gray-300 w-full rounded-xl mb-3 px-4 py-2 text-base bg-white text-black h-[55px]"
        placeholder="Enter Your Full name"
        placeholderTextColor="#999"
        value={fullName}
        onChangeText={setFullName}
      />
      <View className="w-full">
        <Text className="text-lg text-left font-medium mb-2">Email</Text>
      </View>
      <TextInput
        className="border border-gray-300 w-full rounded-xl mb-3 px-4 py-2 text-base bg-white text-black h-[55px]"
        placeholder="Enter Your Email"
        placeholderTextColor="#999"
        value={fullName}
        onChangeText={setFullName}
      />
    <View className="w-full">
        <Text className="text-lg text-left font-medium mb-2">Password</Text>
      </View>
      <TextInput
        className="border border-gray-300 w-full rounded-xl mb-3 px-4 py-2 text-base bg-white text-black h-[55px]"
        placeholder="Enter Your Password"
        placeholderTextColor="#999"
        value={fullName}
        onChangeText={setFullName}
      />
       <CustomButton
        title="Sign Up"
        variant='primary' onPress={() => navigation.navigate('Verify')}
      />
    <Text className="text-md text-center font-normal text-gray-500 my-3">Already have an account?</Text>
    <TouchableOpacity> 
      <Text className="text-center text-primary text-lg font-semibold underline underline-offset-1">Log In</Text>
    </TouchableOpacity>
    </View>
  );
}
