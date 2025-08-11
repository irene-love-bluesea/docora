import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import { useForgotPassword } from "../../api/hooks/useAuthenticate";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const forgotPasswordMutation = useForgotPassword();

  const handleForgotPassword = async () => {
    try {
      await forgotPasswordMutation.mutateAsync(email);
      navigation.navigate("PasswordOTP",{ email: email });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "OTP Sending failed. Please check the email again.";

      Alert.alert("OTP Email Not Sent", errorMessage);
    }
  };

  return (
    <View className="  flex-1 justify-start items-center px-5 bg-background">
      <Text className="text-xl font-normal text-gray-600 mb-2 mt-5">
        We will send a verification code to your email address. Please enter it
        below.
      </Text>
      <View className="my-4 w-full">
        <TextInput
          className="border w-full border-white tracking-wider rounded-xl px-4 py-2 text-base bg-white text-black h-[55px]"
          placeholder="Enter Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
      </View>

       <CustomButton
        title={forgotPasswordMutation.isPending ? "Sending..." : "Send OTP"}
        disabled={email === "" || forgotPasswordMutation.isPending}
        variant='primary' 
        onPress={handleForgotPassword}
      />
      
    </View>
  );
};

export default ForgotPasswordScreen;
