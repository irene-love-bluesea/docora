import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const medicalInfo = [
  {
    id: "bloodType",
    title: "Blood Type",
    icon: { name: "water", library: "MaterialCommunityIcons", color: "red" },
    data: ["O+"],
    colors: ["bg-blue-200"],
  },
  {
    id: "allergies",
    title: "Allergies",
    icon: {
      name: "exclamation-triangle",
      library: "FontAwesome5",
      color: "orange",
    },
    data: ["Penicillin", "Asprin"],
    colors: ["bg-green-200", "bg-blue-200"],
  },
  {
    id: "chronicConditions",
    title: "Chronic Conditions",
    icon: { name: "heartbeat", library: "FontAwesome5", color: "blue" },
    data: ["Hypertension", "Diabetes Type 2"],
    colors: ["bg-blue-200", "bg-green-200"],
  },
  {
    id: "medications",
    title: "Current Medications",
    icon: { name: "pills", library: "FontAwesome5", color: "green" },
    data: ["Metformin 500mg", "Lisinopril 10mg"],
    colors: ["bg-green-200", "bg-blue-200"],
  },
];

const MedicalInfoSection = ({ section }) => {
  const IconComponent =
    section.icon.library === "MaterialCommunityIcons"
      ? MaterialCommunityIcons
      : FontAwesome5;

  return (
    <View className="mb-4">
      {/* Section Header */}
      <View className="flex-row items-center gap-3 mb-2">
        <IconComponent
          name={section.icon.name}
          size={22}
          color={section.icon.color}
        />
        <Text className="text-gray-700 font-semibold mb-2">
          {section.title}
        </Text>
      </View>

      {/* Section Pills */}
      <View className="flex-row flex-wrap">
        {section.data.map((item, index) => (
          <View
            key={`${section.id}-${index}`}
            className={`px-3 py-1 rounded-full ${
              section.colors[index % section.colors.length]
            } mr-2 mb-2`}
          >
            <Text className="text-md font-medium text-gray-800">{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const consultationData = [
  {
    date: "July 20, 2025",
    symptoms: "Chest pain, shortness of breath",
    notes: "ECG normal, prescribed rest",
    meds: ["Aspirin 81mg"],
    icon: "stethoscope",
  },
  {
    date: "Dec 8, 2024",
    symptoms: "Fever, fatigue, body aches",
    notes: "Viral infection, rest recommended",
    meds: ["Ibuprofen 400mg", "Vitamin C"],
    icon: "hand-holding-medical",
  },
  {
    date: "Oct 20, 2024",
    symptoms: "Annual checkup",
    notes: "All vitals normal, continue current medications",
    meds: ["Continue current"],
    icon: "heartbeat",
  },
];
const iconBg = ["bg-blue-700", "bg-green-800", "bg-red-700"];
const bgColors = [
  "bg-blue-200",
  "bg-yellow-200",
  "bg-pink-200",
  "bg-purple-200",
  "bg-green-200",
];

export default function PatientProfile() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1 bg-background px-5 pb-3"
        showsVerticalScrollIndicator={false}
      >
        <View>
          {/* Profile Header */}
          <View className="flex-1 items-center mb-3">
            <Image
              source={require("../../assets/profile/patient_f.png")}
              className="w-[120px] h-[120px] rounded-full border border-primary"
            />
            <Text className="text-2xl font-bold mt-2">Sarah James</Text>
            <View className=" flex-row  items-center">
              <Text className="text-lg ">22 Years Old, Female</Text>
            </View>
          </View>

          <View className="px-2 my-3">
          <View className="flex-row gap-3 mb-3">
            <MaterialCommunityIcons name="email" size={24} color="#023E8A" />
            <Text className="text-lg font-medium">
              sarahjames@gmail.com
            </Text>
          </View>
          <View className="flex-row gap-3 mb-3">
            <MaterialCommunityIcons name="phone" size={24} color="#023E8A" />
            <Text className="text-lg font-medium">
             + 11 3329 1292 
            </Text>
          </View>
          <View className="flex-row gap-3">
            <MaterialCommunityIcons name="home" size={24} color="#023E8A" />
            <Text className="text-lg font-medium">
              124 Angel Street, Queback, Canada
            </Text>
          </View>
          </View>

          <View className="bg-white rounded-xl p-5 shadow-sm my-3 border border-secondary">
            <Text className="text-xl font-semibold mb-4">
              Medical Information
            </Text>

            {/* Render all medical info sections */}
            {medicalInfo.map((section) => (
              <MedicalInfoSection key={section.id} section={section} />
            ))}
          </View>

          <Text className="text-xl font-semibold mb-3">
            Consultation History
          </Text>
          {consultationData.map((item, index) => (
            <View key={index} className="flex-row gap-3 mb-6">
              {/* Vertical Line */}
              {index !== consultationData.length - 1 && (
                <View style={styles.verticalLine} />
              )}

              {/* Icon "w-10 h-10 rounded-full bg-primary items-center justify-center mr-4 mt-1.5 */}
              <View
                className={`${
                  iconBg[index % iconBg.length]
                } w-10 h-10 rounded-full items-center justify-center mr-4 mt-1.5`}
              >
                <FontAwesome5 name={item.icon} size={18} color="#fff" />
              </View>

              {/* Details */}
              <View className="flex-1 bg-white p-4 rounded-xl border border-secondary">
                <View className="flex-row items-center mb-3">
                  <Text className="text-lg font-semibold text-primary">
                    {item.date}
                  </Text>
                </View>

                <Text className="text-md mb-2">Symptoms:</Text>
                <Text className="text-md font-semibold mb-3">
                  {item.symptoms}
                </Text>

                <Text className="text-md mb-2">Notes:</Text>
                <Text className="text-md font-semibold mb-3">{item.notes}</Text>

                <Text className="text-md mb-2">Medications: </Text>
                <View className="flex-row flex-wrap">
                  {item.meds.map((med, i) => (
                    <View
                      key={i}
                      className={`${
                        bgColors[i % bgColors.length]
                      } px-3 rounded-2xl py-1 mr-2 mb-2`}
                    >
                      <Text className="text-md font-medium">{med}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  verticalLine: {
    position: "absolute",
    top: 28,
    left: 12,
    height: "100%",
    width: 2,
    backgroundColor: "#023E8A33",
    zIndex: -1,
  },
});
