import Checkbox from "expo-checkbox";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import { Link } from "@react-navigation/native";

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [isChecked, setChecked] = useState(false);

  const isFormValid = email !== "" && password !== "" && isChecked === true;

  return (
    <View className=" font-inter flex-1 justify-start items-center  px-5 bg-background">
      <View className="mb-3 w-full">
        <Text className="text-xl font-normal mb-2">Email</Text>
        <TextInput
          className="border border-white tracking-wider w-full rounded-xl px-4 py-2 text-base bg-white text-black h-[55px]"
          placeholder="Enter Your Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View className="mb-3 w-full">
        <Text className="text-xl font-normal mb-2">Password</Text>
        <TextInput
          className="border border-white tracking-wider w-full rounded-xl px-4 py-2 text-base bg-white text-black h-[55px]"
          placeholder="Enter Your Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View className="mb-3 flex-row items-center w-full justify-between ">
        <View className="flex-row items-center">
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#2563EB" : undefined}
            style={{ borderRadius: 4 }}
          />
          <TouchableOpacity onPress={() => setChecked(!isChecked)}>
            <Text className="text-base my-3 ml-2">
              Remember me
            </Text>
          </TouchableOpacity>
        </View>
        <View >
          <Text onPress={() => navigation.navigate('ForgotPassword')} className="text-base  font-semibold underline my-3 ml-2">
            Forgot Password?
          </Text>
        </View>
      </View>
      <CustomButton  variant="primary" title="Log In" disabled={!isFormValid} className=" "  />
      <View className="flex-row items-center justify-center gap-3 my-3">
        <Text className="text-base font-semibold">
          Don't have an account? <Text className="text-primary underline" onPress={() => navigation.navigate('SignUp')}>Sign Up</Text>
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

