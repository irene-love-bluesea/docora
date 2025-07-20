import React from "react";
import { View, Text, TextInput } from "react-native";

const FormField = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  keyboardType = "default",
  ...props 
}) => {
  return (
    <View className="mb-2 px-2 w-full">
      <Text className="text-lg font-medium mb-2">{label}</Text>
      <TextInput
        className="border border-gray-200 tracking-wider rounded-xl px-4 py-2 text-base bg-white text-black"
        placeholder={placeholder}
        placeholderTextColor="#999"
        textAlignVertical="top"
        value={null} // Keep original behavior - showing placeholder
        keyboardType={keyboardType}
        style={{ textAlign: "left" }}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
};

export default FormField;