import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationPatient() {
  return (
    <SafeAreaView className=" flex-1 bg-background px-5">
      <ScrollView
        className=""
        // contentContainerStyle={{
        //   flexGrow: 1,
        // }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text>Notification</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
