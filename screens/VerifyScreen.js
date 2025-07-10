import React from "react";
import { View, Text, TextInput,TouchableOpacity } from "react-native";
import CustomButton from '../components/Buttons/CustomButton';

export default function VerifyScreen({ navigation }) {
  const [fullName, setFullName] = React.useState("");

  return (
    <View className="flex-1 justify-start items-center px-5 bg-background">
      <View className="w-full">
        <Text className="text-xl font-semibold mb-1">Enter OTP</Text>
      </View>
      <Text className="text-lg font-normal my-3">We have sent a verification code to your email address. Please enter it below.</Text>
      <TextInput
        className="border w-full border-gray-300 rounded-xl mb-3 px-4 py-2 text-base bg-white text-black h-[55px]"
        placeholder="Enter OTP"
        placeholderTextColor="#999"
        value={fullName}
        onChangeText={setFullName}
      />
       <CustomButton
        title="Verify"
        variant='primary' onPress={() => navigation.navigate('BottomTabs')}
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
