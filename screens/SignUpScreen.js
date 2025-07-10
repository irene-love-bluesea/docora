import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import CustomButton from "../components/Buttons/CustomButton";

export default function SignUpScreen({ navigation }) {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isChecked, setChecked] = React.useState(false);
  const isFormVaild = fullName !== "" && email !== "" && password !== "" && isChecked === true;

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
        value={email}
        onChangeText={setEmail}
      />
      <View className="w-full">
        <Text className="text-lg text-left font-medium mb-2">Password</Text>
      </View>
      <TextInput
        className="border border-gray-300 w-full rounded-xl mb-3 px-4 py-2 text-base bg-white text-black h-[55px]"
        placeholder="Enter Your Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
      />
      <View className="flex-row justify-center items-center my-3">
        <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "#2563EB" : undefined}
          style={{ borderRadius: 4 }}
        />
        <Text className="text-base my-3 ml-2">
          I agree to the Terms of Service and Privacy Policy
        </Text>
      </View>
      <CustomButton
        title="Sign Up"
        variant="primary"
        disabled={!isFormVaild}
        onPress={() => navigation.navigate("Verify")}
      />
      <Text className="text-md text-center font-normal text-gray-500 my-3">
        Already have an account?
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text className="text-center text-primary text-lg font-semibold underline underline-offset-1">
          Log In
        </Text>
      </TouchableOpacity>
    </View>
  );
}
