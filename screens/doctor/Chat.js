import React from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DoctorChatScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-background">
      <Text className="text-2xl font-semibold font-alata mt-6 mb-2 mx-5">
        Profile
      </Text>
      <ScrollView
        className="bg-background"
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-start items-center px-5 pt-4 bg-background pb-5"></View>
      </ScrollView>
    </SafeAreaView>
  );
}
