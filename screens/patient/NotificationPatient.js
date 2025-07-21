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

export default function NotificationPatient() {
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
    <SafeAreaView className=" flex-1 bg-background px-5">
      {/* header notification */}
      <View className=" flex-row justify-between items-center py-5 bg-background ">
        <Text className="text-2xl font-alata">Notification</Text>
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
