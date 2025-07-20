import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ProfileSection = ({ title, children, onEdit, backgroundColor = "bg-blue-200" }) => {
  return (
    <View className="mt-3 bg-background rounded-lg" style={{ elevation: 2 }}>
      <View className={`p-3 w-full flex-row justify-between rounded-t-lg ${backgroundColor}`}>
        <Text className="text-xl font-semibold">{title}</Text>
        <TouchableOpacity onPress={onEdit}>
          <MaterialIcons name="edit" size={28} color="black" />
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
};

export default ProfileSection;