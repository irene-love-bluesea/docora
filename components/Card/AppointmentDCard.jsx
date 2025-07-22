import { Image, Text, Touchable, TouchableOpacity, View } from "react-native";
import { specialtyIconMap } from "../../constant/data/doctorDetails";
import {
  getReadyTime,
  getTodayOrTommorow,
  isSessionEnd,
} from "../../utils/helper";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "../Buttons/CustomButton";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function AppointmentDCard({
  patientProfile,
  patientName,
  patientAge,
  patientGender,
  date,
  time,
  channelType,
  mode,
  status,
}) {
  // const Icon = specialtyIconMap[speciality];
  const renderIcon = (channelType, color) => {
    switch (channelType) {
      case "Chat":
        return <Ionicons name="chatbubbles" size={20} color={color} />;
      case "Video":
        return <FontAwesome name="video-camera" size={20} color={color} />;
      case "Call":
        return <Ionicons name="call" size={20} color={color} />;
      case "Completed":
        return <Ionicons name="document-text" size={20} color={color} />;
      default:
        return <Ionicons name="calendar" size={20} color={color} />;
    }
  };

  const joinAppointment = () => {
    // console.log(`Joining appointment with Dr. ${drName} on ${date} at ${time}`);
  };

  return (
    <View
      elevation={2}
      className={`bg-white p-4 rounded-lg shadow-md mb-4 flex-row  gap-5 ${
        getReadyTime(date, time, 5) && "border-2 border-primary"
      }`}
    >
      <Image
        source={patientProfile}
        className="w-16 h-16 rounded-full mb-2 border border-primary"
      />
      <View className="flex-col gap-1">
        <Text className=" text-xl font-semibold">{patientName}</Text>
        <View className="flex-row items-center gap-1 mb-1 ">
          <Text className="text-md text-grey-500">{patientAge} years</Text>
          <Text className="text-md text-grey-500">{patientGender}</Text>
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
        <View className="flex-row items-center  gap-3 ">
          <View className={`w-[65%] ${mode === "past" && status === "missed" && "!w-[73%]"}`}>
            {mode === "upcoming" && (
              <CustomButton
                title={
                  getTodayOrTommorow(date) === "Today" ? "Join Now" : "Waiting"
                }
                onPress={() => joinAppointment()}
                icon={renderIcon(channelType, "#fff")}
                variant="primary"
                disabled={!getReadyTime(date, time, 5)}
                className={
                  getReadyTime(date, time, 5)
                    ? "bg-primary text-white px-4 py-2 rounded-lg "
                    : " bg-secondary "
                }
              />
            )}
            {mode === "past" && status === "completed" && (
              <CustomButton
                title="View Details"
                icon={renderIcon("Completed", "#023E8A")}
                variant="secondary"
                className="bg-background  px-4 py-2 rounded-lg border border-primary"
                textClassName="text-primary"
              />
            )}
            {mode === "past" && status === "missed" && (
              <CustomButton
                title="Reschedule"
                icon={renderIcon("Failed", "#023E8A")}
                variant="secondary"
                className=" bg-background   px-4 py-2 rounded-lg border border-primary "
                textClassName="text-primary "
                onPress={() => {}}
              />
            )}
          </View>
          {mode === "upcoming" ? (
            <TouchableOpacity
              className="px-4 py-3 rounded-xl bg-white border border-primary "
              activeOpacity={0.7}
              onPress={() => {}}
            >
              <Ionicons name="close" size={24} color="#023E8A" />
            </TouchableOpacity>
          ) : (
            status === "completed" && (
              <TouchableOpacity
                className="px-4 py-3 rounded-xl bg-white border border-primary "
                activeOpacity={0.7}
                onPress={() => {}}
              >
                <AntDesign name="download" size={24} color="#023E8A" />
              </TouchableOpacity>
            )
          )}
        </View>
      </View>
      {/* status badge  */}
      <View className="absolute top-3 right-3 w-[70px]">
        {isSessionEnd(date, time) && status === "completed" && (
          <View className="absolute top-0 right-0 bg-green-500 px-2 py-1 rounded-full w-full">
            <Text className="text-white text-xs text-center">Completed</Text>
          </View>
        )} 
        {getReadyTime(date, time, 5) && (
          <View className="absolute top-0 right-0 bg-green-500 px-2 py-1 rounded-full w-full">
            <Text className="text-white text-xs text-center">Ready</Text>
          </View>
        )}
        {
          mode === "past" && status === "missed" && (
            <View className="absolute top-0 right-0 bg-amber-500  px-2 py-1 rounded-full w-full">
              <Text className="text-white text-xs text-center">Missed</Text>
            </View>
          )
        }
      </View>
    </View>
  );
}
