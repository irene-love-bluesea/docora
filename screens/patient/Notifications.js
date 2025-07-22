import { useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { notifications } from "../../constant/data/notification";
import NotificationCard from "../../components/Card/NotificationCard";
import { notiSorting } from "../../utils/helper";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Notifications() {
  const [isRead, setIsRead] = useState(false);
  const [noti, setNoti] = useState(notifications);

  const handleReadAll = () => {
    console.log("isRead", isRead);
  };

  const filterNotifications = useMemo(() => {
    const sortedNoti = notiSorting(noti?.notifications);
    return sortedNoti;
  }, [noti]);


  return (
    <SafeAreaView className=" flex-1 bg-background px-5 ">
      <View className=" flex-row justify-between items-center py-4 bg-background ">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-sharp" size={30} color="black" />
        </TouchableOpacity>
        <View>
          <Text className="text-2xl font-alata">Notification</Text>
        </View>
        <TouchableOpacity
          className="flex-row items-center gap-2"
          onPress={() => handleReadAll()}
        >
          <Text
            className={`text-md  ${
              isRead ? " text-gray-400" : " text-primary"
            }`}
          >
            Read All
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-1  bg-background">
        {/* notifications rendering  */}
        <FlatList
          data={filterNotifications}
          className=""
          renderItem={({ item }) => <NotificationCard noti={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
