import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

export const ProfileEditCard = ({
  title,
  children,
  onEdit,
  backgroundColor = "bg-blue-200",
}) => {
  return (
    <View className="mt-4 bg-white rounded-lg" style={{ elevation: 1 }}>
      <View
        className={`p-3 w-full flex-row justify-between rounded-t-lg ${backgroundColor}`}
      >
        <Text className="text-xl font-semibold">{title}</Text>
        <TouchableOpacity onPress={onEdit}>
          <MaterialIcons name="edit" size={28} color="black" />
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
};

export const SettingCard = ({ backgroundColor = "bg-blue-200" , navigation , onLogoutPress }) => {

  return (
    <View className="mt-4 w-full bg-white rounded-lg" style={{ elevation: 1 }}>
      <View className={`p-3 w-full rounded-t-lg ${backgroundColor}`}>
        <Text className="text-xl font-semibold">Security & Settings</Text>
      </View>
      <TouchableOpacity>
        <View className="px-3 py-4 flex-row justify-between items-center">
          <Text className="text-lg font-semibold">Blood Type</Text>
          <AntDesign name="right" size={25} color="black" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View className="px-3 py-4 flex-row justify-between items-center">
          <Text className="text-lg font-semibold">
            Two-Factor Authentication
          </Text>
          <AntDesign name="right" size={25} color="black" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("PrivacyPolicy")}>
        <View className="px-3 py-4 flex-row justify-between items-center">
          <Text className="text-lg font-semibold">Privacy Policy</Text>
          <AntDesign name="right" size={25} color="black" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity  onPress={onLogoutPress}>
        <View className="px-3 py-4 flex-row justify-between items-center">
          <Text className="text-lg font-semibold">Log Out</Text>
          <MaterialIcons name="logout" size={25} color="red" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View className="px-3 py-4 flex-row justify-between items-center">
          <Text className="text-lg text-red-500 font-semibold">Delete Account</Text>
          <MaterialIcons name="delete" size={25} color="red" />
        </View>
      </TouchableOpacity>
    </View>
  );
};
