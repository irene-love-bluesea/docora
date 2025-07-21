import React from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function PatientChat({navigation}) {
  const [search, setSearch] = React.useState("");

  const messagesData = [
    {
      id: 1,
      name: "Dr. Taylor Klem",
      specialty: "General Physician",
      message: "Missed Call",
      time: "08:00 PM",
      isMissedCall: true,
      isSeen: false,
      profileImage: require("../../assets/profile/profile_f.png"),
    },
    {
      id: 2,
      name: "Dr. John Smith",
      specialty: "Cardiologist",
      message: "Hope you feel better soon!",
      time: "10:00 AM",
      isMissedCall: false,
      isSeen: false,
      profileImage: require("../../assets/profile/profile_m.png"),
    },
    {
      id: 3,
      name: "Dr. Susan Ash",
      specialty: "Pediatrician",
      message: "You: Thank You for your ...",
      time: "July 18",
      isMissedCall: false,
      isSeen: true,
      profileImage: require("../../assets/profile/profile_f.png"),
    },
    {
      id: 4,
      name: "Dr. Robin Nolan",
      specialty: "Psychiatrist",
      message: "Okay, Have a great day!",
      time: "July 13",
      isMissedCall: false,
      isSeen: false,
      profileImage: require("../../assets/profile/profile_m.png"),
    },
    {
      id: 5,
      name: "Dr. Megan Trainer",
      specialty: "Dentist",
      message: "You should eat less sweet!",
      time: "July 09",
      isMissedCall: false,
      isSeen: true,
      profileImage: require("../../assets/profile/profile_m.png"),
    },
  ];

  const filteredMessages = messagesData.filter((message) =>
    message.name.toLowerCase().includes(search.toLowerCase())
  );


  const MessageCard = ({ message }) => (

    <TouchableOpacity className="my-4 w-full px-1" activeOpacity={0.2} onPress={() => navigation.navigate("PatientMessenger")}>
      <View className="flex-row items-center gap-3">
        <Image
          source={message.profileImage}
          className="w-[60px] h-[60px] rounded-full border border-gray-400"
        />
        <View className="flex gap-1">
          <View className="flex-row items-center gap-2">
            <Text className="text-lg font-semibold">{message.name} •</Text>
            <Text className="text-md font-medium text-gray-500">
              {message.specialty}
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            {message.isMissedCall && (
              <MaterialIcons name="phone-missed" size={22} color="red" />
            )}
            <Text
              className={`text-md font-medium ${
                message.isMissedCall
                  ? "text-red-500"
                  : message.isSeen
                  ? "text-gray-500"
                  : "text-primary"
              }`}
            >
              {message.message}
            </Text>
            <Text
              className={`text-md font-medium ${
                message.isMissedCall
                  ? "text-primary"
                  : message.isSeen
                  ? "text-gray-500"
                  : "text-primary"
              }`}
            >
              • {message.time}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-background">
      <Text className="text-2xl font-semibold font-alata mt-6 mb-3 mx-5">
        Messages
      </Text>
      <ScrollView
        className="bg-background"
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-start items-center px-5 pt-3 bg-background pb-5">
          {/* search bar  */}
          <TouchableOpacity className="w-full flex-row items-center bg-white rounded-lg px-5 mb-5">
            <Ionicons name="search" size={20} color="#999" className="" />
            <TextInput
              className="border border-white tracking-wider rounded-xl px-5 py-2 text-base bg-white text-black h-[55px]"
              placeholder="Search by name"
              value={search}
              onChangeText={setSearch}
            />
          </TouchableOpacity>

          {filteredMessages.map((message) => (
            <MessageCard key={message.id} message={message} />
          ))}

          {filteredMessages.length === 0 && search.length > 0 && (
            <Text className="text-gray-500 text-center mt-10">
              No messages found for "{search}"
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
