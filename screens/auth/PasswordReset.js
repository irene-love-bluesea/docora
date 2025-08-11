import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import { useResetPassword } from "../../api/hooks/useAuthenticate";
import Ionicons from "@expo/vector-icons/Ionicons";


export default function PasswordReset({ navigation, route }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const { email, otp } = route.params;

  const resetPasswordMutation = useResetPassword();

  // Check if passwords are valid and match
  const isFormValid =
    newPassword.length >= 6 && newPassword === confirmPassword;

  const handlePasswordReset = async () => {
    try {
      await resetPasswordMutation.mutateAsync({ email, otp, newPassword });
      Alert.alert(
        "Success",
        "Your password has been reset successfully. You can now log in with your new password.",
        [{ text: "OK", onPress: () => navigation.navigate("Login") }]
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to reset password. Please try again.";
      Alert.alert("Password Reset Failed", errorMessage);
    }
  };

  return (
    <View className="flex-1 justify-start items-center px-5 bg-background">
      <View className="w-full mt-5">
        <Text className="text-xl font-semibold mb-1">Set a New Password</Text>
      </View>
      <Text className="text-lg font-normal my-3">
        Enter your new password below. It must be at least 6 characters long.
      </Text>

     <View className="mb-3 w-full ">
            <Text className="text-lg font-medium mb-2">Password</Text>
      <TextInput
        secureTextEntry={!showPassword}
        className="border border-white tracking-wider w-full rounded-xl px-4 py-2 text-base bg-white text-black h-[55px]"
        placeholder="Enter Your Password"
        placeholderTextColor="#999"
        value={newPassword}
        onChangeText={setNewPassword}
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

     <View className="mb-3 w-full ">
            <Text className="text-lg font-medium mb-2">Password</Text>
      <TextInput
        className="border border-white tracking-wider w-full rounded-xl px-4 py-2 text-base bg-white text-black h-[55px]"
        placeholder="Confirm New Password"
        placeholderTextColor="#999"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!showConfirmPassword}
      />
    <TouchableOpacity
        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        className="absolute right-5 bottom-5"
      >
        {showConfirmPassword ? (
          <Ionicons name="eye-off-outline" size={24} color="#999" />
        ) : (
          <Ionicons name="eye-outline" size={24} color="#999" />
        )}
      </TouchableOpacity>

      </View>
      <CustomButton
        title={resetPasswordMutation.isPending ? "Submitting..." : "Submit"}
        disabled={!isFormValid || resetPasswordMutation.isPending}
        variant="primary"
        onPress={handlePasswordReset}
      />
      <View className="flex-row justify-center items-center my-3">
        <Text className="text-md text-center font-normal text-gray-500 my-2 mr-2">
          Remember your password?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text className="text-center text-md text-primary font-semibold underline underline-offset-1">
            Log in
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
