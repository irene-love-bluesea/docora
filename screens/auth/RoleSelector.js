import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Doctor from "../../assets/icon/doctor.svg";
import Health from "../../assets/icon/health.svg";
import Icon from "../../assets/icon/person.svg";
import CustomButton from "../../components/Buttons/CustomButton";

export default function RoleSelector({ navigation }) {
  const [role, setRole] = useState("");

  const isSelected = role !== "";

  // In screens/auth/RoleSelector.js

  function navigateNext() {
    if (role === "Doctor") {
      navigation.navigate("BottomTabs", { userType: 'doctor' });
    } else if (role === "Patient") {
      navigation.navigate("BottomTabs", { userType: 'patient' });
    }
  }

  return (
    <View className="flex-1 justify-center items-center p-5 bg-background">
      <Icon width={100} height={70} color={"#023E8A"} />
      <Text className="text-2xl font-bold mt-2 mb-3">
        Tell Us About Yourself
      </Text>
      <Text className="text-md text-center text-gray-600 mb-3">
        Select your role to personalize your experience and connect you with the
        right features.
      </Text>
      <TouchableOpacity>
        <View
          onPress={() => setRole("Doctor")}
          className={`w-full mt-2 flex-row p-3 gap-2 items-center rounded-xl bg-white active:bg-gray-100 ${
            role === "Doctor" ? "border-2 border-blue-500" : ""
          }`}
        >
          <View>
            <Doctor width={45} height={40} color={"#023E8A"} />
          </View>
          <View className="flex-shrink p-3 gap-1">
            <Text className="text-xl font-bold">I'm a doctor</Text>
            <Text className="text-gray-500 font-normal">
              Provide medical consultations, manage patient records, and offer
              professional healthcare services.
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View
          onPress={() => setRole("Patient")}
          className={`w-full mt-4 flex-row p-3 gap-2 items-center rounded-xl bg-white active:bg-gray-100 border-2 border-solid ${
            role === "Patient" ? "border-green-500" : "border-transparent"
          }`}
        >
          <View>
            <Health width={45} height={40} color={"#00C32D"} />
          </View>
          <View className="flex-shrink p-3 gap-1">
            <Text className="text-xl font-bold">I'm a patient</Text>
            <Text className="text-gray-500 font-normal">
              Book appointments, track your health, access medical records, and
              connect with healthcare providers.
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View className="my-3 flex-row gap-2 px-2 py-1 items-start border border-[#FFAC1C] rounded-xl bg-[#FCF5E2]">
        <View className="pt-3">
          <FontAwesome5 name="info-circle" size={24} color="#CC5500" />
        </View>
        <View className="flex-shrink p-1 gap-0">
          <Text className="text-lg text-[#CC5500] font-bold">Role Verification</Text>
          <Text className="text-[#CC5500] font-normal">
            Doctors will need to verify their credentials in the next step for account approval.
          </Text>
        </View>
      </View>
      <CustomButton
        title="Continue"
        variant="primary"
        disabled={!isSelected}
        onPress={() => navigateNext()}
      />
    </View>
  );
}
