import { Image, Text, Touchable, TouchableOpacity, View } from "react-native";
import { specialtyIconMap } from "../../constant/data/doctorDetails";
import { getReadyTime, getTodayOrTommorow } from "../../utils/helper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "../Buttons/CustomButton";

export default function AppointmentPCard({
  drProfile,
  drName,
  speciality,
  date,
  time,
  channelType,
  status
}) {
  const Icon = specialtyIconMap[speciality];
  console.log("Status: ", status);

  const renderIcon = (channelType,color) => {
    switch (channelType) {
      case "Chat":
        return <Ionicons name="chatbubbles" size={20} color={color} />;
      case "Video":
        return <FontAwesome name="video-camera" size={20} color={color} />;
      default:
        return <Ionicons name="call" size={20} color={color} />;
    }
  };

  return (
    <View className="bg-white p-4 rounded-lg shadow-md mb-4 flex-row  gap-5">
      <Image
        source={drProfile}
        className="w-16 h-16 rounded-full mb-2 border border-primary"
      />
      <View className="flex-col gap-1">
        <Text className=" text-xl font-semibold">{drName}</Text>
        <View className="flex-row items-center gap-1 mb-1 ">
          <Icon width={20} height={20} color="#023E8A" />
          <Text className="text-md text-grey-500">{speciality}</Text>
        </View>
        <View className=" flex-row items-center gap-2 mb-1">
          <FontAwesome name="calendar" size={16} color="#023E8A" />
          <Text className="text-md text-grey-500">
            {getTodayOrTommorow(date)} at {time}
          </Text>
        </View>
        <View className=" flex-row items-center gap-2">
          {renderIcon(channelType, "#023E8A")}
          <Text className="text-md text-grey-500 ">
            {channelType} Consultation
          </Text>
        </View>
        <View className="flex-row items-center  gap-3 w-full">
          <View className="!w-[70%]">
            <CustomButton
              title={getTodayOrTommorow(date) === "Today" ? "Join" : "Waiting"}
              onPress={() => {}}
              icon={
                renderIcon(channelType, "#fff")
              }
              variant="primary"
              disabled={!getReadyTime(date, time, 5)}
              className={ getReadyTime(date, time , 5)  ? "bg-primary text-white px-4 py-2 rounded-lg " : " bg-secondary"}
            />
          </View>
          <TouchableOpacity
            className="p-2 rounded-lg bg-white border border-secondary " 
            activeOpacity={0.7}
            onPress={() => {}}
          >
            <Ionicons name="close" size={24} color="#023E8A" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
