import { View, Text, Image } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";

export default function ConsultationSummaryCard({ consultationData }) {
  const { patient, date, notes, advice, medications } = consultationData;

  const InfoSection = ({ icon, title, children }) => (
    <View className="mb-4">
      <View className="flex-row items-center mb-2">
        {icon}
        <Text className="text-xl font-bold text-gray-800 ml-4">{title}</Text>
      </View>
      <View className="pl-11">{children}</View>
    </View>
  );

  return (
    <View className="bg-white rounded-2xl shadow-md p-5 m-4 border border-secondary">
      {/* --- Card Header --- */}
      <View className="flex-row justify-center items-center pb-4 border-b border-gray-200">
        <View className="flex-col items-center">
          <Image
            source={patient.profile}
            className="w-16 h-16 rounded-full border border-gray-300"
          />
          <View className="mt-2 ">
            <Text className="text-2xl font-bold text-primary text-center">
              {patient.name}
            </Text>
            <Text className="text-md text-gray-500 text-center">
              {patient.details}
            </Text>
            <Text className="text-sm text-gray-500  text-center">{date}</Text>
          </View>
        </View>
      </View>

      <View className="pt-5">
        {/* --- Objective Notes Section --- */}
        <InfoSection
          title="Objective Notes"
          icon={<Feather name="file-text" size={26} color="#334155" />}
        >
          <Text className="text-lg text-gray-700 leading-6">{notes}</Text>
        </InfoSection>

        {/* --- Medications Section (Conditional) --- */}
        {medications && medications.length > 0 && (
          <InfoSection
            title="Prescribed Medication"
            icon={
              <MaterialCommunityIcons name="pill" size={26} color="#16a34a" />
            }
          >
            {medications.map((med, index) => (
              <View
                key={index}
                className="flex-row items-start mb-2 bg-green-50 p-3 rounded-lg"
              >
                <Text className="text-lg text-green-800 mr-2">•</Text>
                <View>
                  <Text className="text-lg font-semibold text-green-800">
                    {med.name}
                  </Text>
                  <Text className="text-sm text-green-700">
                    {med.amount} • {med.times}
                  </Text>
                </View>
              </View>
            ))}
          </InfoSection>
        )}

        {/* --- Advice Section (Conditional) --- */}
        {advice && advice.trim() !== "" && (
          <InfoSection
            title="Doctor's Advice"
            icon={
              <MaterialCommunityIcons
                name="lightbulb-on-outline"
                size={26}
                color="#f59e0b"
              />
            }
          >
            <Text className="text-lg text-gray-700 leading-6">{advice}</Text>
          </InfoSection>
        )}
        
      </View>
    </View>
  );
}
