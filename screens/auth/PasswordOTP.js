import React from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import CustomButton from '../../components/Buttons/CustomButton';
import { useVerifyOTP } from "../../api/hooks/useAuthenticate";

export default function PasswordOTP({ navigation, route }) {
  const [otp, setOtp] = React.useState("");
  const { email } = route.params; // Get email from navigation params
  const verifyOTPMutation = useVerifyOTP();

  const isVerify = otp !== "";

  const handleVerifyOTP = async () => {
    const otpData = {
      email: email,
      otp: otp.trim(),
    };

    try {
      await verifyOTPMutation.mutateAsync(otpData);
      navigation.navigate('PasswordReset',{email: email, otp: otp});
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "OTP verification failed. Please try again.";

      Alert.alert("Verification Failed", errorMessage);
    }
  };

  return (
    <View className="flex-1 justify-start items-center px-5 bg-background">
      <View className="w-full mt-5">
        <Text className="text-xl font-semibold mb-1">Enter OTP</Text>
      </View>
      <Text className="text-lg font-normal my-3">We have sent a verification OTP to your email address. Please enter it below.</Text>
      <TextInput
        className="border w-full border-gray-300 rounded-xl mb-3 px-4 py-2 text-base bg-white text-black h-[55px]"
        placeholder="Enter OTP"
        placeholderTextColor="#999"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        maxLength={6}
      />
       <CustomButton
        title={verifyOTPMutation.isPending ? "Verifying..." : "Verify"}
        disabled={!isVerify || verifyOTPMutation.isPending}
        variant='primary' 
        onPress={handleVerifyOTP}
      />
    <View className="flex-row justify-center items-center my-3">
    <Text className="text-md text-center font-normal text-gray-500 my-2 mr-2">Didn't recieve the code?</Text>
    <TouchableOpacity>
      <Text className="text-center text-md text-primary font-semibold underline underline-offset-1">Resend</Text>
    </TouchableOpacity>
    </View>
    </View>
  );
}