import React from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { formatDateTime, formatCurrentDateTime } from "../../utils/helper.js";

export default function HomeScreen({ navigation }) {
  const now = formatCurrentDateTime();

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-background">
      {/*Header Start */}
      <View
        className="flex-row justify-between items-center border-b border-blue-200 px-5 mt-3 pb-2"
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <View className="flex-row items-start py-2">
          <Image
            className="w-[60px] h-[60px] border border-gray-600 rounded-full"
            source={require("../../assets/profile/profile_m.png")}
          />
          <View className="px-3">
            <Text className="text-3xl font-bold">Good Morning!</Text>
            <Text className="text-xl font-semibold my-1">Dr. John Smith</Text>
            <Text className="text-md font-normal text-primary">{now}</Text>
          </View>
        </View>
        <View>
          <Ionicons name="notifications-outline" size={24} color="#023E8A" />
        </View>
      </View>
      {/* Header end */}

      <ScrollView
        className="bg-background"
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="pb-5">
          {/* Card first row */}
          <View className="flex-row gap-2 items-center justify-center mt-5 mb-3 px-5">
            {/* First card */}
            <View className="flex-row items-center justify-center gap-4 h-[100px] w-[48%] bg-primary rounded-xl">
              <View className="">
                <Text className="text-white text-lg font-semibold">
                  Today's{"\n"}Appointments
                </Text>
                <Text className="text-white text-2xl font-semibold">8</Text>
              </View>
              <View>
                <Ionicons name="calendar-clear" size={25} color="white" />
              </View>
            </View>
            {/* first card end */}
            {/* Second card */}
            <View className="flex-row items-center  justify-center gap-4 h-[100px] w-[48%] bg-white border border-blue-300 rounded-xl">
              <View className="">
                <Text className="text-grey-500 text-lg font-semibold">
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

          {/* Card second row */}
          <View className="flex-row gap-2 items-center justify-center px-5">
            {/* First card */}
            <View className="flex-row items-center justify-center gap-4 h-[100px] w-[48%] bg-white border border-blue-300 rounded-xl">
              <View className="">
                <Text className="text-grey-500 text-lg font-semibold">
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
            <View className="flex-row items-center justify-center gap-4 h-[100px] w-[48%] bg-[#BCDAFF] rounded-xl">
              <View className="">
                <Text className="text-primary text-lg font-semibold">
                  Upcoming{"\n"}Appointments
                </Text>
                <Text className="text-primary text-2xl font-semibold">8</Text>
              </View>
              <View>
                <Ionicons name="time" size={25} color="#023E8A" />
              </View>
            </View>
            {/* Second card end */}
          </View>
          {/* Card second row end */}

          <Text className="mx-5 my-3 text-2xl font-semibold">
            Next Appointment
          </Text>

          <View className="mx-5 px-5 py-3 border rounded-xl border-blue-200 bg-white">
            <View className="flex-row items-center gap-2">
              <Image
                className="w-[60px] h-[60px] border border-gray-600 rounded-full"
                source={require("../../assets/profile/patient_f.png")}
              />
              <View>
                <Text className="text-xl font-bold">Sarah James</Text>
                <Text className="text-lg text-gray-600">
                  General Consultation
                </Text>
                <Text className="text-md text-primary font-medium">
                  9:00 AM - 9:30 AM
                </Text>
              </View>
            </View>
            <View className="mt-2 flex-row items-center justify-between">
              <CustomButton
                title="Join"
                variant="primary"
                width="w-[80%]"
                icon={<Ionicons name="videocam" size={24} color="white" />}
              />
              <View className="border border-primary rounded-lg p-2.5">
                <Ionicons name="chatbox-outline" size={25} color="#023E8A" />
              </View>
            </View>
          </View>

          <View className="mx-5 my-3 flex-row justify-between">
            <Text className="text-2xl font-semibold">Today's Schedule</Text>
            <Text className="text-xl font-medium text-primary"> View All</Text>
          </View>
          {/* today schedule start */}
          <View className="mx-5 mb-3 px-5 py-3 flex-row items-center gap-5 border rounded-lg border-blue-200 bg-white">
            <Text className="text-lg font-bold">09:00 AM</Text>
            <View className="w-3 h-3 bg-green-500 rounded-full "></View>
            <View>
              <Text className="text-xl font-medium">Sarah James</Text>
              <Text className="text-base text-gray-600 font-light">
                General Consultation
              </Text>
            </View>
          </View>
          <View className="mx-5 mb-3 px-5 py-3 flex-row items-center gap-5 border rounded-lg border-blue-200 bg-white">
            <Text className="text-lg font-bold">10:30 AM</Text>
            <View className="w-3 h-3 bg-yellow-500 rounded-full "></View>
            <View>
              <Text className="text-xl font-medium">William Carter</Text>
              <Text className="text-base text-gray-600 font-light">
                Follow-Up Meeting
              </Text>
            </View>
          </View>
          <View className="mx-5 mb-3 px-5 py-3 flex-row items-center gap-5 border rounded-lg border-blue-200 bg-white">
            <Text className="text-lg font-bold">02:00 PM</Text>
            <View className="w-3 h-3 bg-red-500 rounded-full "></View>
            <View>
              <Text className="text-xl font-medium">Hayes Jorden</Text>
              <Text className="text-base text-gray-600 font-light">
                Routine Checkup
              </Text>
            </View>
          </View>
          {/* today schedule end */}

          <Text className="mx-5 my-3 text-2xl font-semibold">Quick Action</Text>

          {/* Quick Action row */}
          <View className="flex-row gap-2 items-center justify-center mt-2 mb-3 px-5">
            <TouchableOpacity className="flex items-center justify-center h-[100px] w-[48%]  bg-white border border-blue-200 rounded-xl">
              <View className="flex items-center justify-center gap-1">
                <Ionicons name="calendar-clear" size={25} color="#023E8A" />
                <Text className="text-primary text-center text-lg font-semibold">
                  Patient{"\n"}History
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex items-center justify-center h-[100px] w-[48%] bg-white border border-blue-200 rounded-xl">
              <View className="flex items-center justify-center gap-1">
                <AntDesign name="star" size={25} color="#023E8A" />
                <Text className="text-primary text-lg  text-center font-semibold">
                  View{"\n"}Feedback
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* Quick Action row end */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
