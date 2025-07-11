import React from "react";
import { View, Text } from "react-native";
import CustomButton from "../../components/Buttons/CustomButton";

export default function PatientInfo({ navigation }) {
  const [gender, setGender] = React.useState("female");

  return (
    <View className="flex-1 justify-start items-center p-5 bg-background">
      <View className="w-full flex items-start">
        <Text className="text-xl font-normal">Gender </Text>
        </View>

      <CustomButton
        title="Go to Patient Profile"
        variant="primary"
        onPress={() => navigation.navigate("PatientProfile")}
      />
    </View>
  );
}
