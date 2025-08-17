import Checkbox from "expo-checkbox";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLogInUser } from "../../api/hooks/useAuthenticate";
import { useAuth } from "../../components/Providers/AuthProvider";
import { userRoles } from "../../constant/data/role";

const LoginScreen = ({ navigation , route}) => {
  const { email: emailParam } = route?.params;
  const [email, setEmail] = useState(emailParam || "");
  const [password, setPassword] = useState("password123");
  const [isChecked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isFormValid = email !== "" && password !== "";

  const { login } = useAuth();

  const loginMutation = useLogInUser({
    onSuccess: (data) => {
      console.log("Login successful, updating context...");
      login(data.token, data.user); 
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || "Login failed.";
      Alert.alert("Error", errorMessage);
    },
  });

  const handleLogIn = async () => {
    setErrorMessage("");
    const userData = {
      email: email.toLowerCase().trim(),
      password: password,
    };
    try {
      await loginMutation.mutateAsync(userData);
    } catch (error) {
      let message = "Login failed. Please try again.";
      
      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.response?.data?.error) {
        message = error.response.data.error;
      } else if (error.message) {
        message = error.message;
      }
      setErrorMessage(message);
    }
  };

  return (
    <View className="  flex-1 justify-start items-center  px-5 bg-background ">
      {/* Error Message Display */}
      {errorMessage ? (
        <View className="w-full mt-5">
          <Text className="text-red-500 text-md text-center bg-red-50 px-3 py-2 rounded-lg border border-red-200">
            {errorMessage}
          </Text>
        </View>
      ) : null}

      <View className="mb-3 w-full mt-3">
        <Text className="text-lg font-medium mb-2">Email</Text>
        <TextInput
          className="border border-white tracking-wider w-full rounded-xl px-4 py-2 text-base bg-white text-black h-[55px]"
          placeholder="Enter Your Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
      </View>

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

      <View className="mb-3 flex-row items-center w-full justify-between ">
        <View className="flex-row items-center">
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#2563EB" : undefined}
            style={{ borderRadius: 4 }}
          />
          <TouchableOpacity onPress={() => setChecked(!isChecked)}>
            <Text className="text-base my-3 ml-2">Remember me</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            onPress={() => navigation.navigate("ForgotPassword")}
            className="text-base  font-semibold underline my-3 ml-2"
          >
            Forgot Password?
          </Text>
        </View>
      </View>
      <CustomButton
        title={loginMutation.isPending ? "Logging In..." : "Log In"}
        variant="primary"
        disabled={!isFormValid || loginMutation.isPending}
        onPress={handleLogIn}
      />
      <View className="flex-row items-center justify-center gap-3 my-3">
        <Text className="text-base font-semibold">
          Don't have an account?{" "}
          <Text
            className="text-primary underline"
            onPress={() => navigation.navigate("SignUp")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  checkbox: {
    borderColor: "#4630EB",
  },
});
