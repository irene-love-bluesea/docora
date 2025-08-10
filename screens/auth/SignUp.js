import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import CustomButton from "../../components/Buttons/CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSignUpUser } from "../../api/hooks/useAuthenticate";

export default function SignUpScreen({ navigation }) {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isChecked, setChecked] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const isFormValid =
    fullName !== "" && email !== "" && password !== "" && isChecked === true;
  const signupMutation = useSignUpUser();

  const handleSignUp = async () => {
    const userData = {
      name: fullName.trim(),
      email: email.toLowerCase().trim(),
      password: password,
    };

    try {
      await signupMutation.mutateAsync(userData);
      navigation.navigate("Verify", { email: userData.email });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again.";

      Alert.alert("Signup Failed", errorMessage);
    }
  };

  return (
    <View className="flex-1 justify-start items-center px-5 bg-background">
      <View className="w-full mt-5">
        <Text className="text-lg text-left font-medium mb-2">Full Name</Text>
      </View>
      <TextInput
        className="border border-white w-full rounded-xl mb-3 px-4 py-2 text-base bg-white text-black h-[55px]"
        placeholder="Enter Your Full name"
        placeholderTextColor="#999"
        value={fullName}
        onChangeText={setFullName}
      />
      <View className="w-full">
        <Text className="text-lg text-left font-medium mb-2">Email</Text>
      </View>
      <TextInput
        className="border border-white w-full rounded-xl mb-3 px-4 py-2 text-base bg-white text-black h-[55px]"
        placeholder="Enter Your Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />
      <View className="mb-3 w-full ">
        <Text className="text-lg font-medium mb-2">Password</Text>
        <TextInput
          secureTextEntry={!showPassword}
          className="border border-white tracking-wider w-full rounded-xl px-4 py-2 text-base bg-white text-black h-[55px]"
          placeholder="Enter Your Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          className="absolute right-5 bottom-5"
        >
          {showPassword ? (
            <Ionicons name="eye-off-outline" size={24} color="#999" />
          ) : (
            <Ionicons name="eye-outline" size={24} color="#999" />
          )}
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-start items-center my-3  w-full">
        <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "#2563EB" : undefined}
          style={{ borderRadius: 4 }}
        />
        <TouchableOpacity onPress={() => setChecked(!isChecked)}>
          <Text className="text-base my-1 ml-2">
            I agree to the Terms of Service and Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>
       <CustomButton
        title={signupMutation.isPending ? "Signing Up..." : "Sign Up"}
        variant="primary"
        disabled={!isFormValid || signupMutation.isPending}
        onPress={handleSignUp}
      />
      <View className="flex-row items-center justify-center gap-3 my-3">
        <Text className="text-base font-semibold">
          Already have an account?{" "}
          <Text
            className="text-primary underline"
            onPress={() => navigation.navigate("Login")}
          >
            Log In
          </Text>
        </Text>
      </View>
    </View>
  );
}
