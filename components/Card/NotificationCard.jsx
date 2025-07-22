import { Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { notiDateFormat } from "../../utils/helper";

export default function NotificationCard({ noti }) {
  const getNotificationStyle = (type) => {
    switch (type) {
      case "CALL_STARTED":
        return {
          icon: <Ionicons name="videocam" size={24} color="#023E8A" />,
          color: "bg-blue-300",
        };
      case "CHAT_STARTED":
      return {
        icon: <Ionicons name="chatbubbles" size={24} color="#023E8A" />,
        color: "bg-blue-300",
      };
      case "APPOINTMENT_CONFIRMED":
        return {
          icon: <AntDesign name="checkcircle" size={24} color="#023E8A" />,
          color: "bg-green-300",
        };
      case "APPOINTMENT_CANCELED":
        return {
          icon: <Ionicons name="alert-circle" size={24} color="#023E8A" />,
          color: "bg-red-300",
        };
      default:
        return {
          icon: <AntDesign name="bells" size={24} color="#023E8A" />,
          color: "bg-gray-300",
        };
    }
  };
  const { icon, color } = getNotificationStyle(noti?.type);

  return (
<>
  <TouchableOpacity
    activeOpacity={0.7}
    elevation={3}
    onPress={() => console.log("Notification pressed", noti?.id)}
    className={`flex-1 secondary  p-4  shadow-sm ${noti?.isRead ? " bg-white" : "bg-background"}`}
  >
    <View className="flex-row items-center gap-3  ">
      <View
        className={`w-10 h-10  items-center justify-center bg-secondary rounded-xl`}
      >
        {icon}
      </View>
      <View className="flex-1">
        <Text className=" text-lg font-semibold">{noti?.title}</Text>
        <Text className="text-gray-500 ">{noti?.body}</Text>
        <Text className="text-xs text-gray-500 mt-1">
          {notiDateFormat(noti?.createdAt)}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
  {/* line break  */}
  <Text className={`h-[1px] bg-secondary w-full`}></Text> 
</>
  );
}
