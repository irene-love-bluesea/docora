import { useState } from "react";
import { Text, TextInput, View } from "react-native";
import CustomButton from "../components/Buttons/CustomButton";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");

  return (
    <View className=" font-inter flex-1 justify-start items-left px-5 bg-background">
      <Text className="text-xl font-normal text-gray-600 mb-2">
        We will send a verification code to your email address. Please enter it
        below.
      </Text>
      <View className="my-4">
        <TextInput
          className="border border-white tracking-wider rounded-xl px-4 py-2 text-base bg-white text-black h-[55px]"
          placeholder="Enter Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <CustomButton
        variant="primary"
        className="m-0"
        title={"Send"}
        onPress={() => {}}
        disabled={email === ""}
      />
    </View>
  );
};

export default ForgotPasswordScreen;
