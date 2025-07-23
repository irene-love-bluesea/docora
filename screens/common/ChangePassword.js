import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import CustomButton from "../../components/Buttons/CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="flex-1 bg-background px-5"
    >
      <OldPasswordEntry
        oldPassword={oldPassword}
        setOldPassword={setOldPassword}
      />
      <NewPasswordEntry
        newPassword={newPassword}
        setNewPassword={setNewPassword}
      />
    </View>
  );
}

const OldPasswordEntry = ({ oldPassword, setOldPassword }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="flex-row items-center gap-3">
      <View className="mb-3 w-full ">
        <Text className="text-lg font-medium mb-2">Enter Old Password</Text>
        <TextInput
          secureTextEntry={!showPassword}
          className="border border-white tracking-wider w-full rounded-xl px-4 py-2 text-base bg-white text-black h-[55px]"
          placeholder="Enter New Password"
          placeholderTextColor="#999"
          value={oldPassword}
          onChangeText={setOldPassword}
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
    </View>
  );
};

const NewPasswordEntry = ({ newPassword, setNewPassword }) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <View className="flex-col items-center gap-3">
      <View className="mb-3 w-full ">
        <Text className="text-lg font-medium mb-2">Enter New Password</Text>
        <TextInput
          secureTextEntry={!showPassword}
          className="border border-white tracking-wider w-full rounded-xl px-4 py-2 text-base bg-white text-black h-[55px]"
          placeholder="Enter New Password"
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
        <Text className="text-lg font-medium mb-2">Confirm Password</Text>
        <TextInput
          secureTextEntry={!showConfirmPassword}
          className="border border-white tracking-wider w-full rounded-xl px-4 py-2 text-base bg-white text-black h-[55px]"
          placeholder="Enter Your Password"
          placeholderTextColor="#999"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
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
        variant="primary"
        className="mt-5 w-full"
        title={"Change Password"}
        onPress={() => {}}
        disabled={newPassword === ""}
      />
    </View>
  );
};
