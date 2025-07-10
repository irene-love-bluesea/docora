import Checkbox from "expo-checkbox";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const LoginScreen = () => {
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

      <View>
        <Checkbox style={styles.checkbox} value={isChecked} className=" " onValueChange={setChecked}/>
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

