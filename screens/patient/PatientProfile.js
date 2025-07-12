import { Text, View } from "react-native";


export default function Profile() {
  return (
    <View className="flex-1 justify-center items-center p-5 bg-background">
      <Text className="text-5xl font-bold mb-4 text-green-700">
        Patient Profile Screen (Patient)
      </Text>
      <Text className="text-base text-center text-gray-600">
        Welcome to the Patient Profile Page.
      </Text>
    </View>
  );
}
