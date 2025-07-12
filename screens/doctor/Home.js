import React from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  Platform,
  Text,
} from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { formatDateTime, formatCurrentDateTime } from "../../utils/helper.js";

export default function HomeScreen({ navigation }) {
  const now = formatCurrentDateTime();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        className=" bg-background"
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="pt-3 px-5">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-start py-2">
              <Image
                className="w-[60px] h-[60px] border border-gray-600 rounded-full"
                source={require("../../assets/profile/profile_m.png")}
              />
              <View className="px-3">
                <Text className="text-3xl font-bold">Good Morning!</Text>
                <Text className="text-xl font-semibold my-1">
                  Dr. John Smith
                </Text>
                <Text className="text-md font-normal text-primary">{now}</Text>
              </View>
            </View>
            <View>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#023E8A"
              />
            </View>
          </View>
          {/* header end */}
          {/* card first row */}
          <View className="flex-row gap-3 items-center justify-center my-3">
            {/* First card */}
            <View className="flex-row items-center gap-5 p-5 bg-primary rounded-xl">
              <View className="">
                <Text className="text-white text-xl font-semibold">
                  Today's{"\n"}Appointments
                </Text>
                <Text className="text-white text-2xl font-semibold">8</Text>
              </View>
              <View>
                <Ionicons name="calendar" size={25} color="white" />
              </View>
            </View>
            {/* first card end */}
            {/* Second card */}
            <View className="flex-row items-center gap-5 p-5 py-8 bg-white border border-blue-400 rounded-xl">
              <View className="">
                <Text className="text-grey-500 text-xl font-semibold">
                  Total Patients
                </Text>
                <Text className="text-2xl font-semibold">108</Text>
              </View>
              <View>
                <Ionicons name="people" size={25} color="#023E8A" />
              </View>
            </View>
            {/* Second card end */}
          </View>
          {/* Card first row end */}

          {/* card second row */}
          <View className="flex-row gap-3 items-center justify-center">
            {/* First card */}
            <View className="flex-row items-center gap-5 p-5 py-8 bg-white border border-blue-400 rounded-xl">
              <View className="">
                <Text className="text-grey-500 text-xl font-semibold">
                  Pending Chats
                </Text>
                <Text className="text-2xl font-semibold">108</Text>
              </View>
              <View>
                <Ionicons name="chatbox" size={25} color="#023E8A" />
              </View>
            </View>
            {/* First card end */}
            {/* Second card */}
            <View className="flex-row items-center gap-5 p-5 bg-primary rounded-xl">
              <View className="">
                <Text className="text-white text-xl font-semibold">
                  Today's{"\n"}Appointments
                </Text>
                <Text className="text-white text-2xl font-semibold">8</Text>
              </View>
              <View>
                <Ionicons name="calendar" size={25} color="white" />
              </View>
            </View>
            {/* Second card end */}
            
          </View>
          {/* Card second row end */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
