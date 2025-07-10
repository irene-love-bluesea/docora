import Checkbox from "expo-checkbox";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import CustomButton from "../components/Buttons/CustomButton";
import { Link } from "@react-navigation/native";

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [isChecked, setChecked] = useState(false);

  return (
    <View className=" font-inter flex-1 justify-top items-left p-5 bg-background">
      <View className="mb-3">
        <Text className="text-xl font-normal mb-2">Email</Text>
        <TextInput
          className="border border-white tracking-wider rounded-xl px-4 py-2 text-base bg-white text-black h-[55px]"
          placeholder="Enter Your Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View className="mb-3">
        <Text className="text-xl font-normal mb-2">Password</Text>
        <TextInput
          className="border border-white tracking-wider rounded-xl px-4 py-2 text-base bg-white text-black h-[55px]"
          placeholder="Enter Your Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View className="mb-3 flex-row items-center justify-between ">
        <View className="flex-row items-center">
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#2563EB" : undefined}
            style={{ borderRadius: 4 }}
          />
          <Text className="text-base  my-3 ml-2">
            Remember me
          </Text>
        </View>
        <View >
          <Text onPress={() => navigation.navigate('ForgotPassword')} className="text-base  font-semibold underline my-3 ml-2">
            Forgot Password?
          </Text>
        </View>
      </View>
      <CustomButton  variant="primary" title="Log In" className=" m-0" />
      <View className="flex-row items-center justify-center">
        <Text className="text-base font-semibold underline my-3 ml-2">
          Don't have an account? <Text className="text-primary" onPress={() => navigation.navigate('SignUp')}>Sign Up</Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  checkbox: {
    borderColor: '#4630EB',
  },
})

