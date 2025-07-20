import React from "react";
import { Modal, TouchableOpacity, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const BaseModal = ({ 
  visible, 
  onClose, 
  title, 
  children, 
  width = "w-[80%]" 
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          className={`bg-background p-3 ${width} border border-gray-300 rounded-xl`}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          <View className="flex items-center justify-center">
            <View className="flex-row w-full justify-between items-center mb-2">
              <Text className="text-xl font-semibold mb-2">{title}</Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={28} color="black" />
              </TouchableOpacity>
            </View>
            {children}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default BaseModal;