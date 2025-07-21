import React from "react";
import { View, ScrollView, Text, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MedicationInput from "../../components/Form/MedicationInput";
import CustomButton from "../../components/Buttons/CustomButton";

export default function ConsultationNotes({navigation}) {
  const [diagnosis, setDiagnosis] = React.useState([]);
  const [note, setNote] = React.useState("");
  const [advice, setAdvice] = React.useState("");
   const [medicationRadioValue, setMedicationRadioValue] = React.useState("No");

  const shouldDisableConfirm =
    note === "" ||
    (medicationRadioValue === "Yes" && diagnosis.length === 0);

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-background">
      <ScrollView
        className="bg-background"
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-start items-center px-5 bg-background pb-8">
          <View className="w-full flex-row items-center gap-5 mb-2">
            <Image
              className="w-[60px] h-[60px] border border-gray-600 rounded-full"
              source={require("../../assets/profile/patient_f.png")}
            />
            <View className="flex items-start">
              <Text className="text-2xl text-center font-medium ">
                Sarah James
              </Text>
              <View className="flex-row items-center gap-1">
                <Text className="text-lg text-gray-500 font-medium">
                  28 years old, Female
                </Text>
              </View>
            </View>
          </View>
          {/* Profile end */}

          <View className="w-full my-3">
            <MedicationInput
              medications={diagnosis}
              onMedicationsChange={setDiagnosis}
              onRadioChange={setMedicationRadioValue}
              initialValue="No"
              showTitle={true}
              titleText="Is this patient need to take any medication? *"
              subTitle="Add diagnosis"
            />

            <View className="mb-3">
              <Text className="text-lg font-semibold mb-2">
                Objective Notes *
              </Text>
              <TextInput
                className="border border-white tracking-wider rounded-xl px-4 py-2 text-base bg-white text-black"
                placeholder="Enter Findings after Consultation"
                placeholderTextColor="#999"
                multiline={true}
                textAlignVertical="top"
                value={note}
                style={{
                  paddingTop: 15,
                  height: 120,
                  textAlign: "left",
                }}
                onChangeText={setNote}
              />
            </View>
            <View className="mb-3">
              <Text className="text-lg font-semibold mb-2">
                Advice (Optional)
              </Text>
              <TextInput
                className="border border-white tracking-wider rounded-xl px-4 py-2 text-base bg-white text-black"
                placeholder="Any Health Recommendation for Patient"
                placeholderTextColor="#999"
                multiline={true}
                textAlignVertical="top"
                value={advice}
                style={{
                  paddingTop: 15,
                  height: 120,
                  textAlign: "left",
                }}
                onChangeText={setAdvice}
              />
            </View>
            <CustomButton
              title="Confirm"
              variant="primary"
              disabled={shouldDisableConfirm}
              onPress={() =>
                navigation.navigate("BottomTabs", { userType: "doctor" })
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
