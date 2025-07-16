import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { consultationChannels } from "../constant/data/timeSlot";
import { useState } from "react";
import { addMinutesToTimeString } from "../utils/helper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CustomButton from "./Buttons/CustomButton";

export default function ModalChannel({
  modalVisible,
  setModalVisible,
  selectedDate,
  selectedTime,
  selectedChannel,
  setSelectedChannel,
}) {
  const handleConfirmConsultation = () => {
    if (!selectedChannel) return;

    // Handle the consultation booking logic here
    console.log("Booking consultation:", {
      date: selectedDate,
      time: selectedTime,
      channel: selectedChannel,
    });

    // Close modal and reset
    setModalVisible(false);
    setSelectedChannel(null);
  };

  const renderIcon = (iconName, iconLibrary, iconColor) => {
    switch (iconLibrary) {
      case "MaterialIcons":
        return <MaterialIcons name={iconName} size={28} color={iconColor} />;
      case "MaterialCommunityIcons":
        return (
          <MaterialCommunityIcons name={iconName} size={28} color={iconColor} />
        );
      default:
        return <Ionicons name={iconName} size={28} color={iconColor} />;
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedChannel(null);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={closeModal} >
        <View style={{ flex: 1 }}>
          <View className="flex-1 justify-center items-center bg-black/50">
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View className="bg-background p-8 w-[90%] max-w-md rounded-2xl">
                <Text className="text-2xl font-medium text-center">
                  Choose Channels
                </Text>
                <View className="text-xl font-medium text-center flex-row items-center justify-center gap-2 mt-3">
                  <AntDesign name="clockcircleo" size={24} color="black" />
                  <Text>15 mins</Text>
                </View>

                <View className="mt-4 flex-col gap-4 rounded-xl">
                  {consultationChannels.map((channel) => (
                    <TouchableOpacity
                      key={channel.id}
                      onPress={() => setSelectedChannel(channel)}
                      className={`flex-row items-center justify-between p-3 border border-secondary rounded-xl ${
                        selectedChannel?.id === channel.id
                          ? "bg-primary text-white"
                          : "bg-white text-gray-700"
                      }`}
                    >
                      <View className="flex-row items-center gap-3 p-3 rounded-lg">
                        {renderIcon(
                          channel.iconName,
                          channel.iconLibrary,
                          selectedChannel?.id === channel.id
                            ? "#ffff"
                            : channel.iconColor
                        )}
                        <Text
                          className={`text-lg ${
                            selectedChannel?.id === channel.id
                              ? "text-white"
                              : "text-gray-700"
                          }`}
                        >
                          {channel.title}
                        </Text>
                      </View>
                      <Text
                        className={`text-lg font-semibold ${
                          selectedChannel?.id === channel.id
                            ? "text-white"
                            : "text-gray-700"
                        }`}
                      >
                        {channel.cost}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Bottom Action Buttons */}
                <View className="flex-row items-center gap-3 mt-6">
                  <TouchableOpacity
                    onPress={closeModal}
                    className="flex-1 py-3 px-4 border border-gray-300 rounded-lg"
                  >
                    <Text className="text-center text-gray-700 font-medium">
                      Cancel
                    </Text>
                  </TouchableOpacity>

                  <CustomButton
                    variant="primary"
                    title="Confirm"
                    onPress={handleConfirmConsultation}
                    className="!w-[50%]"
                    disabled={!selectedChannel}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>

  );
}
